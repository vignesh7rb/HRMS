import { useState, useMemo } from "react";
import "./assetManagement.css";

const ReturnAsset = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [searchText, setSearchText] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showProcessModal, setShowProcessModal] = useState(false);
const [selectedReturn, setSelectedReturn] = useState(null);
const [successMessage, setSuccessMessage] = useState("");
const [lookupResult, setLookupResult] = useState(null);

const [manualAssetId, setManualAssetId] = useState("");

const [returnHistory, setReturnHistory] = useState([
  {
    asset: "Wireless Keyboard",
    id: "AST010",
    returnedBy: "Maria Garcia",
    receivedBy: "IT Support",
    originalCondition: "Good",
    returnCondition: "Good",
    note: "Returned in good condition, no issues found",
    date: "May 05, 2025",
    status: "Completed",
  },
  {
    asset: "External Monitor",
    id: "AST011",
    returnedBy: "David Wilson",
    receivedBy: "IT Support",
    originalCondition: "Good",
    returnCondition: "Fair",
    note: "Minor scratches on screen, otherwise functional",
    date: "Apr 28, 2025",
    status: "Completed",
  },
]);

const [recentActivities, setRecentActivities] = useState([
  {
    asset: "Dell Monitor",
    employee: "John Doe",
    time: "2 hours ago",
    condition: "Good condition",
    status: "Completed",
  },
  {
    asset: "iPhone 13",
    employee: "System",
    time: "1 day ago",
    condition: "Condition check required",
    status: "Pending",
  },
]);

  const [returns, setReturns] = useState([
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

  ]);
  // summary calculations
const pendingCount = returns.length;

const overdueCount = returns.filter((item) =>
  item.returnStatus.toLowerCase().includes("overdue")
).length;

const dueSoonCount = returns.filter((item) =>
  item.returnStatus.toLowerCase().includes("due soon")
).length;

const completedCount = returnHistory.length;
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

const handleProcessReturn = (asset) => {
  setSelectedReturn(asset);
  setShowProcessModal(true);
};

const handleSendReminder = (asset) => {
  setSuccessMessage(`Reminder sent to ${asset.employee}`);

  setTimeout(() => {
    setSuccessMessage("");
  }, 3000);

  if (asset) {
    setSelectedReturn(asset);
    setShowProcessModal(true);
  } else {

    setSuccessMessage("Asset not found");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

  }
};

const handleBulkReturn = () => {

  const newActivity = {
    asset: "Bulk Assets",
    employee: "Multiple Employees",
    time: "Just now",
    condition: "Mixed condition",
    status: "Completed",
  };

  setRecentActivities((prev) => [newActivity, ...prev]);

  setSuccessMessage("Bulk returns processed");

  setTimeout(() => {
    setSuccessMessage("");
  }, 3000);
};
const handleScanner = () => {
  const randomAsset = returns[Math.floor(Math.random() * returns.length)];
  setSelectedReturn(randomAsset);
  setShowProcessModal(true);
};

const handleLookupAsset = () => {
  const asset = returns.find(
    (item) => item.id.toLowerCase() === manualAssetId.toLowerCase()
  );

  if (asset) {
    setLookupResult(asset);
  } else {
    setLookupResult(null);
    setSuccessMessage("Asset not found");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  }
  
};

  return (
    <div className="return-page">
{successMessage && (
  <div className="success-toast">
    {successMessage}
  </div>
)}
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
          <h2>{pendingCount}</h2>
          <small>Assets to be returned</small>
        </div>

        <div className="summary-card">
          <span>Overdue Returns</span>
          <h2 className="red">{overdueCount}</h2>
          <small>Past due date</small>
        </div>

        <div className="summary-card">
          <span>Due Soon</span>
          <h2 className="orange">{dueSoonCount}</h2>
          <small>Due in 30 days</small>
        </div>

        <div className="summary-card">
          <span>Completed Returns</span>
          <h2 className="green">{completedCount}</h2>
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
                    <button
  className="primary-outline-btn"
  onClick={() => handleProcessReturn(item)}
>
  Process Return
</button>

<button
  className="secondary-btn"
  onClick={() => handleSendReminder(item)}
>
  Send Reminder
</button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}

      {activeTab === "process" && (
  <div className="process-return-card">

    <div className="process-grid">

      {/* Scan Asset */}
      <div className="scan-card">
        <h3>Scan Asset</h3>
        <p>Scan asset QR code or barcode</p>

        <div className="scan-box">
          📦
          <p>Scan asset QR code or barcode</p>
          <button
  className="primary-outline-btn"
  onClick={handleScanner}
>
            Open Scanner
          </button>
        </div>

        <div className="divider">OR</div>

        <input
  placeholder="Enter Asset ID manually (e.g. AST001)"
  value={manualAssetId}
  onChange={(e) => setManualAssetId(e.target.value)}
/>

       <button
  className="primary-btn"
  onClick={handleLookupAsset}
>
  Look Up Asset
</button>
{lookupResult && (
  <div className="lookup-result">

    <h4>Asset Details</h4>

    <p><strong>Asset:</strong> {lookupResult.assetName}</p>
    <p><strong>Employee:</strong> {lookupResult.employee}</p>
    <p><strong>Department:</strong> {lookupResult.department}</p>
    <p><strong>Category:</strong> {lookupResult.category}</p>
    <p><strong>Condition:</strong> {lookupResult.condition}</p>
    <p><strong>Assigned From:</strong> {lookupResult.from}</p>
    <p><strong>Due Date:</strong> {lookupResult.due}</p>

    <button
      className="primary-btn"
      onClick={() => handleProcessReturn(lookupResult)}
    >
      Process Return
    </button>

  </div>
)}

      </div>

      {/* Bulk Return */}
      <div className="bulk-card">
        <h3>Bulk Return Processing</h3>
        <p>Process multiple asset returns at once</p>

        <div className="upload-box">
          <p>Upload CSV file with asset IDs</p>

          <input type="file" />
        </div>

       <button
  className="primary-btn"
  onClick={handleBulkReturn}
>
  Process Bulk Returns
</button>
      </div>

    </div>

    {/* Recent Activity */}
   <div className="recent-return-card">

  <h3>Recent Return Activities</h3>

  {recentActivities.map((activity, index) => (

    <div className="activity" key={index}>

      <div>
        <strong>
          {activity.asset} returned by {activity.employee}
        </strong>

        <p>
          {activity.time} • {activity.condition}
        </p>
      </div>

      <span
        className={`badge ${
          activity.status === "Completed" ? "green" : "yellow"
        }`}
      >
        {activity.status}
      </span>

    </div>

  ))}

</div>

  </div>
)}
{activeTab === "history" && (
  <div className="history-card">

    <div className="table-header">
      <h2>Return History</h2>
      <p>Complete history of processed asset returns</p>
    </div>

    {returnHistory.map((item, index) => (

      <div className="history-item" key={index}>

        <div className="history-top">

          <div>
            <strong>{item.asset}</strong>
            <div className="sub-text">
              Returned by {item.returnedBy} • {item.id}
            </div>
          </div>

          <div className="history-status">
            <span className="badge green">{item.status}</span>
            <div className="sub-text">{item.date}</div>
          </div>

        </div>

        <div className="history-details">

          <div>
            <span className="sub-text">Original Condition</span>
            <div className="badge blue">{item.originalCondition}</div>
          </div>

          <div>
            <span className="sub-text">Return Condition</span>
            <div className="badge yellow">{item.returnCondition}</div>
          </div>

          <div>
            <span className="sub-text">Returned By</span>
            <div>{item.returnedBy}</div>
          </div>

          <div>
            <span className="sub-text">Received By</span>
            <div>{item.receivedBy}</div>
          </div>

        </div>

        <div className="history-note">
          {item.note}
        </div>

      </div>

    ))}

  </div>
)}
      {showProcessModal && (
  <div className="modal-overlay">
    <div className="modal-card">

      <h2>Process Asset Return</h2>

      <p><strong>Asset:</strong> {selectedReturn?.assetName}</p>
      <p><strong>Employee:</strong> {selectedReturn?.employee}</p>

      <div className="modal-actions">
        <button
          className="primary-outline-btn"
         onClick={() => {

  const historyItem = {
  asset: selectedReturn.assetName,
  id: selectedReturn.id,
  returnedBy: selectedReturn.employee,
  receivedBy: "IT Support",
  originalCondition: selectedReturn.condition,
  returnCondition: selectedReturn.condition,
  note: "Returned via system",
  date: new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }),
  status: "Completed",
};

  setReturnHistory((prev) => [historyItem, ...prev]);

  const activity = {
    asset: selectedReturn.assetName,
    employee: selectedReturn.employee,
    time: "Just now",
    condition: selectedReturn.condition,
    status: "Completed",
  };
  setRecentActivities((prev) => [activity, ...prev]);

// remove asset from pending list
setReturns((prev) =>
  prev.filter((item) => item.id !== selectedReturn.id)
);

setShowProcessModal(false);

  setSuccessMessage(
    `Asset ${selectedReturn.assetName} returned successfully`
  );

  setTimeout(() => {
    setSuccessMessage("");
  }, 3000);

}}

  
        >
          Confirm Return
        </button>

        <button
          className="secondary-btn"
          onClick={() => setShowProcessModal(false)}
        >
          Cancel
        </button>
      </div>

    </div>
  </div>
)}
    </div>
  );
};

export default ReturnAsset;