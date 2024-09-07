import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const ContextList = createContext();

const ContextListProvider = ({ children }) => {
  const URL = "http://localhost:3000/v1";
  const [cartItems, setCartItems] = useState({});
  const [food, setFood] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllRes, setShowAllRes] = useState(false);
  const [token, setToken] = useState("");
  const [loginPage, setLoginPage] = useState(false);
  const [id, setId] = useState("");
  const [amountToPay, setAmountToPay] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);

  // Fetch user ID from token
  const fetchId = () => {
    const cookieToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (cookieToken) {
      try {
        const decoded = jwtDecode(cookieToken); // Decode the JWT token
        setId(decoded.id); // Set the decoded ID to state
        console.log("Decoded ID in fetchId:", decoded.id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.log("Token not found in cookies.");
    }
  };

  // Inside addToCart, log the id before making the request
  // const addToCart = async (itemId) => {
  //   if (!token) {
  //     setLoginPage(true); // Show login prompt if token is missing
  //     return;
  //   }

  //   console.log("id before adding to cart:", id);

  //   setCartItems((prevItems) => ({
  //     ...prevItems,
  //     [itemId]: (prevItems[itemId] || 0) + 1,
  //   }));

  //   const cartURL = `${URL}/cart/add/${id}`;
  //   console.log(cartURL);

  //   try {
  //     await axios.post(cartURL, { itemId }, { headers: { token } });
  //     console.log("Added to cart:", itemId);
  //     calculateAmountToPay(); // Recalculate the amount to pay after adding item
  //   } catch (error) {
  //     console.error("Error adding to cart:", error.response.data);
  //   }
  // };

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prevItems) => ({ ...prevItems, [itemId]: 1 }));
    } else {
      setCartItems((prevItems) => ({
        ...prevItems,
        [itemId]: prevItems[itemId] + 1,
      }));
    }
    if (token) {
      try {
        await axios.post(
          `${URL}/cart/add/${id}`,
          { itemId },
          { headers: { token } }
        );
        console.log("add to cart", itemId);
        calculateAmountToPay();
      } catch (error) {
        console.log("failed to add ", error);
      }
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    setCartItems((prevItems) => {
      const updatedItems = { ...prevItems };
      if (updatedItems[itemId] > 1) {
        updatedItems[itemId] -= 1;
      } else {
        delete updatedItems[itemId];
      }
      return updatedItems;
    });

    if (token) {
      const cartURL = `${URL}/cart/remove/${id}`;
      try {
        await axios.delete(cartURL, { data: { itemId }, headers: { token } });
        console.log("Removed from cart:", itemId);
        calculateAmountToPay(); // Recalculate the amount to pay after removing item
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    }
  };

  // // Delete item from cart
  // const deleteFromCart = (itemId) => {
  //   setCartItems((prevItems) => {
  //     const updatedItems = { ...prevItems };
  //     delete updatedItems[itemId];
  //     return updatedItems;
  //   });
  //   calculateAmountToPay(); // Recalculate the amount to pay after deleting item
  // };

  // Get cart data from the server
  const getCartData = async () => {
    if (token) {
      const cartURL = `${URL}/cart/get/${id}`;
      try {
        const response = await axios.get(cartURL, { headers: { token } });
        setCartItems(response.data.cartData || {});
        console.log("Cart data fetched:", response.data.cartData);
        calculateAmountToPay();
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    }
  };

  // Calculate the subtotal, delivery fee, and total amount
useEffect(() => {
  calculateAmountToPay();
}, [cartItems,addToCart]);

const calculateAmountToPay = () => {
  const subTotal = food.reduce((total, item) => {
    const quantity = cartItems[item._id] || 0;
    return total + quantity * item.price;
  }, 0);

  const deliveryFee = subTotal === 0 ? 0 : subTotal > 500 ? 20 : 50;
  const totalAmount = subTotal + deliveryFee;
    // console.log("subTotal",subTotal);
    setSubTotal(subTotal)
    // console.log(deliveryFee);
    setDeliveryFee(deliveryFee)
    // console.log("totalAmount",totalAmount);
    setAmountToPay(totalAmount);
  };

  // Fetch all food items
  const fetchFood = async () => {
    try {
      const response = await axios.get(`${URL}/food/allfood`);
      setFood(response.data);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  // Fetch all restaurants
  const fetchRestaurant = async () => {
    try {
      const response = await axios.get(`${URL}/restuarant/allrestaurant`);
      setRestaurant(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    }
  };

  // Fetch initial data on mount
  useEffect(() => {
    const initializeData = async () => {
      await fetchFood();
      await fetchRestaurant();
      fetchId(); // Ensure ID is fetched here
    };

    initializeData();
  }, [token]); // Re-run if token changes

  // Fetch cart data after id is set
  useEffect(() => {
    if (id) {
      getCartData();
    }
  }, [id, food]); // Trigger when id or food is set

  // Context value object
  const contextValue = {
    URL,
    cartItems,
    setCartItems,
    getCartData,
    // deleteFromCart,
    addToCart,
    removeFromCart,
    subTotal,
    deliveryFee,
    amountToPay,
    food,
    restaurant,
    loading,
    setLoading,
    showAllRes,
    setShowAllRes,
    token,
    setToken,
    loginPage,
    setLoginPage,
    id,
  };

  return (
    <ContextList.Provider value={contextValue}>{children}</ContextList.Provider>
  );
};

export default ContextListProvider;
