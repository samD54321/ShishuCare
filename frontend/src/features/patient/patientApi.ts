import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LocalStorageItem } from '@auth/auth';
import { Tags } from '../tagTypes';

const { PATIENT, VISIT } = Tags;


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
    baseUrl: `${process.env.NEXT_PUBLIC_URL}/api/patient/`,
    prepareHeaders: (headers) => {
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [PATIENT, VISIT],
  endpoints: (builder) => ({
    getPatients: builder.query({
      query: (path) => path,
      transformResponse: (response: IPatientResponse) => {
        return handleResponse(response.data);
      },
      providesTags: [PATIENT],
    }),
    getAllPatients: builder.query({
      query: (path) => path,
      transformResponse: (response: any) => {
        return response.data;
      },
      providesTags: [PATIENT],
    }),
    getpatientById: builder.query({
      query: (id: string) => `${id}/`,
      transformResponse: (response: any) => {
        const data = response.data;
        const visits = data.visits;
        let newVisit = visits.pop();
        if (visits.length == 0) {
          if (newVisit.isDiagnosed) {
            visits.push(newVisit);
          }
        }
        return { data, newVisit, visits };
      },
      providesTags: [PATIENT],
    }),
    registerPatient: builder.mutation({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
      invalidatesTags: [PATIENT],
    }),
    deletePatient: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
      invalidatesTags: [PATIENT],
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
