import React, { useState } from "react";
import "./employeeDirectory.css";
import AddEmployee from "./addemployee";

function EmployeeDirectory() {

  /* ========================
     MODAL STATE
  ======================== */
  const [showAddEmployee, setShowAddEmployee] = useState(false);

  /* ========================
     EMPLOYEE DATA
  ======================== */
  const employees = [
    {
      name: "John Doe",
      position: "john.doe@crestclimbers.com",
      department: "IT",
      designation: "Senior Developer",
      status: "Active",
      joinDate: "15/01/2023",
    },
    {
      name: "Emily Davis",
      position: "+91 9876543210",
      department: "Finance",
      designation: "Finance Executive",
      status: "On leave",
      joinDate: "05/04/2023",
    },
  ];

  /* ========================
     FILTER STATES
  ======================== */
  const [department, setDepartment] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  /* ========================
     FILTER LOGIC
  ======================== */
  const filteredEmployees = employees.filter((emp) => {
    const matchesDepartment =
      department === "All" || emp.department === department;

    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesDepartment && matchesSearch;
  });

  return (
    <div className="employee-page">

      {/* ================= HEADER ================= */}
      <div className="employee-header">
        <h2>Employee Management</h2>

        <button
          className="add-btn"
          onClick={() => setShowAddEmployee(true)}
        >
          + Add Employee
        </button>
      </div>

      {/* ================= STATS ================= */}
      <div className="stats-grid">
        <div className="stat-card">
          <p>Total Employees</p>
          <h2>24</h2>
          <span>+2 this month</span>
        </div>

        <div className="stat-card">
          <p>Monthly Payroll</p>
          <h2>₹12,45,000</h2>
          <span>1 month indicator</span>
        </div>

        <div className="stat-card">
          <p>Active Assets</p>
          <h2>156</h2>
          <span>12 due for maintenance</span>
        </div>

        <div className="stat-card">
          <p>Monthly Revenue</p>
          <h2>₹45,67,890</h2>
          <span>+15% from last month</span>
        </div>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="filter-row">
        <input
          placeholder="Search Employee"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="All">All Departments</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
          <option value="HR">HR</option>
          <option value="Sales">Sales</option>
          <option value="Engineering">Engineering</option>
        </select>
      </div>

      {/* ================= TABLE / EMPTY STATE ================= */}
      <div className="table-card">

        {filteredEmployees.length === 0 ? (
          <div className="no-records">
            No records found
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>EMPLOYEE</th>
                <th>POSITION</th>
                <th>DEPARTMENT</th>
                <th>DESIGNATION</th>
                <th>STATUS</th>
                <th>JOIN DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.map((emp, index) => (
                <tr key={index}>
                  <td>{emp.name}</td>
                  <td>{emp.position}</td>
                  <td>{emp.department}</td>
                  <td>{emp.designation}</td>
                  <td>
                    <span
                      className={`status ${
                        emp.status === "Active" ? "active" : "leave"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td>{emp.joinDate}</td>
                  <td>
                    <button>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ================= ADD EMPLOYEE MODAL ================= */}
      {showAddEmployee && (
        <AddEmployee onClose={() => setShowAddEmployee(false)} />
      )}

    </div>
  );
}

export default EmployeeDirectory;
