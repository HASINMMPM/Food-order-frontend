import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import { ContextList } from "../commen/ContextListProvider";
import FoodCard from "../menu/foodCard";
import { useParams } from "react-router-dom";

const FoodByres = () => {
  const [loading, setLoading] = useState(true);
  const [foods, setFoods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const { URL } = useContext(ContextList);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const responseFood = await axios.get(`${URL}/food/allfood`);
        const foodData = responseFood.data;
        setFoods(foodData);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, [URL]);

  function getFilteredFoods() {
    return foods.filter((dishes) => dishes.restaurant === id);
  }

  function renderData() {
    const filteredFoods = getFilteredFoods();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredFoods.slice(startIndex, endIndex);

    return (
      <div>
      <hr className="border-2 border-black my-8" />

  
      {currentItems.length === 0 ? (<></>):
            (<div className="flex flex-col justify-center items-center">
              <h2 className="uppercase text-red-700 tracking-widest font-super-sub-font text-xs md:text-xl text-center font-semibold py-4">
              Tempting Treats Await
              </h2>
              <p className="font-semibold py-2">
              Dive into a world of flavors, with dishes crafted to satisfy every craving and delight your senses
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mt-6">
                {currentItems.length > 0 ? (
                  currentItems.map((dishes, i) => (
                    <FoodCard key={i} dishes={dishes} className="animation" />
                  ))
                ) : (
                  <p>No related foods found.</p>
                )}
              </div>
            </div>)
          
          }
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
    const totalPages = Math.ceil(getFilteredFoods().length / itemsPerPage);

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

export default FoodByres;
