import React, { useState, useMemo } from "react";
import "./expenseFinance.css";
const LedgerSummary = () => {
  const [activeTab, setActiveTab] = useState("entries");
  const [showFilter, setShowFilter] = useState(false);

  const [filters, setFilters] = useState({
    from: "",
    to: "",
    account: "All",
    type: "All",
  });

  const ledgerEntries = useMemo(() => [
    {
      date: "2025-06-15",
      account: "Cash",
      description: "Office supplies purchase",
      reference: "EXP001",
      debit: 1250,
      credit: 0,
      balance: 48750,
      type: "Expense",
    },
    {
      date: "2025-06-15",
      account: "Accounts Receivable",
      description: "Invoice payment received",
      reference: "INV001",
      debit: 0,
      credit: 413000,
      balance: 413000,
      type: "Income",
    },
    {
      date: "2025-06-14",
      account: "Bank",
      description: "Salary payment",
      reference: "SAL001",
      debit: 350000,
      credit: 0,
      balance: 1250000,
      type: "Expense",
    },
    {
      date: "2025-06-14",
      account: "Revenue",
      description: "Service income",
      reference: "INV002",
      debit: 0,
      credit: 194700,
      balance: 1500000,
      type: "Income",
    },
  ], []);

  const filteredEntries = useMemo(() => {
    return ledgerEntries.filter(e => {
      if (filters.from && e.date < filters.from) return false;
      if (filters.to && e.date > filters.to) return false;
      if (filters.account !== "All" && e.account !== filters.account) return false;
      if (filters.type !== "All" && e.type !== filters.type) return false;
      return true;
    });
  }, [filters, ledgerEntries]);

  const totalIncome = filteredEntries.reduce((s, e) => s + e.credit, 0);
  const totalExpense = filteredEntries.reduce((s, e) => s + e.debit, 0);
  const netProfit = totalIncome - totalExpense;

  const exportLedger = () => {
    const header = "Date,Account,Description,Reference,Debit,Credit,Balance,Type";
    const rows = filteredEntries.map(e =>
      [e.date,e.account,e.description,e.reference,e.debit,e.credit,e.balance,e.type].join(",")
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Ledger_Summary.csv";
    link.click();
  };

  const accountBalances = useMemo(() => {
    const map = {};
    ledgerEntries.forEach(e => {
      map[e.account] = (map[e.account] || 0) + e.credit - e.debit;
    });
    return map;
  }, [ledgerEntries]);

  return (
    <div className="ledger-page">

      {/* HEADER */}
      <div className="ledger-header">

        <div>
          <h1 className="leg">Ledger Summary</h1>
          <p>Comprehensive financial ledger and account summaries</p>
        </div>

        <div className="ledger-header-actions">

          <button
            className="ledger-btn-light"
            onClick={() => setShowFilter(!showFilter)}
          >
            Advanced Filter
          </button>

          <button
            className="ledger-btn-primary"
            onClick={exportLedger}
          >
            Export Ledger
          </button>

        </div>

      </div>

      {/* FILTER */}
      {showFilter && (

        <div className="ledger-filters">

          <input
            type="date"
            value={filters.from}
            onChange={e => setFilters({ ...filters, from: e.target.value })}
          />

          <input
            type="date"
            value={filters.to}
            onChange={e => setFilters({ ...filters, to: e.target.value })}
          />

          <select
            value={filters.account}
            onChange={e => setFilters({ ...filters, account: e.target.value })}
          >
            <option value="All">All Accounts</option>
            <option>Cash</option>
            <option>Bank</option>
            <option>Revenue</option>
            <option>Accounts Receivable</option>
          </select>

          <select
            value={filters.type}
            onChange={e => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="All">All Types</option>
            <option>Income</option>
            <option>Expense</option>
          </select>

        </div>

      )}

      {/* SUMMARY */}
      <div className="ledger-summary-cards">

        <div className="ledger-summary-card">
          <span>Total Income : </span>
          <strong>₹{totalIncome.toLocaleString()}</strong>
        </div>

        <div className="ledger-summary-card">
          <span>Total Expenses : </span>
          <strong>₹{totalExpense.toLocaleString()}</strong>
        </div>

        <div className="ledger-summary-card">
          <span>Net Profit : </span>
          <strong>₹{netProfit.toLocaleString()}</strong>
        </div>

      </div>

      {/* TABS */}
      <div className="ledger-tabs">

        <button
          className={`ledger-tab ${activeTab==="entries"?"active":""}`}
          onClick={()=>setActiveTab("entries")}
        >
          Ledger Entries
        </button>

        <button
          className={`ledger-tab ${activeTab==="balances"?"active":""}`}
          onClick={()=>setActiveTab("balances")}
        >
          Account Balances
        </button>

        <button
          className={`ledger-tab ${activeTab==="analytics"?"active":""}`}
          onClick={()=>setActiveTab("analytics")}
        >
          Analytics
        </button>

        <button
          className={`ledger-tab ${activeTab==="reports"?"active":""}`}
          onClick={()=>setActiveTab("reports")}
        >
          Reports
        </button>

      </div>

      {/* TABLE */}
      {activeTab === "entries" && (

        <div className="ledger-table-card">

          <h3>Ledger Entries</h3>

          <table>

            <thead>

              <tr>
                <th>Date</th>
                <th>Account</th>
                <th>Description</th>
                <th>Reference</th>
                <th>Debit</th>
                <th>Credit</th>
                <th>Balance</th>
                <th>Type</th>
              </tr>

            </thead>

            <tbody>

              {filteredEntries.map((e, i) => (

                <tr key={i}>

                  <td>{e.date}</td>
                  <td>{e.account}</td>
                  <td>{e.description}</td>
                  <td>{e.reference}</td>
                  <td>{e.debit ? `₹${e.debit.toLocaleString()}` : "-"}</td>
                  <td>{e.credit ? `₹${e.credit.toLocaleString()}` : "-"}</td>
                  <td>₹{e.balance.toLocaleString()}</td>

                  <td>
                    <span className={`ledger-badge ${e.type==="Income"?"success":"warning"}`}>
                      {e.type}
                    </span>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

      {activeTab === "balances" && (
        <div className="ledger-table-card">
          <h3>Account Balances</h3>
          <ul>
            {Object.entries(accountBalances).map(([acc, val]) => (
              <li key={acc}><strong>{acc}</strong> : ₹{val.toLocaleString()}</li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="ledger-table-card">
          <h3>Analytics</h3>
          <p>Income vs Expense charts will be displayed here.</p>
        </div>
      )}

      {activeTab === "reports" && (
        <div className="ledger-table-card">
          <h3>Reports</h3>
          <p>Detailed ledger and financial reports will be generated here.</p>
        </div>
      )}

    </div>
  );
};

export default LedgerSummary;