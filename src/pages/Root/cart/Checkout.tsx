import {
  clearCart,
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
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import { toast } from "react-toastify";
import { TResponse } from "@/types";
import { TbFidgetSpinner } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { TProduct } from "@/types/product";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

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
  const [createOrder] = useCreateOrderMutation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);

  const subTotal = cartItems.reduce(
    (total, item) => total + item?.price * (item?.cartQuantity as number),
    0
  );

  const cartProducts = cartItems.map((product: TProduct) => ({
    product: product._id,
    quantity: product.cartQuantity,
    price: product.price,
  }));

  const totalCost = subTotal + shippingCost;

  const formRef = useRef<{ submit: () => void } | null>(null);

  const handleFormSubmit = (data: TShippingAddressFormValues) => {
    setShippingAddressdata(data);
  };

  const orderInfo = {
    user: data?.data?._id,
    products: cartProducts,
    totalAmount: totalCost,
    shippingAddress: shippingAddressdata,
    status: "Pending",
    paymentMethod,
    deliveryType: shippingCost === 5 ? "Today" : "Three Days",
    paymentStatus: paymentMethod === "Card" ? "Paid" : "Pending",
  };

  const handleCashOnDelivery = async () => {
    const res = (await createOrder(orderInfo)) as TResponse<any>;
    console.log(res);
    if (res.error) {
      toast.error(res.error.data.message);
      setLoading(false);
    } else {
      dispatch(clearCart());

      toast.success("Order created successfully");
      navigate("/dashboard/orders");
      setLoading(false);
    }
  };

  return (
    <div className="custom-container mt-10 flex flex-col-reverse md:flex-row gap-10 md:gap-5">
      <div className="flex-1 md:border md:p-5 rounded-md">
        {/* Shipping Form */}
        <ShippingAddressForm
          ref={formRef}
          onSubmit={handleFormSubmit}
          shippingAddress={shippingAddress}
          setIsValid={setIsValid}
        />

        <div>
          {/* Shipping Cost */}
          <Card className="space-y-4 mt-5 shadow-none border-none">
            <h2 className="text-lg font-bold mt-5">02. Shipping Cost</h2>
            <RadioGroup
              defaultValue="5"
              onValueChange={(value) => setShippingCost(Number(value))}
            >
              <div className="flex flex-col lg:flex-row gap-4 ml-3 lg:ml-0">
                <div>
                  <RadioGroupItem id="5" value="5" />{" "}
                  <label className="cursor-pointer text-sm" htmlFor="5">
                    Today Delivery ($5)
                  </label>
                </div>
                <div>
                  <RadioGroupItem id="3" value="3" />{" "}
                  <label className="cursor-pointer text-sm" htmlFor="3">
                    3 Days Delivery ($3)
                  </label>
                </div>
              </div>
            </RadioGroup>
          </Card>
        </div>

        {/* Payment Method */}
        <Card className="space-y-4 mt-5 shadow-none border-none">
          <h2 className="text-lg font-bold mt-5">03. Payment Method</h2>
          <RadioGroup
            defaultValue="Cash on Delivery"
            onValueChange={(value) => setPaymentMethod(value)}
          >
            <div className="flex gap-4 ml-3 lg:ml-0">
              <button onClick={() => formRef.current?.submit()}>
                <RadioGroupItem
                  id="Cash on Delivery"
                  value="Cash on Delivery"
                />{" "}
                <label
                  className="cursor-pointer text-sm"
                  htmlFor="Cash on Delivery"
                >
                  Cash On Delivery
                </label>
              </button>
              <button onClick={() => formRef.current?.submit()}>
                <RadioGroupItem id="Card" value="Card" />{" "}
                <label className="cursor-pointer text-sm" htmlFor="Card">
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
            disabled={!isValid || !(cartProducts.length > 0)}
          >
            {loading === true ? (
              <TbFidgetSpinner className="animate-spin m-auto " />
            ) : (
              "Confirm Order"
            )}
          </Button>
        ) : (
          <Elements stripe={stripePromise}>
            <CheckoutForm
              isValid={isValid}
              formRef={formRef}
              orderInfo={orderInfo}
            />
          </Elements>
        )}
      </div>

      <div className="flex-1 md:border  md:p-5 rounded-md">
        <h1 className="text-xl font-bold mb-4">Cart Summary</h1>
        {cartItems.length === 0 ? (
          <div className="flex flex-col justify-center items-center gap-3">
            <MdOutlineProductionQuantityLimits className="text-5xl" />
            <p className="text-gray-600">Your cart is empty!</p>
          </div>
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
                <p className="text-sm">SubTotal</p>
                <p>${subTotal.toFixed(2)}</p>
              </div>
              <div className="mt-4 flex justify-between">
                <p className="text-sm">Shipping Cost</p>
                <p>${shippingCost.toFixed(2)}</p>
              </div>
              <div className="mt-4 pt-2 flex justify-between border-t-2 ">
                <p className="font-semibold text-sm font-heading">TOTAL COST</p>
                <p>${totalCost.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
