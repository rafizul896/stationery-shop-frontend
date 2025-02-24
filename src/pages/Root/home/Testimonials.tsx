import SectionTitle from "@/components/Shared/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useGetAllReviewsQuery } from "@/redux/features/product/productApi";
import "swiper/css";
import "swiper/css/navigation";

const Testimonials = () => {
  const { data } = useGetAllReviewsQuery(undefined);

  const reviews = data?.data;

  return (
    <div className="custom-container">
      <SectionTitle
        heading="Testimonials "
        // subTitle="What Our Customers Say!Real stories from satisfied customers!"
      />

      <Swiper
        navigation={true}
        // loop={ true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Autoplay, Pagination]}
        className="mySwiper"
      >
        {reviews?.map((review: any, index: number) => (
          <SwiperSlide key={index}>
            <div className="px-4 md:px-10 flex flex-col justify-center items-center text-center space-y-3">
              <Rating
                style={{ maxWidth: 180 }}
                value={review.rating}
                readOnly
              />
              <p className="px-5">{review.comment}</p>
              <h1 className="text-2xl text-gray-700">{review?.reviewer}</h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
