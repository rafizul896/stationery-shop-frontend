import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import Banner from "./Banner";
import Features from "./Features";
import SectionTitle from "@/components/Shared/SectionTitle";

const Home = () => {
  const { data } = useGetAllProductsQuery(undefined);

  console.log(data);

  return (
    <div className="mt-5 md:mt-10">
      <Banner />
      <Features />
      <SectionTitle
        heading="Featured Categories"
        subTitle="Choose your necessary products from this feature categories"
      />
    </div>
  );
};

export default Home;
