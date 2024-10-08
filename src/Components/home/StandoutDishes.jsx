import React, { useContext } from "react";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import FoodCard from "./FoodCerd";
import { ContextList } from "../commen/ContextListProvider";

const StandoutDishes = () => {
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(true);
  const { URL } = useContext(ContextList);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {

        const response = await axios.get(`${URL}/food/allfood`);

        const data = response.data;
        const topFood = data.filter((filterdfood) => filterdfood.isPopular === true);
        setFood(topFood);
        console.log("topFood",topFood)
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  
  let sliderRef = useRef(null);
  const next = () => sliderRef.current.slickNext();
  const previous = () => sliderRef.current.slickPrev();

  const slidesToShow = food.length < 3 ? food.length : 3;

  const settings = {
    infinite: food.length > 1,
    autoplaySpeed: 5000,
    autoplay: food.length > 1,
    pauseOnHover: true,
    speed: 1000,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    initialSlide: 0,
    centerMode: food.length === 1, 
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: Math.min(slidesToShow, 2),
          slidesToScroll: Math.min(slidesToShow, 2),
          infinite: food.length > 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true, // Center the single food item on smaller screens
        },
      },
    ],
  };

  return (
    <main>
      {food.length > 0 ? (
        <section className="mysection">
          <div className="flex justify-center">
            <span className="uppercase text-red-700 tracking-widest font-super-sub-font text-xl text-center font-semibold py-4">
              Customers Favorites
            </span>
          </div>
          <div className="">
            {loading ? (
              <div className="flex justify-center">
                <div className="lds-ellipsis flex justify-center items-center text-primary w-full">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            ) : (
              <div className="">
                <div className="flex flex-row pt-10 justify-between items-center px-10">
                  <h3 className="text-primary text-3xl font-semibold font-sub-heading capitalize text-start">
                    StandOut Dishes
                  </h3>
                  <div className="flex flex-row gap-6">
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
                  <Slider ref={sliderRef} {...settings}>
                    {food.map((dish) => (
                      <FoodCard key={dish.id} dishes={dish} />
                    ))}
                  </Slider>
                </div>
              </div>
            )}
          </div>
        </section>
      ) : (
        <></>
      )}
    </main>
  );
};

export default StandoutDishes;
