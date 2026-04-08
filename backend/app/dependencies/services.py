from typing import Annotated

from fastapi import Depends

from app.core.config import Settings, get_settings
from app.services.evaluate import EvaluationService
from app.services.ingest import IngestService
from app.services.query import QueryService


def get_query_service(
    settings: Annotated[Settings, Depends(get_settings)],
) -> QueryService:
    # Route handlers depend on service contracts, not concrete construction
    # details, so these providers are the seam for future repositories/clients.
    return QueryService(settings=settings)


def get_ingest_service(
    settings: Annotated[Settings, Depends(get_settings)],
) -> IngestService:
    return IngestService(settings=settings)


def get_evaluation_service(
    settings: Annotated[Settings, Depends(get_settings)],
) -> EvaluationService:
    return EvaluationService(settings=settings)
