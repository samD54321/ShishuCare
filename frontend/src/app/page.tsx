"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from '@/store';
import { RootState } from '@/store';
import { setTest } from '@/features/testSlice';

const page = () => {
  const dispatch = useDispatch();
  const { test } = useSelector((state: RootState) => state.test);
  return (
    <div>
      Main Page text is : <h1>{test}</h1>
      <button onClick={() => dispatch(setTest('Shishu_Care'))}>click</button>
    </div>
  );
};


export default page;
