import CustomButton from "@/components/ui/CustomButton";

const ExtraSection = () => {
  return (
    <div className="bg-phover/15 mt-10 ">
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 py-5 md:py-10 custom-container">
        <div>
          <img
            src="https://i.ibb.co.com/FNmpQ8N/stationary-shop-Educational-1.jpg"
            alt=""
          />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl text-gray-800 md:text-2xl font-semibold text-center font-heading">
            Get Your Daily Needs From Our Stationery Shop
          </h1>
          <p className="text-center text-gray-700 max-w-3xl">
            There are many products you will find in our shop, Choose your daily
            necessary product from our Stationery shop and get some special
            offers.
          </p>
          <a href="/products" className="flex justify-center">
          <CustomButton text="Shop Now" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ExtraSection;
