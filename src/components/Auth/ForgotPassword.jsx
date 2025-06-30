import React, { useState } from "react";
import axios from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../Style/forgot-password.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/auth/send-code", { email: email.trim() });

      await Swal.fire({
        icon: "success",
        title: "Verification code has been sent to your email.",
        showConfirmButton: false,        
        timer: 2000,
      });

      navigate("/reset-password", { state: { email } });
    } catch (err) {
      // console.log("Send code error:", err.response?.data);
      Swal.fire({
        icon: "error",
        title: "Failed to send code",
        text: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="form-title">Forgot Password</h2>

        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" required />

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Sending..." : "Send Code"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
