import { TProduct } from "@/types/product";
import { Link } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cart/cartSlice";

const ProductCard = ({ product }: { product: TProduct }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, cartQuantity: 1 }));
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="border bg-white rounded shadow p-4 hover:shadow-md transition">
      <div className="flex justify-center">
        <Link to={`/products/${product?._id}`} className="h-[150px]">
          <img
            src={product?.imageUrl as string}
            alt={product?.name}
            className="h-full w-full object-cover rounded opacity-90 hover:opacity-100 transition"
          />
        </Link>
      </div>

      {/* Product Details */}
      <div>
        <div className="flex  items-center justify-between mt-3">
          <p className="text-lg font-semibold">${product?.price}</p>
          <button
            onClick={handleAddToCart}
            className="flex gap-3 items-center text-lg bg-whit rounded-full p-1"
          >
            <MdAddShoppingCart className="hover:text-secondary transition" />
          </button>
        </div>
        <Link
          to={`/products/${product?._id}`}
          className="font-semibold text-gray-600"
        >
          {product?.name}
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
