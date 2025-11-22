import React, { useEffect, useState } from 'react';
import { Navbar } from '../shared/Navbar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { CompaniesTables } from './CompaniesTables';
import { useNavigate } from 'react-router-dom';
import { useGetAllCompanies } from '@/hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';


export const Companies = () => {
  const navigate = useNavigate()
  useGetAllCompanies();
  const [input, setInput] = useState('');
const dispatch = useDispatch();

useEffect(() =>{
dispatch(setSearchCompanyByText(input))
},[input])
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input className="w-fit" placeholder="Filter by name" onChange={(e) => setInput(e.target.value)} />
          <Button onClick={() => navigate("/admin/companies/create")}>New Company</Button> 
        </div>
        {/* Table goes outside the button */}
        <CompaniesTables />
      </div>
    </div>
  );
};
