import { useState } from "react";
import Table from "../../components/Table";
import "../EmployeeManagement/employee.css";

const employees = [
  {
    id: "EMP001",
    name: "John Doe",
    department: "Engineering",
    designation: "Software Engineer",
    status: "Active",
    projects: ["HRMS Revamp", "Payroll Automation"],
  },
  {
    id: "EMP002",
    name: "Priya Sharma",
    department: "HR",
    designation: "HR Executive",
    status: "Exited",
    projects: [],
  },
];

const EmployeeList = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  return (
    <div className="employee-page">
      {/* PAGE TITLE */}
      <h1 className="page-title">Employee Directory</h1>

      {/* TABLE CARD */}
      <div className="employee-table-card">
        <Table
          columns={[
            "Employee ID",
            "Employee Name",
            "Department",
            "Designation",
            "Status",
            "Actions",
          ]}
        >
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.department}</td>
              <td>{emp.designation}</td>
              <td>
                <span
                  className={`status ${
                    emp.status === "Active" ? "approved" : "denied"
                  }`}
                >
                  {emp.status}
                </span>
              </td>
              <td>
                <button
                  className="btn-outline"
                  disabled={emp.status === "Exited"}
                  onClick={() => setSelectedEmployee(emp)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </Table>
      </div>

      {/* EMPLOYEE DETAIL MODAL */}
      {selectedEmployee && (
        <>
          <div
            className="dashboard-overlay"
            onClick={() => setSelectedEmployee(null)}
          />

          <div className="dashboard-modal">
            <div className="modal-header">
              <h3>Employee Details</h3>
              <button
                className="modal-close"
                onClick={() => setSelectedEmployee(null)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <p>
                <strong>Employee ID:</strong> {selectedEmployee.id}
              </p>
              <p>
                <strong>Name:</strong> {selectedEmployee.name}
              </p>
              <p>
                <strong>Department:</strong> {selectedEmployee.department}
              </p>
              <p>
                <strong>Designation:</strong> {selectedEmployee.designation}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`status ${
                    selectedEmployee.status === "Active"
                      ? "approved"
                      : "denied"
                  }`}
                >
                  {selectedEmployee.status}
                </span>
              </p>

              <div className="info-box">
                <p>
                  <strong>Projects Assigned</strong>
                </p>

                {selectedEmployee.projects.length > 0 ? (
                  <ul>
                    {selectedEmployee.projects.map((project, index) => (
                      <li key={index}>{project}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="danger-text">No active projects assigned</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeList;
