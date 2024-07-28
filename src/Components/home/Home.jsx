import React from "react";
import Banner from "./Banner";
import Toprestorant from "./Toprestorant";
import Custemerreview from "./Custemerreview";
import Services from "./Services";

const Home = () => {
  return (
    <section className="mysection ">
      <Banner/>
      <Toprestorant/>
      <Custemerreview/>
      <Services/>
    </section>
  );
};

export default Home;
