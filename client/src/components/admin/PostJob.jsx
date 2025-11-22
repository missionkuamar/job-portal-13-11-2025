import React, { useState } from "react";
import { Navbar } from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem
} from "../ui/select";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { Loader2 } from "lucide-react";

export const PostJob = () => {
  const { companies } = useSelector((store) => store.company);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle normal inputs
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handle company select
  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company?.name?.toLowerCase() === value
    );

    if (selectedCompany) {
      setInput({ ...input, companyId: selectedCompany?._id });
    }
  };

  // Submit form
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.companyId) {
      return toast.error("Please select a company.");
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${JOB_API_END_POINT}/post`,
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
console.log(res)
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
        >
          <div className="grid grid-cols-2 gap-3">

            <div>
              <Label>Title</Label>
              <Input
                value={input.title}
                onChange={changeEventHandler}
                type="text"
                name="title"
                className="my-1"
                required
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                value={input.description}
                onChange={changeEventHandler}
                type="text"
                name="description"
                className="my-1"
                required
              />
            </div>

            <div>
              <Label>Requirements</Label>
              <Input
                value={input.requirements}
                onChange={changeEventHandler}
                type="text"
                name="requirements"
                className="my-1"
                required
              />
            </div>

            <div>
              <Label>Salary</Label>
              <Input
                value={input.salary}
                onChange={changeEventHandler}
                type="text"
                name="salary"
                className="my-1"
                required
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                value={input.location}
                onChange={changeEventHandler}
                type="text"
                name="location"
                className="my-1"
                required
              />
            </div>

            <div>
              <Label>Job Type</Label>
              <Input
                value={input.jobType}
                onChange={changeEventHandler}
                type="text"
                name="jobType"
                className="my-1"
                required
              />
            </div>

            <div>
              <Label>Experience Level</Label>
              <Input
                value={input.experience}
                onChange={changeEventHandler}
                type="text"
                name="experience"
                className="my-1"
                required
              />
            </div>

            <div>
              <Label>No. of Positions</Label>
              <Input
                value={input.position}
                onChange={changeEventHandler}
                type="number"
                name="position"
                className="my-1"
                min={1}
                required
              />
            </div>

            {/* Company Select */}
            <div>
              <Label>Select Company</Label>

              {companies.length > 0 ? (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-[200px] my-1">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company?._id}
                          value={company?.name?.toLowerCase()}
                        >
                          {company?.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm text-red-600 my-1">
                  No companies found. Please register a company first.
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Please wait...
            </Button>
          ) : (
            <Button className="w-full mt-4">Post New Job</Button>
          )}
        </form>
      </div>
    </div>
  );
};
