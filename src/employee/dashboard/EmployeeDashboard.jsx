import React from "react";
import "./EmployeeDashboard.css";

const EmployeeDashboard = () => {
  return (
    <div className="employee-dashboard">
      {/* HEADER */}

      <div className="dashboard-header">
        <div>
          <h2>Employee Dashboard</h2>
          <p>Track your attendance, leave balance and payroll information</p>
        </div>

        <div className="header-info">
          <span>Today: 06 Mar 2026</span>
          <span>Shift: 09:00 AM - 06:00 PM</span>
        </div>
      </div>

      {/* KPI CARDS */}

      <div className="kpi-grid">
        <div className="kpi-card">
          <p>Net Salary</p>
          <h3>₹45,000</h3>
          <span>Credited on 5 Mar</span>
        </div>

        <div className="kpi-card">
          <p>Leave Balance</p>
          <h3>14 Days</h3>
          <span>CL + SL + EL</span>
        </div>

        <div className="kpi-card">
          <p>Attendance Rate</p>
          <h3>92%</h3>
          <span>18 / 20 Days</span>
        </div>

        <div className="kpi-card">
          <p>Overtime</p>
          <h3>12 Hours</h3>
          <span>This Month</span>
        </div>
      </div>

      {/* MAIN GRID */}

      <div className="main-grid">
        {/* ATTENDANCE */}

        <div className="card">
          <h3>Monthly Attendance Overview</h3>

          <div className="summary-grid">
            <div>
              <span>Present</span>
              <strong>18</strong>
            </div>

            <div>
              <span>Late</span>
              <strong>3</strong>
            </div>

            <div>
              <span>Absent</span>
              <strong>2</strong>
            </div>

            <div>
              <span>Weekly Off</span>
              <strong>4</strong>
            </div>
          </div>
        </div>

        {/* LEAVE */}

        <div className="card">
          <h3>Leave Balance Details</h3>

          <div className="summary-grid">
            <div>
              <span>Casual Leave</span>
              <strong>8</strong>
            </div>

            <div>
              <span>Sick Leave</span>
              <strong>6</strong>
            </div>

            <div>
              <span>Earned Leave</span>
              <strong>12</strong>
            </div>

            <div>
              <span>Comp Off</span>
              <strong>2</strong>
            </div>
          </div>
        </div>

        {/* PAYROLL */}

        <div className="card">
          <h3>Salary Breakdown</h3>

          <ul className="list">
            <li>Basic Salary : ₹30,000</li>
            <li>House Rent Allowance : ₹8,000</li>
            <li>Other Allowances : ₹7,000</li>
            <li>Deductions : ₹2,500</li>
          </ul>
        </div>

        {/* HOLIDAYS */}

        <div className="card">
          <h3>Upcoming Holidays</h3>

          <ul className="list">
            <li>08 Mar – Mahashivratri</li>
            <li>25 Mar – Holi</li>
            <li>14 Apr – Tamil New Year</li>
          </ul>
        </div>
      </div>

      {/* ACTIVITY */}

      <div className="card">
        <h3>Recent Activities</h3>

        <div className="activity-list">
          <div className="activity-item">
            <span className="dot"></span>
            Leave request submitted – 18 Feb
          </div>

          <div className="activity-item">
            <span className="dot"></span>
            Salary credited – 05 Feb
          </div>

          <div className="activity-item">
            <span className="dot"></span>
            Attendance regularized – 02 Feb
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
