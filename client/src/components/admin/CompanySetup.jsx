import React, { useEffect, useState } from 'react';
import { Navbar } from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { COMPANY_API_END_POINT } from "../../utils/constant.js"
import useGetCompanyById from '@/hooks/useGetCompanyById';

export const CompanySetup = () => {
    const params = useParams();
   
    useGetCompanyById(params?.id);
  const { singleCompany } = useSelector((store) => store.company);

  const [input, setInput] = useState({
    name: '',
    description: '',
    website: '',
    location: '',
    profile: null,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, profile: file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', input.name);
    formData.append('description', input.description);
    formData.append('website', input.website);
    formData.append('location', input.location);
    if (input.profile) {
      formData.append('profile', input.profile);
    }

    try {
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );
console.log(res);
console.log(res.data);

      if (res.data.success) {
        toast.success(res.data.message || 'Company updated successfully!');
        setTimeout(() => navigate('/admin/companies'), 1000);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || '',
        description: singleCompany.description || '',
        website: singleCompany.website || '',
        location: singleCompany.location || '',
        profile: null, // Reset file to null; not prefilled
      });
    }
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div className='max-w-xl mx-auto my-10'>
        <form onSubmit={submitHandler}>
          <div className='flex items-center gap-5 p-8'>
            <Button
              type='button'
              onClick={() => navigate('/admin/companies')}
              variant='outline'
              className='flex items-center gap-2 text-gray-500 font-semibold'
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className='font-bold text-xl'>Company Setup</h1>
          </div>

          <div className='grid grid-cols-2 gap-3'>
            <div>
              <Label>Company Name</Label>
              <Input
                type='text'
                name='name'
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                type='text'
                name='description'
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Website</Label>
              <Input
                type='text'
                name='website'
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                type='text'
                name='location'
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>

            <div>
              <Label>Logo</Label>
              <Input
                type='file'
                name='profile'
                accept='image/*'
                onChange={changeFileHandler}
              />
            </div>
          </div>

          {loading ? (
            <Button disabled className='w-full my-4'>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Please wait
            </Button>
          ) : (
            <Button type='submit' className='w-full my-4'>
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};
