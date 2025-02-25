import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Button } from "@/components/ui/button";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);

interface CartSummaryModalProps {
  clientSecret: string; // 🔹 Stripe Client Secret
  formRef?: any;
}

const CartSummaryModal: React.FC<CartSummaryModalProps> = ({
  clientSecret,
  formRef,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* 🔹 Button to Open Modal */}
      <DialogTrigger asChild>
        {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          View Cart Summary
        </button> */}
        {/* Order Now Button (External) */}
        <Button
          onClick={() => formRef.current?.submit()}
          className="w-full mt-4"
        >
          Order Now
        </Button>
      </DialogTrigger>

      {/* 🔹 Modal Content */}
      <DialogContent className="w-[280px] md:w-full  max-w-lg">
        <h1 className="text-xl text-center font-bold">Payment Method</h1>

        {/* Stripe Elements */}
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      </DialogContent>
    </Dialog>
  );
};

export default CartSummaryModal;
