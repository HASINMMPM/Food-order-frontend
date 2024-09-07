import React from "react";
import banner from "/banner.png";

const Banner = () => {
  return (
    <section className="py-12">
      <div className="flex flex-col-reverse md:flex-row gap-4 ">
        <div className="w-full md:w-1/2 flex flex-col gap-4 justify-center ">
          <h1 className="text-6xl font-heading ">
            Busy schedules,
            <br />
            <span className="text-primary">delicious</span> desires.
          </h1>
          <p className="text-lg font-sub-heading">
            At Hungry Hub, we bridge the gap between your busy schedule and
            delicious desires. Our diverse menu features mouth-watering dishes
            from around the globe, crafted with the freshest ingredients.
            Whether it is a comforting meal or an exotic culinary adventure, our
            seamless ordering and prompt delivery ensure you enjoy exquisite
            dining without compromising on convenience. Dive into a delightful
            mealtime experience with Hungry Hub!
          </p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center">
          {/* image */}
          <img src={banner} alt="" />
          {/* image close */}
        </div>
      </div>
    </section>
  );
};

export default Banner;
