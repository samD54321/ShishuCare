'use client';

import { Provider } from 'react-redux';
import { store } from '../store';
import React from 'react';


interface IChildrenNode {
  children: React.ReactNode;
}

export const Providers = ({ children }: IChildrenNode) => {
 
  return (
      <Provider store={store}>{children}</Provider>
  );
};

