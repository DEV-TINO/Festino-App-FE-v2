import useBaseModal from '@/stores/baseModal';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getCookie } from './utils';

export const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

type Response = {
  success: boolean;
  message: string;
  data: any;
};

const errorReponse: Response = {
  success: false,
  message: 'Something went wrong... Please try again later.',
  data: undefined,
};

const responseWrapper = (response: AxiosResponse): Response => {
  const data = response.data;
  // Handle Error status with Constants
  if (ERROR_STATUS.includes(data.status)) {
    return {
      ...errorReponse,
      message: data.message || errorReponse.message,
    };
  }
  return data;
};

const ERROR_STATUS = [401, 403, 500, 502, 503, 504];

export const api = {
  get: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<Response> => {
    const response = await baseApi.get<T>(url, config);
    return responseWrapper(response);
  },

  post: async <T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<Response> => {
    await baseApi.post('/main/auth/token');
    const response = await baseApi.post<T, AxiosResponse<T>, D>(url, data, config);
    return responseWrapper(response);
  },

  put: async <T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<Response> => {
    await baseApi.post('/main/auth/token');
    const response = await baseApi.put<T, AxiosResponse<T>, D>(url, data, config);
    return responseWrapper(response);
  },

  delete: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<Response> => {
    await baseApi.post('/main/auth/token');
    const response = await baseApi.delete<T>(url, config);
    return responseWrapper(response);
  },
};

export const tokenizedBaseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

tokenizedBaseApi.interceptors.request.use((config) => {
  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');
  const { openModal } = useBaseModal.getState();

  if (accessToken) {
    config.headers['access-token'] = accessToken;
  }
  if (refreshToken) {
    config.headers['refresh-token'] = refreshToken;
  }

  if (!accessToken?.trim() && !refreshToken?.trim()) {
    openModal('requireLoginModal');
    return Promise.reject(new Error('로그인이 필요합니다.'));
  }

  return config;
});

tokenizedBaseApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { openModal } = useBaseModal.getState();

      alert('로그인 세션이 만료되었습니다.');

      openModal('requireLoginModal');

      return Promise.reject(error);
    }
  },
);

export const tokenizedApi = {
  get: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<Response> => {
    const response = await tokenizedBaseApi.get<T>(url, config);
    return responseWrapper(response);
  },

  post: async <T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<Response> => {
    const response = await tokenizedBaseApi.post<T, AxiosResponse<T>, D>(url, data, config);
    return responseWrapper(response);
  },

  put: async <T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<Response> => {
    const response = await tokenizedBaseApi.put<T, AxiosResponse<T>, D>(url, data, config);
    return responseWrapper(response);
  },

  delete: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<Response> => {
    const response = await tokenizedBaseApi.delete<T>(url, config);
    return responseWrapper(response);
  },
};
