import { Button } from "@/components/ui/button";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { clearCart } from "@/redux/features/cart/cartSlice";
import {
  useCreateOrderMutation,
  useCreatePaymentIntentMutation,
} from "@/redux/features/order/orderApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TResponse } from "@/types";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { TbFidgetSpinner } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type CheckoutFormProps = {
  orderInfo?: any;
  formRef?: any;
};

const CheckoutForm: React.FC<CheckoutFormProps> = ({ orderInfo, formRef }) => {
  const email = useAppSelector(selectCurrentUser)?.email;
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [createOrder] = useCreateOrderMutation();
  const [loading, setLoading] = useState(false);

  const [createPaymentIntent] = useCreatePaymentIntentMutation();

  const amount = Number(orderInfo?.totalAmount) * 100;

  const handleSubmit = async (event: FieldValues) => {
    setLoading(true);
    event.preventDefault();

    const { data } = await createPaymentIntent({ amount });

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      setLoading(false);
      return;
    }

    setTimeout(async () => {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        console.log("[error]", error);
        setCardError(error?.message as string);
        setLoading(false);
        return;
      } else {
        console.log("[PaymentMethod]", paymentMethod);
        setCardError("");
      }

      // confirm payment
      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(data?.clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              email: email || "anonymous",
            },
          },
        });

      if (confirmError) {
        setLoading(false);
        console.log(confirmError);
        setCardError(confirmError?.message as string);
        return;
      } else {
        if (paymentIntent.status === "succeeded") {
          const paymentInfo = {
            ...orderInfo,
            transactionId: paymentIntent.id,
          };
          
          dispatch(clearCart());
          const res = (await createOrder(paymentInfo)) as TResponse<any>;
          console.log("=>", res);
          console.log(paymentInfo);

          if (res.error) {
            toast.error(res.error.data.message);
            setLoading(false);
          } else {
            toast.success("Order created successfully");
            navigate("/dashboard/orders");
            setLoading(false);
          }
        }
      }
    }, 1500);
  };

  return (
    <form className="mt-7" onSubmit={handleSubmit}>
      {/* <PaymentElement /> */}
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {cardError && <p className="text-red-500 text-sm my-3">{cardError}</p>}
      <div className="flex mt-5 justify-end">
        <Button
          onClick={() => formRef.current?.submit()}
          className="w-full"
          disabled={
            !stripe ||
            !orderInfo?.shippingAddress?.address ||
            !orderInfo?.shippingAddress?.contactNumber ||
            !orderInfo?.products?.length ||
            loading
          }
        >
          {loading === true ? (
            <TbFidgetSpinner className="animate-spin m-auto " />
          ) : (
            "Confirm Order"
          )}
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;
