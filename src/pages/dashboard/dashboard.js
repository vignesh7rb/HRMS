import React, { useState } from "react";
import '../../assets/styles/dashboard/dashboard.css';


const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  return (
    <div className="dashboard">

      {/* Welcome */}
      <h1 className="dashboard-title">Welcome, Admin!</h1>

      {/* Stats */}
      <div className="stats-row">
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

      {/* Middle Section */}
      <div className="middle-row">

        {/* Recent Activities */}
        <div className="card large">
          <h3>Recent Activities</h3>

          <div className="item">
            <span>John Doe applied for leave (Dec 15-17)</span>
            <span className="pill pending">Pending</span>
          </div>

          <div className="item">
            <span>Laptop LP001 assigned to Sarah Wilson</span>
            <span className="pill done">Completed</span>
          </div>

          <div className="item">
            <span>November payroll processed successfully</span>
            <span className="pill done">Completed</span>
          </div>

          <div className="item">
            <span>Project Alpha milestone completed</span>
            <span className="pill done">Completed</span>
          </div>

          <div className="item">
            <span>Macbook Air</span>
            <span className="pill done">Completed</span>
          </div>

          <div className="pagination">

            <span className="page-arrow">&#8249;</span>
            <span className="page-number active">1</span>
            <span className="page-number">2</span>
            <span className="page-number">3</span>
            <span className="page-number">4</span>
            <span className="page-dots">…</span>
            <span className="page-number">10</span>
            <span className="page-arrow">&#8250;</span>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="card">
          <h3>Upcoming Tasks</h3>

          <div className="item">
            <span>Process December Payroll</span>
            <span className="pill high">High</span>
          </div>

          <div className="item">
            <span>Asset Maintenance Review</span>
            <span className="pill medium">Medium</span>
          </div>

          <div className="item">
            <span>Quarterly Compliance Report</span>
            <span className="pill high">High</span>
          </div>

          <div className="item">
            <span>Employee Performance Reviews</span>
            <span className="pill low">Low</span>
          </div>

          <div className="item">
            <span>Macbook Air</span>
            <span className="pill done">Completed</span>
          </div>

          <div className="pagination">

            <span className="page-arrow">&#8249;</span>
            <span className="page-number active">1</span>
            <span className="page-number">2</span>
            <span className="page-number">3</span>
            <span className="page-number">4</span>
            <span className="page-dots">…</span>
            <span className="page-number">10</span>
            <span className="page-arrow">&#8250;</span>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <h3 className="section-heading">Quick Actions</h3>

      <div className="actions-row">
         <div className="action-card" onClick={() => setShowModal(true)}>
          Add Employee
        </div>
        <div className="action-card" onClick={() => setShowLeaveModal(true)}>
          Apply leave
        </div>
        <div className="action-card">Add Asset</div>
        <div className="action-card">Log Expense</div>
      </div>
      {showModal && (
  <div className="modal-backdrop">
    <div className="modal-container">

      {/* Close button */}
      <button
        className="modal-close"
        onClick={() => setShowModal(false)}
      >
        ×
      </button>

      <h2 className="modal-title">Add New Employee</h2>
      <p className="modal-subtitle">
        Enter the employee details to add them to the system.
      </p>

      <div className="modal-form">
        <div className="modal-row">
          <label>Name</label>
          <input placeholder="Enter name here" />
        </div>

        <div className="modal-row">
          <label>Email</label>
          <input placeholder="Enter email id" />
        </div>

        <div className="modal-row">
          <label>Phone</label>
          <input placeholder="Enter Phone number" />
        </div>

        <div className="modal-row">
          <label>Department</label>
          <select>
            <option>Select department</option>
            <option>IT</option>
            <option>Finance</option>
            <option>HR</option>
            <option>Sales</option>
            <option>Engineering</option>
          </select>
        </div>

        <div className="modal-row">
          <label>Designation</label>
          <input placeholder="Enter Designation here" />
        </div>
      </div>

      <div className="modal-footer">
        <button
          className="btn-outline"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
        <button className="btn-primary">
          Add Employee
        </button>
      </div>
    </div>
  </div>
)}

{showLeaveModal && (
  <div
    className="modal-backdrop"
    onClick={() => setShowLeaveModal(false)}
  >
    <div
      className="modal-container"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close */}
      <button
        className="modal-close"
        onClick={() => setShowLeaveModal(false)}
      >
        ×
      </button>

      <h2 className="modal-title">Apply for Leave</h2>
      <p className="modal-subtitle">
        Fill in the details to submit your leave application.
      </p>

      <div className="modal-form">
        <div className="modal-row">
          <label>Leave Type</label>
          <select>
            <option>Select leave type</option>
            <option>Casual Leave</option>
            <option>Sick Leave</option>
            <option>Paid Leave</option>
          </select>
        </div>

        <div className="modal-row">
          <label>Start date</label>
          <input type="date" />
        </div>

        <div className="modal-row">
          <label>End date</label>
          <input type="date" />
        </div>

        <div className="modal-row">
          <label>Reason</label>
          <textarea
            placeholder="Enter reason for leave"
            rows="4"
          />
        </div>
      </div>

      <div className="modal-footer">
        <button
          className="btn-outline"
          onClick={() => setShowLeaveModal(false)}
        >
          Cancel
        </button>
        <button className="btn-primary">
          Apply
        </button>
      </div>
    </div>
  </div>
)}




    </div>
  );
};

export default Dashboard;
