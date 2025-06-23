import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar"; 
import "../Style/Profile.css";
import Dashboard from "../components/Dashboard";

const Profile = () => {
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
    navigate("/login");
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-grid">
      <div className="left-sidebar">
        <Sidebar onLogout={handleLogout} />
      </div>

      <div className="main-section">
        <Dashboard />
      </div>

      <div className="right-sidebar">
        <div className="profile-card hide-on-mobile">
          <h1 className="profile-heading">User Profile</h1>

          <img src="/undraw_developer-avatar_f6ac.svg" alt="User Avatar" className="profile-image" />

          <h2>{user.fullName}</h2>

          <div className="profile-info">
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role || "Admin"}
            </p>
          </div>

          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
