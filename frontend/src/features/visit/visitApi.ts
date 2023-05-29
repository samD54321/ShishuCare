import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LocalStorageItem } from '@auth/auth';

const token = LocalStorageItem.getItem().token;

// Define a service using a base URL and expected endpoints
export const visitApi = createApi({
  reducerPath: 'visitApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/visit',
    prepareHeaders: (headers) => {
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getVisits: builder.query({
      query: () => '/',
      transformResponse: (response:any) => {
        return handleResponse(response);
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetVisitsQuery } = visitApi;

const handleResponse = (datas: any) => {
    let diagnosedDatas=[];
    let unDiagnosedDatas=[];
    for (let data of datas) {
        if (data.isDiagnosed==false){
            diagnosedDatas.push({id:data.patient._id,DOV:data.DOV,name:data.patient.name})
        }
        else{
            unDiagnosedDatas.push({ id: data.patient._id, DOV: data.DOV, name: data.patient.name });
        }
    }
  return {diagnosedDatas, unDiagnosedDatas};
};
