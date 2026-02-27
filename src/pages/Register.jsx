import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Register() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = localStorage.getItem("user");

    const found = users.find(u => u.name === currentUser);
    if (found) {
      setForm({ name: found.name, email: found.email });
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email) {
      setMessage("⚠️ Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/api/register", {
        name: form.name,
        email: form.email,
        eventId: id
      });

      setMessage("Registration Successful 🎉");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setMessage("❌ Registration Failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.iconCircle}>🎟️</div>
          <h2 style={styles.title}>Join the Event</h2>
          <p style={styles.subtitle}>Confirm your details to get your ticket</p>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Full Name</label>
          <input
            name="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Email Address</label>
          <input
            name="email"
            type="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <button 
          onClick={handleSubmit} 
          disabled={loading} 
          style={loading ? {...styles.button, opacity: 0.7} : styles.button}
        >
          {loading ? "Registering..." : "Confirm Registration"}
        </button>

        {message && (
          <div style={{
            ...styles.message,
            color: message.includes("Successful") ? "#2dce89" : "#f5365c",
            backgroundColor: message.includes("Successful") ? "#2dce8915" : "#f5365c15"
          }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- CREATIVE REGISTRATION STYLES ---------- */
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "85vh",
    background: "#f0f2f5", // Light neutral background
    padding: "20px",
    fontFamily: "'Inter', sans-serif"
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "40px",
    width: "100%",
    maxWidth: "380px",
    background: "white",
    borderRadius: "24px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    textAlign: "center"
  },
  header: {
    marginBottom: "10px"
  },
  iconCircle: {
    width: "60px",
    height: "60px",
    background: "#e3f2fd",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.5rem",
    margin: "0 auto 15px auto"
  },
  title: {
    margin: 0,
    fontSize: "1.6rem",
    color: "#1a1a1a",
    fontWeight: "700"
  },
  subtitle: {
    margin: "8px 0 0 0",
    color: "#6c757d",
    fontSize: "0.9rem",
    lineHeight: "1.4"
  },
  inputGroup: {
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },
  label: {
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "#495057",
    marginLeft: "4px"
  },
  input: {
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid #ced4da",
    fontSize: "1rem",
    outline: "none",
    transition: "all 0.2s ease",
    background: "#fdfdfd"
  },
  button: {
    marginTop: "10px",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "#2d3436", // Sleek dark button
    color: "white",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "transform 0.2s, background 0.2s",
  },
  message: {
    padding: "12px",
    borderRadius: "10px",
    fontSize: "0.9rem",
    fontWeight: "600",
    marginTop: "5px"
  }
};

export default Register;