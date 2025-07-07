import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import Dashboard from "../components/Dashboard";
import Loader from "../components/Loader";
import ErrorBoundary from "../components/ErrorBoundary";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("/user/profile")
      .then((res) => setUser(res.data.user))
      .catch((err) => {
        console.error("Error loading profile:", err);
      });
  }, []);

  if (!user) return <Loader />;

  return (
    <ErrorBoundary>
      <Dashboard />
    </ErrorBoundary>
  );
};

export default Profile;
