import uuid

from app.api.schemas.ingest import IngestRequest, IngestResponse
from app.core.config import Settings


class IngestService:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings

    async def run(self, request: IngestRequest) -> IngestResponse:
        # Returning an accepted job id now sets the contract up for an eventual
        # async ingestion pipeline without forcing API changes later.
        return IngestResponse(job_id=str(uuid.uuid4()), status="queued")
