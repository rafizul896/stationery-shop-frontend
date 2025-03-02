import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FInput from "@/components/form/FInput";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  useGetAUserQuery,
  useUpdateUserMutation,
} from "@/redux/features/user/userApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TResponse } from "@/types";
import { TbFidgetSpinner } from "react-icons/tb";

interface FormValues {
  shippingAddress?: {
    fullName?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    contactNumber?: number;
  };
}

const ManageProfile = () => {
  const email = useAppSelector(selectCurrentUser)?.email;
  const { data } = useGetAUserQuery({ email });
  const shippingAddress = data?.data?.shippingAddress;
  const [updateUser] = useUpdateUserMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (shippingAddress) {
      reset({ shippingAddress });
    }
  }, [shippingAddress, reset]);

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    const updateData = {
      ...data,
      email,
    };
    try {
      const res = (await updateUser(updateData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message);
        setLoading(false);
      } else {
        toast.success("Profile updated successfully!");
        navigate(`/`);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile!");
    }
    setLoading(false);
  };

  return (
    <div className="md:w-[90%] mx-auto">
      <h2 className="text-2xl text-gray-800 md:text-3xl font-semibold text-center font-heading">
        Shipping Address
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5"
      >
        <FInput
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          register={register("shippingAddress.fullName", {
            required: "Full name is required.",
          })}
          error={errors?.shippingAddress?.fullName?.message as string}
        />

        <FInput
          label="Address"
          type="text"
          placeholder="Enter your address"
          register={register("shippingAddress.address", {
            required: "Address is required.",
          })}
          error={errors?.shippingAddress?.address?.message as string}
        />

        <FInput
          label="City"
          type="text"
          placeholder="Enter your city"
          register={register("shippingAddress.city", {
            required: "City is required.",
          })}
          error={errors?.shippingAddress?.city?.message as string}
        />

        <FInput
          label="Postal Code"
          type="text"
          placeholder="Enter postal code"
          register={register("shippingAddress.postalCode", {
            required: "Postal code is required.",
          })}
          error={errors?.shippingAddress?.postalCode?.message as string}
        />

        <FInput
          label="Country"
          type="text"
          placeholder="Enter your country"
          register={register("shippingAddress.country", {
            required: "Country is required.",
          })}
          error={errors?.shippingAddress?.country?.message as string}
        />

        <FInput
          label="Contact Number"
          type="number"
          placeholder="Enter contact number"
          register={register("shippingAddress.contactNumber", {
            required: "Contact number is required.",
          })}
          error={errors?.shippingAddress?.contactNumber?.message as string}
        />

        <div className="md:col-span-2">
          <Button type="submit">
            {loading === true ? (
              <TbFidgetSpinner className="animate-spin m-auto " />
            ) : (
              "Update Profile"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ManageProfile;
