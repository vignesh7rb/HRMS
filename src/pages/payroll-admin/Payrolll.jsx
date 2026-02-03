import { useState, useMemo } from "react";
import jsPDF from "jspdf";
import "../payroll-admin/payrolll.css";

/* ===============================
   HELPER: AUTO-GENERATE PAYROLL MONTHS
=============================== */
const getPayrollMonths = (count = 6) => {
  const months = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(
      date.toLocaleString("default", {
        month: "long",
        year: "numeric",
      })
    );
  }
  return months;
};

const Payroll = () => {
  /* ===============================
     PAYROLL CONTROLS
  =============================== */
  const payrollMonths = getPayrollMonths(6);
  const [month, setMonth] = useState(payrollMonths[0]);
  const [payrollStatus, setPayrollStatus] = useState("DRAFT");

  /* ===============================
     EMPLOYEE PAYROLL DATA
  =============================== */
  const [employees, setEmployees] = useState([
    {
      id: "EMP001",
      name: "John Doe",
      department: "Engineering",
      gross: 85000,
      deductions: 12500,
      status: "PROCESSED",
    },
    {
      id: "EMP014",
      name: "Priya Sharma",
      department: "HR",
      gross: 60000,
      deductions: 9200,
      status: "PENDING",
    },
  ]);

  /* ===============================
     SUMMARY (REAL-TIME)
  =============================== */
  const payrollSummary = useMemo(() => {
    const totalEmployees = employees.length;
    const processedEmployees = employees.filter(
      (e) => e.status === "PROCESSED"
    ).length;

    const totalGross = employees.reduce((s, e) => s + e.gross, 0);
    const totalDeductions = employees.reduce(
      (s, e) => s + e.deductions,
      0
    );

    return {
      totalEmployees,
      processedEmployees,
      pendingEmployees: totalEmployees - processedEmployees,
      totalGross,
      totalDeductions,
      netPayout: totalGross - totalDeductions,
    };
  }, [employees]);

  /* ===============================
     ACTION HANDLERS
  =============================== */
  const updateEmployeeStatus = (id, status) => {
    if (payrollStatus === "LOCKED") return;
    setEmployees((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
  };

  const updateDeductions = (id, value) => {
    if (payrollStatus === "LOCKED") return;
    const safe = Math.max(0, Number(value) || 0);
    setEmployees((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, deductions: safe } : e
      )
    );
  };

  const recalculatePayroll = () => {
    if (payrollStatus === "LOCKED") return;
    setPayrollStatus("DRAFT");
    setEmployees((prev) =>
      prev.map((e) => ({ ...e, status: "PENDING" }))
    );
  };

  const runPayroll = () => {
    if (payrollStatus === "LOCKED") return;
    setPayrollStatus("RUNNING");
    setEmployees((prev) =>
      prev.map((e) => ({ ...e, status: "PROCESSED" }))
    );
  };

  const lockPayroll = () => {
    setPayrollStatus("LOCKED");
  };

  /* ===============================
     GENERATE PAYSLIPS (PDF)
  =============================== */
  const generatePayslips = () => {
    const processed = employees.filter(
      (e) => e.status === "PROCESSED"
    );

    if (!processed.length) {
      alert("No processed employees.");
      return;
    }

    processed.forEach((emp) => {
      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text("Payslip", 20, 20);

      doc.setFontSize(12);
      doc.text("Company: Crest Climbers", 20, 35);
      doc.text(`Payroll Month: ${month}`, 20, 45);

      doc.text(`Employee ID: ${emp.id}`, 20, 60);
      doc.text(`Name: ${emp.name}`, 20, 70);
      doc.text(`Department: ${emp.department}`, 20, 80);

      doc.text(`Gross Salary: ₹ ${emp.gross}`, 20, 100);
      doc.text(`Deductions: ₹ ${emp.deductions}`, 20, 110);
      doc.text(
        `Net Pay: ₹ ${emp.gross - emp.deductions}`,
        20,
        120
      );

      doc.text(
        "This is a system-generated payslip.",
        20,
        150
      );

      doc.save(`${emp.id}_${month}_Payslip.pdf`);
    });
  };

  /* ===============================
     DOWNLOAD REPORT (CSV)
  =============================== */
  const downloadReport = () => {
    const headers = [
      "Employee ID",
      "Name",
      "Department",
      "Gross",
      "Deductions",
      "Net",
      "Status",
    ];

    const rows = employees.map((e) => [
      e.id,
      e.name,
      e.department,
      e.gross,
      e.deductions,
      e.gross - e.deductions,
      e.status,
    ]);

    const csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows]
        .map((r) => r.join(","))
        .join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = `Payroll_Report_${month}.csv`;
    link.click();
  };

  /* ===============================
     UI
  =============================== */
  return (
    <div className="payrolll-container">
      <div className="payrolll-header">
        <h1>Payroll Management</h1>
        <p>Real-time payroll processing & salary control</p>
      </div>

      <div className="cardd payroll-controls">
        <div>
          <label>Payroll Month</label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            disabled={payrollStatus === "LOCKED"}
          >
            {payrollMonths.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Payroll Status</label>
          <span className={`status-badge ${payrollStatus.toLowerCase()}`}>
            {payrollStatus}
          </span>
        </div>

        <div className="actions">
          <button
            className="btn secondary"
            onClick={recalculatePayroll}
            disabled={payrollStatus === "LOCKED"}
          >
            Recalculate
          </button>

          <button
            className="btn primary"
            onClick={runPayroll}
            disabled={payrollStatus === "LOCKED"}
          >
            Run Payroll
          </button>

          <button
            className="btn danger"
            onClick={lockPayroll}
            disabled={payrollStatus === "LOCKED"}
          >
            Lock Payroll
          </button>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="payroll-summary">
        <div className="summary-card">
          <h3>Total Employees</h3>
          <p>{payrollSummary.totalEmployees}</p>
        </div>
        <div className="summary-card">
          <h3>Processed</h3>
          <p>{payrollSummary.processedEmployees}</p>
        </div>
        <div className="summary-card warning">
          <h3>Pending</h3>
          <p>{payrollSummary.pendingEmployees}</p>
        </div>
        <div className="summary-card">
          <h3>Total Gross</h3>
          <p>₹ {payrollSummary.totalGross.toLocaleString()}</p>
        </div>
        <div className="summary-card">
          <h3>Total Deductions</h3>
          <p>₹ {payrollSummary.totalDeductions.toLocaleString()}</p>
        </div>
        <div className="summary-card success">
          <h3>Net Payout</h3>
          <p>₹ {payrollSummary.netPayout.toLocaleString()}</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="card">
        <h2>Employee Payroll</h2>

        <table className="payroll-table">
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Gross</th>
              <th>Deductions</th>
              <th>Net</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{e.department}</td>
                <td>₹ {e.gross.toLocaleString()}</td>
                <td>
                  <input
                    type="number"
                    value={e.deductions}
                    disabled={payrollStatus === "LOCKED"}
                    onChange={(ev) =>
                      updateDeductions(e.id, ev.target.value)
                    }
                  />
                </td>
                <td>
                  ₹ {(e.gross - e.deductions).toLocaleString()}
                </td>
                <td>
                  <select
                    value={e.status}
                    disabled={payrollStatus === "LOCKED"}
                    onChange={(ev) =>
                      updateEmployeeStatus(e.id, ev.target.value)
                    }
                  >
                    <option value="PENDING">Pending</option>
                    <option value="PROCESSED">Processed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="payroll-footer">
        <button className="btn secondary" onClick={downloadReport}>
          Download Reports
        </button>
        <button className="btn primary" onClick={generatePayslips}>
          Generate Payslips
        </button>
      </div>
    </div>
  );
};

export default Payroll;
