import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ICHWRequest {
  email: string;
  password: string;
}

export interface ICHWLoginResponse {
 email: string; name: string; phone: string; token: string ;
}

interface ICHWRegister {
  name: string;
  email: string;
  password: string;
  phone: string;
}

// Define a service using a base URL and expected endpoints
export const chwApi = createApi({
  reducerPath: 'chwApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/chw/' }),
  endpoints: (builder) => ({
    loginCHW: builder.mutation<ICHWLoginResponse,ICHWRequest>({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
    }),
    registerCHW: builder.mutation<ICHWRegister, ICHWRegister>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginCHWMutation, useRegisterCHWMutation } = chwApi;
