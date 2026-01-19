import { useState } from "react";
import "./onboarding.css";

const Onboarding = () => {
  const [employees, setEmployees] = useState([
    {
      id: "EMP001",
      name: "Arun Kumar",
      role: "Frontend Developer",
      doj: "2026-02-12",
      status: "Pending",
      documents: "Not Uploaded",
    },
    {
      id: "EMP002",
      name: "Sneha R",
      role: "HR Executive",
      doj: "2026-02-15",
      status: "Completed",
      documents: "Verified",
    },
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  /* ===== STATS (REAL-TIME) ===== */
  const total = employees.length;
  const pending = employees.filter(e => e.status === "Pending").length;
  const completed = employees.filter(e => e.status === "Completed").length;

  /* ===== UPDATE EMPLOYEE ===== */
  const handleUpdate = () => {
    setEmployees(prev =>
      prev.map(emp =>
        emp.id === selectedEmployee.id ? selectedEmployee : emp
      )
    );
    setSelectedEmployee(null);
  };

  return (
    <div className="onboarding-page">
      <h1>Employee Onboarding</h1>

      {/* ===== STATS ===== */}
      <div className="onboarding-stats">
        <div className="card">
          <p>Total New Joinees</p>
          <h2>{total}</h2>
        </div>
        <div className="card">
          <p>Pending Onboarding</p>
          <h2>{pending}</h2>
        </div>
        <div className="card">
          <p>Completed</p>
          <h2>{completed}</h2>
        </div>
      </div>

      {/* ===== TABLE ===== */}
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
                  <button
                    className="btn-primary"
                    onClick={() => setSelectedEmployee({ ...emp })}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== DETAIL MODAL ===== */}
      {selectedEmployee && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Onboarding Details</h2>

            <label>Employee ID</label>
            <input value={selectedEmployee.id} disabled />

            <label>Name</label>
            <input
              value={selectedEmployee.name}
              onChange={(e) =>
                setSelectedEmployee({ ...selectedEmployee, name: e.target.value })
              }
            />

            <label>Role</label>
            <input
              value={selectedEmployee.role}
              onChange={(e) =>
                setSelectedEmployee({ ...selectedEmployee, role: e.target.value })
              }
            />

            <label>Date of Joining</label>
            <input
              type="date"
              value={selectedEmployee.doj}
              onChange={(e) =>
                setSelectedEmployee({ ...selectedEmployee, doj: e.target.value })
              }
            />

            <label>Status</label>
            <select
              value={selectedEmployee.status}
              onChange={(e) =>
                setSelectedEmployee({ ...selectedEmployee, status: e.target.value })
              }
            >
              <option>Pending</option>
              <option>Completed</option>
            </select>

            <label>Documents</label>
            <select
              value={selectedEmployee.documents}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  documents: e.target.value,
                })
              }
            >
              <option>Not Uploaded</option>
              <option>Uploaded</option>
              <option>Verified</option>
            </select>

            <div className="modal-actions">
              <button
                className="btn-outline"
                onClick={() => setSelectedEmployee(null)}
              >
                Cancel
              </button>
              <button className="btn-primary" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
