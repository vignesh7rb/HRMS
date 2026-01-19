import { useState, useMemo } from "react";
import "../../pages/Attendence/attendence.css";
/* EMPLOYEE MASTER (REALISTIC HR DATA) */
const employees = [
  { id: "EMP001", name: "Arun Kumar", department: "Engineering" },
  { id: "EMP002", name: "Sneha R", department: "HR" },
  { id: "EMP003", name: "Rahul Verma", department: "Engineering" },
  { id: "EMP004", name: "Meena S", department: "Finance" },
];

/* DYNAMIC ATTENDANCE GENERATOR */
const generateAttendanceForDate = (date) => {
  const seed = new Date(date).getDate(); // stable per day

  return employees.map((emp, index) => {
    const value = (seed + index) % 3;

    if (value === 0) {
      return {
        ...emp,
        status: "present",
        checkIn: "09:10 AM",
        checkOut: "06:10 PM",
      };
    }

    if (value === 1) {
      return {
        ...emp,
        status: "leave",
        checkIn: "--",
        checkOut: "--",
      };
    }

    return {
      ...emp,
      status: "absent",
      checkIn: "--",
      checkOut: "--",
    };
  });
};

const Attendance = () => {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);

  /* REGENERATE WHEN DATE CHANGES */
  const attendanceData = useMemo(
    () => generateAttendanceForDate(date),
    [date]
  );

  const total = attendanceData.length;
  const present = attendanceData.filter(e => e.status === "present").length;
  const absent = attendanceData.filter(e => e.status === "absent").length;
  const leave = attendanceData.filter(e => e.status === "leave").length;

  return (
    <div className="attendance-page">
      <h1 className="page-title">Attendance</h1>

      {/* SUMMARY */}
      <div className="attendance-summary">
        <div className="attendance-card">
          <p>Total Employees</p>
          <h2>{total}</h2>
        </div>
        <div className="attendance-card">
          <p>Present</p>
          <h2>{present}</h2>
        </div>
        <div className="attendance-card">
          <p>Absent</p>
          <h2>{absent}</h2>
        </div>
        <div className="attendance-card">
          <p>On Leave</p>
          <h2>{leave}</h2>
        </div>
      </div>

      {/* DATE FILTER */}
      <div className="attendance-filter">
        <label>Select Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="attendance-table-card">
        <h2>Attendance for {date}</h2>

        <table className="attendance-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Status</th>
              <th>Check-in</th>
              <th>Check-out</th>
            </tr>
          </thead>

          <tbody>
            {attendanceData.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.department}</td>
                <td>
                  <span className={`attendance-status ${emp.status}`}>
                    {emp.status.charAt(0).toUpperCase() + emp.status.slice(1)}
                  </span>
                </td>
                <td>{emp.checkIn}</td>
                <td>{emp.checkOut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
