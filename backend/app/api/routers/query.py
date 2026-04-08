from typing import Annotated

from fastapi import APIRouter, Depends, status

from app.api.schemas.query import QueryRequest, QueryResponse
from app.dependencies.services import get_query_service
from app.services.query import QueryService

router = APIRouter(prefix="/query", tags=["query"])


@router.post("", response_model=QueryResponse, status_code=status.HTTP_200_OK)
async def query_documents(
    payload: QueryRequest,
    service: Annotated[QueryService, Depends(get_query_service)],
) -> QueryResponse:
    return await service.run(payload)
