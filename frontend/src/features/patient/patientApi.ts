import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LocalStorageItem } from '@auth/auth';
import { ILocalStorageItem } from '@interfaces/index';

interface IDataResponse {
  visits: {
    isDiagnosed: Boolean;
  }[];
}
[];

interface IPatientResponse {
  data: IDataResponse[];
}

const token = LocalStorageItem.getItem().token;

// Define a service using a base URL and expected endpoints
export const patientApi = createApi({
  reducerPath: 'patientApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/patient/',
    prepareHeaders: (headers) => {
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPatients: builder.query({
      query: (path) => path,
      transformResponse: (response: IPatientResponse) => {
        return handleResponse(response.data);
      },
    }),
    getAllPatients: builder.query({
      query: (path) => path,
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
    getpatientById: builder.query({
      query: (id: string) => `${id}/`,
      transformResponse: (response: any) => {
        const data = response.data;
        const visits = data.visits;
        let newVisit = visits.pop();
        return { data, newVisit, visits };
      },
    }),
    registerPatient: builder.mutation({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
    }),
    deletePatient: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPatientsQuery,
  useGetpatientByIdQuery,
  useRegisterPatientMutation,
  useGetAllPatientsQuery,
  useDeletePatientMutation,
} = patientApi;

const handleResponse = (datas: IDataResponse[]) => {
  let RecurringPatients: Array<IDataResponse> = [];
  let NewPatients: Array<IDataResponse> = [];
  for (let data of datas) {
    if (data.visits.length > 1) {
      for (let visit of data.visits) {
        if (!visit.isDiagnosed) {
          RecurringPatients.push({ ...data });
        }
      }
    } else {
      if (!data.visits[0].isDiagnosed) {
        NewPatients.push({ ...data });
      }
    }
  }

  return { RecurringPatients, NewPatients };
};
