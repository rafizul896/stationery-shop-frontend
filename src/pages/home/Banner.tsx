import { MdArrowRightAlt } from "react-icons/md";

const Banner = () => {
  return (
    <div
      className="w-full bg-center bg-cover h-[28rem] rounded-l"
      style={{
        backgroundImage: `url(${"https://i.ibb.co.com/Nw0hwWw/b-1.jpg"})`,
      }}
    >
      <div className="flex items-center justify-center w-full h-full bg-primary/40 rounded-l">
        <div className="text-center space-y-3">
          <h1 className="text-2xl md:text-4xl font-bold md:font-bold text-white lg:text-4xl">
            Open Up To A New Experience.
          </h1>
          <p className="text-white w-[89%] mx-auto text-sm">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using &#8216;Content here,
            content here&#8217;, making it look like readable English
          </p>
          <br />
          <button className="px-4 py-2 brder text-white  bg-secondary rounded-sm">
            <div className="flex justify-center items-center gap-1">
              <a href={"/products"} className="font-medium">
                SHOP NOW
              </a>
              <MdArrowRightAlt className="text-white text-2xl " />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
