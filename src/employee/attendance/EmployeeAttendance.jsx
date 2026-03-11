import React, { useState, useMemo } from "react";
import "./EmployeeAttendance.css";

const EmployeeAttendance = () => {
  /* =========================
     ATTENDANCE DATA
  ========================= */

  const [attendanceData, setAttendanceData] = useState([
    {
      employee: "John Doe",
      date: "2024-02-01",
      checkIn: "09:05",
      checkOut: "18:00",
      status: "Present",
      workHours: "8h 55m",
      overtime: "0h 0m",
      notes: "-",
    },
    {
      employee: "Sarah Wilson",
      date: "2024-02-02",
      checkIn: "09:35",
      checkOut: "18:10",
      status: "Late",
      workHours: "8h 35m",
      overtime: "0h 10m",
      notes: "Traffic",
    },
  ]);

  /* =========================
     MODAL STATE
  ========================= */

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    employee: "",
    status: "",
    checkIn: "",
    checkOut: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMarkAttendance = () => {
    if (
      !formData.employee ||
      !formData.status ||
      !formData.checkIn ||
      !formData.checkOut
    ) {
      alert("Please fill all fields");
      return;
    }

    const newAttendance = {
      employee: formData.employee,
      date: new Date().toISOString().split("T")[0],
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      status: formData.status,
      workHours: "8h 00m",
      overtime: "0h 0m",
      notes: formData.notes || "-",
    };

    setAttendanceData([...attendanceData, newAttendance]);

    setShowModal(false);

    setFormData({
      employee: "",
      status: "",
      checkIn: "",
      checkOut: "",
      notes: "",
    });
  };

  /* =========================
     FILTER
  ========================= */

  const [searchDate, setSearchDate] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const filteredAttendance = useMemo(() => {
    return attendanceData.filter(
      (item) =>
        item.date.includes(searchDate) &&
        item.status.toLowerCase().includes(searchStatus.toLowerCase()),
    );
  }, [attendanceData, searchDate, searchStatus]);

  const totalPages = Math.ceil(filteredAttendance.length / ITEMS_PER_PAGE);

  const paginatedAttendance = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAttendance.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAttendance, currentPage]);

  return (
    <div className="attendance-page">
      {/* HEADER */}

      <div className="attendance-header">
        <div>
          <h2>My Attendance</h2>
          <p>View and track your attendance records</p>
        </div>

        <button className="apply-btnn" onClick={() => setShowModal(true)}>
          + Mark Attendance
        </button>
      </div>

      {/* TABLE */}

      <div className="table-card">
        <h3>Attendance Records</h3>

        <div className="attendance-filter-bar">
          <input
            type="date"
            value={searchDate}
            onChange={(e) => {
              setSearchDate(e.target.value);
              setCurrentPage(1);
            }}
          />

          <select
            value={searchStatus}
            onChange={(e) => {
              setSearchStatus(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Status</option>
            <option value="Present">Present</option>
            <option value="Late">Late</option>
            <option value="Absent">Absent</option>
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>EMPLOYEE</th>
              <th>DATE</th>
              <th>CHECK IN</th>
              <th>CHECK OUT</th>
              <th>WORK HOURS</th>
              <th>OVERTIME</th>
              <th>STATUS</th>
              <th>NOTES</th>
            </tr>
          </thead>

          <tbody>
            {paginatedAttendance.map((item, index) => (
              <tr key={index}>
                <td>{item.employee}</td>
                <td>{formatDate(item.date)}</td>
                <td>{item.checkIn}</td>
                <td>{item.checkOut}</td>
                <td>{item.workHours}</td>
                <td>{item.overtime}</td>

                <td>
                  <span className={`badge ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </td>

                <td>{item.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}

        <div className="attendance-pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* MARK ATTENDANCE MODAL */}

      {showModal && (
        <div className="modal-wrapper">
          <div className="modal-container">
            <button className="modal-close" onClick={() => setShowModal(false)}>
              ✕
            </button>

            <h2>Mark Attendance</h2>
            <p className="sub-text">Mark attendance for an employee</p>

            <div className="modal-row-horizontal">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="">Select status</option>
                <option>Present</option>
                <option>Late</option>
                <option>Absent</option>
              </select>
            </div>

            <div className="modal-row-horizontal">
              <label>Check In</label>
              <input
                type="time"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
              />
            </div>

            <div className="modal-row-horizontal">
              <label>Check Out</label>
              <input
                type="time"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
              />
            </div>

            <div className="modal-row-horizontal">
              <label>Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
              />
            </div>

            <div className="modal-footer">
              <button
                className="btn-outline"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button className="btn-primary" onClick={handleMarkAttendance}>
                Save Attendance
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeAttendance;
