import { apiRequest } from '@/services/apiClient';
import { IngestRequest, IngestResponse } from '@/types/apiTypes';

export function ingestDocuments(payload: IngestRequest) {
  return apiRequest<IngestResponse>('/ingest', {
    method: 'POST',
    body: payload,
  });
}
