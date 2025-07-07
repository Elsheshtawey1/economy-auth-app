import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import "../Style/Account.css";
import Loader from "../components/Loader";

function Account() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/user/profile")
      .then((res) => setUser(res.data.user))
      .catch((err) => {
        console.log("Error loading profile:", err);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // أو "/" حسب ما تحب
  };

  if (!user) {
    return (
      <div className="account-container">
        <Loader />
      </div>
    );
  }

  return (
    <div className="account-container">
      <div className="profile-wrapper account-card">
        <div className="profile-card">
          <h1 className="profile-heading">Admin Profile</h1>
          <img src="/undraw_developer-avatar_f6ac.svg" alt="User Avatar" className="profile-image" />
          <h2>{user.fullName}</h2>
          <div className="profile-info">
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role || "admin"}
            </p>
          </div>

          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Account;
