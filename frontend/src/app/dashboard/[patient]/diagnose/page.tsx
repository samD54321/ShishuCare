"use client";

import React from 'react'
import { usePathname } from 'next/navigation';

const page = () => {
    const router = usePathname().split('/');
    const id = router[router.length - 2];
  return (
    <div>page witn id : {id}</div>
  )
}

export default page