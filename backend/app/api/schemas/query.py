from pydantic import BaseModel, Field


class QueryRequest(BaseModel):
    question: str = Field(
        ..., min_length=1, description="Question to answer with the RAG pipeline."
    )
    conversation_id: str | None = Field(
        default=None, description="Optional conversation identifier."
    )
    top_k: int = Field(
        default=5, ge=1, le=25, description="Number of supporting chunks to retrieve."
    )


class QueryResponse(BaseModel):
    answer: str
    sources: list[str] = Field(default_factory=list)
    trace_id: str | None = None
