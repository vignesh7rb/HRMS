import { useState } from "react";
import { FaPlus, FaEye, FaEdit,  FaTimes} from "react-icons/fa";
import "./assetManagement.css";

const AssignAsset = () => {
  const [activeTab, setActiveTab] = useState("current");

  const [showNewAssign, setShowNewAssign] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
const [editAsset, setEditAsset] = useState(null);
const [deleteAssetId, setDeleteAssetId] = useState(null);



  /* ================= CURRENT ASSIGNMENTS DATA ================= */
  const [assignments, setAssignments] = useState([
    {
      id: "AST001",
      assetName: "Dell Latitude 5420",
      category: "Laptop",
      employee: "John Doe",
      department: "Engineering",
      empId: "EMP001",
      purpose: "Development work",
      assignedBy: "Admin",
      condition: "Good",
      from: "15 Jan 2025",
      until: "15 Jan 2026",
      status: "Active",
    },
    {
      id: "AST002",
      assetName: "iPhone 13",
      category: "Mobile",
      employee: "Sarah Wilson",
      department: "HR",
      empId: "EMP002",
      purpose: "Official communication",
      assignedBy: "Admin",
      condition: "Excellent",
      from: "10 Feb 2025",
      until: "10 Feb 2026",
      status: "Active",
    },
  ]);

  /* ================= AVAILABLE ASSETS DATA ================= */
 const [availableAssets, setAvailableAssets] = useState([
{
id: "AST005",
name: "Dell UltraSharp Monitor",
serial: "DELLU-005",
category: "Monitor",
department: "",
condition: "Good",
assignedTo: "",
returnedTo: ""
},
{
id: "AST006",
name: "MacBook Pro 14",
serial: "MBP14-006",
category: "Laptop",
department: "",
condition: "Excellent",
assignedTo: "",
returnedTo: ""
},
{
id: "AST007",
name: "iPad Pro",
serial: "IPADPRO-007",
category: "Tablet",
department: "",
condition: "Good",
assignedTo: "",
returnedTo: ""
}
]);
const [selectedAvailableAsset, setSelectedAvailableAsset] = useState(null);

const [assignForm, setAssignForm] = useState({
  empId: "",
  employee: "",
  department: "",
  purpose: "",
  until: ""
});
  /* ================= ASSIGNMENT HISTORY DATA ================= */
  const [assignmentHistory, setAssignmentHistory] = useState([
    {
      id: "AST008",
      title: "MacBook Pro returned by Alice Johnson",
      dept: "Engineering Department",
      note: "Returned in good condition",
      date: "May 15, 2025",
      status: "Returned",
    },
    {
      id: "AST009",
      title: "iPad Pro assigned to Robert Chen",
      dept: "Sales Department",
      note: "For client presentations",
      date: "May 10, 2025",
      status: "Assigned",
    },
    {
      id: "AST010",
      title: "Wireless Keyboard returned by Maria Garcia",
      dept: "HR Department",
      note: "Assignment completed successfully",
      date: "May 5, 2025",
      status: "Returned",
    },
  ]);

  const handleAssign = () => {

  const asset = selectedAvailableAsset;

  const newAssignment = {
    id: asset.id,
    assetName: asset.name,
    employee: assignForm.employee,
    department: assignForm.department,
    empId: assignForm.empId,
    purpose: assignForm.purpose,
    assignedBy: "Admin",
    condition: "Good",
    from: new Date().toLocaleDateString(),
    until: assignForm.until,
    status: "Active",
  };

  setAssignments([...assignments, newAssignment]);

  setAssignmentHistory([
{
id: asset.id,
assetName: asset.name,
assignedTo: assignForm.employee,
department: assignForm.department,
condition: asset.condition,
note: assignForm.purpose,
date: new Date().toLocaleDateString(),
status: "Assigned"
},
...assignmentHistory
]);

  setAvailableAssets(
    availableAssets.filter(a => a.id !== asset.id)
  );

  setShowNewAssign(false);

  setAssignForm({
    empId: "",
    employee: "",
    department: "",
    purpose: "",
    until: ""
  });

};
const handleEditClick = (asset) => {
  setEditAsset(asset);
  setShowEditModal(true);
};
const handleUpdateAsset = () => {
  const updatedAssignments = assignments.map(item =>
    item.id === editAsset.id ? editAsset : item
  );

  setAssignments(updatedAssignments);
  setShowEditModal(false);
};

  return (
    <div className="assign-page">

      {/* ================= HEADER ================= */}
      <div className="assign-header">
        <div>
          <h1>Asset Assignment</h1>
          <p>Assign assets to employees and track assignments</p>
        </div>

        <button
          className="primary-btn"
          onClick={() => setShowNewAssign(true)}
        >
          <FaPlus /> New Assignment
        </button>
      </div>

      {/* ================= SUMMARY ================= */}
      <div className="assign-summary">
        <div className="summary-card">
          <span>Total Assignments</span>
          <h2>3</h2>
          <small>All time assignments</small>
        </div>

        <div className="summary-card">
          <span>Active Assignments</span>
          <h2 className="green">3</h2>
          <small>Currently assigned</small>
        </div>

        <div className="summary-card">
          <span>Available Assets</span>
          <h2 className="blue">3</h2>
          <small>Ready for assignment</small>
        </div>

        <div className="summary-card">
          <span>Due Returns</span>
          <h2 className="orange">2</h2>
          <small>Expected this month</small>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="assign-tabs">
        <button
          className={activeTab === "current" ? "active" : ""}
          onClick={() => setActiveTab("current")}
        >
          Current Assignments
        </button>

        <button
          className={activeTab === "available" ? "active" : ""}
          onClick={() => setActiveTab("available")}
        >
          Available Assets
        </button>

        <button
          className={activeTab === "history" ? "active" : ""}
          onClick={() => setActiveTab("history")}
        >
          Assignment History
        </button>
      </div>

      {/* ================= CURRENT ASSIGNMENTS ================= */}
      {activeTab === "current" && (
        <div className="assign-table-card">
          <div className="table-header">
            <h2>Current Assignments</h2>
            <p>Active asset assignments to employees</p>
          </div>

          <table>
            <thead>
              <tr>
                <th>Asset Details</th>
                <th>Assigned To</th>
                <th>Assignment Info</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {assignments.map(item => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.assetName}</strong>
                    <div className="sub-text">{item.id}</div>
                  </td>

                  <td>
                    <strong>{item.employee}</strong>
                    <div className="sub-text">{item.department}</div>
                    <div className="sub-text">{item.empId}</div>
                  </td>

                  <td>
                    {item.purpose}
                    <div className="sub-text">By: {item.assignedBy}</div>
                  </td>

                  <td>
                    <div>From: {item.from}</div>
                    <div>Until: {item.until}</div>
                  </td>

                  <td>
                    <span className="badge status active">{item.status}</span>
                  </td>

                  <td className="action-buttons">

<button
  className="icon-btn view"
  onClick={() => setSelectedAsset(item)}
>
  <FaEye />
</button>

<button
  className="icon-btn edit"
  onClick={() => handleEditClick(item)}
>
  <FaEdit />
</button>

<button
  className="request-return-btn"
  onClick={() => setShowReturnModal(true)}
>
  Request Return
</button>

</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= AVAILABLE ASSETS (MATCHES IMAGE) ================= */}
      {activeTab === "available" && (
        <div className="assign-table-card">
          <div className="asset-grid-modern">
            {availableAssets.map(asset => (
              <div className="asset-card-modern" key={asset.id}>

<div className="asset-card-actions">

<button
className="asset-delete-btn"
onClick={() => setDeleteAssetId(asset.id)}
>
<FaTimes />
</button>

</div>
                <h3 className="asset-title-modern">{asset.name}</h3>
                <p className="asset-meta-modern">ID: {asset.id}</p>
<p className="asset-meta-modern">Serial: {asset.serial}</p>
<p className="asset-meta-modern">Category: {asset.category}</p>
<p className="asset-meta-modern">Condition: {asset.condition}</p>

                <button
  className="assign-btn-modern"
  onClick={() => {
  setSelectedAvailableAsset(asset);
  setShowNewAssign(true);
}}
>
  Assign Asset
</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= ASSIGNMENT HISTORY ================= */}
      {activeTab === "history" && (
        <div className="assign-table-card">
          <div className="table-header">
            <h2>Assignment History</h2>
            <p>Complete history of all asset assignments</p>
          </div>

          {assignmentHistory.map(item => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "14px",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                marginBottom: "12px",
              }}
            >
              <div>
                <strong>
{item.assetName} {item.status === "Returned" ? "returned by" : "assigned to"} {item.assignedTo}
</strong>

<div className="sub-text">
Asset {item.id} • {item.department}
</div>

<div className="sub-text">
Condition: {item.condition}
</div>

<div className="sub-text">
{item.note}
</div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div className="sub-text">{item.date}</div>
                <span className={`badge status ${item.status === "Returned" ? "completed" : "active"}`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteAssetId && (
<div className="modal-overlay">
<div className="modal">

<h3>Delete Asset</h3>
<p>Are you sure you want to delete this asset?</p>

<div className="modal-actions">

<button
className="secondary-btn"
onClick={() => setDeleteAssetId(null)}
>
Cancel
</button>

<button
className="danger-btn"
onClick={()=>{
setAvailableAssets(
availableAssets.filter(asset => asset.id !== deleteAssetId)
);
setDeleteAssetId(null);
}}
>
Delete
</button>

</div>

</div>
</div>
)}

      {/* ================= NEW ASSIGNMENT MODAL ================= */}
      {showNewAssign && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>New Asset Assignment</h3>

            <div className="grid">

<input
placeholder="Employee ID"
value={assignForm.empId}
onChange={(e)=>setAssignForm({...assignForm, empId:e.target.value})}
/>

<input
placeholder="Employee Name"
value={assignForm.employee}
onChange={(e)=>setAssignForm({...assignForm, employee:e.target.value})}
/>

<input
placeholder="Department"
value={assignForm.department}
onChange={(e)=>setAssignForm({...assignForm, department:e.target.value})}
/>

<select
value={selectedAvailableAsset?.id || ""}
onChange={(e)=>{
const asset = availableAssets.find(a => a.id === e.target.value);
setSelectedAvailableAsset(asset);
}}
>
<option value="">Select Asset</option>

{availableAssets.map(asset => (
<option key={asset.id} value={asset.id}>
{asset.name} ({asset.serial})
</option>
))}

</select>

<input
placeholder="Purpose of Assignment"
value={assignForm.purpose}
onChange={(e)=>setAssignForm({...assignForm, purpose:e.target.value})}
/>

<input
type="date"
value={assignForm.until}
onChange={(e)=>setAssignForm({...assignForm, until:e.target.value})}
/>


            </div>

            <div className="modal-actions">
              <button
                className="secondary-btn"
                onClick={() => setShowNewAssign(false)}
              >
                Cancel
              </button>
              <button className="primary-btn" onClick={handleAssign}>
Assign
</button>
            </div>
          </div>
        </div>
      )}
      
      {showEditModal && editAsset && (
  <div className="modal-overlay">
    <div className="modal">
      <h3>Edit Assignment</h3>

      <div className="grid">

        <input
          value={editAsset.employee}
          onChange={(e) =>
            setEditAsset({ ...editAsset, employee: e.target.value })
          }
        />

        <input
          value={editAsset.department}
          onChange={(e) =>
            setEditAsset({ ...editAsset, department: e.target.value })
          }
        />

        <input
          value={editAsset.purpose}
          onChange={(e) =>
            setEditAsset({ ...editAsset, purpose: e.target.value })
          }
        />

        <input
          value={editAsset.until}
          onChange={(e) =>
            setEditAsset({ ...editAsset, until: e.target.value })
          }
        />

      </div>

      <div className="modal-actions">
        <button
          className="secondary-btn"
          onClick={() => setShowEditModal(false)}
        >
          Cancel
        </button>

        <button
          className="primary-btn"
          onClick={handleUpdateAsset}
        >
          Update
        </button>
      </div>
    </div>
  </div>
)}



      {/* ================= RETURN MODAL ================= */}
      {showReturnModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Request Asset Return</h3>
            <textarea placeholder="Reason for return (optional)" />

            <div className="modal-actions">
              <button
                className="secondary-btn"
                onClick={() => setShowReturnModal(false)}
              >
                Cancel
              </button>
              <button className="primary-btn">Submit Request</button>
            </div>
          </div>
        </div>
      )}

      {selectedAsset && (
  <div className="modal-overlay">
    <div className="modal">
      <h3>Asset Details</h3>

      <p><strong>Asset:</strong> {selectedAsset.assetName}</p>
      <p><strong>Asset ID:</strong> {selectedAsset.id}</p>
      <p><strong>Employee:</strong> {selectedAsset.employee}</p>
      <p><strong>Department:</strong> {selectedAsset.department}</p>
      <p><strong>Purpose:</strong> {selectedAsset.purpose}</p>
      <p><strong>From:</strong> {selectedAsset.from}</p>
      <p><strong>Until:</strong> {selectedAsset.until}</p>

      <div className="modal-actions">
        <button
          className="primary-btn"
          onClick={() => setSelectedAsset(null)}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default AssignAsset;