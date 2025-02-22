import FInput from "@/components/form/FInput";
import SectionTitle from "@/components/Shared/SectionTitle";
import CustomButton from "@/components/ui/CustomButton";
import { useForm } from "react-hook-form";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const submit = () => {};

  return (
    <div className="">
      <div className="custom-container">
        <SectionTitle
          heading="Contact Us"
          subTitle="Have any questions? We'd love to hear from you!"
        />

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-center">
          <div className="flex flex-col justify-center items-center border py-7 w-full space-y-2 rounded-lg shadow-md">
            <div>
              <FaLocationDot className="text-4xl text-secondary" />
            </div>
            <h1 className="text-lg font-heading text-gray-900 font-semibold text-center ">
              Location
            </h1>
            <p className="text-center text-gray-700">123 Stationery St, City</p>
          </div>

          <div className="flex flex-col justify-center items-center border py-7 w-full space-y-2 rounded-lg shadow-md">
            <div>
              <MdEmail className="text-4xl text-secondary" />
            </div>
            <h1 className="text-lg font-heading text-gray-900 font-semibold text-center ">
              Email
            </h1>
            <p className="text-center text-gray-700">contact@yourshop.com</p>
          </div>

          <div className="flex flex-col justify-center items-center border py-7 w-full space-y-2 rounded-lg shadow-md">
            <div>
              <FaPhoneAlt className="text-4xl text-secondary" />
            </div>
            <h1 className="text-lg font-heading text-gray-900 font-semibold text-center ">
              Phone
            </h1>
            <p className="text-center text-gray-700">+123 456 7890</p>
          </div>
        </div>

        {/*  */}
        <div className="mt-10 flex flex-col md:flex-row justify-center items-center gap-5">
          <div className="md:w-1/2 hidden md:block">
            <img className="max-w-[90%] mx-auto" src="https://i.ibb.co.com/DgkTQ0x3/5118759.jpg" alt="" />
          </div>
          {/* Contact Form */}
          <div className="w-full md:w-1/2">
            <h1 className="text-xl font-heading text-gray-900 font-semibold text-center">
              Send Us a Message
            </h1>
            {/* <SectionTitle heading="Send Us a Message" /> */}
            <div>
              <form onSubmit={handleSubmit(submit)} className="space-y-3 mt-4">
                {/* Name Field */}
                <FInput
                  label="Name"
                  type="text"
                  placeholder="Your Name"
                  register={register("name", {
                    required: "Name is required.",
                  })}
                  error={errors?.name?.message as string}
                />
                {/* Email Field */}
                <FInput
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  register={register("email", {
                    required: "Email is required.",
                  })}
                  error={errors?.email?.message as string}
                />
                <div className="text-gray-700 font-medium">
                  Message
                  <textarea
                    {...register}
                    name="message"
                    required
                    rows={4}
                    className="w-full mt-1 p-2 border rounded-md focus:outline-none "
                    placeholder="Your Message"
                  ></textarea>
                </div>
                <CustomButton
                  text="Send Message"
                  type="submit"
                  className="w-full"
                />
              </form>
            </div>
          </div>
        </div>

        {/* Google Maps Embed (Optional) */}
        <div className="mt-10">
          {/* <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Find Us on the Map
          </h2> */}
          <div className="mt-4">
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345098374!2d144.9537363159045!3d-37.81627974202167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf4c3c9b0986782a5!2sMelbourne%2C+Australia!5e0!3m2!1sen!2sus!4v1496741390105"
              className="w-full h-64 rounded-lg shadow"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
