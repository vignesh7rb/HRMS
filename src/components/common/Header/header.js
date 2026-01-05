import React, { useState, useRef, useEffect } from "react";
import { FaBell, FaChevronDown, FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom"; // ✅ ADD THIS
import "../../../assets/styles/sidebar/header.css";

const Topbar = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const location = useLocation(); // ✅ CURRENT ROUTE

  // ✅ Decide title based on path
  const getTitle = () => {
    if (location.pathname.startsWith("/employee")) return "Employee";
    if (location.pathname.startsWith("/payroll")) return "Payroll";
    if (location.pathname.startsWith("/asset")) return "Asset Management";
    if (location.pathname.startsWith("/expense")) return "Expense & Finance";
    return "Dashboard";
  };

  // close dropdown when clicking outside
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
    <div className="topbar">
      {/* Left */}
      <div className="topbar-left">
        {getTitle()} {/* ✅ DYNAMIC TITLE */}
      </div>

      {/* Center */}
      <div className="topbar-center">
        <div className="search-box">
          <input type="text" placeholder="Search" />
          <FaSearch className="search-icon" />
        </div>
      </div>

      {/* Right */}
      <div className="topbar-right">
        <FaBell className="bell-icon" />

        <div className="profile-area" ref={ref}>
          <div className="profile-trigger">
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="profile-img"
            />

            <div className="profile-info">
              <span className="profile-name">Seving Aslanova</span>
              <span className="profile-email">seving@gmail.com</span>
            </div>

            <FaChevronDown
              className="chevron"
              onClick={() => setOpen(!open)}
            />
          </div>

          {open && (
            <div className="simple-dropdown">
              <div className="dropdown-item">Profile</div>
              <div className="dropdown-item">Settings</div>
              <div className="dropdown-item logout">Log out</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
