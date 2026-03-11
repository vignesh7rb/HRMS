import React from "react";
import "./EmployeeDashboard.css";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const EmployeeDashboard = () => {
  /* ATTENDANCE DATA */

  const attendanceData = [
    { name: "Present", value: 18 },
    { name: "Late", value: 2 },
    { name: "Absent", value: 1 },
    { name: "Leave", value: 3 },
  ];

  const COLORS = ["#22c55e", "#f59e0b", "#ef4444", "#6366f1"];

  /* TASK DATA */

  const tasks = [
    { task: "Update HRMS attendance module", deadline: "10 Mar" },
    { task: "Fix login authentication issue", deadline: "12 Mar" },
    { task: "Prepare sprint report", deadline: "14 Mar" },
  ];

  /* ASSET DATA */

  const assets = [
    { name: "Laptop", desc: "Dell Latitude 5420", date: "02 Mar 2026" },
    {
      name: "Company Email",
      desc: "bhuvanesh@company.com",
      date: "01 Mar 2026",
    },
  ];

  return (
    <div className="employee-dashboard">
      {/* HEADER */}

      <div className="dashboard-header">
        <div>
          <h1>Employee Workspace</h1>
          <p>Welcome back, Bhuvanesh 👋</p>
        </div>

        <div className="header-right">
          <span>Today : 11 Mar 2026</span>
          <span>Shift : 09:00 AM - 06:00 PM</span>
        </div>
      </div>

      {/* TOP GRID */}

      <div className="top-grid">
        {/* PROFILE */}

        <div className="card profile-card">
          <div className="avatar">BK</div>

          <h3>Bhuvanesh Kumar</h3>
          <p className="role">Software Developer</p>

          <div className="profile-details">
            <div className="detail-row">
              <span>Employee ID</span>
              <strong>EMP1023</strong>
            </div>

            <div className="detail-row">
              <span>Department</span>
              <strong>Engineering</strong>
            </div>
          </div>
        </div>

        {/* SHIFT TIMELINE */}

        <div className="card shift-card">
          <h3>Today's Shift</h3>

          <div className="shift-status">
            <span className="status-dot"></span>
            Present
          </div>

          <div className="shift-timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>

              <div className="timeline-content">
                <span>Punch In</span>
                <strong>09:05 AM</strong>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>

              <div className="timeline-content">
                <span>Break Time</span>
                <strong>01:00 PM</strong>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot inactive"></div>

              <div className="timeline-content">
                <span>Punch Out</span>
                <strong>--</strong>
              </div>
            </div>
          </div>
        </div>

        {/* ATTENDANCE CHART */}

        <div className="card">
          <h3>Attendance Insights</h3>

          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={attendanceData} dataKey="value" outerRadius={80} label>
                {attendanceData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SECOND GRID */}

      <div className="middle-grid">
        {/* TASKS */}

        <div className="card">
          <h3>Assigned Tasks</h3>

          <table className="task-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Deadline</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((t, i) => (
                <tr key={i}>
                  <td>{t.task}</td>
                  <td>{t.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* LEAVE HISTORY */}

        <div className="card">
          <h3>Leave History</h3>

          <ul className="list">
            <li>15 Mar – Personal Leave</li>
            <li>22 Mar – Sick Leave</li>
          </ul>
        </div>
      </div>

      {/* ASSETS */}

      <div className="card">
        <h3>Assigned Company Assets</h3>

        <table className="asset-table">
          <thead>
            <tr>
              <th>Asset</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {assets.map((a, i) => (
              <tr key={i}>
                <td>{a.name}</td>
                <td>{a.desc}</td>
                <td>{a.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RECENT ACTIVITY */}

      <div className="card">
        <h3>Recent Activity</h3>

        <ul className="activity-list">
          <li>Leave approved – 18 Feb</li>
          <li>Task assigned by manager – 20 Feb</li>
          <li>Attendance updated – 02 Mar</li>
        </ul>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
