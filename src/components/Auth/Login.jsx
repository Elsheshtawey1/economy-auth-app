import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../validation/loginSchema";
import axios from "../../api/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../../Style/login.css";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (formData) => {
    try {
      toast.loading("Logging in...");
      const { data } = await axios.post("/auth/login", formData);
      localStorage.setItem("token", data.token);

      toast.dismiss();
      toast.success("Login successful 🎉");
      navigate("/profile");
    } catch (err) {
      toast.dismiss();
      toast.error("Login failed: Email or password is incorrect ❌");
      console.log("Login error:", err.response?.data);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <h2 className="form-title">Login</h2>

        <input type="email" placeholder="Email" {...register("email")} className="input-field" />
        {errors.email && <p className="error-text">{errors.email.message}</p>}

        <input type="password" placeholder="Password" {...register("password")} className="input-field" />
        {errors.password && <p className="error-text">{errors.password.message}</p>}

        <button type="submit" className="submit-button">
          Log In
        </button>

        <p className="form-link">
          Forgot your password? <Link to="/forgot-password">Reset here</Link>
        </p>
        <p className="form-link">
          Don't have an account? <Link to="/">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
