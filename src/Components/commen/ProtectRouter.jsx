import React, { useContext, useEffect } from "react";
import { ContextList } from "./ContextListProvider";

const ProtectRouter = () => {
  const { setLoginPage,token } = useContext(ContextList);
  useEffect(()=>{
    if (!token) {
      setLoginPage(true);
    }
  },[token])
  return (
    <main className="h-screen flex flex-col gap-4 justify-center items-center">
      <p className="text-lg md:text-2xl">
        It looks like you're not logged in. Please log in to continue enjoying
        all the features.
      </p>
      <p className="text-lg md:text-2xl hover:text-primary duration-100 hover:font-semibold cursor-pointer" onClick={() => setLoginPage(true)}>Login here</p>
    </main>
  );
};

export default ProtectRouter;
