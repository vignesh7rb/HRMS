import { useState, useMemo } from "react";
import "../payrollAdmin.css";

const AdminPayslips = () => {

  /* ===================================================
     STATE
  =================================================== */

  const [selectedMonth, setSelectedMonth] = useState("Feb 2026");

  const [payslips, setPayslips] = useState([
    { id: "EMP001", name: "John", generated: false, netPay: 45000 },
    { id: "EMP014", name: "Priya", generated: true, netPay: 52000 },
    { id: "EMP021", name: "Arun", generated: false, netPay: 39000 },
    { id: "EMP030", name: "Divya", generated: true, netPay: 61000 }
  ]);

  const [isGenerating, setIsGenerating] = useState(false);

  /* ===================================================
     DERIVED VALUES (ZOHO KPI STYLE)
  =================================================== */

  const totalCount = payslips.length;

  const generatedCount = useMemo(
    () => payslips.filter(p => p.generated).length,
    [payslips]
  );

  const pendingCount = totalCount - generatedCount;

  /* ===================================================
     ACTIONS
  =================================================== */

  // Generate all payslips
  const generatePayslips = () => {

    setIsGenerating(true);

    setTimeout(() => {
      const updated = payslips.map(emp => ({
        ...emp,
        generated: true
      }));

      setPayslips(updated);
      setIsGenerating(false);
    }, 900);
  };

  // Bulk download simulation
  const bulkDownload = () => {
    alert("Bulk download started (mock action)");
  };

  // Individual download
  const downloadSingle = (empId) => {
    alert(`Downloading payslip for ${empId}`);
  };

  /* ===================================================
     UI
  =================================================== */

  return (
    <div className="payroll-admin-container">

      <h1 className="payroll-title">Payslips</h1>

      {/* ===========================
          KPI CARDS (ZOHO STYLE)
      =========================== */}
      <div className="payroll-grid">

        <div className="payroll-stat">
          <h4>Total Employees</h4>
          <p>{totalCount}</p>
        </div>

        <div className="payroll-stat success">
          <h4>Generated</h4>
          <p>{generatedCount}</p>
        </div>

        <div className="payroll-stat warning">
          <h4>Pending</h4>
          <p>{pendingCount}</p>
        </div>

      </div>

      {/* ===========================
          CONTROL PANEL
      =========================== */}
      <div className="payroll-card">

        <div className="payslip-controls">

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="month-select"
          >
            <option>Feb 2026</option>
            <option>Jan 2026</option>
            <option>Dec 2025</option>
          </select>

          <button
            className="payroll-btn"
            onClick={generatePayslips}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate Payslips"}
          </button>

          <button
            className="payroll-btn"
            onClick={bulkDownload}
          >
            Download Bulk
          </button>

        </div>

      </div>

      {/* ===========================
          PAYSLIP TABLE
      =========================== */}
      <div className="payroll-section">

        <h3>{selectedMonth} Payslips</h3>

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
            {payslips.map(emp => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>

                <td>
                  <span
                    className={
                      emp.generated
                        ? "status-pill status-approved"
                        : "status-pill status-pending"
                    }
                  >
                    {emp.generated ? "GENERATED" : "PENDING"}
                  </span>
                </td>

                <td>₹ {emp.netPay.toLocaleString()}</td>

                <td>
                  <button
                    className="download-btn"
                    disabled={!emp.generated}
                    onClick={() => downloadSingle(emp.id)}
                  >
                    Download
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
};

export default AdminPayslips;
