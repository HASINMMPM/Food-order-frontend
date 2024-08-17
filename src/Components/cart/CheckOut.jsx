import React, { useContext } from "react";
import { ContextList } from "../commen/ContextListProvider";

const CheckOut = () => {
  const { cartItems, amountToPay, subTotal, deliveryFee } =
    useContext(ContextList);
  return (
    <>
      <h1 className="text-2xl md:text-4xl text-primary my-8 font-bold">
        Delivery Information
      </h1>
      <div className="flex flex-col md:flex-row md:justify-between md:gap-16 ">
        <div className="w-1/2 flex flex-col">
          <form action="" className="flex flex-col gap-3 my-8">
            <div className="flex flex-col  md:flex-row md:justify-between items-center">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full md:w-3/4 border-slate-300"
              />
            </div>
            <div className="flex flex-col  md:flex-row md:justify-between items-center">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full md:w-3/4 border-slate-300"
              />
            </div>
            <div className="flex flex-col  md:flex-row md:justify-between items-center">
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="w-full md:w-3/4 border-slate-300"
              />
            </div>
            <div className="flex flex-col  md:flex-row md:justify-between items-center">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                required
                className="w-full md:w-3/4 border-slate-300"
              />
            </div>
            <div className="flex flex-col  md:flex-row md:justify-between items-center">
              <label htmlFor="city">Place:</label>
              <input
                type="text"
                id="place"
                name="place"
                required
                className="w-full md:w-3/4 border-slate-300"
              />
            </div>
            <div className="flex flex-col  md:flex-row md:justify-between items-center">
              <label htmlFor="zip">Zip:</label>
              <input
                type="number"
                id="zip"
                name="zip"
                required
                className="w-full md:w-3/4 border-slate-300"
              />
            </div>
            <div className="flex flex-col  md:flex-row md:justify-between items-center">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                required
                className="w-full md:w-3/4 border-slate-300"
              />
            </div>
            <div className="flex flex-col  md:flex-row md:justify-between items-center">
              <label htmlFor="state">State:</label>
              <input
                type="text"
                id="state"
                name="state"
                required
                className="w-full md:w-3/4 border-slate-300"
              />
            </div>
          </form>
        </div>
        <div className="w-1/2 flex justify-end items-end">
          <div className="w-full md:w-3/4 border-slate-300 flex flex-col gap-1 my-8">
            {/* checkOut */}
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
              <span className="font-bold">{amountToPay}</span>
            </div>

            <button className="bg-primary text-white  w-full py-2 rounded-lg ">
              procees to payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
