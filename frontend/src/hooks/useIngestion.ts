import { useState } from 'react';

import { ingestDocuments } from '@/services/ingestService';
import { ApiError, IngestRequest, IngestResponse } from '@/types/apiTypes';

const initialRequest: IngestRequest = {
  source_uri: '',
  content_type: 'application/pdf',
  metadata: {},
};

export function useIngestion() {
  const [form, setForm] = useState<IngestRequest>(initialRequest);
  const [metadataInput, setMetadataInput] = useState(
    '{\n  "department": "knowledge-engineering"\n}',
  );
  const [response, setResponse] = useState<IngestResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (!form.source_uri.trim()) {
      setError('Source URI is required.');
      return;
    }

    let parsedMetadata: Record<string, string> = {};

    try {
      const rawMetadata = JSON.parse(metadataInput) as Record<string, unknown>;
      parsedMetadata = Object.fromEntries(
        Object.entries(rawMetadata).map(([key, value]) => [key, String(value)]),
      );
    } catch {
      setError('Metadata must be valid JSON.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await ingestDocuments({
        ...form,
        source_uri: form.source_uri.trim(),
        content_type: form.content_type.trim(),
        metadata: parsedMetadata,
      });
      setResponse(result);
    } catch (caughtError) {
      const apiError = caughtError as ApiError;
      setError(apiError.message || 'Unable to submit the ingestion job.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    setForm,
    metadataInput,
    setMetadataInput,
    response,
    isLoading,
    error,
    submit,
  };
}
