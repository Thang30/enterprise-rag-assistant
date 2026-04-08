from typing import Annotated

from fastapi import APIRouter, Depends, status

from app.api.schemas.evaluate import EvaluateRequest, EvaluateResponse
from app.dependencies.services import get_evaluation_service
from app.services.evaluate import EvaluationService

router = APIRouter(prefix="/evaluate", tags=["evaluate"])


@router.post("", response_model=EvaluateResponse, status_code=status.HTTP_202_ACCEPTED)
async def evaluate_pipeline(
    payload: EvaluateRequest,
    service: Annotated[EvaluationService, Depends(get_evaluation_service)],
) -> EvaluateResponse:
    return await service.run(payload)
