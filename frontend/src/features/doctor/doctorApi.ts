import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LocalStorageItem } from '@auth/auth';
import { Tags } from '../tagTypes';

const { DOCTOR } = Tags;


const token = LocalStorageItem.getItem().token;


interface IDoctorLogin {
  email: string;
  password: string;
}

interface IDoctorRegister {
  name: string;
  email: string;
  password: string;
  hospital: string;
  phone: string;
}

// Define a service using a base URL and expected endpoints
export const doctorApi = createApi({
  reducerPath: 'doctorApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_URL}/api/doctor/`,
    prepareHeaders: (headers) => {
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [DOCTOR],
  endpoints: (builder) => ({
    loginDoctor: builder.mutation<IDoctorLogin, IDoctorLogin>({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
      invalidatesTags: [DOCTOR],
    }),
    registerDoctor: builder.mutation<IDoctorRegister, IDoctorRegister>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
      invalidatesTags: [DOCTOR],
    }),
    getDoctors: builder.query({
      query: (url) => url,
      providesTags: ['doctor'],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginDoctorMutation, useRegisterDoctorMutation, useGetDoctorsQuery } = doctorApi;
