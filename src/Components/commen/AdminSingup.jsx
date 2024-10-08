import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaEye as EyeIcon, FaEyeSlash as EyeOffIcon } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { ContextList } from "./ContextListProvider";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

const otpSchema = yup
  .object({
    email: yup.string().required("Email is required").email("Invalid email"),
  })
  .required();

const signupSchema = yup
  .object({
    fullName: yup.string().required("Full name is required"),
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Password must include at least one uppercase letter, one lowercase letter, and one number"
      ),
    otp: yup.string().required("OTP is required"),
  })
  .required();

const AdminSignup = () => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<EyeIcon />);
  const [otpsend, setOtpsend] = useState(false);
  const { URL } = useContext(ContextList);
  const [email, setEmail] = useState("");

  const handleToggle = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
    setIcon((prevIcon) =>
      prevIcon.type === EyeIcon ? <EyeOffIcon /> : <EyeIcon />
    );
  };

  const {
    register: registerOtp,
    handleSubmit: handleSubmitOtp,
    formState: { errors: errorsOtp },
    reset: resetOtp,
  } = useForm({
    resolver: yupResolver(otpSchema),
  });

  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: errorsSignup },
    reset: resetSignup,
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  // Submit OTP
  const submitOtp = async (data) => {
    console.log("OTP Form Data:", data);
    try {
      setEmail(data.email);
      const response = await axios.post(`${URL}/otp/send`, data);
      console.log("OTP Send Response:", response);
      Swal.fire({
        text: `Check your mail`,
        icon: "success",
        timer: 3000,
        showConfirmButton: true,
      });

      setOtpsend(true);
      resetOtp();
    } catch (error) {
      console.log(
        "OTP Send Error:",
        error.response?.data || error.message || "error"
      );
      Swal.fire({
        text: "OTP send failed. Please try again.",
        icon: "error",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  // Submit Signup
  const submitSignup = async (data) => {
    console.log("Signup Form Data:", data);
    try {
      const response = await axios.post(`${URL}/admin/adminsignup`, data);
      console.log("Signup Response:", response);
      const token = response.data.token;

      Swal.fire({
        text: "Signup successful",
        icon: "success",
        timer: 3000,
        showConfirmButton: true,
      });
      window.location.replace("https://capston-admin-food-del.onrender.com");
    } catch (error) {
      console.log(error);
      Swal.fire({
        text: error.response.data.message,
        icon: "error",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  const loginAdmin = () => {
    window.location.replace("https://capston-admin-food-del.onrender.com");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-signbg bg-cover">
      {otpsend ? (
        // Signup Form
        <form
          onSubmit={handleSubmitSignup(submitSignup)}
          className="flex flex-col gap-3 rounded-xl w-3/4 md:w-1/2 mx-auto bg-white/25 overflow-hidden shadow-2xl p-6"
        >
          <h1 className="text-4xl text-center font-semibold text-primary mb-6">
            Restaurant Owner Signup
          </h1>

          <div className="flex flex-col gap-2">
            <label className="text-primary" htmlFor="fullName">
              Full Name
            </label>
            <input
              {...registerSignup("fullName")}
              className="rounded-md p-2 bg-slate-50 outline-none shadow-md"
              placeholder="Full Name"
            />
            <p className="text-red-600">{errorsSignup.fullName?.message}</p>
          </div>

          <div className="flex flex-col">
            <label className="text-primary" htmlFor="email">
              Email
            </label>
            <input
              {...registerSignup("email")}
              className="rounded-md p-2 bg-slate-50 outline-none shadow-md"
              placeholder={email}
            />
            <p className="text-red-600">{errorsSignup.email?.message}</p>
          </div>

          <div className="flex flex-col">
            <label className="text-primary" htmlFor="password">
              Password
            </label>
            <div className="flex flex-row justify-center items-center rounded-md p-2 shadow-md bg-slate-50">
              <input
                type={type}
                {...registerSignup("password")}
                className="password outline-transparent bg-slate-50 border-0 w-full"
                placeholder="Password"
              />
              <span onClick={handleToggle} className="cursor-pointer">
                {icon}
              </span>
            </div>
            <p className="text-red-600">{errorsSignup.password?.message}</p>
          </div>

          <div className="flex flex-col">
            <label className="text-primary" htmlFor="otp">
              OTP
            </label>
            <input
              {...registerSignup("otp")}
              className="rounded-md p-2 bg-slate-50 outline-none shadow-md"
              placeholder="Enter OTP"
            />
            <p className="text-red-600">{errorsSignup.otp?.message}</p>
          </div>

          <div className="flex flex-row items-center gap-4">
            <input type="checkbox" required />
            <p>
              By clicking here, I state that I have read and understood the
              terms and conditions
            </p>
          </div>

          <span
            onClick={loginAdmin}
            className="text-center cursor-pointer duration-300 text-black hover:text-primary "
          >
            I am already Registered
          </span>

          <button
            type="submit"
            className="rounded-lg bg-primary mt-4 h-8 hover:bg-secondary text-white hover:text-primary transition"
          >
            Signup
          </button>
        </form>
      ) : (
        // Send OTP Form
        <form
          onSubmit={handleSubmitOtp(submitOtp)}
          className="flex flex-col gap-3 rounded-xl w-3/4 md:w-1/2 mx-auto bg-white/25 overflow-hidden shadow-2xl p-6"
        >
          <h1 className="text-4xl text-center font-semibold text-primary mb-6">
            Send OTP
          </h1>

          <div className="flex flex-col gap-2">
            <label className="text-primary" htmlFor="email">
              Email
            </label>
            <input
              {...registerOtp("email")}
              className="rounded-md p-2 bg-slate-50 outline-none shadow-md"
              placeholder="Enter your email"
            />
            <p className="text-red-600">{errorsOtp.email?.message}</p>
          </div>

          <button
            type="submit"
            className="rounded-lg bg-primary mt-4 h-8 hover:bg-secondary text-white hover:text-primary transition"
          >
            Send OTP
          </button>
          <span
            onClick={loginAdmin}
            className="text-center cursor-pointer duration-300 text-black hover:text-primary "
          >
            I am already Registered
          </span>
        </form>
      )}
     
    </div>
  );
};

export default AdminSignup;
