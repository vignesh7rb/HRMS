import { useState } from "react";
import "../exit/ExitFormalities.css";

const ExitFormality = () => {
  const [showExitModal, setShowExitModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [employees, setEmployees] = useState([
    {
      id: "EMP001",
      name: "John Doe",
      lastWorkingDate: "2026-01-31",
      relievingDate: "2026-02-01",
      assets: {
        Laptop: false,
        "ID Card": true,
        SIM: false,
        "Access Card": true,
      },
      financeDue: 2500,
      status: "In Progress",
    },
    {
      id: "EMP002",
      name: "Sarah Wilson",
      lastWorkingDate: "2026-01-15",
      relievingDate: "2026-01-16",
      assets: {
        Laptop: true,
        "ID Card": true,
        SIM: true,
        "Access Card": true,
      },
      financeDue: 0,
      status: "Completed",
    },
  ]);

  const openExitModal = (emp) => {
    setSelectedEmployee({ ...emp });
    setShowExitModal(true);
  };

  const updateEmployee = (updated) => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === updated.id ? updated : e))
    );
    setSelectedEmployee(updated);
  };

  const toggleAsset = (key) => {
    updateEmployee({
      ...selectedEmployee,
      assets: {
        ...selectedEmployee.assets,
        [key]: !selectedEmployee.assets[key],
      },
    });
  };

  const clearFinance = () => {
    updateEmployee({ ...selectedEmployee, financeDue: 0 });
  };

  const updateDate = (key, value) => {
    updateEmployee({ ...selectedEmployee, [key]: value });
  };

  const allAssetsReturned =
    selectedEmployee &&
    Object.values(selectedEmployee.assets).every(Boolean);

  const financeCleared =
    selectedEmployee && selectedEmployee.financeDue === 0;

  const canClose = allAssetsReturned && financeCleared;

  const closeEmployee = () => {
    if (!canClose) return;
    updateEmployee({ ...selectedEmployee, status: "Completed" });
    setShowExitModal(false);
  };

  return (
    <div className="exit-page">
      <div className="exit-table-card">
        <h2 className="blue">Exit Requests</h2>

        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Last Working Date</th>
              <th>Finance Due</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>
                  {emp.name}
                  <div className="emp-id">{emp.id}</div>
                </td>
                <td>{emp.lastWorkingDate}</td>
                <td>₹{emp.financeDue}</td>
                <td>
                  <span
                    className={`badge ${
                      emp.status === "Completed"
                        ? "success"
                        : "pending"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
                <td>
                  <button className="view" onClick={() => openExitModal(emp)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showExitModal && selectedEmployee && (
        <div className="modal-backdrop">
          <div className="modal-container">
            <button
              className="modal-close"
              onClick={() => setShowExitModal(false)}
            >
              ✕
            </button>

            <h2 className="modal-title">Exit Clearance</h2>
            <p className="modal-subtitle">
              Verify employee exit details before closing
            </p>

            {/* DATES */}
            <div className="form-row">
              <label>Last Working Date</label>
              <input
                type="date"
                value={selectedEmployee.lastWorkingDate}
                onChange={(e) =>
                  updateDate("lastWorkingDate", e.target.value)
                }
              />
            </div>

            <div className="form-row">
              <label>Relieving Date</label>
              <input
                type="date"
                value={selectedEmployee.relievingDate}
                onChange={(e) =>
                  updateDate("relievingDate", e.target.value)
                }
              />
            </div>

            {/* ASSETS */}
            <h4 className="section-title">Asset Clearance</h4>
            {Object.entries(selectedEmployee.assets).map(([key, value]) => (
              <div key={key} className="form-input-row">
                <span>{key}</span>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => toggleAsset(key)}
                />
              </div>
            ))}

            {/* FINANCE */}
            <h4 className="section-title">Finance Clearance</h4>
            <div className="form-row">
              <label>Outstanding Amount</label>
              <input
                type="text"
                value={`₹ ${selectedEmployee.financeDue}`}
                disabled
              />
            </div>

            {selectedEmployee.financeDue > 0 && (
              <button className="btn-outline" onClick={clearFinance}>
                Mark Finance Cleared
              </button>
            )}

            {/* FOOTER */}
            <div className="modal-footer">
              <button
                className="btn-outline"
                onClick={() => setShowExitModal(false)}
              >
                Cancel
              </button>

              <button
                className="btn-primary"
                disabled={!canClose}
                onClick={closeEmployee}
              >
                Close Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExitFormality;
