import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";

const Root = () => {
  return (
    <div>
      <div className="bg-primary">
        <Navbar />
      </div>

      <div className="min-h-[calc(100vh-324px)] mt-[100px]">
        <Outlet />
      </div>
      <div className="bg-[url('https://i.ibb.co/BPqXNY7/7.pn')] bg-[#41246d] text-white bg-cover bg-no-repeat">
        <Footer />
      </div>
    </div>
  );
};

export default Root;
