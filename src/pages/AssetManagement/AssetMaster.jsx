import { useState, useMemo } from "react";
import { FaPlus, FaDownload, FaEdit, FaTrash } from "react-icons/fa";
import "./assetManagement.css";

const AssetMaster = () => {
  const [activeTab, setActiveTab] = useState("database");
  const [searchText, setSearchText] = useState("");
const [categoryFilter, setCategoryFilter] = useState("ALL");
const [statusFilter, setStatusFilter] = useState("ALL");

const [isEditOpen, setIsEditOpen] = useState(false);
const [isDeleteOpen, setIsDeleteOpen] = useState(false);
const [selectedAsset, setSelectedAsset] = useState(null);
const [editForm, setEditForm] = useState({});

const [toast, setToast] = useState({
  show: false,
  message: ""
});
const showToast = (message) => {
  setToast({ show: true, message });

  setTimeout(() => {
    setToast({ show: false, message: "" });
  }, 2500);
};

const [assets, setAssets] = useState([
  {
    id: "AST001",
    name: "Dell Latitude 5420",
    category: "Laptop",
    serial: "DELL5420-001",
    purchaseDate: "2024-01-15",
    purchaseValue: 85000,
    currentValue: 68000,
    warranty: "2026-01-15",
    condition: "Good",
    status: "Active",
    amcStatus: "Yes",
    amcExpiry: "2027-01-15"
  },
  {
    id: "AST002",
    name: "iPhone 13",
    category: "Mobile",
    serial: "IPHN13-002",
    purchaseDate: "2024-02-10",
    purchaseValue: 75000,
    currentValue: 60000,
    warranty: "2026-02-10",
    condition: "Excellent",
    status: "Active",
    amcStatus: "No",
    amcExpiry: ""
  }
]);
  const filteredAssets = useMemo(() => {
  return assets.filter((asset) => {

    const matchSearch =
      asset.name.toLowerCase().includes(searchText.toLowerCase()) ||
      asset.id.toLowerCase().includes(searchText.toLowerCase());

    const matchCategory =
      categoryFilter === "ALL" || asset.category === categoryFilter;

    const matchStatus =
      statusFilter === "ALL" || asset.status === statusFilter;

    return matchSearch && matchCategory && matchStatus;
  });
}, [assets, searchText, categoryFilter, statusFilter]);

const handleEdit = (asset) => {
  setSelectedAsset(asset);
  setEditForm({ ...asset }); // clone it properly
  setIsEditOpen(true);
};

const handleDelete = (asset) => {
  setSelectedAsset(asset);
  setIsDeleteOpen(true);
};

const confirmDelete = () => {
  const updatedAssets = assets.filter(
    (asset) => asset.id !== selectedAsset.id
  );

  setAssets(updatedAssets);
  setIsDeleteOpen(false);
  setSelectedAsset(null);

  showToast("Asset deleted successfully!");
};

const handleSave = () => {
  const updatedAssets = assets.map((asset) =>
    asset.id === selectedAsset.id ? editForm : asset
  );

  setAssets(updatedAssets);
  setIsEditOpen(false);
  setSelectedAsset(null);

  showToast("Asset updated successfully!");
};

  return (
    <div className="asset-page">

      {/* HEADER */}
      <div className="asset-header">
        <div>
          <h1>Asset Master</h1>
          <p>Comprehensive asset database and management</p>
        </div>

        <div className="asset-header-actions">
          <button className="secondary-btn">
            <FaDownload /> Export
          </button>
          <button className="primary-btn">
            <FaPlus /> Add Asset
          </button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="asset-summary">
        <div className="summary-card">
          <span>Total Assets</span>
          <h2>3</h2>
          <small>In master database</small>
        </div>

        <div className="summary-card">
          <span>Total Value</span>
          <h2>₹1,56,000</h2>
          <small>Current book value</small>
        </div>

        <div className="summary-card">
          <span>Active Assets</span>
          <h2>3</h2>
          <small>Currently in use</small>
        </div>

        <div className="summary-card">
          <span>Categories</span>
          <h2>6</h2>
          <small>Asset categories</small>
        </div>
      </div>

      {/* TABS */}
      <div className="asset-tabs">
        <button
          className={activeTab === "database" ? "active" : ""}
          onClick={() => setActiveTab("database")}
        >
          Asset Database
        </button>
        <button
          className={activeTab === "categories" ? "active" : ""}
          onClick={() => setActiveTab("categories")}
        >
          Categories
        </button>
        <button
          className={activeTab === "bulk" ? "active" : ""}
          onClick={() => setActiveTab("bulk")}
        >
          Bulk Actions
        </button>
      </div>

      {/* TABLE SECTION */}
      {activeTab === "database" && (
        <div className="asset-table-card">

          <div className="table-header">
            <h2>Asset Database</h2>
            <p>Complete master list of all company assets</p>
          </div>

          {/* FILTER ROW */}
          <div className="table-filters">
  <input
    placeholder="Search assets..."
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
  />

  <select
    value={categoryFilter}
    onChange={(e) => setCategoryFilter(e.target.value)}
  >
    <option value="ALL">All Categories</option>
    <option value="Laptop">Laptop</option>
    <option value="Mobile">Mobile</option>
  </select>

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
  >
    <option value="ALL">All Status</option>
    <option value="Active">Active</option>
    <option value="Inactive">Inactive</option>
  </select>

  <button className="secondary-btn">More Filters</button>
</div>

          {/* TABLE */}
          <table>
            <thead>
              <tr>
                <th>Asset Details</th>
                <th>Category</th>
                <th>Serial Number</th>
                <th>Purchase Info</th>
                <th>Current Value</th>
                <th>Warranty</th>
                <th>Condition</th>
                <th>Status</th>
                <th>AMC</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredAssets.map((asset) => (
                <tr key={asset.id}>
                  <td>
                    <strong>{asset.name}</strong>
                    <div className="sub-text">{asset.id}</div>
                  </td>

                  <td>
                    <span className="badge category">
                      {asset.category}
                    </span>
                  </td>

                  <td>{asset.serial}</td>

                  <td>
                    ₹{asset.purchaseValue.toLocaleString()}
                    <div className="sub-text">
                      {asset.purchaseDate}
                    </div>
                  </td>

                  <td>
                    ₹{asset.currentValue.toLocaleString()}
                  </td>

                  <td>{asset.warranty}</td>

                  <td>
                    <span className={`badge condition ${asset.condition.toLowerCase()}`}>
                      {asset.condition}
                    </span>
                  </td>

                  <td>
                    <span className={`badge status ${asset.status.toLowerCase()}`}>
                      {asset.status}
                    </span>
                  </td>
                  <td>
  {asset.amcStatus === "Yes" ? (
    <span className="badge status active">
      Yes ({asset.amcExpiry 
        ? new Date(asset.amcExpiry).toLocaleDateString("en-GB") 
        : "No Expiry"})
    </span>
  ) : (
    <span className="badge status pending">No</span>
  )}
</td>

                       {/* EDIT MODAL */}
      {isEditOpen && (
        <div className="modal-overlay" onClick={() => setIsEditOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Asset</h3>
              <span className="close-btn" onClick={() => setIsEditOpen(false)}>✖</span>
            </div>

           <div className="modal-body">

  <label>Asset Name</label>
  <input
    value={editForm.name}
    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
  />

  <label>Asset ID</label>
  <input
    value={editForm.id}
    disabled
  />

  <label>Category</label>
  <select
    value={editForm.category}
    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
  >
    <option value="Laptop">Laptop</option>
    <option value="Mobile">Mobile</option>
  </select>

  <label>Serial Number</label>
  <input
    value={editForm.serial}
    onChange={(e) => setEditForm({ ...editForm, serial: e.target.value })}
  />

  <label>Purchase Value</label>
  <input
    type="number"
    value={editForm.purchaseValue}
    onChange={(e) =>
      setEditForm({ ...editForm, purchaseValue: Number(e.target.value) })
    }
  />

  <label>Purchase Date</label>
  <input
    type="date"
    value={editForm.purchaseDate}
    onChange={(e) =>
      setEditForm({ ...editForm, purchaseDate: e.target.value })
    }
  />

  <label>Current Value</label>
  <input
    type="number"
    value={editForm.currentValue}
    onChange={(e) =>
      setEditForm({ ...editForm, currentValue: Number(e.target.value) })
    }
  />

  <label>Warranty</label>
  <input
    type="date"
    value={editForm.warranty}
    onChange={(e) =>
      setEditForm({ ...editForm, warranty: e.target.value })
    }
  />

  <label>Condition</label>
  <select
    value={editForm.condition}
    onChange={(e) =>
      setEditForm({ ...editForm, condition: e.target.value })
    }
  >
    <option value="Excellent">Excellent</option>
    <option value="Good">Good</option>
    <option value="Damaged">Damaged</option>
  </select>

  <label>Status</label>
  <select
    value={editForm.status}
    onChange={(e) =>
      setEditForm({ ...editForm, status: e.target.value })
    }
  >
    <option value="Active">Active</option>
    <option value="Inactive">Inactive</option>
  </select>

  <label>AMC Status</label>
<select
  value={editForm.amcStatus}
  onChange={(e) =>
    setEditForm({ ...editForm, amcStatus: e.target.value })
  }
>
  <option value="Yes">Yes</option>
  <option value="No">No</option>
</select>

{editForm.amcStatus === "Yes" && (
  <>
    <label>AMC Expiry Date</label>
    <input
      type="date"
      value={editForm.amcExpiry || ""}
      onChange={(e) =>
        setEditForm({ ...editForm, amcExpiry: e.target.value })
      }
    />
  </>
)}

</div>

            <div className="modal-footer">
              <button className="secondary-btn" onClick={() => setIsEditOpen(false)}>
                Cancel
              </button>
              <button className="primary-btn" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {isDeleteOpen && (
        <div className="modal-overlay" onClick={() => setIsDeleteOpen(false)}>
          <div className="modal-box small" onClick={(e) => e.stopPropagation()}>
            <h3>Are you sure?</h3>
            <p>Do you want to delete {selectedAsset?.name}?</p>

            <div className="modal-footer">
              <button className="secondary-btn" onClick={() => setIsDeleteOpen(false)}>
                Cancel
              </button>
              <button className="danger-btn" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

                  <td className="action-buttons">
  <button onClick={() => handleEdit(asset)}>
    <FaEdit />
  </button>

  <button onClick={() => handleDelete(asset)}>
    <FaTrash />
  </button>
</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}

      {activeTab === "categories" && (
  <div className="asset-table-card">
    <div className="table-header">
      <h2>Asset Categories</h2>
      <p>Manage asset categories and their statistics</p>
    </div>

    <div className="categories-grid">
      {["Laptop", "Mobile"].map((cat) => {
        const categoryAssets = assets.filter(a => a.category === cat);

        const totalValue = categoryAssets.reduce(
          (sum, a) => sum + a.currentValue,
          0
        );

        const avgValue =
          categoryAssets.length > 0
            ? Math.round(totalValue / categoryAssets.length)
            : 0;

        return (
          <div className="category-card" key={cat}>
            <h3>{cat}</h3>
            <p><strong>Count:</strong> {categoryAssets.length}</p>
            <p><strong>Total Value:</strong> ₹{totalValue.toLocaleString()}</p>
            <p><strong>Avg Value:</strong> ₹{avgValue.toLocaleString()}</p>

            <div className="category-actions">
              <button
                className="secondary-btn"
                onClick={() => {
                  setCategoryFilter(cat);
                  setActiveTab("database");
                }}
              >
                View Assets
              </button>

              <button
                className="primary-outline-btn"
                onClick={() =>
                  showToast(`${cat} category settings opened`)
                }
              >
                Edit Category
              </button>
            </div>
          </div>
        );
      })}
    </div>
  </div>
)}

{activeTab === "bulk" && (
  <div className="asset-table-card">
    <div className="table-header">
      <h2>Bulk Actions</h2>
      <p>Perform bulk operations on multiple assets</p>
    </div>

    <div className="bulk-grid">

      {/* BULK UPDATE STATUS */}
      <div className="bulk-card">
        <h3>Bulk Update Status</h3>
        <button
          className="secondary-btn"
          onClick={() => {
            const updated = assets.map(a => ({
              ...a,
              status: "Active"
            }));
            setAssets(updated);
            showToast("All assets marked as Active");
          }}
        >
          Mark All Active
        </button>

        <button
          className="secondary-btn"
          onClick={() => {
            const updated = assets.map(a => ({
              ...a,
              status: "Inactive"
            }));
            setAssets(updated);
            showToast("All assets marked as Inactive");
          }}
        >
          Mark All Inactive
        </button>
      </div>

      {/* BULK AMC EXPIRY EXTENSION */}
      <div className="bulk-card">
        <h3>Extend AMC by 1 Year</h3>
        <button
          className="primary-btn"
          onClick={() => {
            const updated = assets.map(a => {
              if (a.amcStatus === "Yes" && a.amcExpiry) {
                const newDate = new Date(a.amcExpiry);
                newDate.setFullYear(newDate.getFullYear() + 1);
                return {
                  ...a,
                  amcExpiry: newDate.toISOString().split("T")[0]
                };
              }
              return a;
            });

            setAssets(updated);
            showToast("AMC extended by 1 year");
          }}
        >
          Extend AMC
        </button>
      </div>

      {/* BULK EXPORT */}
      <div className="bulk-card">
        <h3>Bulk Export</h3>
        <button
          className="secondary-btn"
          onClick={() =>
            showToast("Exported to Excel (simulation)")
          }
        >
          Export to Excel
        </button>

        <button
          className="secondary-btn"
          onClick={() =>
            showToast("Exported to PDF (simulation)")
          }
        >
          Export to PDF
        </button>
      </div>

    </div>
  </div>
)}
      {toast.show && (
  <div className="top-success-banner">
    <span className="check-icon">✔</span>
    {toast.message}
  </div>
)}
    </div>
  );
};

export default AssetMaster;