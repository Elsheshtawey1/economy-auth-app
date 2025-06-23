import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../validation/signupSchema";
// import axios from "../../api/axiosInstance";
import instance from "../../api/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../../Style/signup.css"; 

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (formData) => {
    try {
      toast.loading("Creating account...");
      await instance.post("/auth/signup", formData);
      toast.dismiss();
      toast.success("Account created successfully. You can now log in.");
      navigate("/login");
    } catch (err) {
      toast.dismiss();
      toast.error("Signup failed: " + (err.response?.data?.message || "Something went wrong"));
      console.log("Signup error:", err.response?.data);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <h2 className="form-title">Sign Up</h2>

        <input type="text" placeholder="Full Name" {...register("fullName")} className="input-field" />
        {errors.fullName && <p className="error-text">{errors.fullName.message}</p>}

        <input type="email" placeholder="Email" {...register("email")} className="input-field" />
        {errors.email && <p className="error-text">{errors.email.message}</p>}

        <input type="password" placeholder="Password" {...register("password")} className="input-field" />
        {errors.password && <p className="error-text">{errors.password.message}</p>}

        <input type="password" placeholder="Confirm Password" {...register("cPassword")} className="input-field" />
        {errors.cPassword && <p className="error-text">{errors.cPassword.message}</p>}

        <button type="submit" className="submit-button">
          Sign Up
        </button>
        <p className="form-link">
          Already have an account? <Link to="/login">Click here</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
