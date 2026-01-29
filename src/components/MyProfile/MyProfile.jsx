import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import JobDetails from "./JobDetails";
import "./Profile.css";

/* ===== ROLE CONFIG ===== */
const ROLE_PROFILE_CONFIG = {
  ADMIN: {
    label: "Admin Profile",
    className: "admin",
    sections: ["job", "adminControls"],
  },
  HR: {
    label: "HR Profile",
    className: "hr",
    sections: ["job", "hrControls"],
  },
};

const MyProfile = () => {
  const user = useSelector((state) => state.auth?.user);
  const [jobDetails, setJobDetails] = useState(null);

  /* ✅ HOOK IS ALWAYS CALLED */
  useEffect(() => {
    if (!user) return; // 👈 condition INSIDE hook

    // 🔁 Replace with real API later
    if (user.role === "ADMIN") {
      setJobDetails({
        employeeId: "ADM-" + user.id,
        department: "Administration",
        accessLevel: "Full System Access",
        location: "Head Office",
        joinedDate: "01/01/2020",
      });
    }

    if (user.role === "HR") {
      setJobDetails({
        employeeId: "HR-" + user.id,
        department: "Human Resources",
        specialization: "Employee Management",
        location: "Regional Office",
        joinedDate: "15/03/2021",
      });
    }
  }, [user]);

  /* ✅ NOW SAFE TO EARLY RETURN */
  if (!user) {
    return <p className="loading">Loading profile…</p>;
  }

  const roleConfig = ROLE_PROFILE_CONFIG[user.role];

  return (
    <div className="erp-profile-page">
      {/* ===== HEADER ===== */}
      <div className="erp-profile-header">
        <img src={user.profileImage} alt="Profile" />

        <div className="erp-profile-meta">
          <h2>{user.name}</h2>
          <p>{user.email}</p>

          <span className="status">{user.status}</span>

          <span className={`portal-tag ${roleConfig.className}`}>
            {roleConfig.label}
          </span>
        </div>
      </div>

      {/* ===== JOB DETAILS ===== */}
      {jobDetails && (
        <JobDetails
          data={jobDetails}
          profileImage={user.profileImage}
        />
      )}

      {/* ===== ADMIN CONTROLS ===== */}
      {roleConfig.sections.includes("adminControls") && (
        <div className="erp-card">
          <h3>Admin Controls</h3>
          <ul>
            <li>System Configuration</li>
            <li>User Access Management</li>
            <li>Audit Logs</li>
            <li>Finance Visibility</li>
          </ul>
        </div>
      )}

      {/* ===== HR CONTROLS ===== */}
      {roleConfig.sections.includes("hrControls") && (
        <div className="erp-card">
          <h3>HR Controls</h3>
          <ul>
            <li>Employee Onboarding</li>
            <li>Leave Approval</li>
            <li>Exit Management</li>
            <li>Attendance Review</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
