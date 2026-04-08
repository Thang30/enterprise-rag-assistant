export type QueryRequest = {
  question: string;
  conversation_id?: string;
  top_k: number;
};

export type QueryResponse = {
  answer: string;
  sources: string[];
  trace_id?: string | null;
};

export type EvaluateRequest = {
  dataset_name: string;
  metrics: string[];
  candidate_version?: string;
};

export type EvaluateResponse = {
  evaluation_id: string;
  status: string;
};

export type IngestRequest = {
  source_uri: string;
  content_type: string;
  metadata: Record<string, string>;
};

export type IngestResponse = {
  job_id: string;
  status: string;
};

export type ApiError = {
  message: string;
  status?: number;
};
