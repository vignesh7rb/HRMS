import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaThLarge, FaUsers, FaMoneyBill, FaBox, FaWallet } from "react-icons/fa";
import "../../../assets/styles/sidebar/sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const [showEmployeeMenu, setShowEmployeeMenu] = useState(location.pathname.includes("/employee"));

  const isActive = (path) => location.pathname === path;
  const isEmployeeActive = location.pathname.includes("/employee");

  return (
    <div className="sidebar">
      {/* Logo / Title */}
      <div className="sidebar-header">
        Crest Climbers
      </div>

      {/* Menu */}
      <div className="sidebar-menu">
        <Link to="/dashboard" className={`sidebar-item ${isActive("/dashboard") ? "active" : ""}`}>
          <FaThLarge className="icon" />
          <span>Dashboard</span>
        </Link>

        <div
          className={`sidebar-item ${isEmployeeActive ? "active" : ""}`}
          onClick={() => setShowEmployeeMenu(!showEmployeeMenu)}
        >
          <i className="bi bi-people sidebar-icon"><FaUsers className="icon" /></i>
          <span>Employee</span>
          <i className={`bi ${showEmployeeMenu ? "bi-chevron-up" : "bi-chevron-down"} dropdown-icon`}></i>
        </div>
        {showEmployeeMenu && (
          <div className="sidebar-submenu">
            <Link to="/employee/directory" className={`sidebar-subitem ${isActive("/employee/directory") ? "active" : ""}`}>
              Employee Directory
            </Link>
            <Link to="/employee/onboarding" className={`sidebar-subitem ${isActive("/employee/onboarding") ? "active" : ""}`}>
              Onboarding Form
            </Link>
            <Link to="/employee/attendance" className={`sidebar-subitem ${isActive("/employee/attendance") ? "active" : ""}`}>
              Attendance
            </Link>
            <Link to="/employee/leave" className={`sidebar-subitem ${isActive("/employee/leave") ? "active" : ""}`}>
              Leave Management
            </Link>
          </div>
        )}
        <Link to="/payroll" className={`sidebar-item ${isActive("/payroll") ? "active" : ""}`}>
          <FaMoneyBill className="icon" />
          <span>Payroll</span>
        </Link>

        <Link to="/assets" className={`sidebar-item ${isActive("/assets") ? "active" : ""}`}>
          <FaBox className="icon" />
          <span>Asset Management</span>
        </Link>

        <Link to="/expense" className={`sidebar-item ${isActive("/expense") ? "active" : ""}`}>
          <FaWallet className="icon" />
          <span>Expense & Finance</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
