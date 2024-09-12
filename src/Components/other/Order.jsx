import React, { useEffect, useState } from "react";
import { ContextList } from "../commen/ContextListProvider";
import { useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Order = () => {
  const { id, URL, token } = useContext(ContextList);
  const [order, setOrder] = useState([]);

  const cancelFunc = async (orderId) => {
    try {
      await axios.delete(`${URL}/order/cancel/${orderId}`, {
        headers: { token },
      });

      Swal.fire({
        title: "Order Cancelled",
        text: "Your order has been cancelled successfully.",
        icon: "info",
      });

      // Refresh the orders without reloading the page
      setOrder(order.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("Error cancelling the order:", error);
      alert("Failed to cancel the order.");
    }
  };

  const fetchOrder = async () => {
    try {
      const orderResponse = await axios.get(`${URL}/get/order`, {
        headers: { token },
      });
      const orders = orderResponse.data;
      const orderById = orders.filter(
        (orderMyself) => orderMyself.userId === id
      );

      setOrder(orderById);
      console.log(order);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id, URL, token]);

  return (
    <main>
      <h1 className="text-primary text-2xl md:text-4xl text-center py-8 font-heading">
        Order History
      </h1>

      {order.length > 0 ? (
        <>
          {/* Desktop view */}
          <table className="table text-lg py-16 hidden md:block ">
            <thead>
              <tr className="text-md  lg:text-xl">
                <th>Image</th>
                <th>Items</th>
                <th>Items Count</th>
                <th>Total Price</th>
                <th>Order Status</th>
                <th>Order Cancel</th>
              </tr>
            </thead>
            <tbody className="my-4">
              {order.map((order) => (
                <tr key={order._id} className={`${
                  order.status === "delivered"
                    ? "bg-secondary"
                    : ""
                } border-2 border-black`}>
                  <td className="w-[20%]">
                    <img
                      className=" w-full  aspect-square  object-cover"
                      src={order.items[0].image}
                      alt={order.items[0].title}
                    />
                  </td>
                  <td className="">
                    <div className="">
                      {order.items.length > 0 ? (
                        order.items.map((item, index) => (
                          <div key={index} className="">
                            <span className="">
                              {item.title} (
                              <span className="font-bold">{item.quantity}</span>
                              )
                            </span>
                          </div>
                        ))
                      ) : (
                        <p>No items found in this order.</p>
                      )}
                    </div>
                  </td>
                  <td className="">{order.items.length}</td>
                  <td>₹{order.amount}</td>
                  <td
                    className={`${
                      order.status === "pending"
                        ? "text-red-600"
                        : "text-primary"
                    } font-sm font-semibold  duration-300`}
                  >
                    <i>{order.status}</i>
                  </td>
                  <td>
                    <button
                      onClick={() => cancelFunc(order._id)}
                      className={`${
                        order.status !== "pending"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-700 hover:bg-danger"
                      } font-sm text-white p-2 duration-300`}
                      disabled={order.status !== "pending"} // Disable button if status is not "pending"
                    >
                      Cancel Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile view */}
          <div className="block md:hidden">
            {order.map((order) => (
              <div className="bg-secondary p-4 flex flex-col justify-between items-start border-2 border-primary my-4">
                <div
                  key={order._id}
                  className="flex justify-between items-center  w-full"
                >
                  <div className="">
                    {order.items.length > 0 ? (
                      order.items.map((item, index) => (
                        <div className="" key={index}>
                          <span>
                            {item.title} (
                            <span className="font-bold">{item.quantity}</span>)
                          </span>
                        </div>
                      ))
                    ) : (
                      <p>No items found in this order.</p>
                    )}
                  </div>
                  <span>
                    Items quantity:{" "}
                    <span className="font-bold"> {order.items.length}</span>
                  </span>
                  <span> ₹{order.amount}</span>
                </div>
                <span className="font-bold mx-auto">
                  <i>{order.status}</i>
                </span>
                <button
                  onClick={() => cancelFunc(order._id)}
                  className="bg-red-700 text-white p-2 mt-2 w-full"
                >
                  Cancel Order
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>No orders found.</p>
      )}
    </main>
  );
};

export default Order;
