import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ContextList } from "../commen/ContextListProvider";

const FoodCard = ({ dishes }) => {
  const [restaurant, setRestaurant] = useState(null);
  const { URL, addToCart,setLoading } = useContext(ContextList);
  // console.log(URL);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resId = dishes.restaurant;
        const response = await axios.get(
          `${URL}/restuarant/restuarant/${resId}`
        );
        const data = response.data;
        // console.log(data);
        setRestaurant(data);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, [dishes.restaurant, URL]);
  // const resName = restaurant.Title
  // console.log(resName)

  return (
    <div className=" w-full flex flex-col justify-between max-w-xs overflow-hidden rounded-lg border-2 p-2 bg-secondary  hover:-translate-y-4 duration-300 shadow-md">
      <Link to={`/dishes/${dishes._id}`}>
        <img
          className="h-60 w-full rounded-t-lg object-cover"
          src={dishes.image}
          alt={dishes.title}
        />
        <div className="flex flex-col gap-2">
          <h3 className="text-black text-lg md:text-2xl">{dishes.title}</h3>
          {restaurant && (
            <>
              <span className="font-semibold">{restaurant.Title}</span>
              <span>{restaurant.Place}</span>
            </>
          )}
        </div>
      </Link>
      <div className="flex items-start md:items-center justify-between flex-col md:flex-row ">
          <Link to={`/dishes/${dishes._id}`}>
            <span className="text-lg md:text-2xl font-semibold text-slate-900">
              ₹{dishes.price}
            </span>
          </Link>

          <button
            className="bg-primary w-full md:w-auto flex flex-row items-center justify-center text-xs md:text-lg p-2 rounded-lg text-white hover:text-primary hover:bg-secondary hover:border-2 border-primary"
            onClick={() => {
              addToCart(dishes._id);
            }}
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
          </button>
        </div>
    </div>
  );
};

export default FoodCard;
