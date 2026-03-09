import { useState, forwardRef, useImperativeHandle } from "react";

const Step4Education = forwardRef(({ data, setData }, ref) => {
  const [errors, setErrors] = useState({});

  // expose validation to parent
  useImperativeHandle(ref, () => ({
    validate() {
      const newErrors = {};

      if (!data.qualification?.trim()) newErrors.qualification = "Required";
      if (!data.university?.trim()) newErrors.university = "Required";
      if (!data.graduationYear?.trim()) newErrors.graduationYear = "Required";

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });

    setErrors({ ...errors, [name]: "" });
  };

  return (
    <>
      <h2>Education & Experience</h2>
      <p className="subtitle">Step 4 of 6</p>

      <div className="form-grid">

        {/* Highest Qualification */}
        <div className="form-group">
          <label>
            Highest Qualification <span className="required">*</span>
          </label>
          <input
            name="qualification"
            value={data.qualification || ""}
            onChange={handleChange}
            className={errors.qualification ? "input-error" : ""}
            placeholder="e.g. B.Tech, MBA"
          />
          {errors.qualification && (
            <span className="error-text">{errors.qualification}</span>
          )}
        </div>

        {/* University */}
        <div className="form-group">
          <label>
            University / Institution <span className="required">*</span>
          </label>
          <input
            name="university"
            value={data.university || ""}
            onChange={handleChange}
            className={errors.university ? "input-error" : ""}
            placeholder="Enter university name"
          />
          {errors.university && (
            <span className="error-text">{errors.university}</span>
          )}
        </div>

        {/* Graduation Year */}
        <div className="form-group">
          <label>
            Graduation Year <span className="required">*</span>
          </label>
          <input
            name="graduationYear"
            value={data.graduationYear || ""}
            onChange={handleChange}
            className={errors.graduationYear ? "input-error" : ""}
            placeholder="e.g. 2022"
          />
          {errors.graduationYear && (
            <span className="error-text">{errors.graduationYear}</span>
          )}
        </div>

        {/* Previous Company */}
        <div className="form-group">
          <label>Previous Company</label>
          <input
            name="previousCompany"
            value={data.previousCompany || ""}
            onChange={handleChange}
            placeholder="Enter previous company"
          />
        </div>

        {/* Previous Designation */}
        <div className="form-group">
          <label>Previous Designation</label>
          <input
            name="previousDesignation"
            value={data.previousDesignation || ""}
            onChange={handleChange}
            placeholder="Enter previous designation"
          />
        </div>

        {/* Total Experience */}
        <div className="form-group" style={{ gridColumn: "1 / -1" }}>
          <label>Total Experience</label>
          <textarea
            rows="3"
            name="totalExperience"
            value={data.totalExperience || ""}
            onChange={handleChange}
            placeholder="Describe experience, skills, achievements"
          />
        </div>

      </div>
    </>
  );
});

export default Step4Education;