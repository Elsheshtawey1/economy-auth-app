import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

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
    navigate("/login"); // 
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>Welcome, {user.fullName}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role || "User"}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
