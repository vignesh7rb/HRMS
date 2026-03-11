import React, { useState } from "react";
import TaskList from "./TaskList";
import MeetingScheduler from "./MeetingScheduler";
import TeamChat from "./TeamChat";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./EmpTask.css";

const EmpTask = () => {
  const [tasks, setTasks] = useState([]);

 

  /* ================= TOGGLE TASK ================= */

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );

    setTasks(updatedTasks);
  };

  /* ================= EXPORT EXCEL ================= */

  const exportToExcel = () => {
    const exportData = tasks.map((task) => ({
      Title: task.title,
      Description: task.description,
      Priority: task.priority,
      DueDate: task.dueDate,
      Status: task.completed ? "Completed" : "Pending",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Tasks");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(data, "Task_Report.xlsx");
  };

  /* ================= STATS ================= */

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = tasks.filter((t) => !t.completed).length;

  return (
    <div className="task-page">
      {/* ================= PAGE HEADER ================= */}

      <div className="task-page-header">
        <div>
          <h1>Task Management</h1>
          <p>Manage assigned tasks, meetings and collaboration</p>
        </div>

        <button className="export-btn" onClick={exportToExcel}>
          Export Excel
        </button>
      </div>

      {/* ================= TASK STATS ================= */}

      <div className="task-stats">
        <div className="task-stat-card">
          <p>Total Tasks</p>
          <h3>{totalTasks}</h3>
        </div>

        <div className="task-stat-card">
          <p>Completed Tasks</p>
          <h3>{completedTasks}</h3>
        </div>

        <div className="task-stat-card">
          <p>Pending Tasks</p>
          <h3>{pendingTasks}</h3>
        </div>
      </div>

      {/* ================= TASK WORKSPACE ================= */}
      {/* ================= MY TASKS ================= */}

      <div className="workspace-card">
        <TaskList tasks={tasks} toggleComplete={toggleComplete} />
      </div>
      {/* ================= COLLABORATION ================= */}

      <div className="task-collaboration">
        <div className="workspace-card">
          <MeetingScheduler />
        </div>

        <div className="workspace-card">
          <TeamChat />
        </div>
      </div>
    </div>
  );
};

export default EmpTask;
