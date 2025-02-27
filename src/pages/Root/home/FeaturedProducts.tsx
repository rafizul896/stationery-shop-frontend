import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCard from "@/components/card/ProductCard";
import SectionTitle from "@/components/Shared/SectionTitle";
import { Link } from "react-router-dom";
import CustomButton from "@/components/ui/CustomButton";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";

const FeaturedProducts = () => {
  const { data } = useGetAllProductsQuery([{ name: "limit", value: 10 }]);
  const products = data?.data;

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 4 },
    breakpoints: {
      "(max-width: 1024px)": { slides: { perView: 3 } },
      "(max-width: 768px)": { slides: { perView: 2 } },
      "(max-width: 480px)": { slides: { perView: 1 } },
    },
  });

  return (
    <div className="custom-container">
      <SectionTitle
        heading="Featured Products"
        subTitle="See all our popular products in this week. You can choose your daily needs products from this list and get some special offer with free shipping"
      />

      <div className="relative">
        <div ref={sliderRef} className="keen-slider">
          {products?.map((product) => (
            <div key={product._id} className="keen-slider__slide p-[10px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="flex gap-2 absolute -top-8 md:-top-10 right-2 md:right-4">
          {/* Navigation Buttons */}
          <button
            onClick={() => instanceRef.current?.prev()}
            className="text-white bg-primary px-3 py-2 rounded z-10"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="text-white bg-primary px-3 py-2 rounded z-10"
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="mt-3 flex justify-center">
          <Link to={"/products"}>
            <CustomButton text="View All" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
