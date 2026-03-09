import React, { useState } from "react";
import "./EssPortal.css";
import {
  FaUserCircle,
  FaCalendarCheck,
  FaWallet,
  FaClock,
  FaFileAlt,
  FaBullhorn,
  FaSearch,
  FaTasks,
  FaUmbrellaBeach
} from "react-icons/fa";

const EssPortal = () => {

  const [showApplyModal, setShowApplyModal] = useState(false);

  const employeeStore = {
    EMP030: {
      name: "Divya",
      role: "Frontend Developer",
      salary: "61,000",
      attendance: "22 / 24 Days",
      leaves: "12 Days",
      expenses: "Pending",
      tasks: [{ title: "Submit Weekly Report", priority: "High" }],
      holidays: [{ name: "Holi", date: "March 14" }],
      updates: [
        { title: "Payroll Processed", desc: "Salary approved by finance" }
      ]
    }
  };

  const [empId, setEmpId] = useState("EMP030");
  const [employee, setEmployee] = useState(employeeStore["EMP030"]);

  const handleSearch = () => {
    const emp = employeeStore[empId.toUpperCase()];
    if (emp) setEmployee(emp);
    else alert("Employee ID not found");
  };

  const handleClockOut = () => {
    alert("Clock Out Successful");
  };

  return (
    <div className="ess-container">

      {/* HEADER */}

      <div className="ess-header">

        <div className="ess-user">
          <FaUserCircle className="ess-avatar" />

          <div>
            <h2>Hello, {employee.name}</h2>
            <p>{employee.role} • ID: {empId}</p>
          </div>
        </div>

        <div className="ess-actions">

          <div className="search-box">
            <FaSearch className="search-icon" />

            <input
              type="text"
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
              placeholder="Search Employee ID"
            />
          </div>

          <button className="btn-primary" onClick={handleSearch}>
            Search
          </button>

          {/* APPLY LEAVE BUTTON */}

          <button
            className="btn-outlinee"
            onClick={() => setShowApplyModal(true)}
          >
            Apply Leave
          </button>

          <button className="btn-primary" onClick={handleClockOut}>
            Clock Out
          </button>

        </div>
      </div>


      {/* STAT CARDS */}

      <div className="ess-stats">

        <StatCard
          title="Attendance"
          value={employee.attendance}
          icon={<FaClock />}
          color="green"
        />

        <StatCard
          title="Leaves Left"
          value={employee.leaves}
          icon={<FaCalendarCheck />}
          color="blue"
        />

        <StatCard
          title="Net Salary"
          value={`₹${employee.salary}`}
          icon={<FaWallet />}
          color="purple"
        />

        <StatCard
          title="Expenses"
          value={employee.expenses}
          icon={<FaFileAlt />}
          color="orange"
        />

      </div>


      {/* MAIN GRID */}

      <div className="ess-main">

        <Section title="My Tasks" icon={<FaTasks />}>
          {employee.tasks.map((task, i) => (
            <div key={i} className="task-item">
              <span>{task.title}</span>
              <span className="priority">{task.priority}</span>
            </div>
          ))}
        </Section>

        <Section title="Recent Updates" icon={<FaBullhorn />}>
          {employee.updates.map((u, i) => (
            <div key={i} className="update-item">
              <h5>{u.title}</h5>
              <p>{u.desc}</p>
            </div>
          ))}
        </Section>

        <Section title="Upcoming Holidays" icon={<FaUmbrellaBeach />}>
          {employee.holidays.map((h, i) => (
            <div key={i} className="holiday-item">
              <span>{h.name}</span>
              <span>{h.date}</span>
            </div>
          ))}
        </Section>

      </div>


      {/* APPLY LEAVE MODAL */}

      {showApplyModal && (
        <div className="modal-wrapper">

          <div className="modal-container">

            <button
              className="modal-close"
              onClick={() => setShowApplyModal(false)}
            >
              ✕
            </button>

            <h2>Apply for Leave</h2>

            <p className="sub-text">
              Fill in the details to submit your leave request.
            </p>

            <div className="modal-row">
              <label>Leave Type</label>
              <select>
                <option>Select leave type</option>
                <option>Casual Leave</option>
                <option>Sick Leave</option>
                <option>Earned Leave</option>
              </select>
            </div>

            <div className="modal-row">
              <label>Start Date</label>
              <input type="date" />
            </div>

            <div className="modal-row">
              <label>End Date</label>
              <input type="date" />
            </div>

            <div className="modal-row">
              <label>Reason</label>
              <textarea />
            </div>

            <div className="modal-footer">

              <button
                className="btn-outline"
                onClick={() => setShowApplyModal(false)}
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


/* REUSABLE COMPONENTS */

const StatCard = ({ title, value, icon, color }) => (
  <div className="stat-card">
    <div className="stat-header">
      <span>{title}</span>
      <span className={`stat-icon ${color}`}>{icon}</span>
    </div>
    <h3>{value}</h3>
  </div>
);

const Section = ({ title, icon, children }) => (
  <div className="ess-section">
    <h4>{icon} {title}</h4>
    {children}
  </div>
);

export default EssPortal;