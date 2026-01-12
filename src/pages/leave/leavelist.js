import "../leave/leave.css";
import { useState } from "react";

const LeaveList = () => {
  const [showApplyModal, setShowApplyModal] = useState(false);

  return (
    <div className="leave-page">

      {/* HEADER */}
      <div className="leave-header">
        <div>
          <h2>Leave Management</h2>
          <p>Apply, track, and manage employee leave requests</p>
        </div>

        <button className="apply-btn" onClick={() => setShowApplyModal(true)}>
          Apply for Leave
        </button>
      </div>

      {/* KPI CARDS */}
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

        <div className="leave-card">
          <p className="card-label">Compensatory Off</p>
          <h2 className="card-value">0</h2>
          <span className="card-meta">Used: 0 / Total: 0</span>
        </div>
      </div>

      {/* TABS */}
      <div className="leave-tabs">
        <button className="tab active">Leave Requests</button>
        <button className="tab">Calendar View</button>
        <button className="tab">Leave History</button>
      </div>

      {/* TABLE */}
      <div className="leave-table-card">
        <h3>Leave Requests</h3>
        <p className="sub-text">Manage pending and recent leave applications</p>

        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Leave Type</th>
              <th>Duration</th>
              <th>Days</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <strong>John Doe</strong>
                <div className="emp-id">EMP001</div>
              </td>
              <td>Casual Leave</td>
              <td>15 Jun – 17 Jun</td>
              <td>3</td>
              <td>Family function</td>
              <td><span className="status pending">Pending</span></td>
              <td className="actions">
                <button className="approve">✓</button>
                <button className="reject">✕</button>
              </td>
            </tr>

            <tr>
              <td>
                <strong>Sarah Wilson</strong>
                <div className="emp-id">EMP002</div>
              </td>
              <td>Sick Leave</td>
              <td>20 Jun – 21 Jun</td>
              <td>2</td>
              <td>Not feeling well</td>
              <td><span className="status approved">Approved</span></td>
              <td>
                <button className="view">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showApplyModal && (
        <div className="modal-wrapper">
          <div className="modal-container">
            <button className="modal-close" onClick={() => setShowApplyModal(false)}>✕</button>

            <h2>Apply for Leave</h2>
            <p className="sub-text">Fill in the details to submit your leave request.</p>

            <div className="modal-row">
              <label>Leave Type</label>
              <select>
                <option>Select leave type</option>
                <option>Casual Leave</option>
                <option>Sick Leave</option>
                <option>Earned Leave</option>
              </select>
            </div>

            <div className="modal-row">
              <label>Start Date</label>
              <input type="date" />
            </div>

            <div className="modal-row">
              <label>End Date</label>
              <input type="date" />
            </div>

            <div className="modal-row">
              <label>Reason</label>
              <textarea />
            </div>

            <div className="modal-footer">
              <button className="btn-outline" onClick={() => setShowApplyModal(false)}>Cancel</button>
              <button className="btn-primary">Apply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveList;
