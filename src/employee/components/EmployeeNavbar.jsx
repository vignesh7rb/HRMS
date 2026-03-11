import React, { useState, useRef, useEffect } from "react";
import { FaBell, FaChevronDown, FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../store/slice/authSlice";
import "./EmployeeNavbar.css";

const EmployeeNavbar = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth?.user);

  /* ===== LOGOUT ===== */
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
    window.location.reload();
  };

  const handleProfile = () => {
    setOpen(false);
    navigate("/employee/profile");
  };

  const handleSettings = () => {
    setOpen(false);
    navigate("/employee/settings");
  };

  /* ===== PAGE TITLE BASED ON ROUTE ===== */

  const getTitle = () => {
    const path = location.pathname;

    if (path.includes("/employee/dashboard")) return "Dashboard";
    if (path.includes("/employee/profile")) return "My Profile";
    if (path.includes("/employee/attendance")) return "Attendance";
    if (path.includes("/employee/leave")) return "Leave";
    if (path.includes("/employee/payroll")) return "Payslip";
    if (path.includes("/employee/task-management")) return "Task Management";

    return "Employee Portal";
  };

  /* ===== CLOSE DROPDOWN WHEN CLICK OUTSIDE ===== */

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="employee-topbar">
      {/* LEFT */}
      <div className="topbar-left">{getTitle()}</div>

      {/* CENTER SEARCH */}
      <div className="topbar-center">
        <div className="search-box">
          <input type="text" placeholder="Search..." />
          <FaSearch className="search-icon" />
        </div>
      </div>

      {/* RIGHT */}
      <div className="topbar-right">
        <FaBell className="bell-icon" />

        <div className="profile-area" ref={ref}>
          <div className="profile-trigger" onClick={() => setOpen(!open)}>
            <img
              src={user.profileImage}
              alt="profile"
              className="profile-img"
            />

            <div className="profile-info">
              <span className="profile-name">{user.name}</span>
              <span className="profile-email">{user.email}</span>
            </div>

            <FaChevronDown className="chevron" />
          </div>

          {open && (
            <div className="simple-dropdown">
              <div className="dropdown-item" onClick={handleProfile}>
                My Profile
              </div>

              <div className="dropdown-item" onClick={handleSettings}>
                Settings
              </div>

              <div className="dropdown-item logout" onClick={handleLogout}>
                Log out
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeNavbar;
