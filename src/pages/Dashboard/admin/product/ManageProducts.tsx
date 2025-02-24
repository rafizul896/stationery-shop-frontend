import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
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
import { AiOutlineDelete } from "react-icons/ai";
import { RxUpdate } from "react-icons/rx";

const ManageProducts = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, isFetching } = useGetAllProductsQuery(undefined);
  const productData = data?.data;
  const totalPage = data?.meta?.totalPage || 1;

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productData?.map((product: any) => (
            <TableRow key={product?._id}>
              <TableCell className="font-medium">{product?.name}</TableCell>
              <TableCell>{product?.category}</TableCell>
              <TableCell>{product?.price}</TableCell>
              <TableCell className="text-center">
                <button>
                  <RxUpdate className="text-lg hover:text-primary" />
                </button>
                <button className="ml-3">
                  <AiOutlineDelete className="text-lg hover:text-red-500" />
                </button>
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
          setPage(1); // Reset to page 1 when limit changes
        }}
      />
    </div>
  );
};

export default ManageProducts;
