from fastapi import APIRouter

from app.api.routers import evaluate, ingest, query, system

api_router = APIRouter()
# Register routers centrally so versioning and cross-cutting API concerns stay
# separate from the individual endpoint modules.
api_router.include_router(system.router)
api_router.include_router(query.router)
api_router.include_router(ingest.router)
api_router.include_router(evaluate.router)
