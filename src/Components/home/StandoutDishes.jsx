import React from "react";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import FoodCerd from "./FoodCerd";

const StandoutDishes = () => {
  const [food , setFood] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/v1/food/allfood"
        );
        const data = await response.data;
        // console.log(data)
        const Topfood = data.filter((filterdfood) =>
          filterdfood.isPopular === true
        );
        setFood(Topfood);
        // console.log(Topfood);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // Slider

  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };
  const settings = {
    // dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    speed: 4000,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          centerMode: true,
        },
      },
    ],
  };
  return (
    <section className="mysection ">
      <div className="flex justify-center">
        <span className="uppercase text-red-700 tracking-widest font-super-sub-font text-xl text-center font-semibold py-4">
          Customers Favorites
        </span>
      </div>
      <div className="">
        {loading && (
          <div className="flex justify-center">
            <div className="lds-ellipsis flex justify-center items-center text-primary w-full">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
        {!loading && (
          <div className="">
            <div className="flex flex-row pt-10 justify-between items-center px-10 ">
              <h3 className="text-primary  text-3xl font-semibold font-sub-heading capitalize text-start">
                StandOut Dishes
              </h3>
              <div className="flex flex-row  gap-6 ">
                <button
                  className="bg-primary hover:bg-transparent border-2 border-transparent hover:border-black hover:text-black text-secondary rounded-full text-4xl"
                  onClick={previous}
                >
                  <GrFormPrevious />
                </button>
                <button
                  className="bg-primary hover:bg-transparent border-2 border-transparent hover:border-black hover:text-black text-secondary rounded-full text-4xl"
                  onClick={next}
                >
                  <MdOutlineNavigateNext />
                </button>
              </div>
            </div>
            <div className="px-10">
              <Slider
                ref={(slider) => {
                  sliderRef = slider;
                }}
                {...settings}
              >
                {food.map((dishes, index) => (
                  <FoodCerd key={index} dishes={dishes} />
                ))}
              </Slider>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default StandoutDishes;
