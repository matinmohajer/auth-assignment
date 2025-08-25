import { API_CONFIG, HTTP_STATUS } from '../constants/api';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  status: number;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiRequest<T = unknown>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.error || `HTTP ${response.status}`,
        response.status,
        data
      );
    }

    return {
      success: true,
      data,
      status: response.status,
    };
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new ApiError('Request timeout', HTTP_STATUS.BAD_REQUEST);
      }
      throw new ApiError(error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }

    throw new ApiError('Unknown error occurred', HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}

export async function retryRequest<T = unknown>(
  requestFn: () => Promise<ApiResponse<T>>,
  attempts: number = API_CONFIG.RETRY_ATTEMPTS
): Promise<ApiResponse<T>> {
  let lastError: Error;

  for (let i = 0; i < attempts; i++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      
      if (i === attempts - 1) {
        throw lastError;
      }

      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }

  throw lastError!;
}
