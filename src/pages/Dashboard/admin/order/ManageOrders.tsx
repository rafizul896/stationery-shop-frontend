import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { toast } from "react-toastify";
import { TResponse } from "@/types";
import {
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
} from "@/redux/features/order/orderApi";
import { Button } from "@/components/ui/button";
import { TbBounceRightFilled } from "react-icons/tb";

const ManageOrders = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [approveOrder] = useUpdateOrderMutation();
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);

  const { data, isLoading, isFetching } = useGetAllOrdersQuery([
    { name: "page", value: page },
    { name: "limit", value: limit },
  ]);
  const orderData = data?.data;
  const totalPage = data?.meta?.totalPage || 1;

  const handleApproveOrder = async (id: string) => {
    const orderData = {
      orderId: id,
      status: "Shipping",
    };
    try {
      const res = (await approveOrder(orderData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message);
      } else {
        toast.success("Order status updated to Shipping!");
      }
      console.log(res);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="md:w-[90%] mx-auto">
      <Table className="min-w-[600px] overflow-scroll">
        <TableHeader>
          <TableRow>
            <TableHead>Order Date</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>TotalPrice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Approve orders</TableHead>
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
              <TableCell className="font-medium">{order?.user?.name}</TableCell>
              <TableCell>{order?.totalAmount.toFixed(2)}</TableCell>
              <TableCell>{order?.status}</TableCell>
              <TableCell  className="flex justify-center">
                {/* for approve order */}
                <TableCell>
                  <div id="page-content" inert={isApproveDialogOpen}>
                    {order.status === "Pending" && (
                      <Dialog
                        open={isApproveDialogOpen}
                        onOpenChange={setIsApproveDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setIsApproveDialogOpen(true);
                            }}
                          >
                            <TbBounceRightFilled className="text-lg hover:text-green-500" />
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Approve Order</DialogTitle>
                            <DialogDescription></DialogDescription>
                          </DialogHeader>
                          <div>
                            <p>
                              Are you sure you want to approve the order for{" "}
                              <strong>{order.user.name}</strong>?
                            </p>
                            <div className="flex justify-end mt-4">
                              <Button
                                variant="outline"
                                onClick={() => setIsApproveDialogOpen(false)}
                                className="mr-2"
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={() => {
                                  setIsApproveDialogOpen(false);
                                  handleApproveOrder(order._id);
                                }}
                              >
                                Confirm
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </TableCell>
              </TableCell>
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

export default ManageOrders;
