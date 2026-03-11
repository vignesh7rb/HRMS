import React, { useState } from "react";
import "./EmpTask.css";

const MeetingScheduler = () => {
  const [meetings, setMeetings] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [meetingData, setMeetingData] = useState({
    title: "",
    date: "",
    hour: "",
    minute: "",
    period: "AM",
    participants: "",
    link: "",
  });

  /* HANDLE INPUT CHANGE */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMeetingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* CREATE MEETING */

  const scheduleMeeting = () => {
    if (
      meetingData.title.trim() === "" ||
      meetingData.date === "" ||
      meetingData.hour === "" ||
      meetingData.minute === ""
    ) {
      alert("Title, Date and Time are required");
      return;
    }

    const time = `${meetingData.hour}:${meetingData.minute} ${meetingData.period}`;

    const newMeeting = {
      id: Date.now(),
      title: meetingData.title,
      date: meetingData.date,
      time,
      participants: meetingData.participants,
      link: meetingData.link,
    };

    setMeetings((prev) => [...prev, newMeeting]);

    setMeetingData({
      title: "",
      date: "",
      hour: "",
      minute: "",
      period: "AM",
      participants: "",
      link: "",
    });

    setShowForm(false);
  };

  /* DELETE MEETING */

  const deleteMeeting = (id) => {
    setMeetings(meetings.filter((m) => m.id !== id));
  };

  return (
    <div className="task-card">
      {/* HEADER */}

      <div className="meeting-header">
        <h3>Meeting Scheduler</h3>

        <button className="schedule-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close" : "Schedule Meeting"}
        </button>
      </div>

      {/* FORM */}

      {showForm && (
        <div className="meeting-form">
          <input
            type="text"
            name="title"
            placeholder="Meeting Title"
            value={meetingData.title}
            onChange={handleChange}
          />

          <input
            type="date"
            name="date"
            value={meetingData.date}
            onChange={handleChange}
          />

          {/* TIME PICKER */}

          <div className="time-picker">
            <select
              name="hour"
              value={meetingData.hour}
              onChange={handleChange}
            >
              <option value="">HH</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <span>:</span>

            <select
              name="minute"
              value={meetingData.minute}
              onChange={handleChange}
            >
              <option value="">MM</option>
              {[...Array(60)].map((_, i) => (
                <option key={i} value={i.toString().padStart(2, "0")}>
                  {i.toString().padStart(2, "0")}
                </option>
              ))}
            </select>

            <select
              name="period"
              value={meetingData.period}
              onChange={handleChange}
            >
              <option>AM</option>
              <option>PM</option>
            </select>
          </div>

          {/* PARTICIPANTS WITH @MENTION */}

          <input
            type="text"
            name="participants"
            placeholder="Mention participants using @username (example: @Bhuvanesh @HR_Manager)"
            value={meetingData.participants}
            onChange={handleChange}
          />

          <input
            type="text"
            name="link"
            placeholder="Meeting Link (optional)"
            value={meetingData.link}
            onChange={handleChange}
          />

          <button className="save-meeting-btn" onClick={scheduleMeeting}>
            Save Meeting
          </button>
        </div>
      )}

      {/* MEETING LIST */}

      <div className="meeting-list">
        {meetings.length === 0 && (
          <p className="empty-meeting">No meetings scheduled</p>
        )}

        {meetings.map((meeting) => (
          <div key={meeting.id} className="meeting-item">
            <div className="meeting-info">
              <strong>{meeting.title}</strong>

              <div className="meeting-meta">
                <span className="meeting-date">{meeting.date}</span>
                <span className="meeting-time">{meeting.time}</span>
              </div>

              <div className="meeting-participants">
                Participants: {meeting.participants || "None"}
              </div>
            </div>

            <div className="meeting-actions">
              {meeting.link && (
                <a
                  href={meeting.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="join-btn"
                >
                  Join
                </a>
              )}

              <button
                className="delete-btn"
                onClick={() => deleteMeeting(meeting.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetingScheduler;
