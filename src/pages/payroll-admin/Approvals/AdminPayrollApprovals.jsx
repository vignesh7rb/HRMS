import { useState, useMemo } from "react";
import "../payrollAdmin.css";

const AdminPayrollApprovals = () => {

  /* ======================================================
     STATE
  ====================================================== */

  const [filter, setFilter] = useState("ALL");

  const [approvals, setApprovals] = useState([
    { id: "EMP001", name: "John", status: "PENDING", netPay: 45000 },
    { id: "EMP014", name: "Priya", status: "APPROVED", netPay: 52000 },
    { id: "EMP021", name: "Arun", status: "PENDING", netPay: 39000 },
    { id: "EMP030", name: "Divya", status: "PENDING", netPay: 61000 }
  ]);

  /* ======================================================
     DERIVED VALUES (ZOHO STYLE KPI COUNTS)
  ====================================================== */

  const totalCount = approvals.length;

  const approvedCount = useMemo(
    () => approvals.filter(a => a.status === "APPROVED").length,
    [approvals]
  );

  const pendingCount = useMemo(
    () => approvals.filter(a => a.status === "PENDING").length,
    [approvals]
  );

  /* ======================================================
     FILTERED DATA
  ====================================================== */

  const filteredData = useMemo(() => {
    if (filter === "ALL") return approvals;
    return approvals.filter(a => a.status === filter);
  }, [approvals, filter]);

  /* ======================================================
     ACTIONS
  ====================================================== */

  const approvePayroll = (id) => {
    const updated = approvals.map(emp =>
      emp.id === id ? { ...emp, status: "APPROVED" } : emp
    );
    setApprovals(updated);
  };

  const rejectPayroll = (id) => {
    const updated = approvals.map(emp =>
      emp.id === id ? { ...emp, status: "PENDING" } : emp
    );
    setApprovals(updated);
  };

  /* ======================================================
     UI
  ====================================================== */

  return (
    <div className="payroll-admin-container">

      <h1 className="payroll-title">Payroll Approvals</h1>

      {/* ===============================
          KPI SUMMARY (ZOHO STYLE)
      =============================== */}
      <div className="payroll-grid">

        <div className="payroll-stat">
          <h4>Total Requests</h4>
          <p>{totalCount}</p>
        </div>

        <div className="payroll-stat success">
          <h4>Approved</h4>
          <p>{approvedCount}</p>
        </div>

        <div className="payroll-stat warning">
          <h4>Pending</h4>
          <p>{pendingCount}</p>
        </div>

      </div>

      {/* ===============================
          FILTER TABS
      =============================== */}
      <div className="approval-filters">
        <button
          className={filter === "ALL" ? "active" : ""}
          onClick={() => setFilter("ALL")}
        >
          All
        </button>

        <button
          className={filter === "PENDING" ? "active" : ""}
          onClick={() => setFilter("PENDING")}
        >
          Pending
        </button>

        <button
          className={filter === "APPROVED" ? "active" : ""}
          onClick={() => setFilter("APPROVED")}
        >
          Approved
        </button>
      </div>

      {/* ===============================
          APPROVAL TABLE
      =============================== */}
      <table className="payroll-table">
        <thead>
          <tr>
            <th>Emp ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Net Pay</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map(e => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.name}</td>

              <td>
                <span
                  className={`status-pill ${
                    e.status === "APPROVED"
                      ? "status-approved"
                      : "status-pending"
                  }`}
                >
                  {e.status}
                </span>
              </td>

              <td>₹ {e.netPay.toLocaleString()}</td>

              <td className="approval-actions">
                <button
                  className="approve-btn"
                  onClick={() => approvePayroll(e.id)}
                >
                  Approve
                </button>

                <button
                  className="reject-btn"
                  onClick={() => rejectPayroll(e.id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default AdminPayrollApprovals;
