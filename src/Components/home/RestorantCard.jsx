import { Link } from "react-router-dom";

const RestorantCard = ({ restaurant }) => {

  return (
    <div className=" py-14">
      <Link to={`restaurant/${restaurant._id}`}>
        <div className=" transition hover:bg-secondary ease-in-out delay-150 cursor-pointer   rounded-xl hover:-translate-y-1  hover:scale-105 border-0 md:border-r-4 border-gray-200 duration-300  card bg-white text-black p-6  md:w-[28rem] hover:shadow-xl">
          <figure>
            <img src={restaurant.Image} alt={restaurant.name}  className="bgshaper  bg-slate-950  lg:h-80 bg-cover w-full"/>
          </figure>
          <div className="py-4">
            <h2 className="card-title">{restaurant.Title}</h2>
            <p>{restaurant.Place}</p></div>
            <button className="w-full  rounded-xl hover:rounded-2xl hover:bg-transparent hover:border-primary hover:border-4 hover:text-primary bg-primary py-2 duration-300 text-secondary font-semibold text-sm md:text-lg">View Dishes</button>
          
          
        </div>
      </Link>
    </div>
  );
};

export default RestorantCard;