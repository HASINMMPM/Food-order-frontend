import React from "react";
import banner from "/banner.png";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <section className="py-12">
      <div className="flex flex-col-reverse md:flex-row gap-4 ">
        <div className="w-full md:w-1/2 flex flex-col gap-4 justify-center ">
          <motion.h1
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-heading "
          >
            Busy schedules,
            <br />
            <span className="text-primary">delicious</span> desires.
          </motion.h1>
          <p className="text-xs md:text-lg font-sub-heading typing">
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
