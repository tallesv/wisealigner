import axios, { AxiosInstance } from 'axios';

export function getApiClient(token?: string): AxiosInstance {
  const api = axios.create({
    baseURL: `https://us-central1-${process.env.NEXT_PUBLIC_PROJECT_ID}.cloudfunctions.net/api`,
  });

  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  return api;
}
