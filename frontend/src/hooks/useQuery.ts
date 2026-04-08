import { useState } from 'react';

import { queryDocuments } from '@/services/queryService';
import { ApiError, QueryRequest, QueryResponse } from '@/types/apiTypes';

const initialQuery: QueryRequest = {
  question: '',
  top_k: 5,
};

export function useQuery() {
  const [form, setForm] = useState<QueryRequest>(initialQuery);
  const [response, setResponse] = useState<QueryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (!form.question.trim()) {
      setError('Question is required.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await queryDocuments({
        ...form,
        question: form.question.trim(),
      });
      setResponse(result);
    } catch (caughtError) {
      const apiError = caughtError as ApiError;
      setError(apiError.message || 'Unable to complete the query request.');
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
