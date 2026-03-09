import { useState, useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import "./assetManagement.css";

/* ---------------- INITIAL DATA ---------------- */

const initialTasks = [
  {
    id: "AST001",
    asset: "Dell Latitude 5420",
    description: "Regular system cleanup and hardware check",
    category: "Laptop",
    type: "Preventive",
    scheduleDate: "2025-06-15",
    duration: "2 hours",
    assignedTo: "IT Support",
    priority: "Medium",
    status: "Scheduled",
    cost: "Free",
  },
  {
    id: "AST005",
    asset: "Dell UltraSharp Monitor",
    description: "Screen flickering issue repair",
    category: "Monitor",
    type: "Corrective",
    scheduleDate: "2025-06-12",
    duration: "4 hours",
    assignedTo: "External Vendor",
    priority: "High",
    status: "In Progress",
    cost: "₹5,000",
  },
  {
    id: "AST003",
    asset: "HP LaserJet Pro",
    description: "Quarterly maintenance and toner replacement",
    category: "Printer",
    type: "Preventive",
    scheduleDate: "2025-06-20",
    duration: "1 hour",
    assignedTo: "HP Service",
    priority: "Low",
    status: "Scheduled",
    cost: "₹2,500",
  },
];

const MaintenanceSchedule = () => {

  const [activeTab, setActiveTab] = useState("schedule");
  const [searchText, setSearchText] = useState("");

  const [typeFilter, setTypeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");

  const [taskList, setTaskList] = useState(initialTasks);
  const [historyList, setHistoryList] = useState([]);


  const [showModal, setShowModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [editingTask, setEditingTask] = useState(null);

  const [confirmAction, setConfirmAction] = useState(null);
const [confirmTaskId, setConfirmTaskId] = useState(null);
const [selectedDay, setSelectedDay] = useState(null)



const today = new Date()

const [selectedMonth, setSelectedMonth] = useState(today.getMonth())
const [selectedYear, setSelectedYear] = useState(today.getFullYear())
const months = [
"January","February","March","April","May","June",
"July","August","September","October","November","December"
]
const years = []

for(let y = 2023; y <= 2030; y++){
  years.push(y)
}
const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate()

const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay()
const [formData, setFormData] = useState({
  asset: "",
  description: "",
  assignedTo: "",
  date: "",
  issueStartDate: "",
  returnDate: "",
  hours: "",
  type: "Preventive",
  priority: "Medium",
  cost: "",
  bill: null,
  repairResult: "Fixed"
});

  /* ---------------- FILTER TASKS ---------------- */

  const filteredTasks = useMemo(() => {

    return taskList.filter((task) => {

      const matchSearch =
        task.asset.toLowerCase().includes(searchText.toLowerCase()) ||
        task.description.toLowerCase().includes(searchText.toLowerCase());

      const matchType =
        typeFilter === "ALL" || task.type === typeFilter;

      const matchStatus =
        statusFilter === "ALL" || task.status === statusFilter;

      const matchPriority =
        priorityFilter === "ALL" || task.priority === priorityFilter;

      return matchSearch && matchType && matchStatus && matchPriority;

    });

  }, [taskList, searchText, typeFilter, statusFilter, priorityFilter]);

  
const selectedDateTasks = taskList.filter(task => {

  const issue = task.issueDate ? new Date(task.issueDate) : null
  const schedule = task.scheduleDate ? new Date(task.scheduleDate) : null
  const expected = task.returnDate ? new Date(task.returnDate) : null
  

  return (

    (task.status === "Completed" &&
      expected &&
      expected.getDate() === selectedDay &&
      expected.getMonth() === selectedMonth &&
      expected.getFullYear() === selectedYear)

    ||

    (task.status !== "Completed" &&
      schedule &&
      schedule.getDate() === selectedDay &&
      schedule.getMonth() === selectedMonth &&
      schedule.getFullYear() === selectedYear)

    ||

    (task.status !== "Completed" &&
      issue &&
      issue.getDate() === selectedDay &&
      issue.getMonth() === selectedMonth &&
      issue.getFullYear() === selectedYear)

  )
})


/* ---------------- REPORT DATA ---------------- */

const totalIssues = taskList.length;

const completedTasks = taskList.filter(t => t.status === "Completed");

const totalCost = completedTasks.reduce((sum, task) => {
  const cost = parseInt((task.cost || "0").toString().replace(/[^\d]/g,""));
  return sum + (isNaN(cost) ? 0 : cost);
}, 0);

const averageRepairTime =
completedTasks.length === 0
? 0
: Math.round(
completedTasks.reduce((sum,t)=>{
  const hours = parseInt((t.duration || "0").toString().replace(/[^\d]/g,""));
  return sum + (isNaN(hours) ? 0 : hours);
},0) / completedTasks.length
);

const commonIssues = {};

taskList.forEach(task=>{
  const issue = task.description || "Unknown Issue";
  commonIssues[issue] = (commonIssues[issue] || 0) + 1;
});

const mostCommonIssue =
Object.entries(commonIssues).sort((a,b)=>b[1]-a[1])[0];
  /* ---------------- START TASK ---------------- */

 


  /* ---------------- COMPLETE TASK ---------------- */

  const completeTask = (id) => {
  setConfirmAction("complete");
  setConfirmTaskId(id);
};

const handleConfirm = () => {

  

   if (confirmAction === "start") {

  const updated = taskList.map((task) =>
    task.id === confirmTaskId
      ? {
          ...task,
          status: "In Progress",
          startDate: new Date().toISOString().split("T")[0]
        }
      : task
  );

  setTaskList(updated);
  setSuccessMsg("Maintenance Started Successfully ✅");

}

  if (confirmAction === "complete") {

  const completedTask = taskList.find(task => task.id === confirmTaskId);
  

  const end = new Date();
  const endDate = new Date().toLocaleString();
   const start = new Date(completedTask.startDate);

  const hoursTaken = Math.round((end - start) / (1000 * 60 * 60));

 const historyRecord = {
  ...completedTask,
  status: formData.repairResult === "Failed" ? "Failed" : "Completed",
  endDate: endDate,
  performedBy: completedTask.assignedTo,
};
if(formData.repairResult === "Failed"){

  const disposalRequest = {
    id: completedTask.id,
    asset: completedTask.asset,
    category: completedTask.category,
    method: "Scrap",
    original: 0,
    current: 0,
    recovery: 0,
    date: "",
    status: "Pending",
    requestedBy: "Maintenance System",
    requestDate: new Date().toISOString().split("T")[0],
    reason: "Repair failed during maintenance"
  };

  console.log("Send this to Disposal Module:", disposalRequest);

}

  setHistoryList([...historyList, historyRecord]);

  const updated = taskList.map((task) =>
    task.id === confirmTaskId
      ? { ...task, status: "Completed", endDate, duration: hoursTaken + " hours" }
      : task
  );

  setTaskList(updated);

  setSuccessMsg(
  formData.repairResult === "Failed"
    ? "Repair Failed — Asset Sent to Disposal ⚠"
    : "Maintenance Completed Successfully 🎉"
);
}

  setConfirmAction(null);
  setConfirmTaskId(null);

  setTimeout(()=>setSuccessMsg(""),3000);
};

  const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData({
    ...formData,
    [name]: value
  });
};
const saveMaintenance = () => {

  if(editingTask){

    const updated = taskList.map((task)=>
      task.id === editingTask
        ? { ...task, ...formData, duration: formData.hours + " hours" }
        : task
    );

    setTaskList(updated);

    setSuccessMsg("Maintenance Updated Successfully ✏️");

  }else{

    const newTask = {
  id: "AST" + Math.floor(Math.random()*10000),
  asset: formData.asset,
  description: formData.description,
  assignedTo: formData.assignedTo,
  issueDate: formData.issueStartDate,
scheduleDate: formData.date,
returnDate: formData.returnDate,
  bill: formData.bill,
  category:"Device",
  duration: formData.hours + " hours",
  status:"Scheduled",
  cost: "₹" + formData.cost,
  type: formData.type,
  priority: formData.priority
};

    setTaskList([...taskList,newTask]);

    setSuccessMsg("Maintenance Scheduled Successfully 📅");

  }

  setShowModal(false);
  setEditingTask(null);

  setTimeout(()=>setSuccessMsg(""),3000);
};



  /* ---------------- UI ---------------- */

  return (
    <div className="maintenance-page">

      {/* HEADER */}

      <div className="maintenance-header">

        <div>
          <h1>Asset Maintenance</h1>
          <p>Schedule and track asset maintenance activities</p>
        </div>

        <button
          className="primary-btn"
          onClick={() => setShowModal(true)}
        >
          <FaPlus /> Schedule Maintenance
        </button>

      </div>

      {/* SUMMARY */}

      <div className="maintenance-summary">

        <div className="summary-card">
          <span>Total Scheduled</span>
          <h2>{taskList.length}</h2>
          <small>Maintenance tasks</small>
        </div>

        <div className="summary-card">
          <span>In Progress</span>
          <h2 className="orange">
            {taskList.filter(t => t.status === "In Progress").length}
          </h2>
          <small>Currently ongoing</small>
        </div>

        <div className="summary-card">
          <span>Completed</span>
          <h2 className="green">
            {taskList.filter(t => t.status === "Completed").length}
          </h2>
          <small>Finished tasks</small>
        </div>

        <div className="summary-card">
          <span>Estimated Cost</span>
          <h2>₹7,500</h2>
          <small>This month</small>
        </div>

      </div>

      {/* TABS */}

      <div className="maintenance-tabs">

        <button
          className={activeTab === "schedule" ? "active" : ""}
          onClick={() => setActiveTab("schedule")}
        >
          Schedule
        </button>

        <button
          className={activeTab === "calendar" ? "active" : ""}
          onClick={() => setActiveTab("calendar")}
        >
          Calendar
        </button>
        

        <button
          className={activeTab === "history" ? "active" : ""}
          onClick={() => setActiveTab("history")}
        >
          History
        </button>

        <button
          className={activeTab === "reports" ? "active" : ""}
          onClick={() => setActiveTab("reports")}
        >
          Reports
        </button>

      </div>

      {/* SCHEDULE TAB */}

      {activeTab === "schedule" && (

        <div className="maintenance-table-card">

          <div className="table-header">
            <h2>Maintenance Schedule</h2>
            <p>Upcoming and ongoing maintenance activities</p>
          </div>

          {/* FILTERS */}

          <div className="table-filters">

            <input
              placeholder="Search maintenance tasks..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="ALL">All Types</option>
              <option value="Preventive">Preventive</option>
              <option value="Corrective">Corrective</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="ALL">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

          </div>

          {/* TABLE */}

          <table>

            <thead>
              <tr>
                <th>Asset & Task</th>
                <th>Type</th>
                <th>Scheduled Date</th>
                <th>Assigned To</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Cost</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredTasks.map((task) => (

                <tr key={task.id}>

                  <td>
                    <strong>{task.asset}</strong>
                    <div className="sub-text">{task.description}</div>
                    <div className="sub-text">
                      {task.id} • {task.category}
                    </div>
                  </td>

                  <td>
                    <span className="badge type">{task.type}</span>
                  </td>

                  <td>
                    <div>{new Date(task.scheduleDate).toLocaleDateString()}</div>
                    <div className="sub-text">{task.duration}</div>
                  </td>

                  <td>{task.assignedTo}</td>

                  <td>
                    <span className={`badge priority ${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                  </td>

                  <td>
                    <span className={`badge status ${task.status.toLowerCase().replace(" ", "-")}`}>
                      {task.status}
                    </span>
                  </td>

                  <td>{task.cost}</td>

                  <td className="action-buttons">

                    <button
className="secondary-btn"
onClick={()=>{
setEditingTask(task.id)
setFormData({
asset:task.asset,
description:task.description,
assignedTo:task.assignedTo,
date:task.scheduleDate,
hours:task.duration.replace(" hours",""),
type:task.type,
priority:task.priority,
cost: task.cost.replace("₹","")
})
setShowModal(true)
}}
>
Edit
</button>

                    {task.status === "Scheduled" && (
                      <button
                        className="primary-btn-small"
                        onClick={()=>{
  setConfirmAction("start")
  setConfirmTaskId(task.id)
}}
                      >
                        Start
                      </button>
                    )}

                    {task.status === "In Progress" && (
                      <button
                        className="success-btn"
                        onClick={() => completeTask(task.id)}
                      >
                        Complete
                      </button>
                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}
      {/* CALENDAR TAB */}

{activeTab === "calendar" && (

<div className="maintenance-table-card">

<div className="table-header">
<h2>Maintenance Calendar</h2>
<p>Visual calendar view of maintenance schedules</p>
</div>

{/* MONTH YEAR FILTER */}

<div className="calendar-filters">

<select
value={selectedMonth}
onChange={(e)=>setSelectedMonth(Number(e.target.value))}
>
{months.map((m,i)=>(
<option key={i} value={i}>{m}</option>
))}
</select>

<select
value={selectedYear}
onChange={(e)=>setSelectedYear(Number(e.target.value))}
>
{years.map(y=>(
<option key={y} value={y}>{y}</option>
))}
</select>

</div>

{/* CALENDAR GRID */}

<div className="calendar-grid">

<div className="calendar-header">Sun</div>
<div className="calendar-header">Mon</div>
<div className="calendar-header">Tue</div>
<div className="calendar-header">Wed</div>
<div className="calendar-header">Thu</div>
<div className="calendar-header">Fri</div>
<div className="calendar-header">Sat</div>

{/* Empty slots before first day */}

{Array.from({length:firstDayOfMonth}).map((_,i)=>(
<div key={"empty"+i}></div>
))}

{/* Actual days */}

{Array.from({length:daysInMonth},(_,i)=>{

const day = i+1

const tasksForDay = taskList.filter(task => {

const issue = task.issueDate ? new Date(task.issueDate) : null
const schedule = task.scheduleDate ? new Date(task.scheduleDate) : null
const expected = task.returnDate ? new Date(task.returnDate) : null

return (

(task.status === "Completed" &&
 expected &&
 expected.getDate() === day &&
 expected.getMonth() === selectedMonth &&
 expected.getFullYear() === selectedYear)

||

(task.status !== "Completed" &&
 schedule &&
 schedule.getDate() === day &&
 schedule.getMonth() === selectedMonth &&
 schedule.getFullYear() === selectedYear)

||

(task.status !== "Completed" &&
 issue &&
 issue.getDate() === day &&
 issue.getMonth() === selectedMonth &&
 issue.getFullYear() === selectedYear)

)

})
return(

<div
key={day}
className="calendar-day"
onClick={()=>{
  if(tasksForDay.length > 0){
    setSelectedDay(day)
  }
}}
>

<div className="calendar-date">{day}</div>

{tasksForDay.map(task => {

const issueDate = task.issueDate ? new Date(task.issueDate) : null

let taskClass = "maintenance-task"

if(task.status === "Completed"){
taskClass = "completed-task"
}
else if(
issueDate &&
issueDate.getDate() === day &&
issueDate.getMonth() === selectedMonth &&
issueDate.getFullYear() === selectedYear
){
taskClass = "issue-task"
}

return(

<div
key={task.id}
className={`calendar-task ${taskClass}`}
>
{task.asset.slice(0,12)}
</div>

)

})}

</div>

)

})}

</div>

</div>


)}

{activeTab === "history" && (

<div className="maintenance-table-card">

<div className="table-header">
<h2>Maintenance History</h2>
<p>Completed maintenance activities and records</p>
</div>

{historyList.length === 0 && (
<p>No completed maintenance yet.</p>
)}

{historyList.map((task) => (

<div key={task.id} className="history-item">

<div className="history-left">

<div className="history-title">
<span className="history-check">✔</span>
<strong>{task.asset}</strong>
<span className="history-meta">
{task.type} Maintenance • {task.id}
</span>
</div>

<div className="history-section">
<span className="label">Issue Start Date</span>
<p>{task.issueDate}</p>
</div>

<div className="history-section">
<span className="label">Asset Returned</span>
<p>{task.returnDate}</p>
</div>

<div className="history-section">
<span className="label">Issue</span>
<p>{task.description}</p>
</div>

<div className="history-section">
<span className="label">Issue Reported</span>
<p>{task.issueDate || "Not recorded"}</p>
</div>

<div className="history-section">
<span className="label">Asset Given for Repair</span>
<p>{task.startDate || "Not started"}</p>
</div>

<div className="history-section">
<span className="label">Asset Ready</span>
<p>{task.endDate || "Not completed"}</p>
</div>

<div className="history-section">
<span className="label">Resolution</span>
<p>Maintenance completed successfully</p>
</div>

</div>

<div className="history-middle">

<div className="history-section">
<span className="label">Performed By</span>
<p>{task.performedBy}</p>
</div>

</div>

<div className="history-right">

<div className="history-section">
<span className="label">Cost</span>
<p>{task.cost}</p>
</div>


{task.bill && (
<div className="history-section">
<span className="label">Receipt</span>

<a href={task.bill} target="_blank" rel="noreferrer">
View
</a>

<a href={task.bill} download>
Download
</a>

</div>
)}

<div className="history-date">
{task.endDate}
<span className="status-completed">Completed</span>
</div>

</div>

</div>

))}

</div>

)}
  {activeTab === "reports" && (

<div className="maintenance-table-card">

<div className="table-header">
<h2>Asset Maintenance Reports</h2>
<p>Detailed maintenance records and asset performance</p>
</div>

{/* SUMMARY */}

<div className="asset-summary">

  <div className="summary-card">
<span>Total Issues Reported</span>
<h2>{totalIssues}</h2>
<small>All maintenance issues</small>
</div>

<div className="summary-card">
<span>Total Assets Maintained</span>
<h2>{taskList.length}</h2>
<small>Maintenance records</small>
</div>

<div className="summary-card">
<span>Completed Repairs</span>
<h2 className="green">{completedTasks.length}</h2>
<small>Successfully repaired</small>
</div>

<div className="summary-card">
<span>Total Maintenance Cost</span>
<h2>₹{totalCost}</h2>
<small>Total spent</small>
</div>

<div className="summary-card">
<span>Average Repair Time</span>
<h2 className="blue">{averageRepairTime} hrs</h2>
<small>Repair duration</small>
</div>

</div>
<div style={{marginTop:"20px"}}>

<h3>Most Common Issue</h3>

{mostCommonIssue ? (

<p>
<strong>{mostCommonIssue[0]}</strong>
<span className="sub-text">
 ({mostCommonIssue[1]} times reported)
</span>
</p>

) : (

<p>No issues recorded yet.</p>

)}

</div>

{/* DETAILED REPORT TABLE */}

<div style={{marginTop:"25px"}}>

<h3>Asset Maintenance Details</h3>

<table>

<thead>
<tr>
<th>Asset</th>
<th>Issue</th>
<th>Issue Date</th>
<th>Scheduled Date</th>
<th>Repair Start</th>
<th>Repair Completed</th>
<th>Assigned To</th>
<th>Priority</th>
<th>Status</th>
<th>Cost</th>
<th>AMC</th>
</tr>
</thead>

<tbody>

{taskList.map(task => (

<tr key={task.id}>

<td>
<strong>{task.asset}</strong>
<div className="sub-text">{task.id}</div>
</td>

<td>{task.description}</td>

<td>{task.issueDate || "-"}</td>

<td>{task.scheduleDate || "-"}</td>

<td>{task.startDate || "-"}</td>

<td>{task.endDate || "-"}</td>

<td>{task.assignedTo}</td>

<td>
<span className={`badge priority ${task.priority?.toLowerCase()}`}>
{task.priority}
</span>
</td>

<td>
<span className={`badge status ${task.status.toLowerCase().replace(" ","-")}`}>
{task.status}
</span>
</td>

<td>{task.cost}</td>

<td>
<span className="badge amc-active">
Active
</span>
</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

)}

{/* REPORTS TAB */}



      {/* SUCCESS POPUP */}

      {successMsg && (
        <div className="success-popup">
          {successMsg}
        </div>
      )}

      {/* MODAL */}

      {showModal && (

        <div className="modal-overlay">
          <div className="modal-box">

<button
className="modal-close-btn"
onClick={()=>setShowModal(false)}
>
✕
</button>

            <h2>Schedule Maintenance</h2>

            <input
name="asset"
placeholder="Asset Name"
value={formData.asset}
onChange={handleChange}
/>

<input
name="description"
placeholder="Task Description"
value={formData.description}
onChange={handleChange}
/>

<input
name="assignedTo"
placeholder="Assigned To"
value={formData.assignedTo}
onChange={handleChange}
/>

<label>Scheduled Maintenance Date</label>
<input
type="date"
name="date"
value={formData.date}
onChange={handleChange}
/>

<input
type="number"
name="hours"
placeholder="Maintenance Duration (Hours)"
value={formData.hours}
onChange={handleChange}
/>

<label>Issue Start Date</label>
<input
type="date"
name="issueStartDate"
value={formData.issueStartDate}
onChange={handleChange}
placeholder="Issue Start Date"
/>

<label>Expected Return Date</label>
<input
type="date"
name="returnDate"
value={formData.returnDate}
onChange={handleChange}
placeholder="Return Date"
/>
<input
type="number"
name="cost"
placeholder="Maintenance Cost (₹)"
value={formData.cost}
onChange={handleChange}
/>

            <select>
              <option>Preventive</option>
              <option>Corrective</option>
            </select>
            <select
  name="repairResult"
  value={formData.repairResult}
  onChange={handleChange}
>
  <option value="Fixed">Repair Successful</option>
  <option value="Failed">Beyond Repair</option>
</select>

            <select>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <div className="modal-actions">

              <button
                className="secondary-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="primary-btn-small"
                onClick={saveMaintenance}
              >
                Save
              </button>

            </div>

          </div>

        </div>

      )}
      {selectedDay && (

<div className="modal-overlay">

  <div className="asset-day-popup">

<button
className="popup-close-btn"
onClick={()=>setSelectedDay(null)}
>
✕
</button>

<h3>
Maintenance Details - {selectedDay} {months[selectedMonth]} {selectedYear}
</h3>

{selectedDateTasks.length === 0 && (
<p>No maintenance scheduled</p>
)}

{selectedDateTasks.map(task=>(

<div key={task.id} className="asset-popup-card">

<h4 className="asset-title">{task.asset}</h4>

<p>
<strong>Status:</strong> 
<span className={`status-tag ${task.status.toLowerCase().replace(" ","-")}`}>
{task.status}
</span>
</p>

<hr/>

<p><strong>Issue Reported:</strong> {task.issueDate || "Not recorded"}</p>

<p><strong>Maintenance Scheduled:</strong> {task.scheduleDate}</p>

<p><strong>Maintenance Started:</strong> {task.startDate || "Not started"}</p>

<p><strong>Maintenance Completed:</strong> {task.endDate || "Not completed"}</p>

<hr/>

<p><strong>Issue:</strong> {task.description}</p>

<p><strong>Assigned To:</strong> {task.assignedTo}</p>

<p><strong>Priority:</strong> {task.priority}</p>

<p><strong>Cost:</strong> {task.cost}</p>

</div>
))}



</div>

</div>

)}

      {confirmAction && (

<div className="modal-overlay">

  <div className="confirm-box">

    <h3>
      {confirmAction === "start"
        ? "Are you sure you want to start this maintenance?"
        : "Are you sure you want to complete this maintenance?"}
    </h3>

    <div className="confirm-actions">

      <button
        className="secondary-btn"
        onClick={()=>{
          setConfirmAction(null)
          setConfirmTaskId(null)
        }}
      >
        Cancel
      </button>

      <button
        className="success-btn"
        onClick={handleConfirm}
      >
        Confirm
      </button>

    </div>

  </div>

</div>

)}

    </div>
  );  
};

export default MaintenanceSchedule;