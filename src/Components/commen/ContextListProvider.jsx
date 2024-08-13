import { createContext, useEffect, useState } from "react";

export const ContextList = createContext();

const ContextListProvider = (props) => {
  const URL = "http://localhost:3000/v1";
  const [cartItems, setCartItems] = useState({});

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
  useEffect(()=>{
console.log(cartItems)
  },[cartItems])
  const contextvalue = {
    URL,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
  };
  return (
    <ContextList.Provider value={contextvalue}>
      {props.children}
    </ContextList.Provider>
  );
};
export default ContextListProvider;
