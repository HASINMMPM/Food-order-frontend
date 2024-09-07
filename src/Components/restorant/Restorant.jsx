import React, { useContext, useState } from "react";
import ResBaner from "./ResBaneer";
import VegRes from "./VegRes";
import NightRes from "./NightRes";
import TopRes from "./TopRes";
import Allres from "./Allres";
import { ContextList } from "../commen/ContextListProvider";

const Restorant = () => {
  const { showAllRes, setShowAllRes } = useContext(ContextList);
  const [btnText, setBtnText] = useState("View All");

  const toggleView = () => {
    setShowAllRes((prev) => {
      const newState = !prev;
      setBtnText(newState ? "View Less" : "View All");
      return newState;
    });
  };

  return (
    <main>
      {!showAllRes && (
        <>
          <ResBaner />
          <NightRes />
          <TopRes />
          <VegRes />
        </>
      )}
      <div className="flex w-full justify-center">
        <button
          className={`${
            showAllRes
              ? "bg-transparent text-primary border-2 rounded-lg border-primary"
              : "bg-primary text-white hover:border-transparent"
          } text-xl md:text-2xl rounded-lg py-2 px-4 my-4 hover:bg-black hover:text-secondary duration-300`}
          onClick={toggleView}
        >
          {btnText}
        </button>
      </div>
      {showAllRes && <Allres />}
    </main>
  );
};

export default Restorant;
