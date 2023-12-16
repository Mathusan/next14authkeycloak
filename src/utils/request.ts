import { AxiosError, AxiosResponse } from 'axios';

import { axiosInstance } from './axios';



export class ResponseError extends Error {
  constructor(error: AxiosError) {
    super(`${error.code} - ${error.message}`);
  }
}

type MetaData = {
  path: string;
  method: string;
};

type Payload = {
  [key: string]: any;
};

/**
 *
 * Parse JSON from response
 *
 * @param {object} response The response object
 *
 * @return {object} The parsed JSON response
 */
const parseJSON = (response: AxiosResponse) => {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.data;
};

/**
 * handle error upon failed request
 *
 * @param {object} response The response object
 *
 * @return {object|undefined} throw error
 */
const errorHandling = (error: AxiosError) => {
  const errorResponse = new ResponseError(error);
  errorResponse.message = error.response?.data as string;
  throw errorResponse;
};

/**
 * Request wrapper that wraps around axios instance to request a url
 *
 * @param {string} _metadata URL and method of request
 * @param {Payload} data data to be transfered in request
 * @param {boolean} isSecure  is authorized request or not
 * @param {boolean} multipart is multipart request
 */
const request = async (
  _metadata: MetaData,
  data: Payload | null,
  isSecure = true,
  multipart = false
) => {
  const payload = { ...data };
  const metadata = { ..._metadata };
  const pathTokens = metadata.path.split(':');

  if (metadata.path.indexOf(':') !== 0) {
    pathTokens.shift();
  }
  //
  pathTokens.forEach((token: string) => {
    if (token.includes('/')) {
      const key = token.split('/')[0];
      metadata.path = metadata.path.replace(`:${key}`, `${payload[key]}`);
      delete payload[key];
    } else {
      metadata.path = metadata.path.replace(`:${token}`, `${payload[token]}`);
      delete payload[token];
    }
  });

  let requestBody: unknown = JSON.stringify(payload);
  if (multipart) {
    const formData = new FormData();
    formData.append('file', payload.file);
    requestBody = formData;
  }

  const options = {
    method: metadata.method,
    // mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache',
    url: metadata.path,
    // credentials: 'include', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      ...(isSecure && {
        Authorization: '',
      }),
      ...(multipart && {
        enctype: 'multipart/form-data',
      }),
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    ...(['POST', 'PUT', 'PATCH'].includes(metadata.method) && {
      data: requestBody,
    }),
  };

  try {
    const response = await axiosInstance(options);
    return parseJSON(response);
  } catch (error: any) {
    return errorHandling(error);
  }
};

export default request;
