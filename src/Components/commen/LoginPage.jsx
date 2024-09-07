import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaEye as Eye, FaEyeSlash as EyeOff } from "react-icons/fa";
import axios from "axios";
import { ContextList } from "./ContextListProvider";
import Swal from "sweetalert2";

const passexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
const phoneExp = /^(\+[0-9]{12}|[0-9]{10})$/;

const schema = yup
  .object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    phoneNumber: yup
      .string()
      .matches(phoneExp, "Invalid phone number")
      .required("Phone Number is required"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        passexp,
        "Password must include at least one uppercase letter, one lowercase letter, and one number"
      ),
  })
  .required();

const LoginPage = () => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(Eye);
  const [title, setTitle] = useState("Signup");

  const { setToken, URL, setLoginPage } = useContext(ContextList);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(EyeOff);
      setType("text");
    } else {
      setIcon(Eye);
      setType("password");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitSignup = async (data) => {
    try {
      const response = await axios.post(`${URL}/user/usersignup`, data);
      const token = response.data.token;
      console.log("Signup response:", response);
      console.log("Token received:", token);

      if (token) {
        setToken(token);
        document.cookie = `token=${token}; path=/; max-age=86400;`;

        setLoginPage(false);

        Swal.fire({
          text: "Signup successful",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        throw new Error("No token received");
      }
      console.log("Signup");
    } catch (error) {
      console.log(error.response.data.msg);
      Swal.fire({
        text: error.response.data.msg,
        icon: "error",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };
  // console.log(`${URL}/user/userlogin`);
  // const submitLogin = async (data) => {
  //   console.log("Form data:", data);
  //   try {
  //     console.log("Login");
  //     const response = await axios.post(
  //       `http://localhost:3000/v1/user/userlogin`,
  //       data
  //     );

  //     const token = response.data.token;
  //     console.log("Login response:", response);
  //     console.log("Token received:", token);

  //     setToken(token);
  //     document.cookie = `token=${token}; path=/; max-age=86400;`;

  //     setLoginPage(false);

  //     Swal.fire({
  //       text: "Login successful",
  //       icon: "success",
  //       timer: 1000,
  //       showConfirmButton: false,
  //     });
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     Swal.fire({
  //       text: `Login failed. ${error.response?.data?.msg || error.message}`,
  //       icon: "error",
  //       timer: 3000,
  //       showConfirmButton: false,
  //     });
  //   }
  // };
  const submitLogin = async (data) => {
    console.log("Form data:", data);
  };

  return (
    <div className="flex flex-col justify-center items-center h-lvh absolute z-40 max-h-max bg-black/40 w-full ">
      {title === "Signup" ? (
        <form
          onSubmit={handleSubmit(submitSignup)}
          className="flex flex-col gap-3 rounded-xl w-3/4 md:w-1/2 mx-auto bg-white overflow-hidden shadow-2xl p-6 "
        >
          <h1 className="text-4xl text-center font-semibold text-primary mb-6">
            {title}
          </h1>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <label className="text-primary" htmlFor="firstname">
                First Name
              </label>
              <input
                {...register("firstName")}
                className="rounded-md p-2 bg-slate-50 outline-none shadow-md"
                placeholder="First Name"
              />
              <p className="text-red-600">{errors.firstName?.message}</p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-primary" htmlFor="lastname">
                Last Name
              </label>
              <input
                {...register("lastName")}
                className="rounded-md p-2 bg-slate-50 outline-none shadow-md"
                placeholder="Last Name"
              />
              <p className="text-red-600">{errors.lastName?.message}</p>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-primary" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              {...register("phoneNumber")}
              className="rounded-md p-2 bg-slate-50 outline-none shadow-md"
              placeholder="Enter your phone number"
            />
            <p className="text-red-600">{errors.phoneNumber?.message}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-primary" htmlFor="password">
              Password
            </label>
            <div className="flex flex-row justify-center items-center rounded-md p-2 shadow-md bg-slate-50">
              <input
                type={type}
                {...register("password")}
                className="password outline-transparent bg-slate-50 border-0 w-full"
                placeholder="Password"
              />
              <span onClick={handleToggle}>{icon}</span>
            </div>
            <p className="text-red-600">{errors.password?.message}</p>
          </div>

          <div className="flex flex-row items-center gap-4">
            <input type="checkbox" required />
            <p>
              By clicking here, I state that I have read and understood the
              terms and conditions
            </p>
          </div>

          <div className="flex flex-col">
            <p
              className="cursor-pointer hover:text-blue-800"
              onClick={() => setTitle("Login")}
            >
              I already have an account
            </p>
          </div>
          <button
            type="submit"
            className="rounded-lg bg-primary mt-4 h-8 hover:bg-secondary text-white hover:text-primary transition"
          >
            {title}
          </button>
        </form>
      ) : (
        //  LOGIN

        <form
          onSubmit={handleSubmit(submitLogin)}
          className="flex flex-col gap-3 rounded-xl w-3/4 md:w-1/2 mx-auto bg-white overflow-hidden shadow-2xl p-6 "
        >
          <h1 className="text-4xl text-center font-semibold text-primary mb-6">
            {title}
          </h1>

          <div className="flex flex-col">
            <label className="text-primary" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              {...register("phoneNumber")}
              className="rounded-md p-2 bg-slate-50 outline-none shadow-md"
              placeholder="Enter your phone number"
            />
            <p className="text-red-600">{errors.phoneNumber?.message}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-primary" htmlFor="password">
              Password
            </label>
            <div className="flex flex-row justify-center items-center rounded-md p-2 shadow-md bg-slate-50">
              <input
                type={type}
                {...register("password")}
                className="password outline-transparent bg-slate-50 border-0 w-full"
                placeholder="Password"
              />
              <span onClick={handleToggle}>{icon}</span>
            </div>
            <p className="text-red-600">{errors.password?.message}</p>
          </div>

          <div className="flex flex-col">
            <p
              className="cursor-pointer hover:text-blue-800"
              onClick={() => setTitle("Signup")}
            >
              Don't have an account yet?
            </p>
          </div>
          <button
            type="submit"
            className="rounded-lg bg-primary mt-4 h-8 hover:bg-secondary text-white hover:text-primary transition"
          >
            {title}
          </button>
        </form>
      )}
      <button
        onClick={() => setLoginPage(false)}
        className="rounded-full bg-white mt-16 text-md md:text-2xl w-8 md:w-16 h-8 md:h-16 mx-auto"
      >
        x
      </button>
    </div>
    // <button onClick={()=>submitLogin()}>click</button>
  );
};

export default LoginPage;
