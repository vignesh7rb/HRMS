import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slice/authSlice";
import "./login.css";

import loginVideo from "../../assets/login-bg.mp4";
import ccsLogo from "../../assets/ccs-logo.png";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    dispatch(setUser(data.user));
    localStorage.setItem("token", data.token);

    if (data.user.role === "ADMIN")
      navigate("/dashboard", { replace: true });
    else if (data.user.role === "HR")
      navigate("/hr/dashboard", { replace: true });
    else
      navigate("/employee/dashboard", { replace: true });

  } catch (error) {
    console.error("Login error:", error);
    alert("Server error");
  }
};








  return (
    <div className="login-page">
      {/* 🎥 Video Background */}
      <video className="login-video" autoPlay loop muted playsInline>
        <source src={loginVideo} type="video/mp4" />
      </video>

      {/* 🔵 Overlay */}
      <div className="video-overlay"></div>

      {/* 🏷️ Logo */}
      <div className="login-brand">
        <img src={ccsLogo} alt="Crestclimber Software Solutions" />
      </div>

      {/* 🔐 Login Card */}
      <div className="login-card">
        <h2 className="login-title">HRMS</h2>

        <div className="login-row">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="login-row">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* FORGOT PASSWORD */}
        <div className="login-actions">
          <span
            className="forgot-link"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot password?
          </span>
        </div>

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        {/* SIGN UP */}
        <div className="signup-box">
          Don’t have an account?
          <span
            className="signup-link"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
