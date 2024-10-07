import React from "react";

import { Link } from "react-router-dom";

const ProtectRouter = () => {


  return (
    <main className="h-screen flex flex-col gap-4 justify-center items-center">
      <p className="text-lg md:text-2xl">
        It looks like you're not logged in. Please log in to continue enjoying
        all the features.
      </p>
      <Link to="/account">
      <p
        className="text-lg md:text-2xl hover:text-primary duration-100 hover:font-semibold cursor-pointer"
       
      >
        Login here
      </p>
      </Link>
    </main>
  );
};

export default ProtectRouter;
