import React, { useState, useMemo } from "react";
import { FaPlus, FaEye, FaEdit } from "react-icons/fa";
import "./assetManagement.css";

const AssetDisposal = () => {
    
const [searchText, setSearchText] = useState("");
const [statusFilter, setStatusFilter] = useState("ALL");
const [methodFilter, setMethodFilter] = useState("ALL");

const [showModal, setShowModal] = useState(false);
const [modalType, setModalType] = useState("");
const [selectedAsset, setSelectedAsset] = useState(null);

const [formData, setFormData] = useState({
  asset: "",
  category: "",
  method: "Sale",
  original: "",
  current: "",
  recovery: "",
  reason: "",
});
  const [disposals, setDisposals] = useState([
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
  ]);

  const totalDisposals = disposals.length;

const pendingCount = disposals.filter(
  (d) => d.status === "Pending"
).length;

const completedCount = disposals.filter(
  (d) => d.status === "Completed"
).length;

const totalRecovery = disposals.reduce(
  (sum, d) => sum + d.recovery,
  0
);
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


const openView = (item) => {
  setSelectedAsset(item);
  setFormData(item);
  setModalType("view");
  setShowModal(true);
};

const openEdit = (item) => {
  setSelectedAsset(item);
  setFormData(item);
  setModalType("edit");
  setShowModal(true);
};

const openNew = () => {
  setSelectedAsset(null);
  setFormData({
    asset: "",
    category: "",
    method: "Sale",
    original: "",
    current: "",
    recovery: "",
    reason: "",
  });
  setModalType("new");
  setShowModal(true);
};
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const saveDisposal = () => {

  if (modalType === "new") {

    const newAsset = {
      ...formData,
      id: "AST" + (disposals.length + 1).toString().padStart(3, "0"),
      status: "Pending",
      requestedBy: "Current User",
      requestDate: new Date().toISOString().split("T")[0],
      date: "",
    };

    setDisposals([...disposals, newAsset]);

  } else if (modalType === "edit") {

    const updated = disposals.map((item) =>
      item.id === selectedAsset.id
        ? { ...item, ...formData }
        : item
    );

    setDisposals(updated);
  }

  setShowModal(false);
};
  return (
    <div className="disposal-page">

      {/* HEADER */}
      {/* HEADER */}
<div className="disposal-header">
  <div>
    <h1>Asset Disposal</h1>
    <p>Manage asset disposal and retirement</p>
  </div>

  <button className="primary-btn" onClick={openNew}>
  <FaPlus /> Request Disposal
</button>
</div>  

      {/* SUMMARY CARDS */}
      <div className="disposal-summary">
        <div className="summary-card">
          <span>Total Disposals</span>
          <h2>{totalDisposals}</h2>
        </div>

        <div className="summary-card">
          <span>Pending</span>
          <h2 className="orange">{pendingCount}</h2>
        </div>

        <div className="summary-card">
          <span>Completed</span>
          <h2 className="green">{completedCount}</h2>
        </div>

        <div className="summary-card">
          <span>Recovery Value</span>
          <h2 className="blue">₹{totalRecovery}</h2>

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

 
</div>

      {/* TABLE */}
      <div className="disposal-table-card">
        <h2>Asset Disposals ({filteredDisposals.length})</h2>

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
                  <span className={`badge status ${item.status.toLowerCase()}`}>
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
                  <button
  className="icon-btn"
  onClick={() => openView(item)}
>
  <FaEye />
</button>

                  <button
  className="icon-btn"
  onClick={() => openEdit(item)}
>
  <FaEdit />
</button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
  <div className="modal-overlay">

    <div className="modal-box">

      <div className="modal-header">
        <h2>
          {modalType === "view" && "View Disposal"}
          {modalType === "edit" && "Edit Disposal"}
          {modalType === "new" && "Request Disposal"}
        </h2>

        <button
          className="close-btn"
          onClick={() => setShowModal(false)}
        >
          ✕
        </button>
      </div>

      <div className="modal-body">

{modalType === "view" && (
  <>
    <h3 className="modal-section">Asset Information</h3>

    <div className="view-row">
      <span>Asset Name : </span>
      <strong>{selectedAsset?.asset}</strong>
    </div>

    <div className="view-row">
      <span>Asset ID : </span>
      <strong>{selectedAsset?.id}</strong>
    </div>

    <div className="view-row">
      <span>Category : </span>
      <strong>{selectedAsset?.category}</strong>
    </div>

    <h3 className="modal-section">Financial Details</h3>

    <div className="view-row">
      <span>Original Value : </span>
      <strong>₹{selectedAsset?.original}</strong>
    </div>

    <div className="view-row">
      <span>Current Value : </span>
      <strong>₹{selectedAsset?.current}</strong>
    </div>

    <div className="view-row">
      <span>Recovery Value : </span>
      <strong>₹{selectedAsset?.recovery}</strong>
    </div>

    <h3 className="modal-section">Disposal Details</h3>

    <div className="view-row">
      <span>Method : </span>
      <strong>{selectedAsset?.method}</strong>
    </div>

    <div className="view-row">
      <span>Status : </span>
      <strong>{selectedAsset?.status}</strong>
    </div>

    <div className="view-row">
      <span>Requested By : </span>
      <strong>{selectedAsset?.requestedBy}</strong>
    </div>

    <div className="view-row">
      <span>Request Date : </span>
      <strong>{selectedAsset?.requestDate}</strong>
    </div>

    <div className="view-row">
      <span>Reason :</span>
      <strong>{selectedAsset?.reason}</strong>
    </div>
  </>
)}

{modalType !== "view" && (
  <>
    <label>Asset Name</label>
    <input
      name="asset"
      value={formData.asset}
      onChange={handleChange}
    />

    <label>Category</label>
    <input
      name="category"
      value={formData.category}
      onChange={handleChange}
    />

    <label>Disposal Method</label>
    <select
      name="method"
      value={formData.method}
      onChange={handleChange}
    >
      <option>Sale</option>
      <option>Donation</option>
      <option>Recycle</option>
      <option>Scrap</option>
    </select>

    <label>Original Value</label>
    <input
      type="number"
      name="original"
      value={formData.original}
      onChange={handleChange}
    />

    <label>Current Value</label>
    <input
      type="number"
      name="current"
      value={formData.current}
      onChange={handleChange}
    />

    <label>Recovery Value</label>
    <input
      type="number"
      name="recovery"
      value={formData.recovery}
      onChange={handleChange}
    />

    <label>Reason</label>
    <textarea
      name="reason"
      value={formData.reason}
      onChange={handleChange}
    />
  </>
)}

</div>

      <div className="modal-footer">
        <button onClick={() => setShowModal(false)}>
          Cancel
        </button>

        {modalType !== "view" && (
          <button className="primary-btn" onClick={saveDisposal}>
  Save
</button>
        )}
      </div>

    </div>

  </div>
)}

    </div>
  );
};

export default AssetDisposal;