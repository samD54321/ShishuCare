import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LocalStorageItem } from '@auth/auth';
import { Tags } from '../tagTypes';

const { PATIENT, VISIT } = Tags;

const token = LocalStorageItem.getItem().token;

// Define a service using a base URL and expected endpoints
export const visitApi = createApi({
  reducerPath: 'visitApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_URL}/api/visit`,
    prepareHeaders: (headers) => {
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [PATIENT, VISIT],
  endpoints: (builder) => ({
    getVisits: builder.query({
      query: () => '/',
      transformResponse: (response: any) => {
        return handleResponse(response);
      },
      providesTags: [VISIT],
    }),
    registerVisit: builder.mutation({
      query: (datas) => {
        const id = datas.patientId;
        const body = datas.data;
        return {
          url: `/${id}`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [PATIENT, VISIT],
    }),
  }),
});

const handleResponse = (datas: any) => {
  let diagnosedDatas = [];
  let unDiagnosedDatas = [];
  for (let data of datas) {
    if (data.isDiagnosed == true) {
      diagnosedDatas.push({ id: data.patient._id, DOV: data.DOV, name: data.patient.name });
    } else {
      unDiagnosedDatas.push({ id: data.patient._id, DOV: data.DOV, name: data.patient.name });
    }
  }
  return { diagnosedDatas, unDiagnosedDatas };
};

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetVisitsQuery, useRegisterVisitMutation } = visitApi;
