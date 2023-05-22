import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/doctor/' }),
  endpoints: (builder) => ({
    loginDoctor: builder.mutation<IDoctorLogin, IDoctorLogin>({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
    }),
    registerDoctor: builder.mutation < IDoctorRegister,IDoctorRegister>({
        query: (body) => ({
            url:'',
            method: 'POST',
            body
        })
    })
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginDoctorMutation, useRegisterDoctorMutation } = doctorApi;
