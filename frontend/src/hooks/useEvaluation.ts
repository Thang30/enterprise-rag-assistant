import { useState } from 'react';

import { evaluatePipeline } from '@/services/evalService';
import { ApiError, EvaluateRequest, EvaluateResponse } from '@/types/apiTypes';

const initialRequest: EvaluateRequest = {
  dataset_name: '',
  metrics: ['faithfulness', 'answer_relevance'],
};

export function useEvaluation() {
  const [form, setForm] = useState<EvaluateRequest>(initialRequest);
  const [response, setResponse] = useState<EvaluateResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (!form.dataset_name.trim()) {
      setError('Dataset name is required.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await evaluatePipeline({
        ...form,
        dataset_name: form.dataset_name.trim(),
        candidate_version: form.candidate_version?.trim() || undefined,
      });
      setResponse(result);
    } catch (caughtError) {
      const apiError = caughtError as ApiError;
      setError(apiError.message || 'Unable to start the evaluation run.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    setForm,
    response,
    isLoading,
    error,
    submit,
  };
}
