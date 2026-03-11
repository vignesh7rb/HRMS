import "../leave/EmpLeave.css";
import { useState } from "react";

const EmpLeave = () => {
  const [showApplyModal, setShowApplyModal] = useState(false);

  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      type: "Casual Leave",
      duration: "15 Jun – 17 Jun",
      days: 3,
      reason: "Family function",
      status: "Pending",
    },
    {
      id: 2,
      type: "Sick Leave",
      duration: "20 Jun – 21 Jun",
      days: 2,
      reason: "Fever",
      status: "Approved",
    },
    {
      id: 3,
      type: "Earned Leave",
      duration: "25 Jun – 28 Jun",
      days: 4,
      reason: "Vacation",
      status: "Pending",
    },
  ]);

  /* ================= APPLY LEAVE FORM ================= */

  const [formData, setFormData] = useState({
    type: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateDays = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    const diff = (e - s) / (1000 * 60 * 60 * 24) + 1;
    return diff;
  };

  const handleApplyLeave = () => {
    if (!formData.type || !formData.startDate || !formData.endDate) {
      alert("Please fill all fields");
      return;
    }

    const days = calculateDays(formData.startDate, formData.endDate);

    const newLeave = {
      id: leaveRequests.length + 1,
      type: formData.type,
      duration: `${formData.startDate} - ${formData.endDate}`,
      days: days,
      reason: formData.reason,
      status: "Pending",
    };

    setLeaveRequests([...leaveRequests, newLeave]);

    setShowApplyModal(false);

    setFormData({
      type: "",
      startDate: "",
      endDate: "",
      reason: "",
    });
  };

  return (
    <div className="leave-page">
      {/* HEADER */}

      <div className="leave-header">
        <div>
          <h2>My Leaves</h2>
          <p>Apply and track your leave requests</p>
        </div>

        <button className="apply-btnn" onClick={() => setShowApplyModal(true)}>
          Apply Leave
        </button>
      </div>

      {/* LEAVE CARDS */}

      <div className="leave-stats">
        <div className="leave-card">
          <p className="card-label">Casual Leave</p>
          <h2 className="card-value">9</h2>
          <span className="card-meta">Used: 3 / Total: 12</span>
        </div>

        <div className="leave-card">
          <p className="card-label">Sick Leave</p>
          <h2 className="card-value">8</h2>
          <span className="card-meta">Used: 2 / Total: 10</span>
        </div>

        <div className="leave-card">
          <p className="card-label">Earned Leave</p>
          <h2 className="card-value">15</h2>
          <span className="card-meta">Used: 0 / Total: 15</span>
        </div>
      </div>

      {/* LEAVE TABLE */}

      <div className="leave-table-card">
        <h3>My Leave Requests</h3>
        <p className="sub-text">Track all your leave applications</p>

        <table>
          <thead>
            <tr>
              <th>Leave Type</th>
              <th>Duration</th>
              <th>Days</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {leaveRequests.map((req) => (
              <tr key={req.id}>
                <td>{req.type}</td>
                <td>{req.duration}</td>
                <td>{req.days}</td>
                <td>{req.reason}</td>

                <td>
                  <span
                    className={`status ${
                      req.status === "Pending"
                        ? "pending"
                        : req.status === "Approved"
                          ? "approved"
                          : "rejected"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* APPLY LEAVE MODAL */}

      {showApplyModal && (
        <div className="modal-wrapper">
          <div className="modal-container">
            <button
              className="modal-close"
              onClick={() => setShowApplyModal(false)}
            >
              ✕
            </button>

            <h2>Apply for Leave</h2>
            <p className="sub-text">
              Fill in the details to submit your leave request.
            </p>

            {/* Leave Type */}

            <div className="modal-row-horizontal">
              <label>Leave Type</label>

              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="">Select leave type</option>
                <option>Casual Leave</option>
                <option>Sick Leave</option>
                <option>Earned Leave</option>
              </select>
            </div>

            {/* Start Date */}

            <div className="modal-row-horizontal">
              <label>Start Date</label>

              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>

            {/* End Date */}

            <div className="modal-row-horizontal">
              <label>End Date</label>

              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>

            {/* Reason */}

            <div className="modal-row-horizontal">
              <label>Reason</label>

              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
              />
            </div>

            {/* FOOTER */}

            <div className="modal-footer">
              <button
                className="btn-outline"
                onClick={() => setShowApplyModal(false)}
              >
                Cancel
              </button>

              <button className="btn-primary" onClick={handleApplyLeave}>
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmpLeave;
