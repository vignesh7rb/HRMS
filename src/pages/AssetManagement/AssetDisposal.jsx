import React, { useState, useMemo } from "react";
import { FaPlus, FaEye, FaEdit } from "react-icons/fa";
import "./assetManagement.css";

const AssetDisposal = () => {
    
const [searchText, setSearchText] = useState("");
const [statusFilter, setStatusFilter] = useState("ALL");
const [methodFilter, setMethodFilter] = useState("ALL");
  const disposals = useMemo(() => [
    {
      id: "AST001",
      asset: "Dell Laptop - Inspiron 15",
      category: "IT Equipment",
      method: "Sale",
      original: 1200,
      current: 300,
      recovery: 250,
      date: "2024-02-01",
      status: "Pending",
      requestedBy: "John Smith",
      requestDate: "2024-01-15",
      reason: "End of useful life",
    },
    {
      id: "AST015",
      asset: "Office Chair - Ergonomic",
      category: "Furniture",
      method: "Donation",
      original: 450,
      current: 100,
      recovery: 0,
      date: "2024-01-25",
      status: "Completed",
      requestedBy: "Mike Wilson",
      requestDate: "2024-01-10",
      reason: "Damaged beyond repair",
    },
  ], []);
  const filteredDisposals = useMemo(() => {
  return disposals.filter((item) => {

    const matchSearch =
      item.asset.toLowerCase().includes(searchText.toLowerCase()) ||
      item.id.toLowerCase().includes(searchText.toLowerCase());

    const matchStatus =
      statusFilter === "ALL" || item.status === statusFilter;

    const matchMethod =
      methodFilter === "ALL" || item.method === methodFilter;

    return matchSearch && matchStatus && matchMethod;

  });
}, [disposals, searchText, statusFilter, methodFilter]);

  return (
    <div className="disposal-page">

      {/* HEADER */}
      <div className="disposal-header">
        <div>
          <h1>Asset Disposal</h1>
          <p>Manage asset disposal and retirement</p>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="disposal-summary">
        <div className="summary-card">
          <span>Total Disposals</span>
          <h2>2</h2>
        </div>

        <div className="summary-card">
          <span>Pending</span>
          <h2 className="orange">1</h2>
        </div>

        <div className="summary-card">
          <span>Completed</span>
          <h2 className="green">1</h2>
        </div>

        <div className="summary-card">
          <span>Recovery Value</span>
          <h2 className="blue">₹250</h2>
        </div>
      </div>

      {/* FILTER BAR */}
    <div className="disposal-filters">
  <input
    placeholder="Search assets..."
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
  />

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
  >
    <option value="ALL">All Status</option>
    <option value="Pending">Pending</option>
    <option value="Completed">Completed</option>
  </select>

  <select
    value={methodFilter}
    onChange={(e) => setMethodFilter(e.target.value)}
  >
    <option value="ALL">All Methods</option>
    <option value="Sale">Sale</option>
    <option value="Donation">Donation</option>
  </select>

  <button className="primary-btn">
    <FaPlus /> Request Disposal
  </button>
</div>

      {/* TABLE */}
      <div className="disposal-table-card">
        <h2>Asset Disposals (2)</h2>

        <table>
          <thead>
            <tr>
              <th>Asset</th>
              <th>Method</th>
              <th>Values</th>
              <th>Disposal Date</th>
              <th>Status</th>
              <th>Requested By</th>
              <th>Reason</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredDisposals.map((item) => (
              <tr key={item.id}>

                <td>
                  <strong>{item.asset}</strong>
                  <div className="sub-text">
                    {item.id} • {item.category}
                  </div>
                </td>

                <td>
                  <span className={`badge method ${item.method.toLowerCase()}`}>
                    {item.method}
                  </span>
                </td>

                <td>
                  <div>Original: ₹{item.original}</div>
                  <div>Current: ₹{item.current}</div>
                  <div className="recovery">
                    Recovery: ₹{item.recovery}
                  </div>
                </td>

                <td>{item.date}</td>

                <td>
                  <span className={`badge status ₹{item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </td>

                <td>
                  <strong>{item.requestedBy}</strong>
                  <div className="sub-text">
                    {item.requestDate}
                  </div>
                </td>

                <td>{item.reason}</td>

                <td className="action-buttons">
                  <button className="icon-btn">
                    <FaEye />
                  </button>
                  <button className="icon-btn">
                    <FaEdit />
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

export default AssetDisposal;