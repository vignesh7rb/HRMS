import StatCard from "../../components/StateCard";
import "../../pages/Dashboard/hrDashboard.css";

const HRDashboard = () => {
  return (
    <div className="hr-dashboard-container">
      <h1 className="page-title">HR Dashboard</h1>

      {/* KPI SECTION */}
      <div className="stats">
        <StatCard
          title="Total Employees"
          value="128"
          subtitle="+4 this month"
        />

        <StatCard
          title="New Joinees"
          value="3"
          subtitle="Joined this month"
        />

        <StatCard
          title="Attendance Today"
          value="119 / 128"
          subtitle="9 on leave"
        />

        <StatCard
          title="Leaves Pending"
          value="5"
          subtitle="Approval required"
          status="warning"
        />

        <StatCard
          title="Open Positions"
          value="6"
          subtitle="Hiring active"
        />

        <StatCard
  title="Project Assignments"
  value="4"
  subtitle="Pending assignment"
/>

      </div>


      {/* QUICK ACTIONS */}
      <div className="quick-actions">
        <button className="qa-btn">➕ Add Employee</button>
        <button className="qa-btn">🌴 Approve Leaves</button>
        <button className="qa-btn">📄 Run Payroll</button>
        <button className="qa-btn">📢 Post Job</button>
        <button className="qa-btn danger">🚪 Initiate Exit</button>
        <button className="qa-btn">📊 View Reports</button>
      </div>

      <div className="approval-box">
  <h3 className="section-title">Pending Approvals</h3>

  <ul className="approval-list">
    <li>
      <span>Leave Requests</span>
      <span className="count warning">5</span>
    </li>

    <li>
      <span>Onboarding Approvals</span>
      <span className="count warning">2</span>
    </li>

    <li>
      <span>Exit Requests</span>
      <span className="count danger">1</span>
    </li>

    <li>
      <span>Payroll Approval</span>
      <span className="count info">January</span>
    </li>

    <li>
      <span>Document Verification</span>
      <span className="count warning">3</span>
    </li>
  </ul>
</div>
<div className="activity-box">
  <h3 className="section-title">Recent HR Activities</h3>

  <ul className="activity-list">
    <li>
      <span>John Doe applied for leave (Jan 18–20)</span>
      <span className="badge pending">Pending</span>
    </li>

    <li>
      <span>Priya Sharma joined as Software Engineer</span>
      <span className="badge success">Completed</span>
    </li>

    <li>
      <span>Ravi Kumar assigned to Project Alpha</span>
      <span className="badge success">Completed</span>
    </li>

    <li>
      <span>Exit initiated by Sarah Wilson</span>
      <span className="badge danger">Action</span>
    </li>

    <li>
      <span>January payroll processed</span>
      <span className="badge success">Completed</span>
    </li>
  </ul>
</div>

    </div>
  );
};

export default HRDashboard;
