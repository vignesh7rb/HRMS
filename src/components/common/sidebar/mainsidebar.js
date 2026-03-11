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
  FaUserCircle
}

from "react-icons/fa";
import "../../../assets/styles/sidebar/sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  /* ================= COMMON ACTIVE CHECK ================= */
  const isActive = (path) => location.pathname === path;

  /* ================= EMPLOYEE DROPDOWN ================= */
  const [showEmployeeMenu, setShowEmployeeMenu] = useState(
    location.pathname.includes("/employee") ||
    location.pathname.includes("/employees") ||
    location.pathname.includes("/onboarding") ||
    location.pathname.includes("/attendance") ||
    location.pathname.includes("/leave") ||
    location.pathname.includes("/exit")
  );

  const isEmployeeActive =
    location.pathname.includes("/employee") ||
    location.pathname.includes("/employees") ||
    location.pathname.includes("/onboarding") ||
    location.pathname.includes("/attendance") ||
    location.pathname.includes("/leave") ||
    location.pathname.includes("/exit");

  /* ================= PAYROLL DROPDOWN ================= */
  const [showPayrollMenu, setShowPayrollMenu] = useState(
    location.pathname.includes("/payrolll")
  );

  const isPayrollActive = location.pathname.includes("/payrolll");

  /* ================= ASSET DROPDOWN ================= */
  const [showAssetMenu, setShowAssetMenu] = useState(
    location.pathname.includes("/assets")
  );

  const isAssetActive = location.pathname.includes("/assets");


  /* ================= EXPENSE & FINANCE DROPDOWN ================= */
const [showExpenseMenu, setShowExpenseMenu] = useState(
  location.pathname.includes("/expense")
);

const isExpenseActive = location.pathname.includes("/expense");

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar-header">Crest Climbers</div>

      <div className="sidebar-menu">



        {/* ================= DASHBOARD ================= */}
        <Link
          to="/dashboard"
          className={`sidebar-item ${isActive("/dashboard") ? "active" : ""}`}
        >
          <FaThLarge className="icon" />
          <span>Dashboard</span>
        </Link>

        {/* ================= EMPLOYEE ================= */}
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

        <div className={`submenu sidebar-submenu ${showEmployeeMenu ? "open" : ""}`}>

          <Link
            to="/employees"
            className={`sidebar-subitem ${isActive("/employees") ? "active" : ""}`}
          >
            Employee Directory
          </Link>

          <Link
            to="/onboarding"
            className={`sidebar-subitem ${isActive("/onboarding") ? "active" : ""}`}
          >
            Onboarding Form
          </Link>

          <Link
            to="/attendance"
            className={`sidebar-subitem ${isActive("/attendance") ? "active" : ""}`}
          >
            Attendance
          </Link>

          <Link
            to="/leave"
            className={`sidebar-subitem ${isActive("/leave") ? "active" : ""}`}
          >
            Leave Management
          </Link>

          <Link
            to="/exit"
            className={`sidebar-subitem ${isActive("/exit") ? "active" : ""}`}
          >
            Exit Formality
          </Link>

        </div>

        {/* ================= PAYROLL ================= */}
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
            className={`sidebar-subitem ${isActive("/payrolll/dashboard") ? "active" : ""}`}
          >
            Dashboard
          </Link>

          <Link
            to="/payrolll/process"
            className={`sidebar-subitem ${isActive("/payrolll/process") ? "active" : ""}`}
          >
            Process Payroll
          </Link>

          <Link
            to="/payrolll/approvals"
            className={`sidebar-subitem ${isActive("/payrolll/approvals") ? "active" : ""}`}
          >
            Approvals
          </Link>

          <Link
            to="/payrolll/payslips"
            className={`sidebar-subitem ${isActive("/payrolll/payslips") ? "active" : ""}`}
          >
            Payslips
          </Link>

          <Link
            to="/payrolll/release"
            className={`sidebar-subitem ${isActive("/payrolll/release") ? "active" : ""}`}
          >
            Salary Release
          </Link>

          <Link
            to="/payrolll/reports"
            className={`sidebar-subitem ${isActive("/payrolll/reports") ? "active" : ""}`}
          >
            Reports
          </Link>

          <Link
            to="/payrolll/salarystructure"
            className={`sidebar-subitem ${isActive("/payrolll/salarystructure") ? "active" : ""}`}
          >
            Salary Structure
          </Link>

        </div>

        {/* ================= ASSET MANAGEMENT ================= */}
        <div
          className={`sidebar-item ${isAssetActive ? "active" : ""}`}
          onClick={() => setShowAssetMenu(!showAssetMenu)}
        >
          <FaBox className="icon" />
          <span>Asset Management</span>

          <span className="dropdown-icon">
            {showAssetMenu ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </div>

        <div className={`submenu sidebar-submenu ${showAssetMenu ? "open" : ""}`}>

          <Link
            to="/assets/master"
            className={`sidebar-subitem ${isActive("/assets/master") ? "active" : ""}`}
          >
            Asset Master
          </Link>

          <Link
            to="/assets/assign"
            className={`sidebar-subitem ${isActive("/assets/assign") ? "active" : ""}`}
          >
            Assign Asset
          </Link>

          <Link
            to="/assets/return"
            className={`sidebar-subitem ${isActive("/assets/return") ? "active" : ""}`}
          >
            Return Asset
          </Link>

          <Link
            to="/assets/maintenance"
            className={`sidebar-subitem ${isActive("/assets/maintenance") ? "active" : ""}`}
          >
            Maintenance Schedule
          </Link>

          <Link
            to="/assets/disposal"
            className={`sidebar-subitem ${isActive("/assets/disposal") ? "active" : ""}`}
          >
            Asset Disposal
          </Link>

        </div>

        {/* ================= EXPENSE & FINANCE ================= */}


<div

  className={`sidebar-item ${isExpenseActive ? "active" : ""}`}
  onClick={() => setShowExpenseMenu(!showExpenseMenu)}
>
  <FaWallet className="icon" />
  <span>Expense & Finance</span>

  <span className="dropdown-icon">
    {showExpenseMenu ? <FaChevronUp /> : <FaChevronDown />}
  </span>
</div>

<div className={`submenu sidebar-submenu ${showExpenseMenu ? "open" : ""}`}>

 

  <Link
    to="/expense/daily-entry"
    className={`sidebar-subitem ${isActive("/expense/daily-entry") ? "active" : ""}`}
  >
    Daily Expense Entry
  </Link>

  <Link
    to="/expense/invoice"
    className={`sidebar-subitem ${isActive("/expense/invoice") ? "active" : ""}`}
  >
    Invoice
  </Link>

  <Link
    to="/expense/ledger"
    className={`sidebar-subitem ${isActive("/expense/ledger") ? "active" : ""}`}
  >
    Ledger Summary
  </Link>

  <Link
    to="/expense/quotation"
    className={`sidebar-subitem ${isActive("/expense/quotation") ? "active" : ""}`}
  >
    Quotation
  </Link>

  <Link
    to="/expense/vendor-payment"
    className={`sidebar-subitem ${isActive("/expense/vendor-payment") ? "active" : ""}`}
  >
    Vendor Payment
  </Link>

</div>
{/* ================= ESS ================= */}
<Link
  to="/ess"
  className={`sidebar-item ${isActive("/ess") ? "active" : ""}`}
>
  <FaUserCircle className="icon" />
  <span>ESS</span>
</Link>




      </div>
    </div>
  );
};

export default Sidebar;