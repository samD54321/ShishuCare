'use client';

import { Provider } from 'react-redux';
import { store } from '../store';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IChildrenNode {
  children: React.ReactNode;
}

export const Providers = ({ children }: IChildrenNode) => {
  return (
    <Provider store={store}>
      <ToastContainer />
      {children}
    </Provider>
  );
};
