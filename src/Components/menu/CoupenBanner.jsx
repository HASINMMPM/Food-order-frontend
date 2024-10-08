import React, { useState, useContext, useEffect } from "react";
import Slider from "react-slick";
import { ContextList } from "../commen/ContextListProvider";
import { FaCopy } from "react-icons/fa";
import Swal from "sweetalert2";


const CoupenBanner = () => {
  const [coupen, setCoupen] = useState([]);  
  const { URL } = useContext(ContextList);

  useEffect(() => {
    const fetchCoupen = async () => {
      try {
        const response = await fetch(`${URL}/coupon/all`);
        const data = await response.json();
        console.log(data);
        setCoupen(data);  
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchCoupen();
  }, [URL]);  

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      Swal.fire({
        text: `Coupon code copied: ${code}`,
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
    }).catch((error) => {
      console.error('Copy failed', error);
    });
  };

  var settings = {
    dots: false,
    infinite: true,
    autoplaySpeed: 5000,
    autoplay: true,
    pauseOnHover: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className="py-12 ">
      {coupen.length > 0 ? (
        <div className="banner-bg bg-primary pb-6">

        <Slider {...settings}>
          {coupen.map((coupon, index) => (
            <div key={index} className=" text-white   w-full">
              <div className="flex flex-col justify-between items-start px-6 gap-2">
                
                <div className="flex flex-col items-start py-14  gap-4 justify-center">
                  <h1 className="text-lg md:text-xl font-semibold">
                    Limited Time Offer! Unlock an exclusive{" "}
                    <span className="px-2 bg-secondary text-primary text-2xl md:text-3xl font-bold">{coupon.discount}% OFF</span><br />
                    on your next order! Use code{" "}
                    <span className="px-2 bg-secondary text-primary text-2xl md:text-3xl font-bold">{coupon.code}</span> now.
                  </h1>
                  <p className="text-sm md:text-lg italic">
                    Hurry! This offer won't last long. Enjoy delicious savings today!
                  </p>
                </div>
                <div  onClick={() => copyToClipboard(coupon.code)}  className="cursor-pointer flex justify-center items-center gap-2 bg-secondary text-primary p-3 rounded-xl hover:text-secondary text-lg mx-2">

                Copy Code<FaCopy 
                  className="" 
                 
                />
                </div>
              </div>
            </div>
          ))}
        </Slider>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};

export default CoupenBanner;
