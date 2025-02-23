import { Bars } from "react-loader-spinner";

const Loader = () => {
  return (
    <div>
      <Bars
        height="50"
        width="50"
        color="#f24080"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
