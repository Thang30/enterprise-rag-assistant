import uuid

from app.api.schemas.query import QueryRequest, QueryResponse
from app.core.config import Settings


class QueryService:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings

    async def run(self, request: QueryRequest) -> QueryResponse:
        # This placeholder keeps the HTTP contract stable while retrieval,
        # reranking, and generation components are integrated incrementally.
        return QueryResponse(
            answer=(
                "Query pipeline placeholder. Replace this with orchestration over retrieval, "
                "ranking, and response generation."
            ),
            sources=[],
            trace_id=str(uuid.uuid4()),
        )
