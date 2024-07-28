import { Link } from "react-router-dom";

const RestorantCard = ({ restaurant }) => {
  const place = (restaurant.place);
  return (
    <div className=" py-14">
      <Link to={`/${restaurant.name}/${restaurant._id}`}>
        <div className="w-96 transition hover:bg-secondary ease-in-out delay-150 cursor-pointer   rounded-xl hover:-translate-y-1  hover:scale-105 border-0 md:border-r-4 border-gray-200 duration-300  card bg-white text-black  md:w-96 hover:shadow-xl">
          <figure>
            <img src={restaurant.image} alt={restaurant.name}  className="bg-yellow bgshaper"/>
          </figure>
          <div className="py-4">
            <h2 className="card-title">{restaurant.name}</h2>
            <p>{place}</p></div>
            <button className="w-full rounded-xl hover:rounded-2xl hover:bg-transparent hover:border-primary hover:border-4 hover:text-primary bg-primary py-2 duration-300 text-secondary font-semibold text-lg">View Dishes</button>
          
          
        </div>
      </Link>
    </div>
  );
};

export default RestorantCard;
