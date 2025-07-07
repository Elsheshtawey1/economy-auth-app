import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "../Style/Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login");
  };

  return (
    <nav className="main-navbar">
      <div className="logo">
        <img src="/21024940-Media-article-1 1 logo.svg" alt="Family Logo" loading="lazy" className="logo" />
      </div>

      <div className="menu-toggle" onClick={toggleMenu}>
        <FaBars />
      </div>

      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/account">Admin</NavLink>
        </li>
        <li>
          <NavLink to="/UploadFile">Add File</NavLink>
        </li>
        <li>
          <button onClick={handleLogout} className="logout-link">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
