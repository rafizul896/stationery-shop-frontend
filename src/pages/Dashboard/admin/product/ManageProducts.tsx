import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "@/redux/features/product/productApi";
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
import { toast } from "react-toastify";
import { TResponse } from "@/types";
import { UpdateProductModal } from "./UpdateProductModal";

const ManageProducts = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [deleteProduct] = useDeleteProductMutation();

  const { data, isLoading, isFetching } = useGetAllProductsQuery([
    { name: "page", value: page },
    { name: "limit", value: limit },
  ]);
  const productData = data?.data;
  const totalPage = data?.meta?.totalPage || 1;

  const handleDeleteProduct = async (id: string) => {
    try {
      const res = (await deleteProduct({ productId: id })) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message);
      } else {
        toast.success(res.message || "Product deleted successfully");
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
      <Table className="min-w-[500px] overflow-scroll">
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
                  <UpdateProductModal product={product} />
                </button>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="ml-3"
                >
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
          setPage(1);
        }}
      />
    </div>
  );
};

export default ManageProducts;
