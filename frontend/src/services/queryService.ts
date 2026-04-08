import { apiRequest } from '@/services/apiClient';
import { QueryRequest, QueryResponse } from '@/types/apiTypes';

export function queryDocuments(payload: QueryRequest) {
  return apiRequest<QueryResponse>('/query', {
    method: 'POST',
    body: payload,
  });
}
