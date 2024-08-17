import React, { useContext } from "react";
import { ContextList } from "../commen/ContextListProvider";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const Cart = () => {
  const { removeFromCart, cartItems, addToCart, food, deleteFromCart, amountToPay,subTotal,deliveryFee, } =
    useContext(ContextList);


  return (
    <div className=" ">
      <h2 className="text-primary text-2xl md:text-4xl text-center py-8 font-heading">
        Your Cart Page
      </h2>
      <table className="table text-lg md:text-2xl py-16">
        <thead>
          <tr className="text-md md:text-xl">
            <th>Image</th>
            <th>Name</th>
            <th>Item Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {food.map((item, i) => {
            if (cartItems[item._id]) {
              const Quantity = cartItems[item._id];
              const itemtotal = item.price * cartItems[item._id];

              return (
                <tr key={i}>
                  <td>
                    <div className="flex justify-between text-lg md:text-xl items-center gap-3">
                      <div className="avatar">
                        <div className="mask  h-12 w-12 lg:h-28 lg:w-28">
                          <img src={item.image} alt={item.title} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>
                    <div className="flex gap-2">
                      <button onClick={() => removeFromCart(item._id)}>
                        -
                      </button>
                      {Quantity}
                      <button onClick={() => addToCart(item._id)}>+</button>
                    </div>
                  </td>
                  <td className="text-primary font-bold">{itemtotal}</td>
                  <td>
                    <MdDelete
                      onClick={() => deleteFromCart(item._id)}
                      className="text-red-700 cursor-pointer"
                    />
                  </td>
                  <hr />
                </tr>
              );
            } else {
              return null;
            }
          })}
        </tbody>
      </table>
      <hr className="h-[0.250rem] w-full  bg-primary my-6 border-0" />
      <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-12">
        <div className="w-full md:w-1/2 flex flex-col gap-1 p-4">
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
          <Link to='/checkout'>
          <button className="bg-primary text-white  w-full py-2 rounded-lg ">
            Ckeck Out
          </button>
          </Link>
        </div>
        <div className="w-full md:w-1/2 ">
          {/* coupen */}
          <p className="text-lg md:text-xl">If you have any redeem code enter here</p>
          <div className="flex flex-row gap-3 mt-3">
            <input type="text" placeholder="Enter your Redeem code" className="outline-none w-3/4 "/>
            <button className="px-2 bg-primary  text-white hover:bg-black duration-300 rounded-md">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
