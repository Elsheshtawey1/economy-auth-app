import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "../../validation/resetPasswordSchema";
import axios from "../../api/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../..//Style/reset-password.css";

const ResetPassword = () => {
  const { state } = useLocation();
  const email = state?.email || "";
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (formData) => {
    try {
      toast.loading("Resetting password...");
      await axios.post("/auth/forget-password", {
        email: email.trim(),
        code: formData.code,
        password: formData.password,
      });
      toast.dismiss();
      toast.success("Password reset successful! You can now log in.");
      navigate("/login");
    } catch (err) {
      toast.dismiss();
      toast.error("Reset failed ❌");
      console.log("Reset password error:", err.response?.data);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <h2 className="form-title">Reset Password</h2>

        <input type="text" placeholder="Enter verification code" {...register("code")} className="input-field" />
        {errors.code && <p className="error-text">{errors.code.message}</p>}

        <input type="password" placeholder="New password" {...register("password")} className="input-field" />
        {errors.password && <p className="error-text">{errors.password.message}</p>}

        <input type="password" placeholder="Confirm new password" {...register("cPassword")} className="input-field" />
        {errors.cPassword && <p className="error-text">{errors.cPassword.message}</p>}

        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
