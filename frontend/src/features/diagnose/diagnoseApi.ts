import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LocalStorageItem } from '@auth/auth';

const token = LocalStorageItem.getItem().token;

// Define a service using a base URL and expected endpoints
export const diagnoseApi = createApi({
  reducerPath: 'diagnoseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_URL}/api/diagnosis`,
    prepareHeaders: (headers) => {
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['diagnosis'],
  endpoints: (builder) => ({
    createDiagnose: builder.mutation({
      query: (data) => {
        return {
          url: `/${data.visitId}`,
          method: 'POST',
          body: data.diagnoseData,
        };
      },
      invalidatesTags:['diagnosis']
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCreateDiagnoseMutation } = diagnoseApi;
