import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaThLarge,
  FaUsers,
  FaMoneyBill,
  FaBox,
  FaWallet,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import "../../../assets/styles/sidebar/sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  const [showEmployeeMenu, setShowEmployeeMenu] = useState(
    location.pathname.includes("/employee")
  );

  const isActive = (path) => location.pathname === path;
  const isEmployeeActive = location.pathname.includes("/employee");

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar-header">Crest Climbers</div>

      {/* Menu */}
      <div className="sidebar-menu">

        {/* Dashboard */}
        <Link
          to="/dashboard"
          className={`sidebar-item ${isActive("/dashboard") ? "active" : ""}`}
        >
          <FaThLarge className="icon" />
          <span>Dashboard</span>
        </Link>

        {/* Employee (CLICKABLE DROPDOWN ROW) */}
        <div
          className={`sidebar-item ${isEmployeeActive ? "active" : ""}`}
          onClick={() => setShowEmployeeMenu(!showEmployeeMenu)}
        >
          <FaUsers className="icon" />
          <span>Employee</span>

          <span className="dropdown-icon">
            {showEmployeeMenu ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </div>

        {/* Employee Submenu */}
        {showEmployeeMenu && (
          <div className="sidebar-submenu">

            <Link
              to="/employee/directory"
              className={`sidebar-subitem ${
                isActive("/employee/directory") ? "active" : ""
              }`}
            >
              Employee Directory
            </Link>

            <Link
              to="/employee/onboarding"
              className={`sidebar-subitem ${
                isActive("/employee/onboarding") ? "active" : ""
              }`}
            >
              Onboarding Form
            </Link>

            <Link
              to="/employee/attendance"
              className={`sidebar-subitem ${
                isActive("/employee/attendance") ? "active" : ""
              }`}
            >
              Attendance
            </Link>

            <Link
              to="/employee/leave"
              className={`sidebar-subitem ${
                isActive("/employee/leave") ? "active" : ""
              }`}
            >
              Leave Management
            </Link>

            <Link
              to="/employee/exit"
              className={`sidebar-subitem ${
                isActive("/employee/exit") ? "active" : ""
              }`}
            >
              Exit Formality
            </Link>

          </div>
        )}

        {/* Payroll */}
        <Link
          to="/payroll"
          className={`sidebar-item ${isActive("/payroll") ? "active" : ""}`}
        >
          <FaMoneyBill className="icon" />
          <span>Payroll</span>
        </Link>

        {/* Asset Management */}
        <Link
          to="/assets"
          className={`sidebar-item ${isActive("/assets") ? "active" : ""}`}
        >
          <FaBox className="icon" />
          <span>Asset Management</span>
        </Link>

        {/* Expense */}
        <Link
          to="/expense"
          className={`sidebar-item ${isActive("/expense") ? "active" : ""}`}
        >
          <FaWallet className="icon" />
          <span>Expense & Finance</span>
        </Link>

      </div>
    </div>
  );
};

export default Sidebar;
