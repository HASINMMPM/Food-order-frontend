import React from "react";
import Banner from "./Banner";
import Toprestorant from "./Toprestorant";
import Custemerreview from "./Custemerreview";
import Services from "./Services";
import StandoutDishes from "./StandoutDishes";

const Home = () => {
  return (
    <section className="mysection ">
      <Banner/>
      <Toprestorant/>
      <Custemerreview/>
      <Services/>
      <StandoutDishes/>
    </section>
  );
};

export default Home;
