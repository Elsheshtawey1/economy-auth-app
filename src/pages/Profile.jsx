import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import Loader from "../components/Loader";

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

  if (!user) return <div>
    <Loader />
  </div>;

  return (
    <div className="profile-grid">
      <div className="left-sidebar">
        <Sidebar onLogout={handleLogout} />
      </div>

      <div className="main-section">
        <Dashboard />
      </div>
    </div>
  );
};

export default Profile;
