import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ContextList = createContext();

const ContextListProvider = (props) => {
  const URL = "http://localhost:3000/v1";
  const [cartItems, setCartItems] = useState({});
  const [food, setFood] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [loading, setLoading] = useState(true);

  const addToCart = (item) => {
    if (!cartItems[item]) {
      setCartItems({ ...cartItems, [item]: 1 });
    } else {
      setCartItems({ ...cartItems, [item]: cartItems[item] + 1 });
    }
  };

  const removeFromCart = (item) => {
    if (cartItems[item] > 1) {
      setCartItems({ ...cartItems, [item]: cartItems[item] - 1 });
    } else {
      const newCartItems = { ...cartItems };
      delete newCartItems[item];
      setCartItems(newCartItems);
    }
  };
  const deleteFromCart = (item) => {
    const newCartItems = { ...cartItems };
    delete newCartItems[item];
    setCartItems(newCartItems);
  };

  useEffect(() => {
    fetchFood();
    fetchRestaurant();
  }, []);
  // Food
  const fetchFood = async () => {
    try {
      const response = await axios.get(`${URL}/food/allfood`);
      const foodData = response.data;
      setFood(foodData);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };
  // Restaurant

  const fetchRestaurant = async () => {
    try {
      const response = await axios.get(`${URL}/restuarant/allrestaurant`);
      const restaurantData = response.data;
      setRestaurant(restaurantData);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    }
  };
  const subTotal = food.reduce((total, item) => {
    if (cartItems[item._id]) {
      return total + item.price * cartItems[item._id];
    }
    return total;
  }, 0);

  // Calculate delivery fee
  const deliveryFee = subTotal > 500 ? 20 : 50 && subTotal === 0 ? 0 : 50;

  // Total amount to pay
  const amountToPay = subTotal + deliveryFee;

  const contextValue = {
    URL,
    cartItems,
    setCartItems,
    deleteFromCart,
    addToCart,
    removeFromCart,
    amountToPay,
    subTotal,
    deliveryFee,
    food,
    restaurant,
    loading,
    // Add your other context variables here as needed. For example:
 
  };

  return (
    <ContextList.Provider value={contextValue}>
      {props.children}
    </ContextList.Provider>
  );
};

export default ContextListProvider;
