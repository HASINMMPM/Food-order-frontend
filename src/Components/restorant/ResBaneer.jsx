import React from "react";

export const ResBaneer = () => {
  return (
    <section className="mysection ">
      <div className="flex flex-col justify-center items-center text-center gap-4 md:gap-8 animation">
        <h2 className="text-2xl md:text-6xl text-primary font-heading">
          Discover Your Next Favorite Spot
        </h2>

        <p className="w-3/4  md:w-1/2 text-lg md:text-xl typing">
          Explore a curated selection of the best restaurants around you.
          Whether you're craving local flavors or international cuisine, find
          the perfect place to satisfy your appetite. Click on a restaurant to
          view its menu and place your order in seconds.
        </p>
      </div>
    </section>
  );
};
