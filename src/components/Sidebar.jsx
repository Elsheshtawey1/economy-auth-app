import React, { useState } from "react";
import { FaHome, FaWallet, FaMoneyBillWave, FaPiggyBank, FaChartLine, FaUserCog, FaSignOutAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "../Style/Sidebar.css"; 

const Sidebar = ({ onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? "»" : "«"}
      </div>

      <div className="logo">
        <img src="/vite.svg" alt="Logo" />
      </div>

      <ul className="menu">
        <li>
          <NavLink to="/profile">
            <FaHome />
            {!isCollapsed && <span>Dashboard</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/budgets">
            <FaWallet />
            {!isCollapsed && <span>Budgets</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/expenses">
            <FaMoneyBillWave />
            {!isCollapsed && <span>Expenses</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/income">
            <FaPiggyBank />
            {!isCollapsed && <span>Income</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/analytics">
            <FaChartLine />
            {!isCollapsed && <span>Analytics</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/account">
            <FaUserCog />
            {!isCollapsed && <span>Account</span>}
          </NavLink>
        </li>
        <li onClick={onLogout}>
          <div className="logout-link">
            <FaSignOutAlt />
            {!isCollapsed && <span>Logout</span>}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
