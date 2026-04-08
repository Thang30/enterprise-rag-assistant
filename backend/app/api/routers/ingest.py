from typing import Annotated

from fastapi import APIRouter, Depends, status

from app.api.schemas.ingest import IngestRequest, IngestResponse
from app.dependencies.services import get_ingest_service
from app.services.ingest import IngestService

router = APIRouter(prefix="/ingest", tags=["ingest"])


@router.post("", response_model=IngestResponse, status_code=status.HTTP_202_ACCEPTED)
async def ingest_documents(
    payload: IngestRequest,
    service: Annotated[IngestService, Depends(get_ingest_service)],
) -> IngestResponse:
    return await service.run(payload)
