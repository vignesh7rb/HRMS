import { useState, useMemo } from "react";
import "./assetManagement.css";

const EMPLOYEES = ["EMP001", "EMP002", "EMP014", "EMP021"];

const AssetManagement = () => {
  const [assets, setAssets] = useState([
    {
      id: "LAP-001",
      name: "Dell Latitude 5420",
      category: "Laptop",
      status: "ASSIGNED",
      assignedTo: "EMP001",
      condition: "Good",
      remarks: "",
    },
    {
      id: "LAP-002",
      name: "HP ProBook",
      category: "Laptop",
      status: "AVAILABLE",
      assignedTo: null,
      condition: "Good",
      remarks: "",
    },
    {
      id: "MOB-010",
      name: "iPhone 13",
      category: "Mobile",
      status: "MAINTENANCE",
      assignedTo: null,
      condition: "Under Repair",
      remarks: "Screen issue",
    },
  ]);

  const [showAddAsset, setShowAddAsset] = useState(false);

const [newAsset, setNewAsset] = useState({
  id: "",
  name: "",
  category: "Laptop",
  status: "AVAILABLE",
  assignedTo: null,
  condition: "Good",
  remarks: "",
});


  const [successMsg, setSuccessMsg] = useState("");

  /* SUMMARY */
  const summary = useMemo(() => ({
    total: assets.length,
    assigned: assets.filter(a => a.status === "ASSIGNED").length,
    available: assets.filter(a => a.status === "AVAILABLE").length,
    maintenance: assets.filter(a => a.status === "MAINTENANCE").length,
  }), [assets]);

  /* HELPERS */
  const updateAsset = (id, changes) => {
    setAssets(prev =>
      prev.map(a => (a.id === id ? { ...a, ...changes } : a))
    );
  };

  const updateStatus = (id, status) => {
    if (status === "AVAILABLE") {
      updateAsset(id, { status, assignedTo: null, condition: "Good" });
    }
    if (status === "ASSIGNED") {
      updateAsset(id, { status, assignedTo: EMPLOYEES[0], condition: "Good" });
    }
    if (status === "MAINTENANCE") {
      updateAsset(id, { status, assignedTo: null, condition: "Under Repair" });
    }
    if (status === "DAMAGED") {
      updateAsset(id, { status, assignedTo: null, condition: "Damaged" });
    }
  };

  const saveAsset = () => {
    setSuccessMsg("Asset updated successfully!");
    setTimeout(() => setSuccessMsg(""), 2000);
  };

  const addAsset = () => {
  if (!newAsset.id || !newAsset.name) return;

  setAssets(prev => [...prev, newAsset]);

  setNewAsset({
    id: "",
    name: "",
    category: "Laptop",
    status: "AVAILABLE",
    assignedTo: null,
    condition: "Good",
    remarks: "",
  });

  setShowAddAsset(false);
  setSuccessMsg("Asset added successfully!");
  setTimeout(() => setSuccessMsg(""), 2000);
};


  return (
    <div className="asset-page">
      {/* SUCCESS BANNER */}
      {successMsg && (
        <div className="success-banner floating">
          <span className="success-icon">✓</span>
          <span className="success-text">{successMsg}</span>
        </div>
      )}

      {/* HEADER */}
      <div className="asset-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>

    <div>
      <h1>Asset Management</h1>
      <p>Track and manage company assets</p>
    </div>

    <button
      className="add-btn"
      onClick={() => setShowAddAsset(true)}
    >
      + Add Asset
    </button>
  </div>
</div>
{showAddAsset && (
  <div className="modal-backdrop">
    <div className="modal">
      <h3>Add Asset</h3>

      {/* ASSET ID */}
      <div className="form-group">
        <label>Asset ID</label>
        <input
          value={newAsset.id}
          onChange={e =>
            setNewAsset({ ...newAsset, id: e.target.value })
          }
          placeholder="e.g. LAP-023"
        />
      </div>

      {/* NAME */}
      <div className="form-group">
        <label>Name</label>
        <input
          value={newAsset.name}
          onChange={e =>
            setNewAsset({ ...newAsset, name: e.target.value })
          }
          placeholder="Dell Latitude 5440"
        />
      </div>

      {/* CATEGORY */}
      <div className="form-group">
        <label>Category</label>
        <select
          value={newAsset.category}
          onChange={e =>
            setNewAsset({ ...newAsset, category: e.target.value })
          }
        >
          <option>Laptop</option>
          <option>Mobile</option>
          <option>Monitor</option>
          <option>Accessory</option>
        </select>
      </div>

      {/* STATUS */}
      <div className="form-group">
        <label>Status</label>
        <select
          value={newAsset.status}
          onChange={e =>
            setNewAsset({ ...newAsset, status: e.target.value })
          }
        >
          <option value="AVAILABLE">Available</option>
          <option value="ASSIGNED">Assigned</option>
          <option value="MAINTENANCE">Maintenance</option>
          <option value="DAMAGED">Damaged</option>
        </select>
      </div>

      {/* ASSIGNED TO */}
      <div className="form-group">
        <label>Assigned To</label>
        {newAsset.status === "ASSIGNED" ? (
          <select
            value={newAsset.assignedTo || ""}
            onChange={e =>
              setNewAsset({
                ...newAsset,
                assignedTo: e.target.value,
              })
            }
          >
            <option value="">Select Employee</option>
            {EMPLOYEES.map(emp => (
              <option key={emp} value={emp}>
                {emp}
              </option>
            ))}
          </select>
        ) : (
          <input disabled value="Not Applicable" />
        )}
      </div>

      {/* CONDITION */}
      <div className="form-group">
        <label>Condition</label>
        <input
          value={newAsset.condition}
          onChange={e =>
            setNewAsset({
              ...newAsset,
              condition: e.target.value,
            })
          }
        />
      </div>

      {/* REMARKS */}
      <div className="form-group">
        <label>Remarks</label>
        <input
          value={newAsset.remarks}
          onChange={e =>
            setNewAsset({
              ...newAsset,
              remarks: e.target.value,
            })
          }
        />
      </div>

      {/* ACTIONS */}
      <div className="modal-actions">
        <button
          className="cancel-btn"
          onClick={() => setShowAddAsset(false)}
        >
          Cancel
        </button>

        <button className="save-btn" onClick={addAsset}>
          Add Asset
        </button>
      </div>
    </div>
  </div>
)}



      {/* SUMMARY */}
      <div className="asset-cards">
        <div className="asset-card"><span>Total Assets</span><strong>{summary.total}</strong></div>
        <div className="asset-card"><span>Assigned</span><strong>{summary.assigned}</strong></div>
        <div className="asset-card"><span>Available</span><strong>{summary.available}</strong></div>
        <div className="asset-card"><span>Maintenance</span><strong>{summary.maintenance}</strong></div>
      </div>

      {/* TABLE */}
      <div className="asset-table-card">
        <div className="table-header">
          <h2>Assets</h2>
          <p>Manage asset allocation and status</p>
        </div>

        <table>
          <thead>
            <tr>
              <th>ASSET ID</th>
              <th>NAME</th>
              <th>CATEGORY</th>
              <th>STATUS</th>
              <th>ASSIGNED TO</th>
              <th>CONDITION</th>
              <th>REMARKS</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {assets.map(asset => (
              <tr key={asset.id}>
                <td>{asset.id}</td>
                <td>{asset.name}</td>
                <td>{asset.category}</td>

                <td>
                  <select
                    className={`status ${asset.status}`}
                    value={asset.status}
                    onChange={e => updateStatus(asset.id, e.target.value)}
                  >
                    <option value="AVAILABLE">Available</option>
                    <option value="ASSIGNED">Assigned</option>
                    <option value="MAINTENANCE">Maintenance</option>
                    <option value="DAMAGED">Damaged</option>
                  </select>
                </td>

                <td>
                  {asset.status === "ASSIGNED" ? (
                    <select
                      value={asset.assignedTo}
                      onChange={e =>
                        updateAsset(asset.id, { assignedTo: e.target.value })
                      }
                    >
                      {EMPLOYEES.map(emp => (
                        <option key={emp} value={emp}>{emp}</option>
                      ))}
                    </select>
                  ) : "-"}
                </td>

                <td>
                  <input
                    value={asset.condition}
                    onChange={e =>
                      updateAsset(asset.id, { condition: e.target.value })
                    }
                  />
                </td>

                <td>
                  <input
                    placeholder="Remarks"
                    value={asset.remarks}
                    onChange={e =>
                      updateAsset(asset.id, { remarks: e.target.value })
                    }
                  />
                </td>

                <td>
                  <button
                    className="save-btn"
                    onClick={saveAsset}
                  >
                    Save
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

export default AssetManagement;
