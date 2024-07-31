import { AxiosRequestConfig } from 'axios';

export interface IAxios {
  api_get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
  api_post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T>;
  api_put: <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) => Promise<T>;
  api_patch: <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ) => Promise<T>;
  api_delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
}
