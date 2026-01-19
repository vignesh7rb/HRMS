import React, { useState, useRef, useEffect } from "react";
import { FaBell, FaChevronDown, FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import "./hrTopbar.css";

const HRTopbar = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const location = useLocation();

  /* ================= HR TITLE LOGIC ================= */
  const getTitle = () => {
    const path = location.pathname;

    if (path.includes("/hr/dashboard")) return "HR Dashboard";
    if (path.includes("/hr/employees")) return "Employee Management";
    if (path.includes("/hr/leave")) return "Leave Management";
    if (path.includes("/hr/attendance")) return "Attendance";
    if (path.includes("/hr/onboarding")) return "Onboarding";
    if (path.includes("/hr/exit")) return "Exit Management";
    if (path.includes("/hr/tasks")) return "Task Management";
    if (path.includes("/hr/payroll")) return "Payroll";
    if (path.includes("/hr/reports")) return "Reports";

    return "HR Portal";
  };

  /* ================= CLOSE DROPDOWN ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="hr-topbar">
      {/* LEFT */}
      <div className="hr-topbar-left">
        {getTitle()}
      </div>

      {/* CENTER */}
      <div className="hr-topbar-center">
        <div className="hr-search-box">
          <input type="text" placeholder="Search employee, ID..." />
          <FaSearch className="hr-search-icon" />
        </div>
      </div>

      {/* RIGHT */}
      <div className="hr-topbar-right">
        <FaBell className="hr-bell" />

        <div className="hr-profile" ref={ref}>
          <div
            className="hr-profile-trigger"
            onClick={() => setOpen(!open)}
          >
            <img
              src="https://i.pravatar.cc/40?img=12"
              alt="profile"
              className="hr-profile-img"
            />

            <div className="hr-profile-info">
              <span className="hr-name">HR Admin</span>
              <span className="hr-email">hr@company.com</span>
            </div>

            <FaChevronDown />
          </div>

          {open && (
            <div className="hr-dropdown">
              <div className="hr-dropdown-item">My Profile</div>
              <div className="hr-dropdown-item">Settings</div>
              <div className="hr-dropdown-item logout">Logout</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HRTopbar;
