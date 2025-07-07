import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-layout">
      <div className="sidebar">
        <Sidebar onLogout={handleLogout} />
      </div>

      <div className="dashboard-content">
        <main className="main-content">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
