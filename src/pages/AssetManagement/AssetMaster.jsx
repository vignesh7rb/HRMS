import { useState, useMemo } from "react";
import { FaPlus, FaDownload, FaEdit, FaTrash } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./assetManagement.css";

const AssetMaster = () => {
  const [activeTab, setActiveTab] = useState("database");
  const [searchText, setSearchText] = useState("");
const [categoryFilter, setCategoryFilter] = useState("ALL");
const [statusFilter, setStatusFilter] = useState("ALL");

const [categories, setCategories] = useState([
  "Laptop",
  "Mobile",
  "Uncategorized"
]);

const handleExportExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(assets);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Assets");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array"
  });

  const data = new Blob([excelBuffer], {
    type: "application/octet-stream"
  });

  saveAs(data, "AssetMaster.xlsx");
};

const [isEditOpen, setIsEditOpen] = useState(false);
const [isDeleteOpen, setIsDeleteOpen] = useState(false);
const [selectedAsset, setSelectedAsset] = useState(null);
const [editForm, setEditForm] = useState({});

const [isAddOpen, setIsAddOpen] = useState(false);
const [newAsset, setNewAsset] = useState({
  id: "",
  name: "",
  category: "",
  serial: "",
  purchaseDate: "",
  purchaseValue: "",
  currentValue: "",
  warranty: "",
  condition: "Good",
  status: "Active",
  amcStatus: "No",
  amcExpiry: ""
});

const [isCategoryEditOpen, setIsCategoryEditOpen] = useState(false);
const [editingCategory, setEditingCategory] = useState("");
const [newCategoryName, setNewCategoryName] = useState("");
const [isCategoryDeleteOpen, setIsCategoryDeleteOpen] = useState(false);

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
          <button
  className="secondary-btn"
  onClick={handleExportExcel}
>
  <FaDownload /> Export
</button>
          <button
  className="primary-btn"
  onClick={() => setIsAddOpen(true)}
>
  <FaPlus /> Add Asset
</button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="asset-summary">
        <div className="summary-card">
          <span>Total Assets</span>
          <h2>{assets.length}</h2>
          <small>In master database</small>
        </div>

        <div className="summary-card">
          <span>Total Value</span>
          <h2>
  ₹{assets.reduce((sum, a) => sum + Number(a.currentValue || 0), 0).toLocaleString()}
</h2>
          <small>Current book value</small>
        </div>

        <div className="summary-card">
          <span>Active Assets</span>
          <h2>
  {assets.filter(a => a.status === "Active").length}
</h2>
          <small>Currently in use</small>
        </div>

        <div className="summary-card">
          <span>Categories</span>
          <h2>{categories.length}</h2>
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
{categories.map(cat => (
  <option key={cat} value={cat}>{cat}</option>
))}
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
      {isAddOpen && (
  <div
    className="modal-overlay"
    onClick={() => setIsAddOpen(false)}
  >
    <div
      className="modal-box"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="modal-header">
        <h3>Add Asset</h3>
        <span
          className="close-btn"
          onClick={() => setIsAddOpen(false)}
        >
          ✖
        </span>
      </div>

      <div className="modal-body">

        <label>Asset ID</label>
        <input
          value={newAsset.id}
          onChange={(e) =>
            setNewAsset({ ...newAsset, id: e.target.value })
          }
        />

        <label>Asset Name</label>
        <input
          value={newAsset.name}
          onChange={(e) =>
            setNewAsset({ ...newAsset, name: e.target.value })
          }
        />

        <label>Category</label>
        <select
          value={newAsset.category}
          onChange={(e) =>
            setNewAsset({ ...newAsset, category: e.target.value })
          }
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <label>Purchase Value</label>
        <input
          type="number"
          value={newAsset.purchaseValue}
          onChange={(e) =>
            setNewAsset({
              ...newAsset,
              purchaseValue: Number(e.target.value)
            })
          }
        />

      </div>

      <div className="modal-footer">
        <button
          className="secondary-btn"
          onClick={() => setIsAddOpen(false)}
        >
          Cancel
        </button>

        <button
  className="primary-btn"
  onClick={() => {

    if (!newAsset.id || !newAsset.name || !newAsset.category) {
      showToast("Please fill required fields!");
      return;
    }

    if (assets.some(a => a.id === newAsset.id)) {
      showToast("Asset ID already exists!");
      return;
    }

    const updatedAssets = [...assets, newAsset];
    setAssets(updatedAssets);

    if (!categories.includes(newAsset.category)) {
      setCategories(prev => [...prev, newAsset.category]);
    }

    setNewAsset({
      id: "",
      name: "",
      category: categories[0] || "",
      serial: "",
      purchaseDate: "",
      purchaseValue: "",
      currentValue: "",
      warranty: "",
      condition: "Good",
      status: "Active",
      amcStatus: "No",
      amcExpiry: ""
    });

    setIsAddOpen(false);
    showToast("Asset added successfully!");
  }}
>
  Save Asset
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
    <div className="categories-header">
  <div>
    <h2>Asset Categories</h2>
    <p>Manage asset categories and their statistics</p>
  </div>
  

  <button
    className="primary-btn"
    onClick={() => {
      setEditingCategory("");
      setNewCategoryName("");
      setIsCategoryEditOpen(true);
    }}
  >
    + Add Category
  </button>
</div>

    <div className="categories-grid">
      {categories.map((cat) => {
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
                onClick={() => {
                  setEditingCategory(cat);
                  setNewCategoryName(cat);
                  setIsCategoryEditOpen(true);
                }}
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
    if (assets.length === 0) return;

    setAssets(prev =>
      prev.map(a => ({
        ...a,
        status: "Active"
      }))
    );

    showToast("All assets marked as Active");
  }}
>
  Mark All Active
</button>

<button
  className="secondary-btn"
  onClick={() => {
    if (assets.length === 0) return;

    setAssets(prev =>
      prev.map(a => ({
        ...a,
        status: "Inactive"
      }))
    );

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
          onClick={handleExportExcel}
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
{isCategoryEditOpen && (
  <div
    className="modal-overlay"
    onClick={() => setIsCategoryEditOpen(false)}
  >
    <div
      className="modal-box"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="modal-header">
        <h3>Edit Category</h3>
        <span
          className="close-btn"
          onClick={() => setIsCategoryEditOpen(false)}
        >
          ✖
        </span>
      </div>

      <div className="modal-body">
        <label>Category Name</label>
        <input
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
      </div>

      <div className="modal-footer">
        {editingCategory && (
  <button
    className="danger-btn"
    onClick={() => setIsCategoryDeleteOpen(true)}
  >
    Delete
  </button>
)}
        <button
          className="secondary-btn"
          onClick={() => setIsCategoryEditOpen(false)}
        >
          Cancel
        </button>

        <button
  className="primary-btn"
  onClick={() => {
    if (!newCategoryName.trim()) return; 

    // EDIT CATEGORY
    if (editingCategory) {
      const updatedAssets = assets.map((asset) =>
        asset.category === editingCategory
          ? { ...asset, category: newCategoryName }
          : asset
      );

      setAssets(updatedAssets);

      const updatedCategories = categories.map((c) =>
        c === editingCategory ? newCategoryName : c
      );

      setCategories(updatedCategories);

      showToast("Category updated successfully!");
    } 
    // ADD CATEGORY
    else {
      if (categories.includes(newCategoryName)) {
        showToast("Category already exists!");
        return;
      }

      setCategories([...categories, newCategoryName]);
      showToast("Category added successfully!");
    }

    setIsCategoryEditOpen(false);
  }}
>
  Save Changes
</button>
      </div>
    </div>
  </div>
)}

{/* CATEGORY DELETE CONFIRM MODAL */}
{isCategoryDeleteOpen && (
  <div
    className="modal-overlay"
    onClick={() => setIsCategoryDeleteOpen(false)}
  >
    <div
      className="modal-box small"
      onClick={(e) => e.stopPropagation()}
    >
      <h3>Confirm Delete</h3>

      <p>
        Are you sure you want to delete category
        <strong> {editingCategory}</strong>?
      </p>

      <div className="modal-footer">

        <button
          className="secondary-btn"
          onClick={() => setIsCategoryDeleteOpen(false)}
        >
          Cancel
        </button>

        <button
          className="danger-btn"
          onClick={() => {

            // Move assets to Uncategorized
const updatedAssets = assets.map(asset =>
  asset.category === editingCategory
    ? { ...asset, category: "Uncategorized" }
    : asset
);

setAssets(updatedAssets);

// Remove category
const updatedCategories = categories.filter(
  c => c !== editingCategory
);

setCategories(updatedCategories);

setIsCategoryDeleteOpen(false);
setIsCategoryEditOpen(false);

showToast("Category deleted successfully!");
}} 
        >
          Delete
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