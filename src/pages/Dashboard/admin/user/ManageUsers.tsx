import {
  useGetAllUsersQuery,
  useStatusChangeMutation,
} from "@/redux/features/user/userApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import CustomPagination from "@/components/Shared/Pagination";
import FInput from "@/components/form/FInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import { TResponse } from "@/types";
import Loader from "@/components/Shared/Loader";

const ManageUsers = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("active");
  const [statusChange] = useStatusChangeMutation();

  const { data, isLoading } = useGetAllUsersQuery([
    { name: "page", value: page },
    { name: "limit", value: limit },
    { name: "searchTerm", value: searchTerm },
    { name: "status", value: status },
  ]);

  const users = data?.data;
  const totalPages = data?.meta.totalPage || 1;

  const handleStatusChange = async (statusData: any) => {
    try {
      const res = (await statusChange(statusData)) as TResponse<any>;

      if (res.data.success) {
        toast.success(`User ${statusData.status} Successfully`);
      } else if (res.error) {
        toast.error(res.error.data.message);
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err?.message);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="md:w-[90%] mx-auto">
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <div className="w-full">
          <FInput
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Name or Email"
          />
        </div>
        <div>
          <Select onValueChange={(value) => setStatus(value)}>
            <SelectTrigger className="md:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="block">Block</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user: any) => (
            <TableRow key={user?._id}>
              <TableCell className="font-medium">{user?.name}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>{user?.isActive ? "block" : "active"}</TableCell>
              <TableCell className="text-right">
                <button
                  onClick={() =>
                    handleStatusChange({
                      status: user?.status === "active" ? "block" : "active",
                      userId: user?._id,
                    })
                  }
                  className={`${
                    user?.status === "block" ? "bg-green-600" : "bg-red-600"
                  } p-2 rounded-lg text-white`}
                >
                  {user?.status === "active" ? "block" : "active"}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Pagination Component */}
      <CustomPagination
        page={page}
        totalPages={totalPages}
        limit={limit}
        onPageChange={setPage}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPage(1); // Reset to page 1 when limit changes
        }}
      />
    </div>
  );
};

export default ManageUsers;
