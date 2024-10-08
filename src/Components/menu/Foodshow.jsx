import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import FoodCard from "./foodCard";
import { ContextList } from "../commen/ContextListProvider";

const Foodshow = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [foods, setFoods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const { URL } = useContext(ContextList);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const responseCat = await axios.get(`${URL}/category/getall`);
        const catData = responseCat.data;
        const sortedCat = catData.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        setCategories(sortedCat);

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
    if (selectedCategory === "All") {
      return foods;
    } else {
      return foods.filter((food) =>
        food.categories.includes(selectedCategory)
      );
    }
  }

  function renderData() {
    const filteredFoods = getFilteredFoods();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredFoods.slice(startIndex, endIndex);

    return (
      <div>
        <div>
          <hr className="h-[0.250rem] w-full my-2 bg-secondary border-0" />
          <div className="grid grid-cols-4 gap-5 md:gap-0 md:grid-cols-8 lg:grid-cols-10 py-2">
            {loading ? (
              <p>Categories Loading...</p>
            ) : (
              categories.map((item) => (
                <div
                  onClick={() =>
                    setSelectedCategory((prev) =>
                      prev === item._id ? "All" : item._id
                    )
                  }
                  key={item._id}
                  className="flex flex-col justify-center items-center cursor-pointer hover:bg-secondary"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className={
                      selectedCategory === item._id
                        ? "border-4 p-0.5 border-primary object-fit h-20 w-20 rounded-full"
                        : "object-fit h-20 w-20 rounded-full"
                    }
                  />
                  <h2>{item.name}</h2>
                </div>
              ))
            )}
          </div>
          <hr className="h-[0.250rem] w-full my-2 bg-secondary border-0" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading ? (
              <div className="lds-ellipsis flex justify-center items-center w-full text-primary">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              currentItems.map((dishes, i) => (
                <FoodCard key={i} dishes={dishes} className='animation' />
              ))
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
              className="bg-primary p-2 rounded-3xl h-10 w-10"
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

export default Foodshow;
