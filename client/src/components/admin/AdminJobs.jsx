//import { useGetAllCompanies } from '@/hooks/useGetAllCompanies'
import { setSearchCompanyByText } from '@/redux/companySlice';

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { AdminJobTables } from './AdminJobTables';
import { useGetAllAdminJobs } from '@/hooks/useGetAllAdminJobs';

export const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
          <Input
            className="w-fit"
            placeholder='Search Company...'
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            variant='default'
            onClick={() => navigate('/admin/jobs/create')}
          >
           New Jobs
          </Button>
        </div>
        <AdminJobTables />
      </div>
    </div>
  )
}
