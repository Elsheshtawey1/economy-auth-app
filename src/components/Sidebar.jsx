import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { FaBars } from "react-icons/fa";
import "../Style/Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

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
          <HashLink smooth to="/account#add-file">
            Add File
          </HashLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
