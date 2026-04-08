import { apiRequest } from '@/services/apiClient';
import { EvaluateRequest, EvaluateResponse } from '@/types/apiTypes';

export function evaluatePipeline(payload: EvaluateRequest) {
  return apiRequest<EvaluateResponse>('/evaluate', {
    method: 'POST',
    body: payload,
  });
}
