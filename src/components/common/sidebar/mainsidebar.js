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

  const [showPayrollMenu, setShowPayrollMenu] = useState(
  location.pathname.includes("/payrolll")
);

const isPayrollActive = location.pathname.includes("/payrolll");


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

{/* Employee Submenu (ALWAYS RENDERED FOR ANIMATION) */}
<div className={`submenu sidebar-submenu ${showEmployeeMenu ? "open" : ""}`}>

  <Link
    to="/employees"
    className={`sidebar-subitem ${
      isActive("/employees") ? "active" : ""
    }`}
  >
    Employee Directory
  </Link>

  <Link
    to="/onboarding"
    className={`sidebar-subitem ${
      isActive("/onboarding") ? "active" : ""
    }`}
  >
    Onboarding Form
  </Link>

  <Link
    to="/attendance"
    className={`sidebar-subitem ${
      isActive("/attendance") ? "active" : ""
    }`}
  >
    Attendance
  </Link>

  <Link
    to="/leave"
    className={`sidebar-subitem ${
      isActive("/leave") ? "active" : ""
    }`}
  >
    Leave Management
  </Link>

  <Link
    to="/exit"
    className={`sidebar-subitem ${
      isActive("/exit") ? "active" : ""
    }`}
  >
    Exit Formality
  </Link>

</div>



         {/* ================= PAYROLL DROPDOWN (NEW) ================= */}
        <div
          className={`sidebar-item ${isPayrollActive ? "active" : ""}`}
          onClick={() => setShowPayrollMenu(!showPayrollMenu)}
        >
          <FaMoneyBill className="icon" />
          <span>Payroll</span>

          <span className="dropdown-icon">
            {showPayrollMenu ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </div>

        <div className={`submenu sidebar-submenu ${showPayrollMenu ? "open" : ""}`}>

          <Link
            to="/payrolll/dashboard"
            className={`sidebar-subitem ${
              isActive("/payrolll/dashboard") ? "active" : ""
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/payrolll/process"
            className={`sidebar-subitem ${
              isActive("/payrolll/process") ? "active" : ""
            }`}
          >
            Process Payroll
          </Link>

          <Link
            to="/payrolll/approvals"
            className={`sidebar-subitem ${
              isActive("/payrolll/approvals") ? "active" : ""
            }`}
          >
            Approvals
          </Link>

          <Link
            to="/payrolll/payslips"
            className={`sidebar-subitem ${
              isActive("/payrolll/payslips") ? "active" : ""
            }`}
          >
            Payslips
          </Link>

          <Link
            to="/payrolll/release"
            className={`sidebar-subitem ${
              isActive("/payrolll/release") ? "active" : ""
            }`}
          >
            Salary Release
          </Link>

          <Link
            to="/payrolll/reports"
            className={`sidebar-subitem ${
              isActive("/payrolll/reports") ? "active" : ""
            }`}
          >
            Reports
          </Link>

          <Link
            to="/payrolll/salarystructure"
            className={`sidebar-subitem ${
              isActive("/payrolll/salarystructure") ? "active" : ""
            }`}
          >
            Salary structure
          </Link>

        </div>


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