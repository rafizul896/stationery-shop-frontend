import {
  removeFromCart,
  updateQuantity,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { AiOutlineDelete } from "react-icons/ai";
import ShippingAddressForm, {
  TShippingAddressFormValues,
} from "./ShippingAddressForm ";
import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetAUserQuery } from "@/redux/features/user/userApi";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);

const Checkout = () => {
  const email = useAppSelector(selectCurrentUser)?.email;
  const { data } = useGetAUserQuery({ email });
  const shippingAddress = data?.data?.shippingAddress;
  const [shippingCost, setShippingCost] = useState(5);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [shippingAddressdata, setShippingAddressdata] =
    useState<TShippingAddressFormValues>();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const dispatch = useAppDispatch();

  const subTotal = cartItems.reduce(
    (total, item) => total + item?.price * (item?.cartQuantity as number),
    0
  );

  const cartProducts = cartItems.map((product) => ({
    product: product._id,
    quantity: product.cartQuantity,
    price: product.price,
  }));

  const totalConst = subTotal + shippingCost;

  const formRef = useRef<{ submit: () => void } | null>(null);

  const handleFormSubmit = (data: TShippingAddressFormValues) => {
    setShippingAddressdata(data);
  };

  const handleCashOnDelivery = () => {
    console.log(shippingAddressdata);
  };


  const orderInfo = {
    user: data?.data?._id,
    products: cartProducts,
    totalAmount: totalConst,
    shippingAddress: shippingAddressdata,
    status: "Pending",
    paymentMethod,
    deliveryType: shippingCost === 5 ? "Today" : "Three Days",
    paymentStatus: paymentMethod === "Card" ? "Paid" : "Pending",
  };

  return (
    <div className="custom-container mt-10 grid grid-cols-1 md:grid-cols-4 md:gap-5">
      <div className="md:col-span-2 md:border md:p-5 rounded-md">
        {/* Shipping Form */}

        <ShippingAddressForm
          ref={formRef}
          onSubmit={handleFormSubmit}
          shippingAddress={shippingAddress}
        />

        <div>
          {/* Shipping Cost */}
          <Card className="space-y-4 mt-5 shadow-none border-none">
            <h2 className="text-xl font-bold mt-5">02. Shipping Cost</h2>
            <RadioGroup
              defaultValue="5"
              onValueChange={(value) => setShippingCost(Number(value))}
            >
              <div className="flex flex-col lg:flex-row gap-4 ml-3 lg:ml-0">
                <button onClick={() => formRef.current?.submit()}>
                  <RadioGroupItem id="5" value="5" />{" "}
                  <label className="cursor-pointer" htmlFor="5">
                    Today Delivery ($10)
                  </label>
                </button>
                <button onClick={() => formRef.current?.submit()}>
                  <RadioGroupItem id="3" value="3" />{" "}
                  <label className="cursor-pointer" htmlFor="10">
                    3 Days Delivery ($3)
                  </label>
                </button>
              </div>
            </RadioGroup>
          </Card>
        </div>

        {/* Payment Method */}
        <Card className="space-y-4 mt-5 shadow-none border-none">
          <h2 className="text-xl font-bold mt-5">03. Payment Method</h2>
          <RadioGroup
            defaultValue="Cash on Delivery"
            onValueChange={(value) => setPaymentMethod(value)}
          >
            <div className="flex flex-col lg:flex-row gap-4 ml-3 lg:ml-0">
              <button onClick={() => formRef.current?.submit()}>
                <RadioGroupItem id="Cash on Delivery" value="Cash on Delivery" />{" "}
                <label className="cursor-pointer" htmlFor="Cash on Delivery">
                  Cash On Delivery
                </label>
              </button>
              <button onClick={() => formRef.current?.submit()}>
                <RadioGroupItem id="Card" value="Card" />{" "}
                <label className="cursor-pointer" htmlFor="Card">
                  Credit Card
                </label>
              </button>
            </div>
          </RadioGroup>
        </Card>

        {paymentMethod === "Cash on Delivery" ? (
          <Button
            onClick={() => {
              formRef.current?.submit();
              handleCashOnDelivery();
            }}
            className="w-full mt-4"
          >
            Confirm Order{" "}
          </Button>
        ) : (
          <Elements stripe={stripePromise}>
            <CheckoutForm formRef={formRef} orderInfo={orderInfo} />
          </Elements>
        )}
      </div>

      <div className="md:col-span-2 md:border  md:p-5 rounded-md  mt-5 md:mt-0">
        <h1 className="text-xl font-bold mb-4">Cart Summary</h1>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty!</p>
        ) : (
          <div className="md:space-y-3">
            {cartItems.map((item) => (
              <div
                key={item?._id}
                className="flex justify-between items-center py-3 md:pb-3 lg:p-4 rounded-lg border-b lg:border lg:shadow"
              >
                <div className="flex justify-between items-center">
                  <img
                    src={item?.imageUrl as string}
                    alt={item?.name}
                    className="w-10 h-10 rounded-full object-cover mr-2 md:mr-4"
                  />
                  <div>
                    <h2 className="font-semibold text-sm font-heading line-clamp-1 ">
                      {item?.name.length > 50 ? (
                        <span>{item?.name.slice(0, 20)}...</span>
                      ) : (
                        item?.name
                      )}
                    </h2>
                    <p className="text-gray-600 text-xs">
                      Per item : ${item?.price}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center">
                  <button
                    className="text-black border px-2 py-1 rounded"
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          _id: item?._id,
                          cartQuantity: (item?.cartQuantity as number) - 1,
                        })
                      )
                    }
                    disabled={(item?.cartQuantity as number) <= 1}
                  >
                    -
                  </button>
                  <span className="mx-2">{item?.cartQuantity}</span>
                  <button
                    className="text-black border px-2 py-1 rounded"
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          _id: item?._id,
                          cartQuantity: (item?.cartQuantity as number) + 1,
                        })
                      )
                    }
                    disabled={(item?.cartQuantity as number) >= item?.quantity}
                  >
                    +
                  </button>
                </div>

                <button onClick={() => dispatch(removeFromCart(item?._id))}>
                  <AiOutlineDelete className="text-xl md:text-2xl text-red-500" />
                </button>
              </div>
            ))}
            <div>
              <div className="mt-4 flex justify-between">
                <p>SubTotal</p>
                <p>${subTotal.toFixed(2)}</p>
              </div>
              <div className="mt-4 flex justify-between">
                <p>Shipping Cost</p>
                <p>${shippingCost}</p>
              </div>
              <div className="mt-4 pt-2 flex justify-between border-t-2 ">
                <p className="font-semibold font-heading">TOTAL COST</p>
                <p>${totalConst}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
