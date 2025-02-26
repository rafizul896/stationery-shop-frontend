import FInput from "@/components/form/FInput";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";

export type TShippingAddressFormValues = {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  contactNumber: number;
};

interface ShippingAddressFormProps {
  onSubmit: (data: TShippingAddressFormValues) => void;
  shippingAddress?: TShippingAddressFormValues;
}

// 🎯 Forward Ref to expose `submit` method
const ShippingAddressForm = forwardRef(
  ({ onSubmit, shippingAddress }: ShippingAddressFormProps, ref) => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<TShippingAddressFormValues>({
      defaultValues: shippingAddress,
    });

    useEffect(() => {
      if (shippingAddress) {
        reset(shippingAddress);
      }
    }, [shippingAddress, reset]);

    useImperativeHandle(ref, () => ({
      submit: () => handleSubmit(onSubmit)(),
    }));

    return (
      <form>
        <h2 className="text-xl font-bold mb-5">01. Shipping Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Full Name */}
          <FInput
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            register={register("fullName", {
              required: "Full Name is required.",
            })}
            error={errors?.fullName?.message as string}
          />

          {/* Address */}
          <FInput
            label="Address"
            type="text"
            placeholder="Enter your address"
            register={register("address", { required: "Address is required." })}
            error={errors?.address?.message as string}
          />

          {/* City */}
          <FInput
            label="City"
            type="text"
            placeholder="Enter your city"
            register={register("city", { required: "City is required." })}
            error={errors?.city?.message as string}
          />

          {/* Postal Code */}
          <FInput
            label="Postal Code"
            type="text"
            placeholder="Enter your postal code"
            register={register("postalCode", {
              required: "Postal Code is required.",
            })}
            error={errors?.postalCode?.message as string}
          />

          {/* Country */}
          <FInput
            label="Country"
            type="text"
            placeholder="Enter your country"
            register={register("country", { required: "Country is required." })}
            error={errors?.country?.message as string}
          />

          {/* Contact Number */}
          <FInput
            label="Contact Number"
            type="number"
            placeholder="Enter your contact number"
            register={register("contactNumber", {
              required: "Contact number is required.",
            })}
            error={errors?.contactNumber?.message as string}
          />
        </div>
      </form>
    );
  }
);

ShippingAddressForm.displayName = "ShippingAddressForm";

export default ShippingAddressForm;
