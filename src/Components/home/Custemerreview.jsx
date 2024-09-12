import React from "react";
import img from "/review.png";
// import React from "react";
import Slider from "react-slick";
import { ContextList } from "../commen/ContextListProvider";
import { useContext } from "react";

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
const Custemerreview = () => {
  const { URL } = useContext(ContextList);
  var settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    autoplaySpeed: 5000,
    autoplay: true,
    pauseOnHover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetchReview();
  }, []);
  const fetchReview = async () => {
    const response = await axios.get(`${URL}/get/comment`);
    console.log("all com",response.data)
    const comments= await response.data;
    const topComents =  comments.filter((review)=>
      review.isShow === true);
    setReviews(topComents);
    console.log("topComents",topComents)
  };
  return (
    <section className="mysection ">
      <div className="flex justify-center items-center">
        <span className="uppercase text-red-700 tracking-widest font-super-sub-font text-xl text-center font-semibold py-6">
          Voices of Satisfaction
        </span>
      </div>
      <div className="flex flex-col md:flex-row mt-6 gap-4">
        <div className="w-full md:w-1/2 flex justify-center items-center">
          {/* 
        Images
         */}
          <img src={img} alt="" className="w-full h-full" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-6  justify-center mt-10 md:mt-0">
          <h3 className="text-primary  text-3xl font-semibold font-sub-heading text-start capitalize">
            What Our customers says
          </h3>
          <Slider {...settings}>
            {reviews.map((comment) => (
              <p key={comment._id}>"{comment.comment}"</p> // Ensure you're returning JSX here
            ))}
          </Slider>

          <div className="avatar-group -space-x-6 rtl:space-x-reverse">
            <div className="avatar">
              <div className="w-12">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div className="avatar">
              <div className="w-12">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div className="avatar">
              <div className="w-12">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content w-12">
                <span>+99</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Custemerreview;
