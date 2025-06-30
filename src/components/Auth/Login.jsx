import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../validation/loginSchema";
import instance from "../../api/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../../Style/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      // عرض Loader
      Swal.fire({
        title: "Logging in...",
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const { data } = await instance.post("/auth/login", formData);
      localStorage.setItem("token", data.token);

      Swal.close();
      await Swal.fire({
        icon: "success",
        title: "Login successful 🎉",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/profile");
    } catch (err) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: "Email or password is incorrect ❌",
      });
      console.log("Login error:", err.response?.data);
    } finally {
      setLoading(false);
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

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
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
