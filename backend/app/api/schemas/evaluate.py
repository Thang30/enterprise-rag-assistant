from pydantic import BaseModel, Field


class EvaluateRequest(BaseModel):
    dataset_name: str = Field(
        ..., min_length=1, description="Evaluation dataset identifier."
    )
    metrics: list[str] = Field(
        default_factory=list, description="Metrics to compute for the current run."
    )
    candidate_version: str | None = Field(
        default=None, description="Optional model or pipeline version under test."
    )


class EvaluateResponse(BaseModel):
    evaluation_id: str
    status: str
