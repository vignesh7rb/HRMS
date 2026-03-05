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
    date: "15 Jun 2025",
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
    date: "12 Jun 2025",
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
    date: "20 Jun 2025",
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
const parseDate = (dateString) => {
  return new Date(dateString)
}
const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate()

const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay()
const [formData, setFormData] = useState({
  asset: "",
  description: "",
  assignedTo: "",
  date: "",
  hours: "",
  type: "Preventive",
  priority: "Medium",
  cost: ""
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

  const calendarTasks = taskList.filter(task => {

const taskDate = parseDate(task.date)

return (
taskDate.getMonth() === selectedMonth &&
taskDate.getFullYear() === selectedYear
)

})
const selectedDateTasks = calendarTasks.filter(
task => new Date(task.date).getDate() === selectedDay
)

  /* ---------------- START TASK ---------------- */

  const startTask = (id) => {
  setConfirmAction("start");
  setConfirmTaskId(id);
};


  /* ---------------- COMPLETE TASK ---------------- */

  const completeTask = (id) => {
  setConfirmAction("complete");
  setConfirmTaskId(id);
};

const handleConfirm = () => {

  if(confirmAction === "start"){

    const updated = taskList.map((task)=>
      task.id === confirmTaskId
        ? {...task, status:"In Progress"}
        : task
    );

    setTaskList(updated);
    setSuccessMsg("Maintenance Started Successfully ✅");

  }

  if(confirmAction === "complete"){

    const updated = taskList.map((task)=>
      task.id === confirmTaskId
        ? {...task, status:"Completed"}
        : task
    );

    setTaskList(updated);
    setSuccessMsg("Maintenance Completed Successfully 🎉");

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
  ...formData,
  category:"Device",
  duration: formData.hours + " hours",
  status:"Scheduled",
  cost: "₹" + formData.cost
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
                    <div>{task.date}</div>
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
date:task.date,
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
                        onClick={() => startTask(task.id)}
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

const tasksForDay = calendarTasks.filter(
task => new Date(task.date).getDate() === day
)

return(

<div
key={day}
className="calendar-day"
onClick={()=>setSelectedDay(day)}
>

<div className="calendar-date">{day}</div>

{tasksForDay.map(task=>(
<div key={task.id} className="calendar-task">
{task.asset}
</div>
))}

</div>

)

})}

</div>

</div>


)}

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

<h3>
Maintenance Details - {selectedDay} {months[selectedMonth]} {selectedYear}
</h3>

{selectedDateTasks.length === 0 && (
<p>No maintenance scheduled</p>
)}

{selectedDateTasks.map(task=>(

<div key={task.id} className="asset-popup-card">

<h4>{task.asset}</h4>

<p><strong>Issue:</strong> {task.description}</p>

<p><strong>Assigned To:</strong> {task.assignedTo}</p>

<p><strong>Duration:</strong> {task.duration}</p>

<p><strong>Priority:</strong> {task.priority}</p>

<p><strong>Cost:</strong> {task.cost}</p>

<p><strong>Estimated Recovery:</strong> {task.duration}</p>

<p><strong>AMC:</strong> Active</p>

</div>

))}

<button
className="secondary-btn"
onClick={()=>setSelectedDay(null)}
>
Close
</button>

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