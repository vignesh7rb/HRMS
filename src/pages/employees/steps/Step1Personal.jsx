import { useState, forwardRef, useImperativeHandle } from "react";

const Step1Personal = forwardRef((props, ref) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    bloodGroup: "", 
  });

  const [errors, setErrors] = useState({});

  // 🔹 expose validation to parent (Next button)
  useImperativeHandle(ref, () => ({
    validate() {
      const newErrors = {};

      if (!form.firstName.trim()) newErrors.firstName = "Required";
      if (!form.lastName.trim()) newErrors.lastName = "Required";
      if (!form.dob) newErrors.dob = "Required";
      if (!form.gender) newErrors.gender = "Required";
      if (!form.bloodGroup) newErrors.bloodGroup = "Required";

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
      <h2>Personal Information</h2>
      <p className="subtitle">Step 1 of 6</p>

      <div className="form-grid">
        {/* First Name */}
        <div className="form-group">
          <label>First Name <span className="required">*</span></label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className={errors.firstName ? "input-error" : ""}
            placeholder="Enter first name"
            onInput={(e) =>
              (e.target.value = e.target.value.replace(/[^A-Za-z ]/g, ""))
            }
          />
          {errors.firstName && <span className="error-text">{errors.firstName}</span>}
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label>Last Name <span className="required">*</span></label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className={errors.lastName ? "input-error" : ""}
            placeholder="Enter last name"
            onInput={(e) =>
              (e.target.value = e.target.value.replace(/[^A-Za-z ]/g, ""))
            }
          />
          {errors.lastName && <span className="error-text">{errors.lastName}</span>}
        </div>

        {/* Date of Birth */}
        <div className="form-group">
          <label>Date of Birth <span className="required">*</span></label>
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className={errors.dob ? "input-error" : ""}
          />
          {errors.dob && <span className="error-text">{errors.dob}</span>}
        </div>

        {/* Gender */}
        <div className="form-group">
          <label>Gender <span className="required">*</span></label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className={errors.gender ? "input-error" : ""}
          >
            <option value="">Select gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          {errors.gender && <span className="error-text">{errors.gender}</span>}
        </div>

        {/* Marital Status */}
        <div className="form-group">
  <label>Marital Status</label>
  <select>
    <option>Select marital status</option>
    <option>Single</option>
    <option>Married</option>
  </select>
</div>



        {/* Blood Group */}
        <div className="form-group">
  <label>
    Blood Group <span className="required">*</span>
  </label>

  <select
    name="bloodGroup"
    value={form.bloodGroup}
    onChange={handleChange}
    className={errors.bloodGroup ? "input-error" : ""}
  >
    <option value="">Select blood group</option>
    <option>A+</option>
    <option>A-</option>
    <option>B+</option>
    <option>B-</option>
    <option>O+</option>
    <option>O-</option>
    <option>AB+</option>
    <option>AB-</option>
  </select>

  {errors.bloodGroup && (
    <span className="error-text">{errors.bloodGroup}</span>
  )}
</div>

      </div>
    </>
  );
});

export default Step1Personal;
