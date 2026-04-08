import { ApiError } from '@/types/apiTypes';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api/v1';

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
};

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const errorPayload = (await response.json()) as { detail?: string };
      if (errorPayload.detail) {
        message = errorPayload.detail;
      }
    } catch {
      const fallbackText = await response.text();
      if (fallbackText) {
        message = fallbackText;
      }
    }

    const error: ApiError = { message, status: response.status };
    throw error;
  }

  return (await response.json()) as T;
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
) {
  const headers = new Headers(options.headers);

  if (options.body !== undefined) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  return parseResponse<T>(response);
}
