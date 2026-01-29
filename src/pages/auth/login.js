import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slice/authSlice";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    let user = null;

    // ===== ADMIN =====
    if (email === "admin@hrms.com" && password === "admin@123") {
      user = {
        id: 1,
        role: "ADMIN",
        name: "Admin User",
        email,
        status: "ACTIVE",
        profileImage: "https://i.pravatar.cc/150?img=32",
      };
    }

    // ===== HR =====
    else if (email === "hr@hrms.com" && password === "hr@123") {
      user = {
        id: 2,
        role: "HR",
        name: "HR Admin",
        email,
        status: "ACTIVE",
        profileImage: "https://i.pravatar.cc/150?img=12",
      };
    }

    // ===== EMPLOYEE =====
    else if (email.endsWith("@employee.com") && password === "emp@123") {
      user = {
        id: Date.now(),
        role: "EMPLOYEE",
        name: "Employee User",
        email,
        status: "ACTIVE",
        profileImage: "https://i.pravatar.cc/150?img=47",
      };
    }

    else {
      alert("Invalid credentials");
      return;
    }

    // ✅ ONE SOURCE OF TRUTH
    dispatch(setUser(user));

    // (optional but fine)
    localStorage.setItem("token", "dummy-token");

    // ✅ ROLE-BASED ROUTING
    if (user.role === "ADMIN") {
      navigate("/dashboard", { replace: true });
    } else if (user.role === "HR") {
      navigate("/hr/dashboard", { replace: true });
    } else {
      navigate("/employee/dashboard", { replace: true });
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>HRMS Login</h2>
        <p className="sub-text">Sign in to continue</p>

        <div className="login-row">
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="login-row">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        <div className="login-hint">
          <p>Admin → admin@hrms.com / admin@123</p>
          <p>HR → hr@hrms.com / hr@123</p>
          <p>Employee → *@employee.com / emp@123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
