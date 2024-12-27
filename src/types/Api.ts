export interface ApiResponse<T = any> {
  data: T;
  error?: null;
}

export interface ErrorResponse {
  error: string;
  data?: null;
}