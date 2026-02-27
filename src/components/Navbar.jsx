import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");
    setUser(storedUser);
    setRole(storedRole);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setUser(null);
    setRole(null);
    navigate("/");
  };

  return (
    <nav style={styles.navbar}>
      {/* Logo */}
      <div style={styles.logoContainer}>
        <h2 style={styles.logo}>Event<span style={{ color: "#4dabf7" }}>Sphere</span></h2>
      </div>

      {/* Links */}
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>

        {role === "admin" && (
          <Link to="/admin" style={styles.link}>Admin Panel</Link>
        )}

        {user ? (
          <div style={styles.userSection}>
            <span style={styles.welcome}>Hi, <strong>{user}</strong></span>
            <button onClick={logout} style={styles.button}>Logout</button>
          </div>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register-user" style={styles.registerBtn}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

/* ---------- IMPROVED STYLES ---------- */

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 40px",
    height: "70px",
    background: "#1a1a1a", // Deep charcoal
    color: "white",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
    fontFamily: "'Segoe UI', Roboto, sans-serif",
  },
  logoContainer: {
    cursor: "pointer",
  },
  logo: {
    margin: 0,
    fontSize: "1.5rem",
    letterSpacing: "1px",
    fontWeight: "700",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "25px",
  },
  link: {
    color: "#e0e0e0",
    textDecoration: "none",
    fontSize: "0.95rem",
    fontWeight: "500",
    transition: "color 0.2s ease",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    borderLeft: "1px solid #444",
    paddingLeft: "15px",
  },
  welcome: {
    fontSize: "0.9rem",
    color: "#adb5bd",
  },
  button: {
    padding: "8px 16px",
    backgroundColor: "transparent",
    color: "#ff6b6b",
    border: "1px solid #ff6b6b",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
  registerBtn: {
    padding: "8px 18px",
    backgroundColor: "#4dabf7",
    color: "white",
    textDecoration: "none",
    borderRadius: "4px",
    fontWeight: "600",
    fontSize: "0.9rem",
  }
};

export default Navbar;