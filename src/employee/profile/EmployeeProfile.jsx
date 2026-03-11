import React, { useState } from "react";
import { FaEye, FaDownload } from "react-icons/fa";
import "./EmployeeProfile.css";

const EmployeeProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const departments = ["IT", "HR", "Finance", "Production", "Sales"];
  const managers = ["HR Manager", "Tech Lead", "Plant Head", "Admin Manager"];
  const employmentTypes = ["Permanent", "Contract", "Intern"];
  const branches = ["Chennai", "Bangalore", "Hyderabad", "Mumbai"];

  const [profile, setProfile] = useState({
    name: "Bhuvanesh Kumar",
    designation: "Software Developer",
    employeeId: "EMP1024",

    department: "IT",
    manager: "Tech Lead",
    employmentType: "Permanent",
    branch: "Chennai",
    workLocation: "Chennai Plant 1",

    email: "bhuvanesh@gmail.com",
    phone: "+91 9876543210",
    dob: "2001-08-12",
    gender: "Male",
    address: "Salem, Tamil Nadu",

    joiningDate: "2024-01-10",
    probationStatus: "On Probation",
    confirmationStatus: "Pending",

    bank: "HDFC Bank",
    account: "XXXXXX4589",
    ifsc: "HDFC0001234",
    pan: "ABCDE1234F",

    qualification: "MCA",
    experience: "2 Years",
    skills: "React, Node.js, SQL, Python",

    emergencyName: "Ravi Kumar",
    emergencyRelation: "Father",
    emergencyPhone: "+91 9123456789",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile Updated Successfully ✅");
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`${file.name} uploaded successfully`);
    }
  };

  const viewDocument = (file) => {
    window.open(file, "_blank");
  };

  const downloadDocument = (file) => {
    const link = document.createElement("a");
    link.href = file;
    link.download = file.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderInput = (key, label, type = "text", options = null) => (
    <div>
      <label>{label}</label>

      {isEditing ? (
        options ? (
          <select name={key} value={profile[key]} onChange={handleChange}>
            {options.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={key}
            value={profile[key]}
            onChange={handleChange}
          />
        )
      ) : (
        <p>{profile[key]}</p>
      )}
    </div>
  );

  return (
    <div className="profile-wrapper">
      {/* PAGE HEADER */}

      <div className="profile-page-header">
        <h1>My Profile</h1>
       
      </div>

      {/* PROFILE HEADER */}

      <div className="profile-header-card">
        <div className="profile-left">
          <div className="profile-avatar"></div>

          <div>
            <h2>{profile.name}</h2>
            <p>{profile.designation}</p>
            <span>Employee ID: {profile.employeeId}</span>

            <div
              className={`status-badge ${
                profile.probationStatus === "Confirmed" ? "active" : "probation"
              }`}
            >
              {profile.probationStatus}
            </div>
          </div>
        </div>

        {!isEditing ? (
          <button className="editt-btn" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        ) : (
          <div className="action-buttons">
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>

            <button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* PROFILE GRID */}

      <div className="profile-grid">
        <div className="profile-card">
          <h3>Personal Information</h3>

          <div className="info-grid">
            {renderInput("email", "Email")}
            {renderInput("phone", "Phone")}
            {renderInput("dob", "Date of Birth", "date")}
            {renderInput("gender", "Gender")}
            {renderInput("address", "Address")}
          </div>
        </div>

        <div className="profile-card">
          <h3>Job & Employment</h3>

          <div className="info-grid">
            {renderInput("department", "Department", "text", departments)}
            {renderInput("manager", "Reporting Manager", "text", managers)}
            {renderInput(
              "employmentType",
              "Employment Type",
              "text",
              employmentTypes,
            )}
            {renderInput("branch", "Branch", "text", branches)}
            {renderInput("workLocation", "Work Location")}
            {renderInput("joiningDate", "Joining Date", "date")}
            {renderInput("confirmationStatus", "Confirmation Status")}
          </div>
        </div>

        <div className="profile-card">
          <h3>Skill Matrix & Experience</h3>

          <div className="info-grid">
            {renderInput("qualification", "Qualification")}
            {renderInput("experience", "Total Experience")}
            {renderInput("skills", "Technical Skills")}
          </div>
        </div>

        <div className="profile-card">
          <h3>Bank Details</h3>

          <div className="info-grid">
            {renderInput("bank", "Bank Name")}
            {renderInput("account", "Account Number")}
            {renderInput("ifsc", "IFSC Code")}
            {renderInput("pan", "PAN Number")}
          </div>
        </div>

        <div className="profile-card">
          <h3>Emergency Contact</h3>

          <div className="info-grid">
            {renderInput("emergencyName", "Name")}
            {renderInput("emergencyRelation", "Relationship")}
            {renderInput("emergencyPhone", "Contact Number")}
          </div>
        </div>
      </div>

      {/* DOCUMENTS */}

      <div className="profile-card full-width">
        <h3>Uploaded Documents</h3>

        <input type="file" onChange={handleFileUpload} />

        <ul className="document-list">
          <li>
            <span>PAN Card.pdf</span>

            <div className="doc-actions">
              <button
                className="icon-btn"
                onClick={() => viewDocument("/documents/pan-card.pdf")}
              >
                <FaEye />
              </button>

              <button
                className="icon-btn"
                onClick={() => downloadDocument("/documents/pan-card.pdf")}
              >
                <FaDownload />
              </button>
            </div>
          </li>

          <li>
            <span>Aadhaar Card.pdf</span>

            <div className="doc-actions">
              <button
                className="icon-btn"
                onClick={() => viewDocument("/documents/aadhaar.pdf")}
              >
                <FaEye />
              </button>

              <button
                className="icon-btn"
                onClick={() => downloadDocument("/documents/aadhaar.pdf")}
              >
                <FaDownload />
              </button>
            </div>
          </li>

          <li>
            <span>Degree Certificate.pdf</span>

            <div className="doc-actions">
              <button
                className="icon-btn"
                onClick={() => viewDocument("/documents/degree.pdf")}
              >
                <FaEye />
              </button>

              <button
                className="icon-btn"
                onClick={() => downloadDocument("/documents/degree.pdf")}
              >
                <FaDownload />
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EmployeeProfile;
