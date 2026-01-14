import { useState } from "react";
import "./onboarding.css";

const Onboarding = () => {
  const [employees] = useState([
    {
      id: "EMP001",
      name: "Arun Kumar",
      role: "Frontend Developer",
      doj: "12 Feb 2026",
      status: "Pending"
    },
    {
      id: "EMP002",
      name: "Sneha R",
      role: "HR Executive",
      doj: "15 Feb 2026",
      status: "Completed"
    }
  ]);

  return (
    <div className="onboarding-page">
      <h1>Employee Onboarding</h1>

      {/* STATS */}
      <div className="onboarding-stats">
        <div className="card">
          <p>Total New Joinees</p>
          <h2>12</h2>
        </div>
        <div className="card">
          <p>Pending Onboarding</p>
          <h2>4</h2>
        </div>
        <div className="card">
          <p>Completed</p>
          <h2>8</h2>
        </div>
      </div>

      {/* TABLE */}
      <div className="card table-card">
        <h2>Onboarding List</h2>

        <table className="onboarding-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Date of Joining</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.role}</td>
                <td>{emp.doj}</td>
                <td>
                  <span className={`status ${emp.status.toLowerCase()}`}>
                    {emp.status}
                  </span>
                </td>
                <td>
                  <button className="btn-primary">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Onboarding;
