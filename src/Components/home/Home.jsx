import React, { useContext, useState } from "react";
import Banner from "./Banner";
import Toprestorant from "./Toprestorant";
import Custemerreview from "./Custemerreview";
import Services from "./Services";
import StandoutDishes from "./StandoutDishes";
import axios from "axios";
import { ContextList } from "../commen/ContextListProvider";
import Swal from "sweetalert2";

const Home = () => {
  const { URL, token } = useContext(ContextList);
  const [comment, setComment] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(""); 

  const commentHandler = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post(
        `${URL}/add/comment`,
        { comment },
        {
          headers: {
            token
          },
        }
      );
      console.log(response.data);
      Swal.fire({
        text: "comment added successfully",
        icon: "success",
        timer: 1000,
      });
      setComment("");
      setErrorMessage("");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.error)
    }
  };

  return (
    <section className="mysection">
      <Banner />
      <StandoutDishes />
      <Custemerreview />
      <Toprestorant />
      <Services />

      <form
        onSubmit={commentHandler}
        className="h-10 flex flex-col md:flex-row gap-2 mt-3"
      >
        <textarea
          value={comment} 
          onChange={(e) => setComment(e.target.value)} 
          placeholder="Leave a comment"
          className="w-3/4"
          disabled={!token} 
        />
        <button
          className={`w-full md:w-auto px-4 rounded-md p-2 h-full duration-300 ${
            token
              ? "bg-primary hover:bg-secondary text-secondary hover:text-primary"
              : "bg-gray-400 text-gray-800 cursor-not-allowed"
          }`}
          type="submit"
          disabled={!token} 
        >
          {token ? "Submit" : "Please login"}
        </button>
      </form>

      {/* Display error message if comment is empty */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </section>
  );
};

export default Home;
