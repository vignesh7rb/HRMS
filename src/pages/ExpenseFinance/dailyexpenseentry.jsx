import React, { useState } from "react";
import "./expenseFinance.css";

const DailyExpenseEntry = () => {

  const [expenses, setExpenses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [viewExpense, setViewExpense] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const [newExpense, setNewExpense] = useState({
    date: "",
    amount: "",
    category: "",
    description: "",
    vendor: "",
    payment: "",
    receipt: false,
    status: "Pending"
  });

  const todayTotal = expenses.reduce(
    (sum, e) => sum + (parseFloat(e.amount) || 0),
    0
  );

  const pendingCount = expenses.filter(e => e.status === "Pending").length;
  const approvedCount = expenses.filter(e => e.status === "Approved").length;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExpense(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {

    if (!newExpense.date || !newExpense.amount || !newExpense.category) {
      alert("Fill required fields");
      return;
    }

    if (editIndex !== null) {

      const updated = [...expenses];
      updated[editIndex] = newExpense;
      setExpenses(updated);
      setEditIndex(null);

    } else {

      setExpenses(prev => [...prev, newExpense]);

    }

    setNewExpense({
      date: "",
      amount: "",
      category: "",
      description: "",
      vendor: "",
      payment: "",
      receipt: false,
      status: "Pending"
    });

    setShowModal(false);
  };

  const deleteExpense = (index) => {

    if (window.confirm("Delete this expense?")) {
      setExpenses(expenses.filter((_, i) => i !== index));
    }

  };

  const editExpense = (index) => {

    setNewExpense(expenses[index]);
    setEditIndex(index);
    setShowModal(true);

  };

  if (viewExpense) {

    return (
      <div className="expense-quotation-container">

        <div className="expense-quotation-header">

          <h2>Crestclimber Software Solutions Private Limited</h2>

          <p>
            No 5, Station View Road<br/>
            Kodambakkam, Tamil Nadu<br/>
            Chennai – 600024
          </p>

        </div>

        <div className="expense-quotation-meta">

          <div>
            <b>Expense ID :</b> EXP-0001
          </div>

          <div>
            <b>Date :</b> {viewExpense.date}
          </div>

        </div>

        <div className="expense-quote-section">

          <h3>Expense Details</h3>

          <p><b>Category :</b> {viewExpense.category}</p>
          <p><b>Vendor :</b> {viewExpense.vendor}</p>
          <p><b>Amount :</b> ₹{viewExpense.amount}</p>
          <p><b>Payment Mode :</b> {viewExpense.payment}</p>
          <p><b>Status :</b> {viewExpense.status}</p>
          <p><b>Description :</b> {viewExpense.description || "-"}</p>

        </div>

        <div className="expense-total-box">

          <h2>Total Expense : ₹{viewExpense.amount}</h2>

        </div>

        <br/>

        <button
          className="expense-btn-primary no-print"
          onClick={() => setViewExpense(null)}
        >
          Back
        </button>

      </div>
    );
  }

  const exportCSV = () => {

    const header =
      "Date,Category,Description,Vendor,Amount,Payment,Status";

    const rows = expenses.map(e =>
      [e.date, e.category, e.description, e.vendor, e.amount, e.payment, e.status].join(",")
    );

    const csv = [header, ...rows].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Expense_Report.csv";
    link.click();

  };

  const handleBulkUpload = (e) => {

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (evt) => {

      const lines = evt.target.result.split("\n").slice(1);

      const data = lines
        .filter(l => l.trim())
        .map(row => {

          const [date, category, description, vendor, amount, payment] =
            row.split(",");

          return {
            date,
            category,
            description,
            vendor,
            amount,
            payment,
            status: "Pending"
          };

        });

      setExpenses(prev => [...prev, ...data]);
      setShowBulkModal(false);

    };

    reader.readAsText(file);

  };

  return (

    <div className="expense-page">

      <div className="expense-header">

        <div>
          <h1>Daily Expense Entry</h1>
          <p>Record and manage daily business expenses</p>
        </div>

        <div className="expense-header-actions">

          <button
            className="expense-btn-light"
            onClick={() => setShowBulkModal(true)}
          >
            Bulk Upload
          </button>

          <button
            className="expense-btn-light"
            onClick={exportCSV}
          >
            Export
          </button>

          <button
            className="expense-btn-primary"
            onClick={() => setShowModal(true)}
          >
            + Add Expense
          </button>

        </div>

      </div>

      <div className="expense-summary-cards">

        <div className="expense-summary-card">
          <span>Today's Expenses</span>
          <strong>₹{todayTotal}</strong>
        </div>

        <div className="expense-summary-card">
          <span>Pending Approval</span>
          <strong>{pendingCount}</strong>
        </div>

        <div className="expense-summary-card">
          <span>Approved</span>
          <strong>{approvedCount}</strong>
        </div>

      </div>

      <div className="expense-table-card">

        <h3>Expense Entries</h3>

        <table>

          <thead>

            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Vendor</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {expenses.length === 0 && (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No data
                </td>
              </tr>
            )}

            {expenses.map((e, i) => (

              <tr key={i}>

                <td>{e.date}</td>
                <td>{e.category}</td>
                <td>{e.description}</td>
                <td>{e.vendor}</td>
                <td>₹{e.amount}</td>
                <td>{e.payment}</td>
                <td>{e.status}</td>

                <td className="expense-action-buttons">

                  <button onClick={() => setViewExpense(e)}>👁</button>

                  <button onClick={() => editExpense(i)}>✏</button>

                  <button onClick={() => deleteExpense(i)}>🗑</button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {showModal && (

        <div className="expense-modal-overlay">

          <div className="expense-modal">

  <div className="expense-modal-header">

    

    <button
      className="expense-modal-close"
      onClick={() => setShowModal(false)}
    >
      ✕
    </button>

  </div>

  <h3>Add Expense</h3>

            <input type="date"
              name="date"
              value={newExpense.date}
              onChange={handleChange}
            />

            <input
              name="amount"
              placeholder="Amount"
              value={newExpense.amount}
              onChange={handleChange}
            />

            <select
              name="category"
              value={newExpense.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option>Office Supplies</option>
              <option>Travel</option>
              <option>Utilities</option>
              <option>Food</option>
            </select>

            <input
              name="vendor"
              placeholder="Vendor"
              value={newExpense.vendor}
              onChange={handleChange}
            />

            <select
              name="payment"
              value={newExpense.payment}
              onChange={handleChange}
            >
              <option value="">Payment Mode</option>
              <option>Cash</option>
              <option>UPI</option>
              <option>Card</option>
            </select>

            <textarea
              name="description"
              placeholder="Description"
              value={newExpense.description}
              onChange={handleChange}
            />

            <div className="expense-modal-actions">

              <button
                className="expense-btn-light"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="expense-btn-primary"
                onClick={handleSubmit}
              >
                Save
              </button>

            </div>

          </div>

        </div>

      )}

      {showBulkModal && (

        <div className="expense-modal-overlay">

          <div className="expense-modal">

  <button
    className="expense-modal-close"
    onClick={() => setShowBulkModal(false)}
  >
    ✕
  </button>

  <h3>Bulk Upload Expenses</h3>

            <p>
              CSV Format:
              Date, Category, Description, Vendor, Amount, Payment
            </p>

            <input
              type="file"
              accept=".csv"
              onChange={handleBulkUpload}
            />

          </div>

        </div>

      )}

    </div>

  );

};

export default DailyExpenseEntry;