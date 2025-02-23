import CustomButton from "@/components/ui/CustomButton";
import { useGetAProductQuery } from "@/redux/features/product/productApi";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "@/components/Shared/Loader";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { Rating } from "@smastrom/react-rating";

const ProductDetails = () => {
  const { productId } = useParams(); // to get the product id from the URL
  const { data, isLoading,isFetching } = useGetAProductQuery(productId, {
    skip: !productId,
  });
  const [quantity, setQuantity] = useState(1);

  const product = data?.data;

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (isLoading || isFetching) {
    return (
      <div className="h-[50vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="custom-container mt-5 md:mt-10">
      <div className="flex gap-5 bg-primary/5 p-4 flex-col md:flex-row items-center">
        {/* product-image */}
        <div className="w-full md:w-1/2">
          <img
            src={product?.imageUrl}
            alt={product?.name}
            className="mx-auto lg:max-w-[450px]"
          />
        </div>

        {/* product-info */}
        <div className="w-full md:w-1/2 space-y-3 lg:space-y-4">
          <h2 className="text-3xl font-heading font-bold">{product?.name}</h2>
          <p className="text-xs text-gray-700">
            <span className="bg-primary/20 p-1 rounded-xl">Quantity : </span>{" "}
            {product?.quantity}
          </p>
          <p className="text-xl">${product?.price}</p>
          <p className="mt">{product?.description}</p>
          <div className="flex items-center gap-1">
            <Rating
              style={{ maxWidth: 100 }}
              value={product.averageRating}
              readOnly
            />
            <p>
              {product?.averageRating}({product.reviews.length})
            </p>
          </div>
          <div className="flex gap-5 text-gray-700">
            <p className="mt- text-sm">Category : {product?.category}</p>{" "}
            <p className="text-sm">Brand : {product?.brand}</p>
          </div>{" "}
          <div className="flex items-center mt-5 gap-5">
            {/* Quantity Selector */}
            <div className="flex items-center border rounded-lg">
              <button
                className="px-2 md:px-4 py-2 border bg-gray-100 text-lg font-semibold rounded-l-lg hover:bg-gray-200"
                onClick={handleDecrease}
              >
                –
              </button>
              <span className="px-4 md:px-6 py-2 text-lg font-semibold">
                {quantity}
              </span>
              <button
                className="px-2 md:px-4 py-2 border bg-gray-100 text-lg font-semibold rounded-r-lg hover:bg-gray-200"
                onClick={handleIncrease}
                disabled={product?.quantity <= quantity}
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <CustomButton text="Add to Cart" className="w-full" />
          </div>
        </div>
      </div>

      {product.reviews.length > 0 && (
        <div className="mt-10 w-full">
          <h1 className="text-xl font-heading text-center mb-5">All Reviews</h1>
          <div className="space-y-2 px-4">
            {product?.reviews?.map((review: any) => (
              <>
                <div className="mb-5 border p-3 shadow-sm rounded-sm">
                  <div>
                    <div className="flex items-center gap-3">
                      <HiOutlineUserCircle className="text-5xl" />
                      <div>
                        <p>{review.user.name}</p>
                        <Rating
                          style={{ maxWidth: 100 }}
                          value={review.rating}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="font-medium">Comment :</span>{" "}
                    <span className="font-heading text-sm">
                      {review.comment}
                    </span>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
