import ProductCard from "@/components/card/ProductCard";
import SectionTitle from "@/components/Shared/SectionTitle";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";

const productData = {
  _id: "67b33cd68e95bd1685642114",
  name: "Premium Ballpoint Pen",
  brand: "Parker",
  category: "Writing",
  price: 12.99,
  imageUrl: "https://i.ibb.co.com/FNmpQ8N/stationary-shop-Educational-1.jpg",
  description:
    "A smooth-writing ballpoint pen with a sleek design, perfect for everyday use.",
  averageRating: "4.67",
  reviews: [{}, {}, {}],
  inStock: true,
  createdAt: "2025-02-17T13:42:46.622Z",
  updatedAt: "2025-02-18T02:22:04.618Z",
  quantity: 50,
};

const FeaturedProducts = () => {
  const { data } = useGetAllProductsQuery(undefined);

  const product = data?.data;
  console.log(product);

  return (
    <div className="custom-container">
      <SectionTitle
        heading="Featured Products"
        subTitle="See all our popular products in this week. You can choose your daily needs products from this list and get some special offer with free shipping"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-center items-center bg-gray-100 gap-5">
        <ProductCard product={productData} />
        <ProductCard product={productData} />
        <ProductCard product={productData} />
      </div>
    </div>
  );
};

export default FeaturedProducts;
