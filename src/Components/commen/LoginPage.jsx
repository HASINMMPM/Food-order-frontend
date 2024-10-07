import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEye as EyeIcon, FaEyeSlash as EyeOffIcon } from "react-icons/fa";
import { ContextList } from "./ContextListProvider";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<EyeIcon />);
  const [isSignup, setIsSignup] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false); // New State for OTP
  const [otp, setOtp] = useState(""); // Store OTP input
  const { setToken, URL } = useContext(ContextList);
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
  } = useForm();

  const navigate = useNavigate();

  // Handle OTP verification
  const handleOtpSubmit = async (data) => {
    console.log("try to verify");
    try {
      const response = await axios.post(`${URL}/user/verify/register`, {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        password: data.password,
        otp,
      });

      const token = response.data.token;
      setToken(token);
      document.cookie = `token=${token}; path=/; max-age=86400;`;

      Swal.fire({
        title: "Signup Successful",
        icon: "success",
        confirmButtonText: "Close",
      });
      navigate("/");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      console.log(error.response.data);
      Swal.fire(
        "Error",
        error.response?.data?.msg || "OTP verification failed",
        "error"
      );
    }
  };

  // Handle form submit for login/signup
  const onSubmit = async (data) => {
    console.log("try to submit");
    console.log("data", data);
    try {
      if (isSignup) {
        if (!isOtpSent) {
          // Step 1: Send phone number for OTP generation
          const response = await axios.post(`${URL}/user/usersignup`, {
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            password: data.password,
          });
          setIsOtpSent(true); // OTP sent, now show OTP field
          Swal.fire({
            title: "OTP Sent",
            text: "Please check your phone for the OTP.",
            icon: "success",
          });
        } else {
          // Step 2: Verify OTP
          handleOtpSubmit(data); // Now handle OTP verification
        }
      } else {
        // Login flow remains the same
        const response = await axios.post(`${URL}/user/userlogin`, data);
        console.log("response", response);
        const token = response.data.token;
        setToken(token);
        document.cookie = `token=${token}; path=/; max-age=86400;`;

        Swal.fire({
          title: "Login Successful",
          icon: "success",
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      Swal.fire(
        "Error",
        error.response?.data?.msg || "Authentication failed",
        "error"
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-semibold text-center text-primary font-sub-heading">
          {isSignup ? (isOtpSent ? "Verify OTP" : "Signup") : "Login"}
        </h1>

        {/* First Name and Last Name (Only for Signup) */}
        {isSignup && !isOtpSent && (
          <>
            <div className="flex flex-col">
              <label>First Name</label>
              <input
                {...register("firstName", { required: true })}
                className="p-2 border rounded"
                placeholder="First Name"
              />
              {errors.firstName && (
                <p className="text-red-600">First Name is required</p>
              )}
            </div>
            <div className="flex flex-col">
              <label>Last Name</label>
              <input
                {...register("lastName", { required: true })}
                className="p-2 border rounded"
                placeholder="Last Name"
              />
              {errors.lastName && (
                <p className="text-red-600">Last Name is required</p>
              )}
            </div>
          </>
        )}

        {/* Phone Number */}
        <div className="flex flex-col">
          <label>Phone Number</label>
          <input
            {...register("phoneNumber", {
              required: true,
              pattern: {
                value: /^(\+[0-9]{12}|[0-9]{10})$/,
                message: "Invalid phone number",
              },
            })}
            className="p-2 border rounded"
            placeholder="Phone Number with country code"
          />
          {errors.phoneNumber && (
            <p className="text-red-600">{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* OTP Input Field */}
        {isOtpSent && (
          <div className="flex flex-col">
            <label>OTP</label>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="p-2 border rounded"
              placeholder="Enter OTP"
            />
          </div>
        )}

        {/* Password */}
        {!isOtpSent && (
          <div className="flex flex-col">
            <label>Password</label>
            <div className="flex flex-row justify-between items-center">
              <input
                {...register("password", { required: true })}
                type={type}
                className="p-2 w-full rounded"
                placeholder="Password"
              />
              <span onClick={handleToggle} className="cursor-pointer">
                {icon}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-600">Password is required</p>
            )}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="p-2 bg-primary text-white rounded hover:bg-secondary hover:text-black duration-300"
        >
          {isSignup ? (isOtpSent ? "Verify OTP" : "Signup") : "Login"}
        </button>

        {/* Toggle Signup/Login */}
        {!isOtpSent && (
          <p
            className="text-center text-blue-600 cursor-pointer hover:underline"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup
              ? "Already have an account? Login here."
              : "Don't have an account? Signup here."}
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
