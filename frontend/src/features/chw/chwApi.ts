import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ICHW{
    email:string,
    password:string
}

// Define a service using a base URL and expected endpoints
export const chwApi = createApi({
  reducerPath: 'chwApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/chw/' }),
  endpoints: (builder) => ({
    loginCHW: builder.mutation<ICHW,ICHW>({
      query: (body) => ({
        url:'login',
        method: 'POST',
        body
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginCHWMutation } = chwApi;
