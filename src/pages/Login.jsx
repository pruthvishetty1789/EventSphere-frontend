import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");

    // -------- ADMIN LOGIN --------
    if (email === "admin@eventsphere.com" && password === "admin123") {
      localStorage.setItem("user", "Admin");
      localStorage.setItem("role", "admin");
      navigate("/admin");
      return;
    }

    // -------- NORMAL USER LOGIN --------
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const validUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!validUser) {
      setError("Invalid email or password. Please try again.");
      return;
    }

    localStorage.setItem("user", validUser.name);
    localStorage.setItem("role", "user");

    navigate("/");
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-card">

          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Enter your credentials to access EventSphere</p>
          </div>

          {error && <div className="error-alert">{error}</div>}

          <div className="input-field">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-btn" onClick={handleLogin}>
            Sign In
          </button>

          <div className="login-footer">
            New to EventSphere?{" "}
            <Link to="/register-user">Create Account</Link>
          </div>

          <div className="admin-credential-box">
            <strong>🔑 Demo Admin Login</strong>
            <code>admin@eventsphere.com / admin123</code>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
