import React, { useEffect, useState } from "react";
import { ContextList } from "../commen/ContextListProvider";
import { useContext } from "react";
import axios from "axios";

const Order = () => {
  const { id, URL } = useContext(ContextList);
  const [order, setOrder] = useState([]); // Initialize as an array

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderResponse = await axios.get(`${URL}/get/order`);
        const orders = orderResponse.data;
        const orderById = orders.filter(
          (orderMyself) => orderMyself.userId === id
        );

        console.log(orderById);
        setOrder(orderById); // Set the filtered orders
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  }, [id, URL]); // Include id and URL in dependency array

  return (
    <main>
      <h1>Order History</h1>
      {order.length > 0 ? (
        order.map((order) => (
          <div key={order._id}>
            <h2>{order._id}</h2>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </main>
  );
};

export default Order;
