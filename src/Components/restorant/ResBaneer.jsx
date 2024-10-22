import React from "react";
import { motion } from "framer-motion"; 

const ResBaner = () => {
  return (
    <section className="mysection ">
      <div className="flex flex-col justify-center items-center text-center gap-4 md:gap-8 animation">
        <motion.h2
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-heading text-primary"
        >
          Discover Your Next Favorite Spot
        </motion.h2>

        <p className="w-3/4  md:w-1/2 text-xs md:text-lg font-sub-heading typing ">
          Explore a curated selection of the best restaurants around you.
          Whether you're craving local flavors or international cuisine, find
          the perfect place to satisfy your appetite. Click on a restaurant to
          view its menu and place your order in seconds.
        </p>
      </div>
    </section>
  );
};
export default ResBaner;
