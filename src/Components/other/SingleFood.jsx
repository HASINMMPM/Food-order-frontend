import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ContextList } from "../commen/ContextListProvider";

const SingleFood = () => {
  const { URL,addToCart } = useContext(ContextList);
  const { id } = useParams();
  const [singleFood, setSingleFood] = useState(null);
  const [singleRes, setSingleRes] = useState(null);

  useEffect(() => {
    const fetchSingleFood = async () => {
      try {
        const response = await axios.get(`${URL}/food/food/${id}`);
        const foodData = response.data;
        setSingleFood(foodData);

        if (foodData.restaurant) {
          fetchSingleRes(foodData.restaurant);
        }
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    };

    const fetchSingleRes = async (restaurantId) => {
      try {
        const response = await axios.get(
          `${URL}/restuarant/restuarant/${restaurantId}`
        );
        const resData = response.data;
        setSingleRes(resData);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    fetchSingleFood();
  }, [URL, id]);

  return (
    <section className="mysection">
      {singleFood ? (
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 ">
            <img
              className=" aspect-[4/3] object-cover"
              src={singleFood.image}
              alt={singleFood.title}
            />
          </div>
          <div className="w-full md:w-3/4 flex flex-col gap-3  p-3 md:p-6 justify-start md:gap-6">
            <h3 className="text-md md:text-2xl font-bold font-heading text-primary">
              {singleFood.title}
            </h3>
            <p>{singleFood.description}</p>
            {singleRes && (
              <p>
                Restaurant : <span className="font-bold">
                  {singleRes.Title}, {singleRes.Place}
                </span>
              </p>
            )}
            <p className="font-semibold"> {singleFood.price}/-</p>
            <button className="bg-primary flex justify-center p-2 rounded-lg text-white hover:text-primary hover:bg-secondary hover:border-2 w-1/4 md:w-[20%]  border-primary"
           onClick={() =>{addToCart(singleFood._id)}}> 
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
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};

export default SingleFood;
