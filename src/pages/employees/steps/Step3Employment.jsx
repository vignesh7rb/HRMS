import { useState, forwardRef, useImperativeHandle } from "react";

const Step3Employment = forwardRef((props, ref) => {
  const [form, setForm] = useState({
    employeeId: "",
    department: "",
    designation: "",
    reportingManager: "",
    joiningDate: "",
    employmentType: "",
  });

  const [errors, setErrors] = useState({});

  // 🔒 expose validation to parent (Next button)
  useImperativeHandle(ref, () => ({
    validate() {
      const newErrors = {};

      if (!form.employeeId.trim()) newErrors.employeeId = "Required";
      if (!form.department) newErrors.department = "Required";
      if (!form.designation.trim()) newErrors.designation = "Required";
      if (!form.reportingManager.trim()) newErrors.reportingManager = "Required";
      if (!form.joiningDate) newErrors.joiningDate = "Required";
      if (!form.employmentType) newErrors.employmentType = "Required";

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" }); // clear error on change
  };

  return (
    <>
      <h2>Employment Details</h2>
      <p className="subtitle">Step 3 of 6</p>

      <div className="form-grid">
        {/* Employee ID */}
        <div className="form-group">
          <label>Employee ID <span className="required">*</span></label>
          <input
            name="employeeId"
            value={form.employeeId}
            onChange={handleChange}
            className={errors.employeeId ? "input-error" : ""}
            placeholder="Auto-generated or manually"
          />
          {errors.employeeId && (
            <span className="error-text">{errors.employeeId}</span>
          )}
        </div>

        {/* Department */}
        <div className="form-group">
          <label>Department <span className="required">*</span></label>
          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            className={errors.department ? "input-error" : ""}
          >
            <option value="">Select department</option>
            <option>IT</option>
            <option>HR</option>
            <option>Finance</option>
            <option>Sales</option>
          </select>
          {errors.department && (
            <span className="error-text">{errors.department}</span>
          )}
        </div>

        {/* Designation */}
        <div className="form-group">
          <label>Designation <span className="required">*</span></label>
          <input
            name="designation"
            value={form.designation}
            onChange={handleChange}
            className={errors.designation ? "input-error" : ""}
            placeholder="Enter designation"
          />
          {errors.designation && (
            <span className="error-text">{errors.designation}</span>
          )}
        </div>

        {/* Reporting Manager */}
        <div className="form-group">
          <label>Reporting Manager <span className="required">*</span></label>
          <input
            name="reportingManager"
            value={form.reportingManager}
            onChange={handleChange}
            className={errors.reportingManager ? "input-error" : ""}
            placeholder="Enter reporting manager"
          />
          {errors.reportingManager && (
            <span className="error-text">{errors.reportingManager}</span>
          )}
        </div>

        {/* Joining Date */}
        <div className="form-group">
          <label>Joining Date <span className="required">*</span></label>
          <input
            type="date"
            name="joiningDate"
            value={form.joiningDate}
            onChange={handleChange}
            className={errors.joiningDate ? "input-error" : ""}
          />
          {errors.joiningDate && (
            <span className="error-text">{errors.joiningDate}</span>
          )}
        </div>

        {/* Employment Type */}
        <div className="form-group">
          <label>Employment Type <span className="required">*</span></label>
          <select
            name="employmentType"
            value={form.employmentType}
            onChange={handleChange}
            className={errors.employmentType ? "input-error" : ""}
          >
            <option value="">Select type</option>
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Contract</option>
          </select>
          {errors.employmentType && (
            <span className="error-text">{errors.employmentType}</span>
          )}
        </div>

        {/* Probation Period (optional) */}
        <div className="form-group">
          <label>Probation Period</label>
          <select>
            <option>Select period</option>
            <option>3 Months</option>
            <option>6 Months</option>
          </select>
        </div>
      </div>
    </>
  );
});

export default Step3Employment;
