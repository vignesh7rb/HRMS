import React, { useState } from "react";
import "./EmpTask.css";

const TeamChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  /* SEND MESSAGE */

  const sendMessage = () => {
    if (message.trim() === "") return;

    const userMessage = {
      text: message,
      sender: "You",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    /* AUTO RESPONSE */

    setTimeout(() => {
      const responses = [
        "Got it 👍",
        "Okay, noted.",
        "Thanks for the update.",
        "Let's discuss in the meeting.",
        "I will check and update.",
      ];

      const reply = responses[Math.floor(Math.random() * responses.length)];

      const replyMessage = {
        text: reply,
        sender: "HR Manager",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, replyMessage]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="task-card">
      <h3>Team Chat</h3>

      {/* CHAT AREA */}

      <div className="chat-box">
        {messages.length === 0 && (
          <p className="empty-chat">Start conversation...</p>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.sender === "HR Manager" ? "chat-right" : "chat-left"
            }`}
          >
            <div className="chat-bubble">
              <span className="chat-sender">{msg.sender}</span>

              <p>{msg.text}</p>

              <span className="chat-time">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* INPUT AREA */}

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default TeamChat;
