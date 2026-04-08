from contextlib import asynccontextmanager
from logging import getLogger

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

from app.api.router import api_router
from app.core.config import Settings, get_settings
from app.core.logging import configure_logging

logger = getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Keep startup and shutdown concerns in one place so future resource wiring
    # (vector stores, model clients, telemetry exporters) does not leak into routes.
    settings = app.state.settings
    logger.info("starting application", extra={"environment": settings.environment})
    yield
    logger.info("stopping application", extra={"environment": settings.environment})


def create_application(settings: Settings | None = None) -> FastAPI:
    # The app factory makes it easy to inject test settings and keeps import-time
    # side effects minimal for workers, tests, and CLI entrypoints.
    app_settings = settings or get_settings()
    configure_logging(app_settings.log_level)

    app = FastAPI(
        title=app_settings.app_name,
        version=app_settings.app_version,
        debug=app_settings.debug,
        openapi_url=f"{app_settings.api_v1_prefix}/openapi.json",
        docs_url=f"{app_settings.api_v1_prefix}/docs",
        redoc_url=f"{app_settings.api_v1_prefix}/redoc",
        lifespan=lifespan,
    )

    # Store resolved settings on app state so startup hooks and future shared
    # infrastructure can consume the same configuration object.
    app.state.settings = app_settings

    if app_settings.cors_origins:
        # Default to permissive methods/headers here; origin control is the main
        # boundary and tends to vary by environment rather than by route.
        app.add_middleware(
            CORSMiddleware,
            allow_origins=app_settings.cors_origins,
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

    # Versioned routing keeps the external API stable even when internal module
    # boundaries evolve.
    app.include_router(api_router, prefix=app_settings.api_v1_prefix)

    @app.get("/", tags=["system"], summary="Service entrypoint")
    async def root() -> dict[str, str]:
        # Keep a minimal root document for humans and uptime checks rather than
        # returning a bare 404 from the service root.
        return {
            "service": app_settings.app_name,
            "status": "ok",
            "docs_url": f"{app_settings.api_v1_prefix}/docs",
            "health_url": f"{app_settings.api_v1_prefix}/health",
        }

    @app.get("/health", include_in_schema=False)
    async def health_redirect() -> RedirectResponse:
        return RedirectResponse(url=f"{app_settings.api_v1_prefix}/health")

    @app.get("/docs", include_in_schema=False)
    async def docs_redirect() -> RedirectResponse:
        return RedirectResponse(url=f"{app_settings.api_v1_prefix}/docs")

    return app
