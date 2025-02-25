import {
  removeFromCart,
  updateQuantity,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { AiOutlineDelete } from "react-icons/ai";
import ShippingAddressForm, {
  TShippingAddressFormValues,
} from "./ShippingAddressForm ";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CartSummaryModal from "./CartSummaryModal";
import { Button } from "@/components/ui/button";

const Checkout = () => {
  const [shippingCost, setShippingCost] = useState(20);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [shippingAddressdata, setShippingAddressdata] =
    useState<TShippingAddressFormValues>();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const dispatch = useAppDispatch();

  console.log(shippingCost);

  const [clientSecret, setClientSecret] = useState(
    "pi_3QwMWNAjUyxa0ThH02aWpZPO_secret_QY3ey3kvFd8XQfTQAEnR8QKwr"
  );

  useEffect(() => {
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 5000 }), // Amount in cents
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data?.clientSecret));
  }, []);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item?.price * (item?.cartQuantity as number),
    0
  );

  const formRef = useRef<{ submit: () => void } | null>(null);

  const handleFormSubmit = (data: TShippingAddressFormValues) => {
    setShippingAddressdata(data);
  };

  const handleCashOnDelivery = () => {
    console.log(shippingAddressdata);
  };

  return (
    <div className="custom-container mt-10 grid grid-cols-1 md:grid-cols-4 md:gap-5">
      <div className="md:col-span-2 border p-5">
        {/* Shipping Form */}

        <ShippingAddressForm ref={formRef} onSubmit={handleFormSubmit} />

        <div>
          {/* Shipping Cost */}
          <Card className="space-y-4 mt-5 shadow-none border-none">
            <h2 className="text-xl font-bold mt-5">02. Shipping Cost</h2>
            <RadioGroup
              defaultValue="20"
              onValueChange={(value) => setShippingCost(Number(value))}
            >
              <div className="flex flex-col lg:flex-row gap-4 ml-3 lg:ml-0">
                <div>
                  <RadioGroupItem id="20" value="20" />{" "}
                  <label className="cursor-pointer" htmlFor="20">
                    Today Delivery ($20)
                  </label>
                </div>
                <div>
                  <RadioGroupItem id="10" value="10" />{" "}
                  <label className="cursor-pointer" htmlFor="10">
                    3 Days Delivery ($10)
                  </label>
                </div>
              </div>
            </RadioGroup>
          </Card>
        </div>

        {/* Payment Method */}
        <Card className="space-y-4 mt-5 shadow-none border-none">
          <h2 className="text-xl font-bold mt-5">03. Payment Method</h2>
          <RadioGroup
            defaultValue="Cash"
            onValueChange={(value) => setPaymentMethod(value)}
          >
            <div className="flex flex-col lg:flex-row gap-4 ml-3 lg:ml-0">
              <div>
                <RadioGroupItem id="Cash" value="Cash" />{" "}
                <label className="cursor-pointer" htmlFor="Cash">
                  Cash On Delivery
                </label>
              </div>
              <div>
                <RadioGroupItem id="Card" value="Card" />{" "}
                <label className="cursor-pointer" htmlFor="Card">
                  Credit Card
                </label>
              </div>
            </div>
          </RadioGroup>
        </Card>

        {paymentMethod === "Cash" ? (
          <Button
            onClick={() => {
              formRef.current?.submit();
              handleCashOnDelivery();
            }}
            className="w-full mt-4"
          >
            Order Now
          </Button>
        ) : (
          <CartSummaryModal formRef={formRef} clientSecret={clientSecret} />
        )}
      </div>
      <div className="md:col-span-2 border p-2 md:p-5 rounded-md  mt-5 md:mt-0">
        <h1 className="text-xl font-bold mb-4">Cart Summary</h1>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty!</p>
        ) : (
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div
                key={item?._id}
                className="flex justify-between items-center md:p-4 rounded-lg md:border md:shadow"
              >
                <div className="flex justify-between items-center">
                  <img
                    src={item?.imageUrl as string}
                    alt={item?.name}
                    className="w-10 h-10 md:w-16 md:h-16 object-cover rounded-lg mr-2 md:mr-4"
                  />
                  <div>
                    <h2 className="font-semibold font-heading line-clamp-1 ">
                      {item?.name.length > 50 ? (
                        <span>{item?.name.slice(0, 20)}...</span>
                      ) : (
                        item?.name
                      )}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Price per item : ${item?.price}
                    </p>
                  </div>
                  {/* <p className="text-gray-600">Stock: {item?.quantity}</p> */}
                </div>

                <div className="flex flex-col md:flex-row items-center">
                  <button
                    className="text-black border-2 px-2 py-1 rounded"
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
                  <span className="mx-3">{item?.cartQuantity}</span>
                  <button
                    className="text-black border-2 px-2 py-1 rounded"
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
            <h2 className="text-end font-semibold mt-4">
              Total Price : ${totalPrice.toFixed(2)}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
