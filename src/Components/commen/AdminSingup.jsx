import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaEye as EyeIcon, FaEyeSlash as EyeOffIcon } from "react-icons/fa";
import axios from "axios";

import Swal from "sweetalert2";
import { ContextList } from "./ContextListProvider";

// Regular expression for password validation
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

const schema = yup
  .object({
    fullName: yup.string().when("signup", {
      is: true,
      then: yup.string().required("Full name is required"),
    }),
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Password must include at least one uppercase letter, one lowercase letter, and one number"
      ),
  })
  .required();

const AdminSignup = () => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<EyeIcon />);
  const {URL}=useContext(ContextList)

  const handleToggle = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
    setIcon((prevIcon) =>
      prevIcon.type === EyeIcon ? <EyeOffIcon /> : <EyeIcon />
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitSignup = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(`${URL}/admin/adminsignup`, data);
      console.log(response);
      const token = response.data.token;
      console.log("Token received:", token);

      Swal.fire({
        text: "Signup successful",
        icon: "success",
        timer: 3000,
        showConfirmButton: true,
      });
      window.location.replace("http://localhost:5174/");
    } catch (error) {
      console.log(error.response?.data || error.message || "error");
      Swal.fire({
        text: "Signup failed. Please try again.",
        icon: "error",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };
  const loginAdmin= ()=>{
    window.location.replace("http://localhost:5174/")
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-signbg   bg-cover">
      <form
        onSubmit={handleSubmit(submitSignup)}
        className="flex flex-col gap-3 rounded-xl w-3/4 md:w-1/2 mx-auto bg-white/25 overflow-hidden shadow-2xl p-6"
      >
        <h1 className="text-4xl text-center font-semibold text-primary mb-6">
          Restaurent Owner Signup
        </h1>

        <div className="flex flex-col gap-2">
          <label className="text-primary" htmlFor="fullName">
            Full Name
          </label>
          <input
            {...register("fullName")}
            className="rounded-md p-2 bg-slate-50 outline-none shadow-md"
            placeholder="Full Name"
          />
          <p className="text-red-600">{errors.fullName?.message}</p>
        </div>

        <div className="flex flex-col">
          <label className="text-primary" htmlFor="email">
            Email
          </label>
          <input
            {...register("email")}
            className="rounded-md p-2 bg-slate-50 outline-none shadow-md"
            placeholder="Email"
          />
          <p className="text-red-600">{errors.email?.message}</p>
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
            <span onClick={handleToggle} className="cursor-pointer">
              {icon}
            </span>
          </div>

          <p className="text-red-600">{errors.password?.message}</p>
        </div>

        <div className="flex flex-row items-center gap-4">
          <input type="checkbox" required />
          <p>
            By clicking here, I state that I have read and understood the terms
            and conditions
          </p>
        </div>
        <span onClick={()=>loginAdmin()} className="text-center cursor-pointer duration-300 text-black hover:text-primary ">I am already Registred</span>

        <button
          type="submit"
          className="rounded-lg bg-primary mt-4 h-8 hover:bg-secondary text-white hover:text-primary transition"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default AdminSignup;
