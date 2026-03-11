import React from "react";
import { Outlet } from "react-router-dom";

import EmployeeSidebar from "../components/EmployeeSidebar";
import EmployeeNavbar from "../components/EmployeeNavbar";
import Footer from "./Footer";

import "./EmployeeLayout.css";

const EmployeeMainLayout = () => {
  return (
    <div className="employee-layout">
      <EmployeeSidebar />

      <div className="employee-right">
        <EmployeeNavbar />

        <div className="employee-content">
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default EmployeeMainLayout;
