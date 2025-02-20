import FInput from "@/components/form/FInput";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { TResponse } from "@/types/global";
import { TUser } from "@/types/user";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { TbFidgetSpinner } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createUser] = useRegisterMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogIn = async (data: FieldValues) => {
    setLoading(true);

    const userData = {
      ...data,
    };

    console.log(userData)

    try {
      const res = (await createUser(userData)) as TResponse<TUser>;

      if (res.error) {
        toast.error(res.error.data.message);
        setLoading(false);
      } else {
        toast.success("Registration  in Successfully");
        navigate(`/login`);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        toast.error(err?.message || "Something went wrong!", {
          delay: 2000,
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-[90vh] custom-container">
      <div className="flex w-full mx-auto overflow-hidden bg-white rounded-lg shadow-lg borde">
        <div
          className="bg-contain bg-center md:block md:w-1/2"
          style={{
            backgroundImage: `url(${"https://i.ibb.co.com/xKZrRq9Z/login-form-img.png"})`,
          }}
        ></div>

        <div className="w-full px-3 py-8 lg:px-8 md:w-1/2">
          <p className="mt-3 text-2xl text-center text-gray-600">
            Register Now
          </p>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b lg:w-1/4"></span>
            <div className="text-xs text-center text-gray-500 uppercase">
              Register with email & Password
            </div>
            <span className="w-1/5 border-b lg:w-1/4"></span>
          </div>

          <form onSubmit={handleSubmit(handleLogIn)} className="space-y-4">
            {/* Name Field */}
            <FInput
              label="Name"
              type="text"
              placeholder="Enter your name"
              register={register("name", { required: "Name is required." })}
              error={errors?.name?.message as string}
            />

            {/* Email Field */}
            <FInput
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              register={register("email", { required: "Email is required." })}
              error={errors?.email?.message as string}
            />

            {/* Password Field */}
            <div className="relative">
              <FInput
                label="Password"
                type={show ? "text" : "password"}
                placeholder="Enter your password"
                register={register("password", {
                  required: "Password is required.",
                })}
                error={errors.password?.message as string}
              />
              {/* for show password */}
              <div
                onClick={() => setShow(!show)}
                className="absolute top-[45px] right-3 cursor-pointer"
              >
                {show ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </div>
            </div>

            {/* Submit button */}
            <div className="mt-5">
              <button
                disabled={loading}
                type="submit"
                className="bg-primary hover:bg-hover w-full rounded-md py-3 font-medium text-white"
              >
                {loading === true ? (
                  <TbFidgetSpinner className="animate-spin m-auto" />
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>

          <div className="flex items-center mt-4 justify-center">
            <span className="text-gray-600 text-sm">
              Already have an account?
            </span>
            <Link
              to="/login"
              className="text-secondary font-semibold ml-2 hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
