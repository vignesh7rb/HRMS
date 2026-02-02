import { useState, useMemo } from "react";
import "./expenseFinance.css";

const ExpenseFinance = () => {
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({
    department: "ALL",
    status: "ALL",
    month: "",
  });

  const [form, setForm] = useState({
    employee: "",
    department: "Engineering",
    category: "Travel",
    amount: "",
    date: "",
    receipt: null,
  });

  /* ======================
     ADD EXPENSE (EMPLOYEE)
  ====================== */
  const submitExpense = () => {
    if (!form.employee || !form.amount || !form.date) return;

    setExpenses(prev => [
      ...prev,
      {
        ...form,
        id: Date.now(),
        status: "PENDING",
        reimbursed: false,
      },
    ]);

    setForm({
      employee: "",
      department: "Engineering",
      category: "Travel",
      amount: "",
      date: "",
      receipt: null,
    });
  };

  /* ======================
     APPROVAL → PAYROLL LINK
  ====================== */
  const approveExpense = id => {
    setExpenses(prev =>
      prev.map(e =>
        e.id === id
          ? { ...e, status: "APPROVED", reimbursed: true }
          : e
      )
    );
  };

  const rejectExpense = id => {
    setExpenses(prev =>
      prev.map(e =>
        e.id === id ? { ...e, status: "REJECTED" } : e
      )
    );
  };

  /* ======================
     REAL-TIME FILTERING
  ====================== */
  const filteredExpenses = useMemo(() => {
    return expenses.filter(e => {
      if (filters.department !== "ALL" && e.department !== filters.department)
        return false;
      if (filters.status !== "ALL" && e.status !== filters.status)
        return false;
      if (filters.month && !e.date.startsWith(filters.month))
        return false;
      return true;
    });
  }, [expenses, filters]);

  /* ======================
     CHART (MONTHLY SPEND)
  ====================== */
  const monthlySpend = useMemo(() => {
    const map = {};
    expenses.forEach(e => {
      const month = e.date?.slice(0, 7);
      map[month] = (map[month] || 0) + Number(e.amount || 0);
    });
    return map;
  }, [expenses]);

  const MAX_CHART_HEIGHT = 180;
  const maxMonthlySpend = Math.max(...Object.values(monthlySpend), 1);

  /* ======================
     EXPORT CSV (FIXED)
  ====================== */
  const exportCSV = () => {
    if (!filteredExpenses.length) {
      alert("No data to export");
      return;
    }

    const rows = [
      ["Employee", "Department", "Category", "Amount", "Date", "Status"],
      ...filteredExpenses.map(e => [
        e.employee,
        e.department,
        e.category,
        e.amount,
        e.date,
        e.status,
      ]),
    ];

    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");

    const monthLabel = filters.month || "ALL";
    link.href = URL.createObjectURL(blob);
    link.download = `Expense_Report_${monthLabel}.csv`;
    link.click();
  };

  /* ======================
     REPORT BUTTON ACTIONS
  ====================== */
  const generateMonthlyReport = () => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    setFilters(prev => ({ ...prev, month: currentMonth }));
  };

  const generateDepartmentReport = () => {
    setFilters(prev => ({ ...prev, month: "" }));
  };

  return (
    <div className="expense-page">
      <h1>Expense & Finance</h1>

      {/* ================= EMPLOYEE SUBMISSION ================= */}
      <div className="card">
        <h2>Submit Expense</h2>

        <div className="grid">
          <input
            placeholder="Employee Name"
            value={form.employee}
            onChange={e => setForm({ ...form, employee: e.target.value })}
          />

          <select
            value={form.department}
            onChange={e => setForm({ ...form, department: e.target.value })}
          >
            <option>Engineering</option>
            <option>HR</option>
            <option>Finance</option>
          </select>

          <select
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
          >
            <option>Travel</option>
            <option>Food</option>
            <option>Office Supplies</option>
          </select>

          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={e => setForm({ ...form, amount: e.target.value })}
          />

          <input
            type="date"
            
  min="1900-01-01"
  max="2100-12-31"
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
          />

          <input
            type="file"
            onChange={e =>
              setForm({
                ...form,
                receipt: URL.createObjectURL(e.target.files[0]),
              })
            }
          />
        </div>

        {form.receipt && (
          <img src={form.receipt} alt="receipt" className="receipt-preview" />
        )}

        <button className="blue-btn" onClick={submitExpense}>
          Submit Expense
        </button>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="filters">
        <select onChange={e => setFilters({ ...filters, department: e.target.value })}>
          <option value="ALL">All Departments</option>
          <option>Engineering</option>
          <option>HR</option>
          <option>Finance</option>
        </select>

        <select onChange={e => setFilters({ ...filters, status: e.target.value })}>
          <option value="ALL">All Status</option>
          <option>PENDING</option>
          <option>APPROVED</option>
          <option>REJECTED</option>
        </select>

        <input
  type="date"
  min="1900-01-01"
  max="2100-12-31"
  value={form.date}
  onChange={e => setForm({ ...form, date: e.target.value })}
/>

      </div>

      {/* ================= EXPENSE TABLE ================= */}
      <div className="card">
        <h2>Expense Approvals</h2>

        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Dept</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Payroll</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredExpenses.map(e => (
              <tr key={e.id}>
                <td>{e.employee}</td>
                <td>{e.department}</td>
                <td>{e.category}</td>
                <td>₹{Number(e.amount).toLocaleString()}</td>
                <td>{e.date}</td>
                <td>{e.status}</td>
                <td>{e.reimbursed ? "Queued" : "-"}</td>
                <td>
                  {e.status === "PENDING" && (
                    <>
                      <button className="approve" onClick={() => approveExpense(e.id)}>
                        Approve
                      </button>
                      <button className="reject" onClick={() => rejectExpense(e.id)}>
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MONTHLY CHART ================= */}
      <div className="card">
        <h2>Monthly Spend</h2>
        <div className="chart">
          {Object.entries(monthlySpend).map(([m, v]) => (
            <div key={m} className="bar">
              <span>₹{v.toLocaleString()}</span>
              <div
                style={{
                  height: `${(v / maxMonthlySpend) * MAX_CHART_HEIGHT}px`,
                }}
              />
              <small>{m}</small>
            </div>
          ))}
        </div>
      </div>

      {/* ================= REPORTS ================= */}
      <div className="card report-actions">
        <button className="blue-btn" onClick={generateMonthlyReport}>
          Monthly Report
        </button>
        <button className="blue-btn" onClick={generateDepartmentReport}>
          Department Wise
        </button>
        <button className="blue-btn" onClick={exportCSV}>
          Export CSV
        </button>
      </div>
    </div>
  );
};

export default ExpenseFinance;
