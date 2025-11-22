import React, { useState } from 'react';
import { Navbar } from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import {  COMPANY_API_END_POINT} from "../../utils/constant.js"
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';


export const CompanyCreate = () => {
    const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState('');
  const navigate = useNavigate();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {
       companyName
      },{
        headers:{
            'Content-Type':"application/json"
        },
        withCredentials: true
      }
    );
      console.log(res);
      console.log(res.data);
      if(res.data.success){
toast.success(res.data.message);
dispatch(setSingleCompany(res.data.company));
const companyId = res?.data?.company?._id;
          navigate(`/admin/companies/${companyId}`); // ✅ Redirect after successful registration
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto'>
        <div className='my-10'>
          <h1 className='font-bold text-2xl'>Your Company Name</h1>
          <p className='text-gray-500'>
            What would you like to name your company? You can change this later.
          </p>
        </div>

        <Label>Company Name</Label>
        <Input
          type='text'
          className='my-2'
          placeholder='Job Hunter, Microsoft, etc.'
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <div className='flex items-center gap-2 my-10'>
          <Button variant='outline' onClick={() => navigate('/admin/companies')}>
            Cancel
          </Button>
          <Button onClick={registerNewCompany}>Create</Button>
        </div>
      </div>
    </div>
  );
};
