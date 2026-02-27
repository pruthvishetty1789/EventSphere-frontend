import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./RegisterUser.css";

function RegisterUser() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {

    if (!form.name || !form.email || !form.password) {
      setError("Please fill all fields");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find(u => u.email === form.email);
    if (exists) {
      setError("Email already registered");
      return;
    }

    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");
    navigate("/login");
  };

  return (
    <div className="register-container">
      <div className="register-card">

        <h2>Create Account</h2>

        {error && <p className="error">{error}</p>}

        <input 
          name="name" 
          placeholder="Full Name" 
          onChange={handleChange}
        />

        <input 
          name="email" 
          type="email" 
          placeholder="Email" 
          onChange={handleChange}
        />

        <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          onChange={handleChange}
        />

        <button onClick={handleRegister}>Register</button>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default RegisterUser;