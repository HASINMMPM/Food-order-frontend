import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

export const ContextList = createContext();

const ContextListProvider = ({ children }) => {
  const URL = "https://foodorder-backend-3.onrender.com/v1";
  // const URL = "http://localhost:3000/v1";
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
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState("");

  // Fetch user ID from token
  const fetchId = () => {
    const cookieToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (cookieToken) {
      try {
        const decoded = jwtDecode(cookieToken);
        setId(decoded.id);
        // console.log("Decoded ID in fetchId:", decoded.id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.log("Token not found in cookies.");
    }
  };

  const addToCart = async (itemId) => {
    if (token) {
      if (!cartItems[itemId]) {
        Swal.fire({
          title: "item added Successful",
          icon: "success",
          timer: 1000,
        });
        setCartItems((prevItems) => ({ ...prevItems, [itemId]: 1 }));
      } else {
        setCartItems((prevItems) => ({
          ...prevItems,
          [itemId]: prevItems[itemId] + 1,
        }));
        console.log(setCartItems);
        Swal.fire({
          title: `item added and quantity is ${cartItems[itemId] + 1}`,
          icon: "success",
          timer: 1000,
        });
      }
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
    } else {
      Swal.fire({
        title: "Please Login ",
        icon: "info",
        timer: 1000,
      });
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    setCartItems((prevItems) => {
      const updatedItems = { ...prevItems };
      if (updatedItems[itemId] > 1) {
        updatedItems[itemId] -= 1;
        Swal.fire({
          title: `item removed and quantity is ${cartItems[itemId] - 1}`,
          icon: "success",

          timer: 1500,
        });
      } else {
        delete updatedItems[itemId];
        Swal.fire({
          title: `item Removed`,
          icon: "success",
          timer: 1500,
        });
      }
      return updatedItems;
    });
    if (token) {
      const cartURL = `${URL}/cart/remove/${id}`;
      try {
        await axios.delete(cartURL, { data: { itemId }, headers: { token } });
        console.log("Removed from cart:", itemId);
        calculateAmountToPay();
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    }
  };

  const getCartData = async () => {
    if (token) {
      const cartURL = `${URL}/cart/get/${id}`;
      try {
        const response = await axios.get(cartURL, { headers: { token } });
        setCartItems(response.data.cartData || {});
        // console.log("Cart data fetched:", response.data.cartData);
        calculateAmountToPay();
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    }
  };

  // Calculate the subtotal, delivery fee, total amount
  useEffect(() => {
    calculateAmountToPay();
  }, [cartItems, addToCart]);

  const applyCoupon = async (couponCode) => {
    try {
      const response = await axios.post(`${URL}/coupon/check`, {
        code: couponCode,
      });
      if (response.data.discount) {
        setCouponDiscount(response.data.discount);
        Swal.fire({
          title: `Congratulations! 🎉`, 
          text: `You saved ₹${discountAmount} on your order!`, 
          icon: "success",
          timer: 2500, 
        });
      } else {
        setCouponDiscount(0);
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      console.log(error.response.data);
      setCouponDiscount(0);
      Swal.fire({
        title: "Invalid coupon code",
        icon: "error",
        timer: 1000,
      });
    }
  };

  // Update total calculation to apply the coupon
  const calculateAmountToPay = () => {
    const subTotal = food.reduce((total, item) => {
      const quantity = cartItems[item._id] || 0;
      return total + quantity * item.price;
    }, 0);

    const deliveryFee = subTotal === 0 ? 0 : subTotal > 500 ? 20 : 50;

    setDiscountAmount((subTotal * couponDiscount) / 100);
    console.log(discountAmount);
    const totalAmount = subTotal + deliveryFee - discountAmount;

    setSubTotal(subTotal);
    setDeliveryFee(deliveryFee);
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

  useEffect(() => {
    const initializeData = async () => {
      await fetchFood();
      await fetchRestaurant();
      fetchId();
    };

    initializeData();
  }, [token]);

  useEffect(() => {
    if (id) {
      getCartData();
    }
  }, [id, food]);

  const contextValue = {
    URL,
    cartItems,
    setCartItems,
    getCartData,
    // deleteFromCart,
    addToCart,
    removeFromCart,
    applyCoupon,

    subTotal,
    deliveryFee,
    amountToPay,
    couponDiscount,
    discountAmount,
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
