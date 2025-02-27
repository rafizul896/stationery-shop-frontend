import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import FInput from "@/components/form/FInput";
import { imageUpload } from "@/utils/imageUpload";
import { RxUpdate } from "react-icons/rx";
import { TProduct } from "@/types/product";
import { useUpdateProductMutation } from "@/redux/features/product/productApi";
import { TResponse } from "@/types";
import { DialogDescription } from "@radix-ui/react-dialog";

export function UpdateProductModal({ product }: { product: TProduct }) {
  const [updatedProductData] = useUpdateProductMutation();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>(
    product?.imageUrl as string
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TProduct>({
    defaultValues: product,
  });

  const selectedCategory = watch("category");
  const isInStock = watch("inStock");

  // 🔹 Handle Image Upload (imgBB Example)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const file = e.target.files?.[0];

    if (!file) {
      return toast.error("Image upload failed.");
    }

    try {
      const img_url = await imageUpload(file);

      if (img_url) {
        setValue("imageUrl", img_url);
        setImagePreview(img_url);
        toast.success("Image uploaded successfully!");
        setLoading(false);
      } else {
        setLoading(false);
        toast.error("Image upload failed.");
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error("Image upload error.");
      }
    }
  };

  // 🔹 Handle Form Submission
  const onSubmit = async (data: TProduct) => {
    const updateData = { ...data, price: Number(data?.price) };
    try {
      const res = (await updatedProductData(updateData)) as TResponse<any>;

      if (res.error) {
        toast.error(res.error.data.message);
      } else {
        toast.success("Product updated successfully!");
        setOpen(false);
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={null}>
          <RxUpdate className="text-lg hover:text-primary" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[300px] sm:max-w-lg md:max-w-xl w-full h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Update Product</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
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
            type="text"
            placeholder="Enter price"
            register={register("price", {
              required: "Price is required.",
              valueAsNumber: true,
            })}
            error={errors?.price?.message as string}
          />

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <Select
              onValueChange={(val) => setValue("category", val)}
              value={selectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "Writing",
                  "Office Supplies",
                  "Art Supplies",
                  "Educational",
                  "Technology",
                ].map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-red-500 text-sm">
                {errors.category.message as string}
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
              valueAsNumber: true,
            })}
            error={errors?.quantity?.message as string}
          />

          {/* In Stock Toggle */}
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-700">In Stock</span>
            <button
              type="button"
              className={`px-4 py-1 rounded-md text-white ${
                isInStock ? "bg-primary" : "bg-red-500"
              }`}
              onClick={() => setValue("inStock", !isInStock)}
            >
              {isInStock ? "Yes" : "No"}
            </button>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium text-gray-700">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-24 h-24 mt-3 rounded"
              />
            )}
            {errors.imageUrl && (
              <p className="text-red-500 text-sm">
                {errors.imageUrl.message as string}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button disabled={loading} type="submit" className="w-full">
            Update Product
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
