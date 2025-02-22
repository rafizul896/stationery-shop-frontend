import Banner from "./Banner";
import Features from "./Features";
import FeaturedCategories from "./FeaturedCategories ";
import FeaturedProducts from "./FeaturedProducts";
import Testimonials from "./Testimonials";
import ExtraSection from "./ExtraSection";

const Home = () => {
  return (
    <div className="mt-5 md:mt-10">
      <Banner />
      <Features />
      <FeaturedCategories />
      <FeaturedProducts />
      <ExtraSection />
      <Testimonials />
    </div>
  );
};

export default Home;
