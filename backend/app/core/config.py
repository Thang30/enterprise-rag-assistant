from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Centralize runtime configuration here so every process resolves settings
    # the same way whether it is an API server, worker, or offline job.
    app_name: str = "Enterprise RAG Assistant API"
    app_version: str = "0.1.0"
    environment: str = Field(
        default="development", description="Deployment environment name."
    )
    debug: bool = False
    api_v1_prefix: str = "/api/v1"
    host: str = "0.0.0.0"
    port: int = 8000
    log_level: str = "INFO"
    cors_origins: list[str] = Field(
        default_factory=lambda: ["http://localhost:3000", "http://127.0.0.1:3000"],
        description="Allowed CORS origins for frontend clients.",
    )

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        env_nested_delimiter="__",
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    # Settings parsing can touch the environment and .env file repeatedly; cache
    # the resolved object so dependency injection stays cheap and consistent.
    return Settings()
