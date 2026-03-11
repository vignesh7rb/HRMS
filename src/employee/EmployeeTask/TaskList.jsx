import React, { useState } from "react";
import "./EmpTask.css";

const TaskList = ({ tasks, completeTask, deleteTask }) => {
  const [viewTask, setViewTask] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const [editData, setEditData] = useState({});

  /* ================= VIEW ================= */

  const handleView = (task) => {
    setViewTask(task);
  };

  /* ================= EDIT ================= */

  const handleEdit = (task) => {
    setEditTask(task);
    setEditData(task);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const saveEdit = () => {
    Object.assign(editTask, editData);
    setEditTask(null);
  };

  return (
    <div className="task-pagge">
      <h1 className="task-title">My Tasks</h1>

      <div className="task-table">
        {/* HEADER */}

        <div className="task-row header">
          <div>Title</div>
          <div>Priority</div>
          <div>Date</div>
          <div>Status</div>
          <div>View</div>
          <div>Edit</div>
          <div>Delete</div>
          <div>Action</div>
        </div>

        {/* EMPTY STATE */}

        {tasks.length === 0 && (
          <div style={{ padding: "20px" }}>No Tasks Created</div>
        )}

        {/* TASK ROWS */}

        {tasks.map((task) => (
          <div key={task.id} className="task-row">
            <div>{task.title}</div>

            <div className={`priority ${task.priority.toLowerCase()}`}>
              {task.priority}
            </div>

            <div>{task.dueDate}</div>

            <div
              className={`status ${task.completed ? "completed" : "pending"}`}
            >
              {task.completed ? "Completed" : "Pending"}
            </div>

            {/* VIEW */}

            <div className="icon" onClick={() => handleView(task)}>
              👁
            </div>

            {/* EDIT */}

            <div className="icon" onClick={() => handleEdit(task)}>
              ✏
            </div>

            {/* DELETE */}

            <div className="icon delete" onClick={() => deleteTask(task.id)}>
              🗑
            </div>

            {/* COMPLETE */}

            <div>
              {!task.completed && (
                <button
                  className="complete-btn"
                  onClick={() => completeTask(task.id)}
                >
                  Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ================= VIEW MODAL ================= */}

      {viewTask && (
        <div className="task-modal">
          <div className="modal-content">
            <h2>{viewTask.title}</h2>

            <p>
              <b>Description:</b> {viewTask.description}
            </p>
            <p>
              <b>Priority:</b> {viewTask.priority}
            </p>
            <p>
              <b>Due Date:</b> {viewTask.dueDate}
            </p>

            <button onClick={() => setViewTask(null)}>Close</button>
          </div>
        </div>
      )}

      {/* ================= EDIT MODAL ================= */}

      {editTask && (
        <div className="task-modal">
          <div className="modal-content">
            <h2>Edit Task</h2>

            <input
              name="title"
              value={editData.title}
              onChange={handleEditChange}
            />

            <textarea
              name="description"
              value={editData.description}
              onChange={handleEditChange}
            />

            <select
              name="priority"
              value={editData.priority}
              onChange={handleEditChange}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <input
              type="date"
              name="dueDate"
              value={editData.dueDate}
              onChange={handleEditChange}
            />

            <div className="modal-buttons">
              <button className="save-btn" onClick={saveEdit}>
                Save
              </button>

              <button className="cancel-btn" onClick={() => setEditTask(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
