import { TProduct } from "@/types/product";
import { Star } from "lucide-react";

const ProductCard = ({ product }: { product: TProduct }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 w-full">
      <img
        src={product?.imageUrl}
        alt={product?.name}
        className="w-full max-h-40 object-cover rounded-md"
      />
      <div className="mt-3">
        <h3 className="text-lg font-semibold">{product?.name}</h3>
        <p className="text-gray-500 text-sm">{product?.brand}</p>
        <div className="flex items-center text-yellow-500 mt-1">
          <Star size={16} className="fill-yellow-500" />
          <span className="ml-1 text-sm">
            {product?.averageRating} ({product?.reviews?.length} reviews)
          </span>
        </div>
        <p className="text-sm text-gray-700 mt-2">{product?.description}</p>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-lg font-bold text-secondary">
            ${product?.price}
          </span>
          <button
            className={`px-4 py-2 text-white rounded-lg ${
              product?.inStock
                ? "bg-primary hover:bg-phover"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!product?.inStock}
          >
            {product?.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
