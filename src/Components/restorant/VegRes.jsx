import React, { useContext, useRef } from "react";
import { ContextList } from "../commen/ContextListProvider";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";

const VegRes = () => {
  const containerRef = useRef();
  const { restaurant } = useContext(ContextList);

  const handlescrollLeft = () => {
    containerRef.current.scrollLeft -= 500;
  };

  const handlescrollRight = () => {
    containerRef.current.scrollLeft += 500;
  };
const vegRes =restaurant.filter((res)=>{
  return res.Type === "Veg"
})
console.log(vegRes)
  return (
    <div className=" mysection w-full h-full flex flex-col  ">
    <h2 className="text-primary text-2xl font-bold md:text-4xl">Veg</h2>
  
    <div className="w-full flex justify-center items-center">
      <div className="w-[90%] flex items-center relative">
        {vegRes.length > 3 && (
          <button
            onClick={handlescrollLeft}
            className="rounded-xl absolute bg-secondary text-2xl md:text-3xl z-40 left-0 cursor-pointer"
          >
            <GrFormPrevious />
          </button>
        )}
        <div
          className="w-full whitespace-nowrap overflow-x-scroll res-slide"
          ref={containerRef}
        >
          {vegRes.map((res, index) => (
            <div key={index} className="inline-block rounded-xl mx-1">
              <Link to={`/${res._id}`}>
                <div className="transition hover:bg-secondary ease-in-out delay-150 cursor-pointer rounded-xl border-0 md:border-r-4 border-gray-200 duration-300 card bg-white text-black p-6 md:w-[28rem] hover:shadow-xl">
                  <figure>
                    <img
                      src={res.Image}
                      alt={res.Title}
                      className="aspect-[4/3] object-cover w-full"
                    />
                  </figure>
                  <div className="py-4">
                    <h2 className="card-title">{res.Title}</h2>
                    <p>{res.Place}</p>
                  </div>
                  <button className="w-full rounded-xl hover:rounded-2xl hover:bg-transparent hover:border-primary hover:border-4 hover:text-primary bg-primary py-2 duration-300 text-secondary font-semibold text-sm md:text-lg">
                    View Dishes
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {vegRes.length > 3 && (
          <button
            onClick={handlescrollRight}
            className="rounded-xl absolute bg-secondary text-2xl md:text-3xl z-40 right-0 cursor-pointer"
          >
            <MdOutlineNavigateNext />
          </button>
        )}
      </div>
    </div>
  </div>
  
  );
};

export default VegRes;
