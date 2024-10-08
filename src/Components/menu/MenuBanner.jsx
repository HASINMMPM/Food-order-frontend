import React from "react";

const MenuBanner = () => {
  return (
    <section className="mysection ">
      <div className="flex flex-col justify-center items-center text-center gap-4 md:gap-8 animation">
        <h2 className="text-4xl md:text-6xl font-heading text-primary">
          Discover Our Menu
        </h2>

        <p className="w-3/4  md:w-1/2 text-xs md:text-lg  font-sub-heading typing">
          Embark on a culinary adventure with our extensive menu, featuring an
          array of dishes to suit every palate. From traditional favorites to
          innovative creations, our chefs have crafted a selection that caters
          to all tastes. Savor the variety and enjoy a delightful dining
          experience with every bite
        </p>
      </div>
    </section>
  );
};

export default MenuBanner;
