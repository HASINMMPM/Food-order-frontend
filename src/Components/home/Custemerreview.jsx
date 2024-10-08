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
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  var settings = {
    dots: true,
    infinite: reviews.length > 1,
    speed: 2000,
    autoplaySpeed: 5000,
    autoplay: reviews.length > 1,
    pauseOnHover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  useEffect(() => {
    fetchReview();
  }, []);
  const fetchReview = async () => {
    const response = await axios.get(`${URL}/get/comment`);
    console.log("all com", response.data);
    const comments = await response.data;
    setComments(comments);
    const topComents = comments.filter((review) => review.isShow === true);
    setReviews(topComents);
    console.log("topComents", topComents);
  };
  return (
    <main>
      {reviews.length > 0 ? (
        <section className="mysection ">
          <div className="flex justify-center items-center">
            <span className="uppercase text-red-700 tracking-widest font-super-sub-font text-xs md:text-xl text-center font-semibold py-4">
              Voices of Satisfaction
            </span>
          </div>
          <div className="flex flex-col md:flex-row mt-6 gap-4">
            <div className="w-full md:w-1/2 flex justify-center items-center">
              {/* 
          Images
           */}
              <img src={img} alt="" className="w-full h-full object-contain" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-6  justify-center mt-10 md:mt-0">
              <h3 className="text-primary text-xl md:text-3xl font-semibold font-sub-heading capitalize text-start">
                What Our customers says
              </h3>
              <Slider {...settings}>
                {reviews.map((comment) => (
                  <p key={comment._id}>{comment.comment}</p>
                ))}
              </Slider>

              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar">
                  <div className="w-8 h-8 md:h-12 md:w-12">
                    <img src="https://botanica.gallery/wp/wp-content/plugins/buddypress-first-letter-avatar/images/roboto/512/cyrillic_1072.png" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-8 h-8 md:h-12 md:w-12">
                    <img src="https://content.invisioncic.com/a319035/monthly_2016_11/avatar.thumb.png.c68c113d40702f1cbaf0ff7fbb57ee46.png" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-8 h-8 md:h-12 md:w-12">
                    <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--uFcwVGC1--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/27jpnicrgz7wztex78k4.jpg" />
                  </div>
                </div>
                <div className="avatar placeholder">
                  {comments.length >3 ?
                  <div className="bg-secondary text-black-content w-8 h-8 md:h-12 md:w-12">
                  <span className="text-xs md:text-lg">+{comments.length-3}</span>
                </div>:<div className="bg-secondary text-black-content w-8 h-8 md:h-12 md:w-12">
                    <span className="text-xs md:text-lg">{comments.length}</span>
                  </div>}
                  
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <></>
      )}
    </main>
  );
};

export default Custemerreview;
