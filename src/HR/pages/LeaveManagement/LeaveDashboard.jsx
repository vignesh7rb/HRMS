import StatCard from "../../components/StateCard";
import "./leave.css";

const LeaveDashboard = () => {
  return (
    <>
      <h1>Leave Management</h1>

      <div className="stats">
        <StatCard title="Pending Requests" value="6" />
        <StatCard title="Approved" value="18" />
        <StatCard title="Rejected" value="3" />
        <StatCard title="Total Leaves" value="27" />
      </div>
    </>
  );
};

export default LeaveDashboard;
