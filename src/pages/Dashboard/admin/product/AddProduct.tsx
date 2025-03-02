import FInput from "@/components/form/FInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddProductMutation } from "@/redux/features/product/productApi";
import { TResponse } from "@/types";
import { TProduct } from "@/types/product";
import { imageUpload } from "@/utils/imageUpload";
import { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { TbFidgetSpinner } from "react-icons/tb";
import { toast } from "react-toastify";
import "tailwindcss/tailwind.css";

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [addProduct] = useAddProductMutation();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TProduct>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    const imageFile = data.imageUrl[0];

    try {
      const imageUrl = await imageUpload(imageFile);

      const productData = {
        ...data,
        imageUrl,
      };

      const res = (await addProduct(productData)) as TResponse<any>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message);
        setLoading(false);
      } else {
        toast.success("Product added successfully!");
        reset();
        setLoading(false);
      }
    } catch (err) {
      if (err instanceof Error) {
        setLoading(false);
        toast.error("Failed to add product.");
      }
    }
  };

  return (
    <div className="md:w-[90%] mx-auto">
      <h1 className="text-2xl font-semibold text-center mb-5">Add Product</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y- grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Product Name */}
          <FInput
            label="Product Name"
            type="text"
            placeholder="Enter product name"
            register={register("name", {
              required: "Product name is required.",
            })}
            error={errors?.name?.message as string}
          />

          {/* Brand */}
          <FInput
            label="Brand"
            type="text"
            placeholder="Enter brand name"
            register={register("brand", { required: "Brand is required." })}
            error={errors?.brand?.message as string}
          />

          {/* Price */}
          <FInput
            label="Price ($)"
            type="number"
            placeholder="Enter price"
            register={register("price", {
              required: "Price is required.",
              min: { value: 0, message: "Price must be a positive number." },
            })}
            error={errors?.price?.message as string}
          />

          {/* Category */}
          <div>
            <label className="text-gray-700 font-medium">Category</label>
            <Select onValueChange={(value) => setValue("category", value)}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Writing">Writing</SelectItem>
                <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                <SelectItem value="Art Supplies">Art Supplies</SelectItem>
                <SelectItem value="Educational">Educational</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
              </SelectContent>
            </Select>
            {errors?.category && (
              <p className="text-red-600 text-xs mt-1">
                {errors?.category?.message}
              </p>
            )}
          </div>

          {/* Description */}
          <FInput
            label="Description"
            type="text"
            placeholder="Enter product description"
            register={register("description", {
              required: "Description is required.",
            })}
            error={errors?.description?.message as string}
          />

          {/* Quantity */}
          <FInput
            label="Quantity"
            type="number"
            placeholder="Enter quantity"
            register={register("quantity", {
              required: "Quantity is required.",
              min: { value: 0, message: "Quantity cannot be negative." },
            })}
            error={errors?.quantity?.message as string}
          />

          {/* In Stock (ShadCN Select) */}
          <div className="mb-4">
            <label className="text-gray-700 font-medium">In Stock</label>
            <Select
              onValueChange={(value) => setValue("inStock", value === "true")}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select In Stock Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
            {errors?.inStock && (
              <p className="text-red-600 text-xs mt-1">
                {errors?.inStock?.message}
              </p>
            )}
          </div>
          {/* Image URL */}
          <FInput
            label="Image"
            type="file"
            placeholder="Enter image URL"
            register={register("imageUrl", { required: "Image is required." })}
            error={errors?.imageUrl?.message as string}
          />
        </div>

        {/* Submit Button */}
        <div className="mt-5">
          <button
            disabled={loading}
            type="submit"
            className="bg-primary hover:bg-hover w-full lg:w-[200px] rounded-md py-3 font-medium text-white"
          >
            {loading === true ? (
              <TbFidgetSpinner className="animate-spin m-auto " />
            ) : (
              "Add Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
