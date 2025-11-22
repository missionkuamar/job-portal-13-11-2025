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

export function CompaniesTables() {
  const { companies = [], searchCompanyByText = "" } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState([]);
const navigate = useNavigate();
  useEffect(() => {
    if (!Array.isArray(companies)) return;
    const filteredCompany = companies.filter((company) => {
      if (!searchCompanyByText) return true;
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <Table>
      <TableCaption>A list of your recently registered companies.</TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Logo</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {filterCompany.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center text-gray-500">
              No companies found.
            </TableCell>
          </TableRow>
        ) : (
          filterCompany.map((company) => (
            <TableRow key={company?._id}>
              <TableCell className="font-medium">
                <Avatar>
                  <AvatarImage src={company?.logo || "/placeholder.png"} alt={company?.name} />
                </Avatar>
              </TableCell>
              <TableCell>{company?.name}</TableCell>
              <TableCell>{new Date(company?.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div onClick={() => navigate(`/admin/companies/${company?._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
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
