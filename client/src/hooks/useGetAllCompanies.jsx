import { setAlljobs } from '@/redux/jobSlice';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { COMPANY_API_END_POINT } from '@/utils/constant';

import React from 'react'
import { setCompanies } from '@/redux/companySlice';

export const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  useEffect(() =>{
const fetchCompanies = async () => {
    try {
const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {withCredentials: true});
if(res.data.success){
    dispatch(setCompanies(res.data.companies));
}
    } catch(error){
        console.log(error)
        toast.error(error.response.data.message)
    }
}
fetchCompanies();
  },[dispatch])
}

