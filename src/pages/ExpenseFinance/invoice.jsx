import React, { useState } from "react";
import "./expenseFinance.css";
import jsPDF from "jspdf";
import { FaEye, FaDownload, FaCheck } from "react-icons/fa";

const Invoice = () => {
  const [activeTab, setActiveTab] = useState("invoices");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [invoices, setInvoices] = useState([
    {
      no: "INV-2025-001",
      client: "ABC Corporation",
      email: "contact@abc.com",
      date: "2025-06-15",
      dueDate: "2025-07-15",
      amount: 413000,
      paid: 413000,
      status: "Paid",
      paymentMode: "UPI"
    },
    {
      no: "INV-2025-002",
      client: "XYZ Ltd.",
      email: "info@xyz.com",
      date: "2025-06-12",
      dueDate: "2025-07-12",
      amount: 194700,
      paid: 100000,
      status: "Partially Paid",
      paymentMode: "UPI"
    },
    {
      no: "INV-2025-003",
      client: "Tech Startup",
      email: "hello@techstartup.com",
      date: "2025-06-10",
      dueDate: "2025-07-10",
      amount: 59000,
      paid: 0,
      status: "Sent",
      paymentMode: "Cash"
    },
    {
      no: "INV-2025-004",
      client: "Manufacturing Co.",
      email: "procurement@mfg.com",
      date: "2025-06-08",
      dueDate: "2025-06-08",
      amount: 708000,
      paid: 0,
      status: "Overdue",
      paymentMode: "Net Banking"
    },
  ]);

 const [newInvoice, setNewInvoice] = useState({
  client: "",
  email: "",
  amount: "",
  date: "",
  dueDate: "",
  status: "",
  paymentMode: "",
  description: ""
});
const handleInvoiceChange = (e) => {
  const { name, value } = e.target;

  setNewInvoice(prev => ({
    ...prev,
    [name]: value
  }));
};
const saveInvoice = () => {

  if (!newInvoice.client || !newInvoice.amount || !newInvoice.date) {
    alert("Please fill required fields");
    return;
  }

  const invoiceNo = `INV-${Date.now()}`;

const newEntry = {
  no: invoiceNo,
  client: newInvoice.client,
  email: newInvoice.email,
  amount: Number(newInvoice.amount),
  paid: 0,
  date: newInvoice.date,
  dueDate: newInvoice.dueDate,
  status: newInvoice.status || "Sent",
  paymentMode: newInvoice.paymentMode,
  description: newInvoice.description
};

  setInvoices(prev => [...prev, newEntry]);

  setShowCreateModal(false);

  setNewInvoice({
  client: "",
  email: "",
  amount: "",
  date: "",
  dueDate: "",
  status: "",
  paymentMode: "",
  description: ""
});

};

  const totalInvoices = invoices.length;
  const totalValue = invoices.reduce((s, i) => s + i.amount, 0);
  const totalPaid = invoices.reduce((s, i) => s + i.paid, 0);
  const outstanding = totalValue - totalPaid;
  const paidCount = invoices.filter(i => i.status === "Paid").length;

  const exportInvoices = () => {
    const header = "Invoice,Client,Amount,Paid,Balance,Status";
    const rows = invoices.map(i =>
      [i.no, i.client, i.amount, i.paid, i.amount - i.paid, i.status].join(",")
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Invoices.csv";
    link.click();
  };

const markPaid = (invoiceNo) => {
  setInvoices(prev =>
    prev.map(inv =>
      inv.no === invoiceNo
        ? { ...inv, paid: inv.amount, status: "Paid" }
        : inv
    )
  );
};
const downloadInvoice = (invoice) => {

  const pdf = new jsPDF();

  let y = 20;

  // HEADER
  pdf.setFontSize(16);
  pdf.text("CRESTCLIMBER SOFTWARE SOLUTIONS PRIVATE LIMITED", 30, y);

  pdf.setFontSize(12);
  pdf.text("Invoice", 95, y + 10);

  y += 25;

  // CLIENT DETAILS BOX
  pdf.rect(15, y, 180, 40);

  pdf.setFontSize(11);

  pdf.text(`Client Name`, 20, y + 8);
  pdf.text(`: ${invoice.client}`, 60, y + 8);

  pdf.text(`Email`, 20, y + 16);
  pdf.text(`: ${invoice.email}`, 60, y + 16);

  pdf.text(`Invoice No`, 20, y + 24);
  pdf.text(`: ${invoice.no}`, 60, y + 24);

  pdf.text(`Date`, 120, y + 8);
  pdf.text(`: ${invoice.date}`, 150, y + 8);

  pdf.text(`Due Date`, 120, y + 16);
  pdf.text(`: ${invoice.dueDate}`, 150, y + 16);

  pdf.text(`Payment Mode`, 120, y + 24);
  pdf.text(`: ${invoice.paymentMode}`, 150, y + 24);

  y += 55;

  // TABLE HEADER
  pdf.rect(15, y, 180, 10);
  pdf.text("DESCRIPTION", 20, y + 7);
  pdf.text("AMOUNT", 160, y + 7);

  y += 10;

  // SERVICE ROW
  pdf.rect(15, y, 180, 10);
  pdf.text("Service Charges", 20, y + 7);
  pdf.text(`Rs. ${invoice.amount.toLocaleString()}`, 160, y + 7);

  y += 10;

  pdf.rect(15, y, 180, 10);
  pdf.text("Paid", 20, y + 7);
  pdf.text(`₹ ${invoice.paid.toLocaleString()}`, 160, y + 7);

  y += 10;

  const balance = invoice.amount - invoice.paid;

  pdf.rect(15, y, 180, 10);
  pdf.text("Balance", 20, y + 7);
  pdf.text(`₹ ${balance.toLocaleString()}`, 160, y + 7);

  y += 20;

  // STATUS
  pdf.setFontSize(12);
  pdf.text(`Status : ${invoice.status}`, 20, y);

  y += 15;

  // AMOUNT IN WORDS
  const amountWords = `Rupees ${invoice.amount.toLocaleString()} Only`;

  pdf.text(`In Words : ${amountWords}`, 20, y);

  y += 20;

  // FOOTER
  pdf.setFontSize(10);
  pdf.text("This is a computer generated invoice. No signature required.", 40, y);

  pdf.save(`${invoice.no}.pdf`);

};

  const paidInvoices = invoices.filter(i => i.status === "Paid");

 const filteredInvoices = invoices.filter(i => {

  if (statusFilter !== "All" && i.status !== statusFilter) {
    return false;
  }

  if (paymentFilter !== "All" && i.paymentMode !== paymentFilter) {
    return false;
  }
  if (
    searchTerm &&
    !i.client.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !i.no.toLowerCase().includes(searchTerm.toLowerCase())
  ) return false;

  return true;

});

  return (
    <div className="invoice-page">

      {/* HEADER */}
      <div className="invoice-header">
        <div>
          <h1>Invoice Manager</h1>
          <p>Create and manage client invoices</p>
        </div>

        <div className="invoice-header-actions">
          <button className="invoice-btn-light" onClick={exportInvoices}>
            Export
          </button>

          <button
            className="invoice-btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            + Create Invoice
          </button>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="invoice-summary-cards">

        <div className="invoice-summary-card">
          <span>Total Invoices</span>
          <strong>{totalInvoices}</strong>
        </div>

        <div className="invoice-summary-card">
          <span>Total Value</span>
          <strong>₹{totalValue.toLocaleString()}</strong>
        </div>

        <div className="invoice-summary-card">
          <span>Outstanding</span>
          <strong>₹{outstanding.toLocaleString()}</strong>
        </div>

        <div className="invoice-summary-card">
          <span>Paid</span>
          <strong>{paidCount}</strong>
        </div>

      </div>

      {/* TABS */}
      <div className="invoice-tabs">

        <button
          className={`invoice-tab ${activeTab==="invoices"?"active":""}`}
          onClick={()=>setActiveTab("invoices")}
        >
          Invoices
        </button>

        <button
          className={`invoice-tab ${activeTab==="payments"?"active":""}`}
          onClick={()=>setActiveTab("payments")}
        >
          Payments
        </button>

        <button
          className={`invoice-tab ${activeTab==="reports"?"active":""}`}
          onClick={()=>setActiveTab("reports")}
        >
          Reports
        </button>

      </div>

      {/* INVOICE TABLE */}
      {activeTab === "invoices" && (
        <div className="invoice-table-card">

          <h3>Invoice List</h3>

          <div className="invoice-filters">
            <input
  placeholder="Search invoices..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
            <select
  value={statusFilter}
  onChange={(e)=>setStatusFilter(e.target.value)}
>
             <option value="All">All Status</option>
  <option value="Partially Paid">Partially Paid</option>
  <option value="Sent">Sent</option>
  <option value="Overdue">Overdue</option>
            </select>
            <select
  value={paymentFilter}
  onChange={(e)=>setPaymentFilter(e.target.value)}
>
  <option value="All">All Payments</option>
  <option value="UPI">UPI</option>
  <option value="Cash">Cash</option>
  <option value="Net Banking">Net Banking</option>
</select>
          </div>

          <table>

            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Client</th>
                <th>Date</th>
                <th>Due Date</th>
                <th>Amount</th>
                <th>Paid</th>
                <th>Balance</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
{filteredInvoices.map((i, idx) => (

                <tr key={idx}>

                  <td>{i.no}</td>

                  <td>
                    {i.client}
                    <br/>
                    <small>{i.email}</small>
                  </td>

                  <td>{i.date}</td>
                  <td>{i.dueDate}</td>
                  <td>₹{i.amount.toLocaleString()}</td>
                  <td>₹{i.paid.toLocaleString()}</td>
                  <td>₹{(i.amount - i.paid).toLocaleString()}</td>
                  <td>{i.paymentMode || "-"}</td>

                  <td>
                    <span className={`invoice-badge ${
                      i.status==="Paid" ? "success" :
                      i.status==="Overdue" ? "danger" : "warning"
                    }`}>
                      {i.status}
                    </span>
                  </td>

                  <td className="invoice-action-buttons">

  {/* VIEW */}
  <button
    title="View"
    onClick={()=>{
      setSelectedInvoice(i);
      setShowViewModal(true);
    }}
  >
    <FaEye />
  </button>

  { i.status !== "Paid" && (
  <button
    className="markss-view"
    title="Mark Paid"
    onClick={()=>markPaid(i.no)}
  >
    <FaCheck />
  </button>
)}
  {/* DOWNLOAD */}
 <button
  title="Download"
  onClick={() => downloadInvoice(i)}
>
  <FaDownload />
</button>

</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

      {/* PAYMENTS TAB */}
      {activeTab === "payments" && (
  <div className="invoice-table-card">

    <h3>Payments</h3>

    <table>

      <thead>
        <tr>
          <th>Invoice #</th>
          <th>Client</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Paid</th>
        </tr>
      </thead>

      <tbody>

        {paidInvoices.length === 0 && (
          <tr>
            <td colSpan="5" style={{textAlign:"center"}}>
              No payments yet
            </td>
          </tr>
        )}

        {paidInvoices.map((i, idx) => (

          <tr key={idx}>

            <td>{i.no}</td>

            <td>
              {i.client}
              <br/>
              <small>{i.email}</small>
            </td>

            <td>{i.date}</td>

            <td>₹{i.amount.toLocaleString()}</td>

            <td>₹{i.paid.toLocaleString()}</td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>
)}

      {/* REPORTS TAB */}
      {activeTab === "reports" && (
  <div className="invoice-table-card">

    <h3>Invoice Reports</h3>

    <div className="invoice-report-grid">

      <div className="report-card">
        <span>Total Invoices</span>
        <strong>{totalInvoices}</strong>
      </div>

      <div className="report-card">
        <span>Total Revenue</span>
        <strong>₹{totalValue.toLocaleString()}</strong>
      </div>

      <div className="report-card">
        <span>Total Paid</span>
        <strong>₹{totalPaid.toLocaleString()}</strong>
      </div>

      <div className="report-card">
        <span>Outstanding</span>
        <strong>₹{outstanding.toLocaleString()}</strong>
      </div>

      <div className="report-card">
        <span>Paid Invoices</span>
        <strong>{paidCount}</strong>
      </div>

      <div className="report-card">
        <span>Pending Invoices</span>
        <strong>{totalInvoices - paidCount}</strong>
      </div>

    </div>

  </div>
)}

      {/* VIEW MODAL */}
      {showViewModal && selectedInvoice && (

        <div className="invoice-modal-overlay">

          <div className="invoice-modal">

            <div className="invoice-modal-header">
              <h3>Invoice Details</h3>
              <button
                className="invoice-close-btn"
                onClick={()=>setShowViewModal(false)}
              >
                ×
              </button>
            </div>
<div className="invoice-details" id="invoice-print">

  <div className="invoice-row">
  <span className="invoice-label">Invoice No</span>
  <span className="colon">:</span>
  <span>{selectedInvoice.no}</span>
</div>

  <div className="invoice-row">
  <span className="invoice-label">Client</span>
  <span className="colon">:</span>
  <span>{selectedInvoice.client}</span>
</div>

  <div className="invoice-row">
  <span className="invoice-label">Email</span>
  <span className="colon">:</span>
  <span>{selectedInvoice.email}</span>
</div>

  <div className="invoice-row">
  <span className="invoice-label">Date</span>
  <span className="date">:</span>
  <span>{selectedInvoice.date}</span>
</div>

  <div className="invoice-row">
  <span className="invoice-label">Due Date</span>
  <span className="colon">:</span>
  <span>{selectedInvoice.dueDate}</span>
</div>

  <div className="invoice-row">
  <span className="invoice-label">Amount</span>
  <span className="colon">:</span>
  <span>₹{selectedInvoice.amount.toLocaleString()}</span>
</div>

<div className="invoice-row">
  <span className="invoice-label">Paid</span>
  <span className="colon">:</span>
  <span>₹{selectedInvoice.paid.toLocaleString()}</span>
</div>

<div className="invoice-row">
  <span className="invoice-label">Balance</span>
  <span className="colon">:</span>
  <span>
    ₹{(selectedInvoice.amount - selectedInvoice.paid).toLocaleString()}
  </span>
</div>

<div className="invoice-row">
  <span className="invoice-label">Status</span>
  <span className="colon">:</span>
  <span>{selectedInvoice.status}</span>
</div>

</div>

          </div>

        </div>

      )}

      {/* CREATE MODAL */}
      {showCreateModal && (

        <div className="invoice-modal-overlay">

          <div className="invoice-modal">

            <div className="invoice-modal-header">
              <h3>Create Invoice</h3>
              <button
                className="invoice-close-btn"
                onClick={()=>setShowCreateModal(false)}
              >
                ×
              </button>
            </div>

<div className="invoice-form">

  <div className="form-group">
    <label>Date</label>
    <input
      type="date"
      name="date"
      value={newInvoice.date}
      onChange={handleInvoiceChange}
    />
  </div>

  <div className="form-group">
    <label>Due Date</label>
    <input
      type="date"
      name="dueDate"
      value={newInvoice.dueDate}
      onChange={handleInvoiceChange}
    />
  </div>

  <div className="form-group">
    <label>Amount</label>
    <input
      type="number"
      name="amount"
      placeholder="Enter amount"
      value={newInvoice.amount}
      onChange={handleInvoiceChange}
    />
  </div>

  <div className="form-group">
    <label>Status</label>
    <select
      name="status"
      value={newInvoice.status}
      onChange={handleInvoiceChange}
    >
      <option value="">Select Status</option>
      <option value="Sent">Sent</option>
      <option value="Partially Paid">Partially Paid</option>
      <option value="Overdue">Overdue</option>
    </select>
  </div>

  <div className="form-group">
    <label>Client</label>
    <input
      name="client"
      placeholder="Client name"
      value={newInvoice.client}
      onChange={handleInvoiceChange}
    />
  </div>

  <div className="form-group">
    <label>Payment Mode</label>
    <select
      name="paymentMode"
      value={newInvoice.paymentMode}
      onChange={handleInvoiceChange}
    >
      <option value="">Select Payment Mode</option>
      <option value="UPI">UPI</option>
      <option value="Cash">Cash</option>
      <option value="Net Banking">Net Banking</option>
    </select>
  </div>

  {/* Full width field */}
  <div className="form-group full-width">
    <label>Description</label>
    <textarea
      name="description"
      placeholder="Enter description"
      value={newInvoice.description}
      onChange={handleInvoiceChange}
    />
  </div>



</div>

            <div className="invoice-modal-actions">

              <button
                className="invoice-btn-light"
                onClick={()=>setShowCreateModal(false)}
              >
                Cancel
              </button>

              <button
                className="invoice-btn-primary"
                onClick={saveInvoice}
              >
                Save
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Invoice;