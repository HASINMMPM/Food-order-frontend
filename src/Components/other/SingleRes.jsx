import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ContextList } from "../commen/ContextListProvider";
import FoodByres from "./FoodListByRes";
import ProtectRouter from "../commen/ProtectRouter";

const SingleRes = () => {
  const { id } = useParams();
  const { URL,token } = useContext(ContextList);
  const [singleRes, setSingleRes] = React.useState(null);
  const fetchSingleRes = async () => {
    try {
      const response = await axios.get(`${URL}/restuarant/restuarant/${id}`);
      const resData = response.data;
      setSingleRes(resData);
      console.log(resData);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    }
  };
  useEffect(() => {
    fetchSingleRes();
  }, []);

  return (
    <div className="mysection">
      {!token ? (
        <ProtectRouter />
      ) : (
        <main className="">
          {singleRes && (
            <div className="flex flex-col gap-3 md:flex-row bg-secondary rounded-none md:rounded-3xl p-4 justify-center items-center">
              <div className="w-full md:w-1/4 object-cover">
                <img className="w-full" src={singleRes.Image} alt={singleRes.Title} />
              </div>
              <div className="w-full md:w-3/4 flex flex-col gap-3 md:flex-row">
                <div className="flex flex-col w-full md:w-1/2">
                  <h2 className="text-xl md:text-2xl font-bold text-primary">{singleRes.Title}</h2>
                  <p className="text-lg md:text-xl font-semibold text-primary">{singleRes.Place}</p>
                </div>
                <p className="w-full text-black md:w-1/2">{singleRes.Description}</p>
              </div>
            </div>
          )}
          <FoodByres />
        </main>
      )}
    </div>
  );
  
};

export default SingleRes;
