import { useState } from "react";
import StatCard from "../../components/StateCard";
import "../../pages/Dashboard/hrDashboard.css";

import AddEmployee from "../../AddEmployee/AddEmployee";
import ApproveLeaves from "../../ApproveLeaves/ApproveLeaves";
import RunPayroll from "../../RunPayroll/RunPayroll";
import PostJob from "../../PostJob/PostJob";
import InitiateExit from "../../InitiateExit/InitiateExit";
import ViewReports from "../../ViewReports/ViewReports";

const HRDashboard = () => {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <div className="hr-dashboard-container">
      <h1 className="page-title">HR Dashboard</h1>

      {/* KPI SECTION */}
      <div className="stats">
        <StatCard title="Total Employees" value="128" subtitle="+4 this month" />
        <StatCard title="New Joinees" value="3" subtitle="Joined this month" />
        <StatCard title="Attendance Today" value="119 / 128" subtitle="9 on leave" />
        <StatCard title="Leaves Pending" value="5" subtitle="Approval required" status="warning" />
        <StatCard title="Open Positions" value="6" subtitle="Hiring active" />
        <StatCard title="Project Assignments" value="4" subtitle="Pending assignment" />
      </div>

      {/* QUICK ACTIONS */}
      <div className="quick-actions">
        <button className="qa-btn" onClick={() => setActiveModal("addEmployee")}>➕ Add Employee</button>
        <button className="qa-btn" onClick={() => setActiveModal("approveLeaves")}>🌴 Approve Leaves</button>
        <button className="qa-btn" onClick={() => setActiveModal("runPayroll")}>📄 Run Payroll</button>
        <button className="qa-btn" onClick={() => setActiveModal("postJob")}>📢 Post Job</button>
        <button className="qa-btn" onClick={() => setActiveModal("viewReports")}>📊 View Reports</button>
        <button className="qa-btn danger" onClick={() => setActiveModal("initiateExit")}>🚪 Initiate Exit</button>
      </div>

      {/* MODAL SYSTEM */}
      {activeModal && (
        <>
          <div className="dashboard-overlay" onClick={() => setActiveModal(null)} />

          <div className="dashboard-modal">
            <div className="modal-header">
              <h3>
                {activeModal === "addEmployee" && "Add New Employee"}
                {activeModal === "approveLeaves" && "Approve Leaves"}
                {activeModal === "runPayroll" && "Run Payroll"}
                {activeModal === "postJob" && "Post Job"}
                {activeModal === "viewReports" && "View Reports"}
                {activeModal === "initiateExit" && "Initiate Exit"}
              </h3>
              <button className="modal-close" onClick={() => setActiveModal(null)}>×</button>
            </div>

            <div className="modal-body">
              {activeModal === "addEmployee" && <AddEmployee onClose={() => setActiveModal(null)} />}
              {activeModal === "approveLeaves" && <ApproveLeaves onClose={() => setActiveModal(null)} />}
              {activeModal === "runPayroll" && <RunPayroll onClose={() => setActiveModal(null)} />}
              {activeModal === "postJob" && <PostJob onClose={() => setActiveModal(null)} />}
              {activeModal === "viewReports" && <ViewReports onClose={() => setActiveModal(null)} />}
              {activeModal === "initiateExit" && <InitiateExit onClose={() => setActiveModal(null)} />}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HRDashboard;
