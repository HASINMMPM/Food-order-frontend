import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import axios from "axios";
import RestorantCard from "./RestorantCard";

const Toprestorant = () => {
  const [restorant, setRestorant] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/Restorant.json");
        const data = await response.data;
        // console.log(data)
        const Toprestorant = data.filter(
          (filterdrestorant) => filterdrestorant.category === "Top Restaurants"
        );
        setRestorant(Toprestorant);
        console.log(Toprestorant);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // Slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
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
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="mysection ">
      <div className="flex justify-center">
        <span className="uppercase text-red-700 tracking-widest font-super-sub-font text-xl text-center font-semibold w-screen ">
          Custemers choice
        </span>
      </div>
      <div className="">
        {loading && (
          <div className="flex justify-center">
            <div className="lds-ellipsis flex justify-center items-center w-full">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
        {!loading && (
          <div className="">
            <h3 className="text-primary mt-10 text-2xl font-semibold font-sub-heading text-start">
              Best Restorants
            </h3>
            <div className="px-10">
              <Slider {...settings}>
                {restorant.map((restaurant, index) => (
                  <RestorantCard key={index} restaurant={restaurant} />
                ))}
              </Slider>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Toprestorant;
