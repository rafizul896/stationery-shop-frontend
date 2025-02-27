import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomPagination from "@/components/Shared/Pagination";
import Loader from "@/components/Shared/Loader";
import { useState } from "react";
import { useGetAllOrdersQuery } from "@/redux/features/order/orderApi";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { useGetAUserQuery } from "@/redux/features/user/userApi";

const Orders = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const email = useAppSelector(selectCurrentUser)?.email;
  const {data:userData} = useGetAUserQuery({email})
 const userId = userData?.data._id;

  const { data, isLoading, isFetching } = useGetAllOrdersQuery([
    { name: "page", value: page },
    { name: "limit", value: limit },
    { name: "user", value: userId },
    {
      name: "fields",
      value: "paymentMethod,totalAmount,createdAt,status,-user",
    },
  ]);

  const orderData = data?.data;
  const totalPage = data?.meta?.totalPage || 1;

  console.log(orderData)

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl text-gray-800 md:text-3xl font-semibold text-center font-heading">
        Orders
      </h2>
      <Table className="min-w-[600px] overflow-scroll mt-5">
        <TableHeader>
          <TableRow>
            <TableHead>Order Date</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>TotalPrice</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderData?.map((order: any) => (
            <TableRow key={order?._id}>
              <TableCell>
                {order?.createdAt
                  ? new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </TableCell>
              <TableCell>{order?.paymentMethod}</TableCell>
              <TableCell>{order?.totalAmount?.toFixed(2)}</TableCell>
              <TableCell>{order?.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Pagination Component */}
      <CustomPagination
        page={page}
        totalPages={totalPage}
        limit={limit}
        onPageChange={setPage}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPage(1);
        }}
      />
    </div>
  );
};

export default Orders;
