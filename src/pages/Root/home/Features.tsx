import { FiTruck } from "react-icons/fi";
import { BiSupport } from "react-icons/bi";
import { GrGift } from "react-icons/gr";
import { RiSecurePaymentFill } from "react-icons/ri";

const Features = () => {
  return (
    <div className="custom-container mt-10 flex flex-col md:flex-row gap-5">
      <div className="flex flex-col justify-center items-center border p-4 w-full space-y-2 rounded-lg shadow-md">
        <div>
          <FiTruck className="text-4xl text-secondary" />
        </div>
        <h1 className="text-lg font-heading text-gray-900 font-medium text-center ">
          Fast Delivery
        </h1>
        <p className="text-center text-gray-700">For all orders over $99</p>
      </div>
      <div className="flex flex-col justify-center items-center border p-4 w-full space-y-2 rounded-lg shadow-md">
        <div>
          <RiSecurePaymentFill className="text-4xl text-secondary" />
        </div>
        <h1 className="text-lg font-heading text-gray-800 font-medium text-center">
          Safe Payments
        </h1>
        <p className="text-center text-gray-700">100% secure payment</p>
      </div>
      <div className="flex flex-col justify-center items-center border p-4 w-full space-y-2 rounded-lg shadow-md">
        <div>
          <GrGift className="text-4xl text-secondary" />
        </div>
        <h1 className="text-lg font-heading text-gray-900 font-medium text-center">
          Discount Coupons
        </h1>
        <p className="text-center text-gray-700">Enjoy Huge Promotions</p>
      </div>
      <div className="flex flex-col justify-center items-center border p-4 w-full space-y-2 rounded-lg shadow-md">
        <div>
          <BiSupport className="text-4xl text-secondary" />
        </div>
        <h1 className="text-lg font-heading text-gray-900 font-medium text-center">
          Quality Support
        </h1>
        <p className="text-center text-gray-700">Dedicated 24/7 support</p>
      </div>
    </div>
  );
};

export default Features;
