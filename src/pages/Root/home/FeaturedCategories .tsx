import SectionTitle from "@/components/Shared/SectionTitle";
import { Link } from "react-router-dom";

const FeaturedCategories = () => {
  const categories = [
    {
      categoryName: "Writing",
      image: "https://i.ibb.co.com/N6QFZCLP/Writing-1-optimized-300.jpg",
    },
    {
      categoryName: "Office Supplies",
      image: "https://i.ibb.co.com/bZ285S6/Office-1-optimized-300.jpg",
    },
    {
      categoryName: "Art Supplies",
      image: "https://i.ibb.co.com/dsRb2DT5/art-1-optimized-300.jpg",
    },
    {
      categoryName: "Educational",
      image: "https://i.ibb.co.com/FNmpQ8N/stationary-shop-Educational-1.jpg",
    },
    {
      categoryName: "Technology",
      image:
        "https://i.ibb.co.com/gKKYG6r/Mobile-phone-accessories-cartoon-optimized-300.jpg",
    },
  ];

  return (
    <div>
      <SectionTitle
        heading="Featured Categories"
        subTitle="Choose your necessary products from this feature categories"
      />
      <div className="custom-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {categories.map((category, index) => (
          <Link
            to={`/products?category=${category.categoryName}`}
            key={index}
            className="border p-2 cursor-pointer rounded-lg shadow text-center"
          >
            <div className="bg-gray-100 mb-2 h-[180px] p-2 rounded flex items-center justify-center">
              <img
                src={category?.image}
                alt={category?.categoryName}
                className="h-full w-full object-cover rounded opacity-90 hover:opacity-100 transition"
              />
            </div>
            <p className="text-lg text-gray-700 font-medium mb-2">
              {category.categoryName}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
