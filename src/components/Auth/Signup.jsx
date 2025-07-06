import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../validation/signupSchema";
import instance from "../../api/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../../Style/signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      Swal.fire({
        title: "Creating account...",
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });


      await instance.post("/auth/signup", formData);

      Swal.close();


      await Swal.fire({
        icon: "success",
        title: "Account created successfully",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate("/login");
    } catch (err) {
      Swal.close(); 
      Swal.fire({
        icon: "error",
        title: "Signup failed",
        text: err.response?.data?.message || "Something went wrong",
      });
      // console.log("Signup error:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <img src="/final logo 2.png" alt="Family Logo" className="form-logo-top" />
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

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="form-link">
          Already have an account? <Link to="/login">Click here</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
