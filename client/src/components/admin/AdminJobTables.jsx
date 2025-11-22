import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function AdminJobTables() {
  
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);

  // State to store filtered companies
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
      if(!searchJobByText){
        return true
      };
      return job?.title?.name?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
    });
    setFilterJobs(filteredCompany)
  }, [allAdminJobs, searchJobByText]);

  return (
    <Table>
      <TableCaption>A list of your recently registered companies.</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Company Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {filterJobs.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center text-gray-500">
              No companies found.
            </TableCell>
          </TableRow>
        ) : (
          filterJobs.map((job) => (
            <TableRow key={job?._id}>
              <TableCell className="font-medium">
                <Avatar>
                  <AvatarImage src={job?.logo || "/placeholder.png"} alt={job?.name} />
                </Avatar>
              </TableCell>
              <TableCell>{job?.name}</TableCell>
              <TableCell>{new Date(job?.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger> 
                  <PopoverContent className="w-32">
                    <div onClick={() => navigate(`/admin/companies/${job?._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                      <Edit2 size={16} />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>

      <TableFooter />
    </Table>
  );
}
