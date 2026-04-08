import uuid

from app.api.schemas.evaluate import EvaluateRequest, EvaluateResponse
from app.core.config import Settings


class EvaluationService:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings

    async def run(self, request: EvaluateRequest) -> EvaluateResponse:
        # Evaluations are typically long-running and resource-heavy, so model the
        # API as a scheduled job from the start rather than a synchronous request.
        return EvaluateResponse(evaluation_id=str(uuid.uuid4()), status="scheduled")
