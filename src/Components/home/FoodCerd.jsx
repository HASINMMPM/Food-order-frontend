import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ContextList } from "../commen/ContextListProvider";

const FoodCard = ({ dishes }) => {
  const [restaurant, setRestaurant] = useState(null);
  const { URL,addToCart } = useContext(ContextList);
  // console.log(dishes);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resId = dishes.restaurant; // This should be a single ObjectID now
        const response = await axios.get(
          `${URL}/restuarant/restuarant/${resId}`
        );
        const data = response.data;
        // console.log(data);
        setRestaurant(data);
        // console.log(restaurant);
      } catch (error) {
        console.error(error.message);
      }
    };
  
    fetchData();
  }, [dishes.restaurant, URL]);


  return (
    <div className="relative  m-10 w-full max-w-xs overflow-hidden rounded-lg bg-secondary hover:scale-105 hover:-translate-y-1 duration-300 shadow-md">
     <Link to={`/dishes/${dishes._id}`}>
        <img
          className="h-60 w-full rounded-t-lg object-cover"
          src={dishes.image}
          alt={dishes.title}
        /><span className="absolute top-0 left-0 w-28 translate-y-4  -translate-x-6 -rotate-45 bg-primary text-center text-sm text-white">
        Popular
      </span>
       <div className="flex flex-col gap-2">
       <h3 className="text-black text-lg md:text-2xl">{dishes.title}</h3>
        {restaurant && (
          <>
            <span className="font-semibold">{restaurant.Title}</span>
            <span>{restaurant.Place}</span>
          </>
        )}
       </div> </Link>
       <div className="flex items-center justify-between">
       <Link to={`/dishes/${dishes._id}`}>
          <span className="text-2xl font-semibold text-slate-900">
          ₹{dishes.price}
          </span></Link>

          <button className="bg-primary flex  p-2 rounded-lg text-white hover:text-primary hover:bg-secondary hover:border-2 border-primary"
           onClick={() =>{addToCart(dishes._id)}}>
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
          </button>
        </div>

     
    </div>
  );
};

export default FoodCard;
