import { configureStore } from '@reduxjs/toolkit';
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query';
import shishuCareReducer from '../features/shishuCare';
import { chwApi } from '@features/chw/chwApi';
import {doctorApi} from '@features/doctor/doctorApi'
import {patientApi} from '@features/patient/patientApi'

export const store = configureStore({
  reducer: {
    shishuCare: shishuCareReducer,
    // Add the generated reducer as a specific top-level slice
    [chwApi.reducerPath]: chwApi.reducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
    [patientApi.reducerPath]: patientApi.reducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chwApi.middleware).concat(doctorApi.middleware).concat(patientApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
