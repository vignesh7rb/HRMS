import { useState, useMemo } from "react";
import "./assetManagement.css";

const ReturnAsset = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [searchText, setSearchText] = useState("");
const [departmentFilter, setDepartmentFilter] = useState("ALL");
const [statusFilter, setStatusFilter] = useState("ALL");

  const returns = useMemo(() => [
    {
      id: "AST001",
      assetName: "Dell Latitude 5420",
      category: "Laptop",
      employee: "John Doe",
      department: "Engineering",
      empId: "EMP001",
      from: "15 Jan 2025",
      due: "15 Jan 2026",
      returnStatus: "Due Soon",
      condition: "Good",
    },
    {
      id: "AST008",
      assetName: "MacBook Pro 14",
      category: "Laptop",
      employee: "Alice Johnson",
      department: "Design",
      empId: "EMP004",
      from: "01 Dec 2024",
      due: "01 Jun 2025",
      returnStatus: "Overdue (10 days)",
      condition: "Excellent",
    },
    {
      id: "AST009",
      assetName: "iPad Pro",
      category: "Tablet",
      employee: "Robert Chen",
      department: "Sales",
      empId: "EMP005",
      from: "01 Mar 2025",
      due: "20 Jun 2025",
      returnStatus: "Due Soon",
      condition: "Good",
    },
  ], []);
  const filteredReturns = useMemo(() => {
  return returns.filter((item) => {

    const matchSearch =
      item.assetName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.employee.toLowerCase().includes(searchText.toLowerCase());

    const matchDepartment =
      departmentFilter === "ALL" || item.department === departmentFilter;

    const matchStatus =
      statusFilter === "ALL" ||
      item.returnStatus.toLowerCase().includes(statusFilter.toLowerCase());

    return matchSearch && matchDepartment && matchStatus;

  });
}, [returns, searchText, departmentFilter, statusFilter]);

  return (
    <div className="return-page">

      {/* HEADER */}
      <div className="return-header">
        <div>
          <h1>Asset Return Management</h1>
          <p>Track and process asset returns from employees</p>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="return-summary">
        <div className="summary-card">
          <span>Pending Returns</span>
          <h2>3</h2>
          <small>Assets to be returned</small>
        </div>

        <div className="summary-card">
          <span>Overdue Returns</span>
          <h2 className="red">1</h2>
          <small>Past due date</small>
        </div>

        <div className="summary-card">
          <span>Due Soon</span>
          <h2 className="orange">2</h2>
          <small>Due in 30 days</small>
        </div>

        <div className="summary-card">
          <span>Completed Returns</span>
          <h2 className="green">2</h2>
          <small>This month</small>
        </div>
      </div>

      {/* TABS */}
      <div className="return-tabs">
        <button
          className={activeTab === "pending" ? "active" : ""}
          onClick={() => setActiveTab("pending")}
        >
          Pending Returns
        </button>

        <button
          className={activeTab === "process" ? "active" : ""}
          onClick={() => setActiveTab("process")}
        >
          Process Return
        </button>

        <button
          className={activeTab === "history" ? "active" : ""}
          onClick={() => setActiveTab("history")}
        >
          Return History
        </button>
      </div>

      {/* PENDING RETURNS TABLE */}
      {activeTab === "pending" && (
        <div className="return-table-card">

          <div className="table-header">
            <h2>Pending Asset Returns</h2>
            <p>Assets that need to be returned by employees</p>
          </div>

          {/* FILTER BAR */}
          <div className="table-filters">
  <input
    placeholder="Search pending returns..."
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
  />

  <select
    value={departmentFilter}
    onChange={(e) => setDepartmentFilter(e.target.value)}
  >
    <option value="ALL">All Departments</option>
    <option value="Engineering">Engineering</option>
    <option value="Design">Design</option>
    <option value="Sales">Sales</option>
  </select>

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
  >
    <option value="ALL">All Status</option>
    <option value="Due Soon">Due Soon</option>
    <option value="Overdue">Overdue</option>
  </select>
</div>

          {/* TABLE */}
          <table>
            <thead>
              <tr>
                <th>Asset Details</th>
                <th>Employee</th>
                <th>Assignment Period</th>
                <th>Return Status</th>
                <th>Condition</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredReturns.map((item) => (
                <tr key={item.id}>

                  <td>
                    <strong>{item.assetName}</strong>
                    <div className="sub-text">{item.id}</div>
                    <span className="badge category">
                      {item.category}
                    </span>
                  </td>

                  <td>
                    <strong>{item.employee}</strong>
                    <div className="sub-text">{item.department}</div>
                    <div className="sub-text">{item.empId}</div>
                  </td>

                  <td>
                    <div>From: {item.from}</div>
                    <div>Due: {item.due}</div>
                  </td>

                  <td>
                    <span
                      className={`badge return-status ${
                        item.returnStatus.includes("Overdue")
                          ? "overdue"
                          : "due"
                      }`}
                    >
                      {item.returnStatus}
                    </span>
                  </td>

                  <td>
                    <span className={`badge condition ${item.condition.toLowerCase()}`}>
                      {item.condition}
                    </span>
                  </td>

                  <td className="action-buttons">
                    <button className="primary-outline-btn">
                      Process Return
                    </button>
                    <button className="secondary-btn">
                      Send Reminder
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}
    </div>
  );
};

export default ReturnAsset;