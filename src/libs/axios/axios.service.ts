import { AxiosInstance } from 'axios';

export abstract class AxiosService {
  constructor(instance: AxiosInstance) {
    this.interceptorsRequest(instance);
    this.interceptorsResponse(instance);
  }

  interceptorsRequest(instance: AxiosInstance) {
    instance.interceptors.request.use(
      function (config) {
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }
  interceptorsResponse(instance: AxiosInstance) {
    instance.interceptors.response.use(
      function (response) {
        return response.data;
      },
      (error) => {
        return Promise.reject(this.parseErrorResponse(error));
      }
    );
  }
  private parseErrorResponse(error: any) {
    if (error && error.response) {
      const errorResponse = error.response.data as any;
      return {
        error: true,
        status: error.response.status,
        data: (() => {
          if (!errorResponse) return 'ERROR_OPPSSS';
          return errorResponse;
        })(),
      };
    }
    return { status: 'SERVICE_UNAVAILABLE', data: 'ERROR_OPPSSS', error: true };
  }
}
