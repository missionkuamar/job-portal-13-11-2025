import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setSingleJob } from '@/redux/jobSlice';
import { JOB_API_END_POINT, APPLICATION_API_END_POINT } from '../utils/constant.js';

export const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const params = useParams();
  const jobId = params.id;
  const [loading, setLoading] = useState(false);

  const postedDate = new Date(singleJob?.createdAt).toLocaleDateString();
const isInitiallyApplied = singleJob?.applications?.some(
  application => application.applicant === user?._id
) || false;
const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {},
        { withCredentials: true }
      );
      console.log(res)
      if (res.data.success) {
        setIsApplied(true);
        const updateSingleJob = {...singleJob, applications:[...singleJob.applications, {applicant:user?._id}]}
        dispatch(setSingleJob(updateSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };
useEffect(() => {
  const fetchSingleJob = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setSingleJob(res.data.job));
        // ✅ plural fix here
        setIsApplied(res.data.job.applications?.some(app => app.applicant === user?._id));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  fetchSingleJob();
}, [jobId, dispatch, user?._id]);

  return (
    <div className='max-w-7xl mx-auto my-10'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-bold text-xl'>{singleJob?.title || "Job Title"}</h1>
          <div className='flex items-center gap-2 mt-4'>
            <Badge className='text-blue-400 font-bold' variant='ghost'>
              {singleJob?.position} Position
            </Badge>
            <Badge className='text-[#f83002] font-bold' variant='ghost'>
              {singleJob?.jobType}
            </Badge>
            <Badge className='text-[#7209b7] font-bold' variant='ghost'>
              {singleJob?.salary}
            </Badge>
          </div>
        </div>
        <Button
        disabled={isApplied || loading}
          className={`rounded-lg cursor-pointer ${
            isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32af]'
          }`}
          onClick={!isApplied ? applyJobHandler : null}
        >
         {loading ? 'Applying...' : isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>
        {singleJob?.description}
      </h1>

      <div className='my-4'>
        <h1 className='font-bold my-1'>
          Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span>
        </h1>
        <h1 className='font-bold my-1'>
          Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span>
        </h1>
        <h1 className='font-bold my-1'>
          Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span>
        </h1>
        <h1 className='font-bold my-1'>
          Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel}</span>
        </h1>
        <h1 className='font-bold my-1'>
          Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}</span>
        </h1>
        <h1 className='font-bold my-1'>
          Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span>
        </h1>
        <h1 className='font-bold my-1'>
          Requirements: <span className='pl-4 font-normal text-gray-800'>{singleJob?.requirements}</span>
        </h1>
        <h1 className='font-bold my-1'>
          Posted Date: <span className='pl-4 font-normal text-gray-800'>{postedDate}</span>
        </h1>
      </div>
    </div>
  );
};
