import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { useEffect, useState, useRef, useContext } from "react";

import axios from "axios";
import RestorantCard from "./RestorantCard";
import { ContextList } from "../commen/ContextListProvider";

const Toprestorant = () => {
  const [restorant, setRestorant] = useState([]);
  const [loading, setLoading] = useState(true);

  const { URL } = useContext(ContextList);

  const resURL = `${URL}/restuarant/allrestaurant`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(resURL);
        const data = response.data;
        const Toprestorant = data.filter(
          (filteredrestorant) => filteredrestorant.BestRestaurant === true
        );
        setRestorant(Toprestorant);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, [resURL]);

  // Slider
  const sliderRef = useRef(null);

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const slidesToShow = restorant.length < 3 ? restorant.length : 3;

  const settings = {
    infinite: restorant.length > 1,
    autoplaySpeed: 5000,
    autoplay: restorant.length > 1,
    pauseOnHover: true,
    speed: 1000,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    initialSlide: 0,
    centerMode: restorant.length === 1,
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: Math.min(slidesToShow, 2),
          slidesToScroll: Math.min(slidesToShow, 2),
          infinite: restorant.length > 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
    ],
  };

  return (
    <motion.main
    initial={{ y: 150 }}
    whileInView={{ y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}>
      {restorant.length > 0 ? (
        <section className="mysection bg-secondary">
          <div className="flex justify-center">
            <span className="uppercase text-red-700 tracking-widest font-super-sub-font text-xs md:text-xl text-center font-semibold py-4">
              Customers choice
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
                  <h3 className="text-primary text-xl md:text-3xl font-semibold font-sub-heading capitalize text-start">
                    Best Restaurants
                  </h3>
                  <div className="flex flex-row  gap-6 ">
                    <button
                      className="bg-primary hover:bg-transparent border-2 border-transparent hover:border-black hover:text-black text-secondary rounded-full text-lg md:text-4xl"
                      onClick={previous}
                    >
                      <GrFormPrevious />
                    </button>
                    <button
                      className="bg-primary hover:bg-transparent border-2 border-transparent hover:border-black hover:text-black text-secondary rounded-full text-lg md:text-4xl"
                      onClick={next}
                    >
                      <MdOutlineNavigateNext />
                    </button>
                  </div>
                </div>
                <div className="">
                  <Slider ref={sliderRef} {...settings}>
                    {restorant.map((restaurant, index) => (
                      <RestorantCard key={index} restaurant={restaurant} />
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
    </motion.main>
  );
};

export default Toprestorant;
