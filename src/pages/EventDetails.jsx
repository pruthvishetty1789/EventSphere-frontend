import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios.get(`/api/events/${id}`)
      .then(res => setEvent(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!event) return (
    <div style={styles.loaderContainer}>
      <div style={styles.spinner}></div>
      <h2 style={{color: "#666"}}>Loading Event Details...</h2>
    </div>
  );

  return (
    <div style={styles.pageWrapper}>
      <Link to="/" style={styles.backLink}>← Back to Events</Link>
      
      <div style={styles.container}>
        {/* Hero Section */}
        <div style={styles.heroSection}>
          <span style={styles.tag}>Upcoming Event</span>
          <h1 style={styles.title}>{event.title}</h1>
          <div style={styles.infoBar}>
            <div style={styles.infoItem}>
              <span style={styles.icon}>📅</span>
              <div>
                <small style={styles.label}>DATE</small>
                <p style={styles.value}>{event.date}</p>
              </div>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.icon}>📍</span>
              <div>
                <small style={styles.label}>VENUE</small>
                <p style={styles.value}>{event.venue}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div style={styles.contentBody}>
          <h3 style={styles.sectionHeading}>About this Event</h3>
          <p style={styles.description}>{event.description}</p>
          
          <div style={styles.ctaCard}>
            <div style={styles.ctaText}>
              <h4 style={{margin: 0}}>Ready to join?</h4>
              <p style={{margin: "5px 0 0 0", fontSize: "0.9rem", opacity: 0.9}}>Seats are filling up fast!</p>
            </div>
            <Link to={`/register/${id}`} style={{textDecoration: 'none'}}>
              <button style={styles.registerBtn}>Secure My Spot</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- CREATIVE STYLES ---------- */
const styles = {
  pageWrapper: {
    padding: "40px 20px",
    background: "#f8f9fa",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif"
  },
  backLink: {
    display: "block",
    maxWidth: "800px",
    margin: "0 auto 20px auto",
    color: "#6c757d",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "0.9rem"
  },
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    background: "white",
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
  },
  heroSection: {
    padding: "60px 50px 40px 50px",
    background: "#1a1a1a",
    color: "white",
  },
  tag: {
    background: "#4dabf7",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "1px"
  },
  title: {
    fontSize: "2.8rem",
    margin: "20px 0 30px 0",
    lineHeight: "1.2"
  },
  infoBar: {
    display: "flex",
    gap: "40px",
    borderTop: "1px solid #333",
    paddingTop: "25px",
    flexWrap: "wrap"
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  icon: {
    fontSize: "1.5rem",
    background: "#333",
    padding: "10px",
    borderRadius: "12px"
  },
  label: {
    color: "#adb5bd",
    letterSpacing: "0.5px",
    fontWeight: "700"
  },
  value: {
    margin: "2px 0 0 0",
    fontWeight: "500"
  },
  contentBody: {
    padding: "40px 50px",
  },
  sectionHeading: {
    fontSize: "1.4rem",
    color: "#212529",
    marginBottom: "15px"
  },
  description: {
    fontSize: "1.1rem",
    lineHeight: "1.7",
    color: "#495057",
    whiteSpace: "pre-line" // Keeps paragraph breaks from the database
  },
  ctaCard: {
    marginTop: "40px",
    background: "linear-gradient(90deg, #4dabf7 0%, #339af0 100%)",
    padding: "25px 35px",
    borderRadius: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    flexWrap: "wrap",
    gap: "20px"
  },
  registerBtn: {
    padding: "14px 28px",
    borderRadius: "12px",
    border: "none",
    background: "white",
    color: "#339af0",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "transform 0.2s"
  },
  loaderContainer: {
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
};

export default EventDetails;