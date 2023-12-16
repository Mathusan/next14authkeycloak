
import React, { useEffect } from 'react';
import { useContext } from 'react'; // Import the appropriate context hook



import { useAuth } from '../auth/useAuth';

  
import { ENVIRONMENT } from 'config';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const axiosInstance = axios.create({
  baseURL: ENVIRONMENT.BACKEND_API,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});


  

const AxiosInterceptor = () => {
  

 
  const { keycloak } = useAuth();
  const accessToken = keycloak.token;
  
  

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
       (config) => {
        // Add the access token to the request headers          
        if (
          accessToken &&
          config.headers &&
          'Authorization' in config.headers
        ) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error: AxiosError) => {
        //try refresh endpoint
        const originalRequest = error.config as AxiosRequestConfig & {
          _retry?: boolean;
          _queue?: boolean;
        };
        if (
          (error?.response?.status === 403 || error?.response?.status === 401) &&
          originalRequest.headers &&
          originalRequest.headers.Authorization &&
          !originalRequest._retry
        ) {
          try {
            originalRequest._retry = true;
            
    
            originalRequest._queue = true;
    
            
    
            return axiosInstance(originalRequest);
          } catch (error: any) {
            return Promise.reject(error);
          }
        } else {
          return Promise.reject(error);
        }
      }
    )

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
    };
  }, [accessToken]); // Re-run the effect whenever the accessToken changes

  return null;
};

export default AxiosInterceptor;





