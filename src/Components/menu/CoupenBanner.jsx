import React, { useState, useContext, useEffect } from "react";
import Slider from "react-slick";
import { ContextList } from "../commen/ContextListProvider";
import { FaCopy } from "react-icons/fa";
import Swal from "sweetalert2";

const CoupenBanner = () => {
  const [coupen, setCoupen] = useState([]);  // Initialize as an array
  const { URL } = useContext(ContextList);

  useEffect(() => {
    const fetchCoupen = async () => {
      try {
        const response = await fetch(`${URL}/coupon/all`);
        const data = await response.json();
        console.log(data);
        setCoupen(data);  // Set the fetched data
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchCoupen();
  }, [URL]);  // Add URL to dependencies

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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className="py-12">
      {coupen.length > 0 ? (
        <Slider {...settings}>
          {coupen.map((coupon, index) => (
            <div key={index} className="coupen-bg text-white p-4 md:p-14 w-full">
              <div className="flex flex-row justify-between items-center gap-2">
                <div className="flex flex-col items-start  gap-4 justify-center">
                  <h1 className="text-lg md:text-xl font-thin">
                    Limited Time Offer! Unlock an exclusive{" "}
                    <span className="text-black md:text-3xl font-bold">{coupon.discount}% OFF</span><br />
                    on your next order! Use code{" "}
                    <span className="text-black md:text-3xl font-bold">{coupon.code}</span> now.
                  </h1>
                  <p className="text-sm md:text-lg italic">
                    Hurry! This offer won't last long. Enjoy delicious savings today!
                  </p>
                </div>
                <FaCopy 
                  className="cursor-pointer hover:text-secondary text-lg mx-2" 
                  onClick={() => copyToClipboard(coupon.code)} 
                />
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <></>
      )}
    </section>
  );
};

export default CoupenBanner;
