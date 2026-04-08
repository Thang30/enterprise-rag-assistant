from pydantic import BaseModel, Field


class IngestRequest(BaseModel):
    source_uri: str = Field(
        ..., min_length=1, description="Location of the document or corpus to ingest."
    )
    content_type: str = Field(
        default="application/pdf", description="Declared content type of the source."
    )
    metadata: dict[str, str] = Field(
        default_factory=dict, description="Metadata captured for downstream indexing."
    )


class IngestResponse(BaseModel):
    job_id: str
    status: str
