const Step6Review = () => {
  return (
    <>
      <h2>Review & Submit</h2>
      <p className="subtitle">Step 6 of 6</p>

      <div style={{
        background: "#e0f2fe",
        padding: "16px",
        borderRadius: "10px",
        marginBottom: "20px"
      }}>
        <strong>Review Your Information</strong>
        <p style={{ fontSize: "14px" }}>
          Please review all the information before submitting.
          Once submitted, changes require HR approval.
        </p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Personal Information</label>
          <p>Name, Email, Phone, Gender</p>
        </div>

        <div className="form-group">
          <label>Employment Details</label>
          <p>Employee ID, Department, Designation</p>
        </div>
      </div>

      <div style={{
        background: "#e5f0fb",
        padding: "16px",
        borderRadius: "10px",
        marginTop: "20px"
      }}>
        <strong>Next Steps</strong>
        <ul style={{ fontSize: "14px" }}>
          <li>HR will review within 2–3 business days</li>
          <li>Email confirmation after approval</li>
          <li>Account activated on joining date</li>
        </ul>
      </div>
    </>
  );
};

export default Step6Review;
