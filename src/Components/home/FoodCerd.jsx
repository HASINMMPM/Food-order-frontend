import axios from "axios";
import React, { useState,useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ContextListProvider from "../commen/ContextListProvider";


const FoodCerd = ({ dishes }) => {
  const [restaurant, setRestaurant] = useState("");
  const URL = useContext(ContextListProvider)

  useEffect(() => {
    // console.log(dishes)
    const fetchData = async () => {
      try {
        const resId = dishes.restaurant; 
        // console.log(resId)
        const response = await axios.get(
          URL`/restuarant/restuarant/${resId}`
        );
        const data = response.data; 
        // console.log(data.Title);

        
        setRestaurant(data); 
        // console.log(data.name);
      } catch (error) {
        console.error(error.message);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div className="relative  m-10 w-full max-w-xs overflow-hidden rounded-lg bg-secondary hover:scale-105 hover:-translate-y-1 duration-300 shadow-md">
      <Link to="#">
        <img
          className="h-60 w-full rounded-t-lg object-cover"
          src={dishes.image}
          alt={dishes.name}
        />
      </Link>
      <span className="absolute top-0 left-0 w-28 translate-y-4  -translate-x-6 -rotate-45 bg-primary text-center text-sm text-white">
        Popular
      </span>
      <div className="mt-4 px-5 pb-5 h-44">
        <Link to="/#">
          <h5 className="text-[1.5rem] font-semibold tracking-tight text-black ">
            {dishes.title}
          </h5>
        </Link>

        <h5 className="text-xl  text-slate-900">{restaurant.Title}</h5>
        <h5 className="text-xl  text-slate-700">{restaurant.Place}</h5>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-semibold text-slate-900">
          ₹{dishes.price}
          </span>

          <Link
            href="#"
            className="flex items-center rounded-md bg-primary px-5 py-2.5 text-center  hover:rounded-2xl hover:bg-transparent hover:border-primary hover:border-4 hover:text-primary  duration-[600ms] text-secondary   text-sm font-medium hover:font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Add to cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodCerd;
