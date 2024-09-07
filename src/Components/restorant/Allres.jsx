import React, { useState, useContext } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";
import { ContextList } from "../commen/ContextListProvider";

const Allres = () => {
  const { restaurant, loading } = useContext(ContextList);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  function renderData() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = restaurant.slice(startIndex, endIndex);

    return (
      <div>
        <div>
          <hr className="h-[0.250rem] w-full my-4 bg-black border-0 " />
          <h3 className="text-center font-sub-heading font-bold text-xl md:text-3xl text-primary py-4">
            All Restaurant{" "}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {loading ? (
              <div className="lds-ellipsis flex justify-center items-center w-full text-primary">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : currentItems.length ? (
              currentItems.map((res, i) => (
                <Link to={`/restaurant/${res._id}`}>
                  <div
                    key={res._id}
                    className="transition hover:bg-secondary ease-in-out delay-150 cursor-pointer rounded-xl  hover:scale-105 border-0 md:border-r-4 border-gray-200 duration-300 card bg-white text-black p-6 md:w-[28rem] hover:shadow-xl"
                  >
                    <figure>
                      <img
                        src={res.Image}
                        alt={res.Title}
                        className="bg-yellow bgshaper bg-slate-950 lg:h-80 bg-cover w-full"
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
              ))
            ) : (
              <p>No restaurants available</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  function goToNextPage() {
    setCurrentPage((prevPage) => prevPage + 1);
  }

  function goToPrevPage() {
    setCurrentPage((prevPage) => prevPage - 1);
  }

  function goToSpecificPage(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function renderPaginationControls() {
    const totalPages = Math.ceil(restaurant.length / itemsPerPage);

    return (
      <div className="text-white pb-16">
        <hr className="h-[0.250rem] w-full my-6 bg-secondary border-0" />
        <div className="flex flex-row gap-2 md:gap-4 justify-center items-center">
          <button
            className="bg-primary p-2 rounded-3xl h-10 w-10"
            onClick={goToPrevPage}
            disabled={currentPage === 1}
          >
            <GrFormPrevious className="text-xl" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              className={`bg-primary p-2 rounded-3xl h-10 w-10 ${
                currentPage === i + 1 ? "bg-secondary" : ""
              }`}
              key={i}
              onClick={() => goToSpecificPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="bg-primary p-2 rounded-3xl h-10 w-10"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            <MdNavigateNext className="text-xl" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {renderData()}
      {renderPaginationControls()}
    </div>
  );
};

export default Allres;
