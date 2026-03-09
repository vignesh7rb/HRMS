const Step6Review = ({ data, prev, showPopup, fadeOut }) => {
  return (
    <>
      <h2>Review & Submit</h2>
      <p className="subtitle">Step 6 of 6</p>

      {/* Info Box */}
      <div className="review-info">
        <strong>Review Your Information</strong>
        <p>
          Please review all the information before submitting.
          Once submitted, changes require HR approval.
        </p>
      </div>

      {/* REVIEW DATA */}
      <div className="review-main-container">
        <div className="review-grid">

          {/* Personal */}
          <div className="review-section">
            <h3>Personal Information</h3>

            <div className="review-row">
              <span>Full Name</span>
              <span>
                {data?.personal?.firstName} {data?.personal?.lastName}
              </span>
            </div>

            <div className="review-row">
              <span>Date of Birth</span>
              <span>{data?.personal?.dob}</span>
            </div>

            <div className="review-row">
              <span>Gender</span>
              <span>{data?.personal?.gender}</span>
            </div>

            <div className="review-row">
              <span>Blood Group</span>
              <span>{data?.personal?.bloodGroup}</span>
            </div>
          </div>

          {/* Contact */}
          <div className="review-section">
            <h3>Contact Details</h3>

            <div className="review-row">
              <span>Email</span>
              <span>{data?.contact?.email}</span>
            </div>

            <div className="review-row">
              <span>Phone</span>
              <span>{data?.contact?.phone}</span>
            </div>

            <div className="review-row">
              <span>Emergency Contact</span>
              <span>{data?.contact?.emergencyName}</span>
            </div>

            <div className="review-row">
              <span>Emergency Phone</span>
              <span>{data?.contact?.emergencyPhone}</span>
            </div>
          </div>

          {/* Employment */}
          <div className="review-section">
            <h3>Employment Details</h3>

            <div className="review-row">
              <span>Employee ID</span>
              <span>{data?.employment?.employeeId}</span>
            </div>

            <div className="review-row">
              <span>Department</span>
              <span>{data?.employment?.department}</span>
            </div>

            <div className="review-row">
              <span>Designation</span>
              <span>{data?.employment?.designation}</span>
            </div>

            <div className="review-row">
              <span>Manager</span>
              <span>{data?.employment?.reportingManager}</span>
            </div>

            <div className="review-row">
              <span>Joining Date</span>
              <span>{data?.employment?.joiningDate}</span>
            </div>
          </div>

          {/* Education */}
          <div className="review-section">
            <h3>Education</h3>

            <div className="review-row">
              <span>Qualification</span>
              <span>{data?.education?.qualification}</span>
            </div>

            <div className="review-row">
              <span>University</span>
              <span>{data?.education?.university}</span>
            </div>

            <div className="review-row">
              <span>Graduation Year</span>
              <span>{data?.education?.graduationYear}</span>
            </div>
          </div>

        </div>
      </div>

      {/* NEXT STEPS */}
      <div className="review-next">
        <strong>Next Steps</strong>
        <ul>
           <li>HR will review within 2–3 business days</li>
          <li>  Email confirmation after approval</li>
          <li>  Account activated on joining date</li>
        </ul>
      </div>

    

    
    </>
  );
};

export default Step6Review;