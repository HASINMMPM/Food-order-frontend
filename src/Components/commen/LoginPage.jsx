import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaEye as eye } from "react-icons/fa";
import { FaEyeSlash as eyeOff } from "react-icons/fa";
import { useState } from "react";

const passexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .required()
      .matches(
        passexp,
        "include at least one uppercase letter, one lowercase letter, and one number"
      ),
  })
  .required();

const LoginPage = ({setLoginPage}) => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eye);
  const [title, setTitle] =useState("Signup")

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eyeOff);
      setType("text");
    } else {
      setIcon(eye);
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
  const onSubmit = (data) => console.log(data);

  return (
    <div className="flex flex-col justify-center items-center  h-lvh absolute z-40 max-h-max bg-black/40 w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 rounded-xl w-3/4 md:w-1/2 mx-auto bg-white overflow-hidden  shadow-2xl p-6"
      >
      <h1 className="text-4xl text-center font-semibold text-primary mb-6">{title}</h1>
        {title==="Signup"? 
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
              className="rounded-md p-2  bg-slate-50 outline-none shadow-md"
              placeholder="Last Name"
            />
          
          <p className="text-red-600">{errors.lastName?.message}</p>
        </div>
        </div>:<></>}

        <div className="flex flex-col">
          <label className="text-primary" htmlFor="number">
            Phone Number
          </label>
          <input
            {...register("email")}
            className="rounded-md p-2 bg-slate-50 outline-none shadow-md"
            placeholder="Phone number"
          />
          <p className="text-red-600">{errors.email?.message}</p>
        </div>

        <div className="flex flex-col">
          <label className="text-primary" htmlFor="password">
            Password
          </label>
          <div className="flex flex-row justify-center items-center rounded-md p-2  shadow-md bg-slate-50 ">
            <input
              type={type}
              {...register("password")}
              className="password outline-transparent bg-slate-50 border-0  w-full"
              placeholder="Password"
            />
            <span onClick={handleToggle}>{icon}</span>
          </div>
          <p className="text-red-600">{errors.password?.message}</p>
        </div>
        <div className="flex flex-row items-center gap-4">
          <input type="checkbox" required />
          <p>By clicking here, I state that I have read and understood the terms and conditions</p>
        </div>
        <div className="flex flex-col">
        {title ==="Signup"?
        <p className="cursor-pointer hover:text-blue-800" onClick={()=>setTitle ("Login")}>I have already an account</p>:
        <p className="cursor-pointer hover:text-blue-800" onClick={()=>setTitle ("Signup")}>Don't have an account yet?</p>
        }

        </div>

        <button
          type="submit"
          className="rounded-lg bg-primary mt-4 h-8 hover:bg-secondary text-white  hover:text-primary transition  "
        >{title}</button>
      </form>
      <button onClick={()=>setLoginPage(false)}  className="rounded-full bg-white mt-16 text-md md:text-2xl w-8 md:w-16 h-8 md:h-16 mx-auto ">x</button>
    </div>
  );
};

export default LoginPage;
