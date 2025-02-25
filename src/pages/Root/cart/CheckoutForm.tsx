import { Button } from "@/components/ui/button";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { FieldValues } from "react-hook-form";

type CheckoutFormProps = {
  orderInfo?: any;
};

const CheckoutForm: React.FC<CheckoutFormProps> = ({ orderInfo }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(
    "pi_3QwQpYAjUyxa0ThH1dFRp8nR_secret_iX3xamlq10M0Z8xDDbZQxZMnz"
  );
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);

  console.log(orderInfo);

  const handleSubmit = async (event: FieldValues) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error?.message as string);
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError("");
    }

    // const result = await stripe.confirmPayment({
    //   //`Elements` instance that was used to create the Payment Element
    //   elements,
    //   confirmParams: {
    //     return_url: "https://example.com/order/123/complete",
    //   },
    // });

    // confirm payment
    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: "anonymous@gmail.com",
            name: "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
      setCardError(confirmError?.message as string);
      setProcessing(false);
      return;
    } else {
      if (paymentIntent.status === "succeeded") {
        const paymentInfo = {
          transactionId: paymentIntent.id,
        };
        setProcessing(false);
        console.log(paymentInfo);
      }
    }
  };

  return (
    <form className="mt-5" onSubmit={handleSubmit}>
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
      <div className="flex mt-5 justify-end">
        <Button className="w-[150px]" disabled={!stripe}>
          Pay
        </Button>
      </div>
      {cardError && <p className="text-red-500 text-sm">{cardError}</p>}
    </form>
  );
};

export default CheckoutForm;
