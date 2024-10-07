import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/Logo.png";
import { ContextList } from "./ContextListProvider";

const Header = () => {
  const [paramsId, setParamsId] = useState("");
  const { setLoginPage, setToken, token, cartItems, id } =
    useContext(ContextList);
  const navigate = useNavigate();

  useEffect(() => {
    const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
      const [key, value] = cookie.split("=");
      acc[key] = value;
      return acc;
    }, {});

    if (cookies.token) {
      setToken(cookies.token);
    }
  }, [setToken]);

  useEffect(() => {
    if (!token) {
      const sampleParams = 123;
      setParamsId(sampleParams);
    } else {
      setParamsId(id);
      console.log(paramsId);
    }
  }, [token, id]);

  const logOut = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"; // Clear the token cookie
    setToken(null);
    setLoginPage(true); // Show the login page when the user logs out
    navigate("/"); // Navigate to the home page
    location.reload(); // Reload the page
  };

  const navItems = (
    <>
      <li className="text-primary hover:text-black text-2xl ">
        <Link to="/">Home</Link>
      </li>
      <li className="text-primary hover:text-black text-2xl ">
        <Link to="/menu">Menu</Link>
      </li>
      <li className="text-primary hover:text-black text-2xl ">
        <Link to="/restaurant">Restaurant</Link>
      </li>
    </>
  );

  return (
    <header className="max-w-screen-2xl container mx-auto bg-secondary">
      <div className="navbar xl:px-24">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden text-red"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-secondary rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
          <Link to="/" className="text-xl text-red font-bold">
            <img src={logo} alt="" className="w-16" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-red">{navItems}</ul>
        </div>

        <div className="navbar-end">
          {/* Cart */}
          <div
            tabIndex={0}
            role="button"
            className="btn mr-4 bg-secondary btn-circle text-black md:flex"
          >
            <Link to={`/cart/${paramsId}`}>
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 4 4 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item bg-primary text-white p-2 flex items-center">
                  {Object.keys(cartItems).length}
                </span>
              </div>
            </Link>
          </div>
          {/* Cart end */}
          {!token ? (
            <Link to="/account">
              <button className="btn bg-primary text-secondary cursor-pointer duration-300 hover:bg-secondary hover:text-black text-yellow rounded-full flex items-center">
                Login
              </button>
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Profile"
                    src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3467.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className=" dropdown-content  z-[1] mt-3 w-52 p-2 shadow flex flex-col gap-2"
              >
                {/* <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li> */}
                <li className="bg-slate-200 text-black cursor-pointer text-center duration-300 hover:bg-secondary hover:text-black flex items-center py-[5px] justify-center">
                  <Link to="/order" className="w-full">
                    Orders
                  </Link>
                </li>
                <li className="bg-slate-200 text-black cursor-pointer text-center duration-300 hover:bg-secondary hover:text-black flex items-center py-[5px] justify-center">
                  <a onClick={logOut}>Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
