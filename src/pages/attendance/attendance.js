import React, { useState } from "react";
import "./attendance.css";
import MarkAttendance from "./MarkAttendance";

const Attendance = () => {

  /* =========================
     DATA STATE (MUST be useState)
  ========================= */
  const [attendanceData, setAttendanceData] = useState([
    {
      id: "EMP001",
      name: "John Doe",
      department: "Engineering",
      date: "2024-01-15",
      checkIn: "09:00 AM",
      checkOut: "06:00 PM",
      status: "Present",
      workHours: "9h 0m",
      overtime: "0h 0m",
      notes: "-"
    }
  ]);

  /* =========================
     MODAL STATE
  ========================= */
  const [showMarkAttendance, setShowMarkAttendance] = useState(false);

  /* =========================
     SAVE HANDLER (KEY PART)
  ========================= */
  const handleSaveAttendance = (newRecord) => {
    setAttendanceData([...attendanceData, newRecord]);
  };

  return (
    <div className="attendance-page">

      {/* HEADER */}
      <div className="attendance-header">
        <div>
          <h2>Employee Attendance</h2>
          <p>Track and manage employee attendance</p>
        </div>

        <div className="attendance-actions">
          <button
            className="primary-btn"
            onClick={() => setShowMarkAttendance(true)}
          >
            + Mark Attendance
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-card">
        <h3>Attendance Records</h3>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>DATE</th>
              <th>STATUS</th>
              <th>NOTES</th>
            </tr>
          </thead>

          <tbody>
            {attendanceData.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.date}</td>
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
      </div>

      {/* MODAL */}
      {showMarkAttendance && (
        <MarkAttendance
          onClose={() => setShowMarkAttendance(false)}
          onSave={handleSaveAttendance}
        />
      )}
    </div>
  );
};

export default Attendance;
