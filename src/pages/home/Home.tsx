import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import Banner from "./Banner";

const Home = () => {
  const { data } = useGetAllProductsQuery(undefined);
  
  console.log(data);

  return (
    <div className="mt-5 md:mt-10">
      <Banner />
    </div>
  );
};

export default Home;
