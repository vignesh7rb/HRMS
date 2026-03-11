import React from "react";
import { FaTasks } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import {
  FaThLarge,
  FaUser,
  FaCalendarCheck,
  FaMoneyBillWave,
} from "react-icons/fa";

import "./EmployeeSidebar.css";

const EmployeeSidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      {/* LOGO */}
      <div className="sidebar-header">Crest Climbers</div>

      {/* MENU */}
      <div className="sidebar-menu">
        <Link
          to="/employee/dashboard"
          className={`sidebar-item ${
            isActive("/employee/dashboard") ? "active" : ""
          }`}
        >
          <FaThLarge className="icon" />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/employee/profile"
          className={`sidebar-item ${
            isActive("/employee/profile") ? "active" : ""
          }`}
        >
          <FaUser className="icon" />
          <span>My Profile</span>
        </Link>

        <Link
          to="/employee/attendance"
          className={`sidebar-item ${
            isActive("/employee/attendance") ? "active" : ""
          }`}
        >
          <FaCalendarCheck className="icon" />
          <span>Attendance</span>
        </Link>

        <Link
          to="/employee/leave"
          className={`sidebar-item ${
            isActive("/employee/leave") ? "active" : ""
          }`}
        >
          <FaCalendarCheck className="icon" />
          <span>Leave</span>
        </Link>

        {/* PAYSLIP */}

        <Link
          to="/employee/payroll/salary"
          className={`sidebar-item ${
            isActive("/employee/payroll/salary") ? "active" : ""
          }`}
        >
          <FaMoneyBillWave className="icon" />
          <span>Payslip</span>
        </Link>
        {/* Task Managment */}
        <Link
          to="/employee/task-management"
          className={`sidebar-item ${
            isActive("/employee/task-management") ? "active" : ""
          }`}
        >
          <FaTasks className="icon" />
          <span>Task Management</span>
        </Link>
      </div>
    </div>
  );
};

export default EmployeeSidebar;
