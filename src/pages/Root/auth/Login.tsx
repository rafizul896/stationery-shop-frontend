import FInput from "@/components/form/FInput";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { TbFidgetSpinner } from "react-icons/tb"; // Icons from react-icons
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogIn = async (data: FieldValues) => {
    setLoading(true);
    const loginData = {
      ...data,
    };

    try {
      const res = await login(loginData).unwrap();
      const user = verifyToken(res.data.accessToken);
      dispatch(setUser({ user, token: res.data.accessToken }));

      if (res.error) {
        toast.error(res.error.data.message);
        setLoading(false);
      } else {
        toast.success("Login in Successfully");
        navigate(`/`);
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
    <div className="flex justify-center items-center h-[86vh] custom-container">
      <div className="flex w-full border md:border-none mx-auto overflow-hidden bg-white rounded-lg shadow-lg borde">
        <div
          className="bg-contain bg-center md:block md:w-1/2"
          style={{
            backgroundImage: `url(${"https://i.ibb.co.com/xKZrRq9Z/login-form-img.png"})`,
          }}
        ></div>

        <div className="w-full px-3 py-8 lg:px-8 md:w-1/2">
          <p className="mt-3 text-2xl text-center text-gray-600">
            Welcome back!
          </p>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b lg:w-1/4"></span>
            <div className="text-xs text-center text-gray-500 uppercase">
              login with email
            </div>
            <span className="w-1/5 border-b lg:w-1/4"></span>
          </div>

          <form onSubmit={handleSubmit(handleLogIn)} className="space-y-4">
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
                  <TbFidgetSpinner className="animate-spin m-auto " />
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>

          <div className="flex items-center mt-4 justify-center">
            <span className="text-gray-600 text-sm">
              Don&apos;t have an account?
            </span>
            <Link
              to="/register"
              className="text-secondary font-semibold ml-2 hover:underline"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
