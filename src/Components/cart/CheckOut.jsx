import React, { useContext, useState } from "react";
import { ContextList } from "../commen/ContextListProvider";
import axios from "axios";
import logo from "/Logo.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const CheckOut = () => {
  const navigate = useNavigate();
  // const [orderId, setOrderId] = useState("");
  const {
    amountToPay,
    subTotal,
    deliveryFee,
    food,
    cartItems,
    URL,
    discountAmount,
    token,
    id,
  } = useContext(ContextList);

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    zip: "",
  });

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const prepareOrderData = () => {
    let orderItems = [];
    food.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    return {
      ...data,
      orderItems: orderItems,
      totalAmount: amountToPay,
      orderDate: new Date(),
    };
  };

  async function displayRazorpay() {
    const orderData = prepareOrderData();

    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      // Create order on backend
      const response = await axios.post(`${URL}/order/${id}`, orderData, {
        headers: { token },
      });

      console.log("Backend Order Response:", response.data);

      const { order, id: savedOrderId } = response.data;

      // setOrderId(savedOrderId);

      const options = {
        key: "rzp_test_369cd540gg4dcj",
        amount: amountToPay * 100, // Amount in paise
        currency: "INR",
        name: "Hungry Food",
        description: "Test Transaction",
        image: logo,
        order_id: order.id, // Razorpay order ID
        handler: async function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;

          try {
            const verifyResponse = await axios.post(`${URL}/verify/${id}`, {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
              order_id: savedOrderId, // Using the saved order ID
            });
            console.log("Payment Verification Response:", verifyResponse.data);

            // Prompt user to confirm the order after payment success
            Swal.fire({
              title: "Confirm Order",
              text: "Your payment was successful! Confirm to save your order.",
              icon: "question",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, confirm order",
            }).then(async (result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  title: "Order Confirmed",
                  text: "Your order has been saved successfully!",
                  icon: "success",
                });

                navigate("/order");
                location.reload();
              } else {
                // Handle cancel: Delete the order
                try {
                  await axios.delete(`${URL}/order/cancel/${savedOrderId}`, {
                    headers: { token },
                  });

                  Swal.fire({
                    title: "Order Cancelled",
                    text: "Your order has been cancelled successfully.",
                    icon: "info",
                  });

                  navigate("/");
                  location.reload();
                } catch (error) {
                  console.error("Error cancelling the order:", error);
                  alert("Failed to cancel the order.");
                }
              }
            });
          } catch (error) {
            console.error("Error verifying payment:", error);
            alert("Payment failed during verification.");
          }
        },

        prefill: {
          name: data.name,
          email: data.email,
          contact: data.phone,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#399918",
        },
      };

      const rzp1 = new Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        console.log("Payment Failed:", response.error);
      });
      rzp1.open();
    } catch (error) {
      console.error("Error during order creation or payment:", error);
      console.log(error.response.data);
    }
  }

  return (
    <>
      <h1 className="text-2xl md:text-4xl text-primary my-8 font-bold">
        Delivery Information
      </h1>
      <div className="flex flex-col md:flex-row md:justify-between ">
        <div className="w-full md:w-1/2 flex flex-col">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-3 my-8"
          >
            <div className="flex flex-col md:flex-row md:justify-between items-center">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                onChange={onChangeHandler}
                name="name"
                required
                className="w-full md:w-3/4 border-slate-300"
              />
            </div>
            <div className="flex flex-col md:flex-row md:justify-between items-center">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                onChange={onChangeHandler}
                name="email"
                required
                className="w-full md:w-3/4 border-slate-300"
              />
            </div>
            <div className="flex flex-col md:flex-row md:justify-between items-center">
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                onChange={onChangeHandler}
                name="phone"
                required
                className="w-full md:w-3/4 border-slate-300"
              />
            </div>
            <div className="flex flex-col md:flex-row md:justify-between items-center">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                onChange={onChangeHandler}
                name="address"
                required
                className="w-full md:w-3/4 border-slate-300"
              />
            </div>
            <div className="flex flex-col md:flex-row md:justify-between items-center">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                onChange={onChangeHandler}
                name="city"
                required
                className="w-full md:w-3/4 border-slate-300"
              />
            </div>
            <div className="flex flex-col md:flex-row md:justify-between items-center">
              <label htmlFor="district">District:</label>
              <input
                type="text"
                id="district"
                onChange={onChangeHandler}
                name="district"
                required
                className="w-full md:w-3/4 border-slate-300"
              />
            </div>
            <div className="flex flex-col md:flex-row md:justify-between items-center">
              <label htmlFor="zip">Zip:</label>
              <input
                type="number"
                id="zip"
                onChange={onChangeHandler}
                name="zip"
                required
                className="w-full md:w-3/4 border-slate-300"
              />
            </div>
            <button
              type="button"
              onClick={displayRazorpay}
              className="bg-primary text-white w-full py-2 rounded-lg"
            >
              Proceed to Payment
            </button>
          </form>
        </div>
        <div className="w-full flex justify-end items-end lg:w-1/2">
          <div className="w-full md:w-3/4 border-slate-300 flex flex-col gap-1 my-8">
            {/* Checkout Summary */}
            <div className="flex justify-between text-lg md:text-xl">
            <h3>Sub Total</h3>
            <span className="font-bold">{subTotal}</span>
          </div>
          <hr className="text-black" />
          <div className="flex justify-between text-lg md:text-xl">
            <h3>Delivery Fee</h3>
            <span className="font-bold">{deliveryFee}</span>
          </div>
          <hr className="text-black" />
          <div className="flex justify-between text-lg md:text-xl">
            <h3>Amount to Pay</h3>
          <div className="flex flex-row gap-6">
          {discountAmount ? 
            <span className=" text-primary">you saved <span className="font-bold">{discountAmount}</span></span>:<></>
          }
            <span className="font-bold">{amountToPay}</span>
          </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
