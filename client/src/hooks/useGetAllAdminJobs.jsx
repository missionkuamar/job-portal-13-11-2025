import { setAllAdminjobs } from '@/redux/jobSlice';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { JOB_API_END_POINT } from '@/utils/constant';

export const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const fetchAllAdminJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setAllAdminjobs(res.data.jobs));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAdminJobs();
  }, []);

  return { fetchAllAdminJobs, loading }; // return useful data / functions
};
