import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

function Admin() {
  const navigate = useNavigate();

  // Protect admin route
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      alert("Access Denied! Only Admin can create events.");
      navigate("/");
    }
  }, [navigate]);

  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    venue: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const createEvent = async () => {
    if (!event.title || !event.description || !event.date || !event.venue) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/api/events", event);
      setMessage("Event Created Successfully 🎉");
      setEvent({ title: "", description: "", date: "", venue: "" });
    } catch (err) {
      setMessage("Error creating event");
    }

    setLoading(false);
  };

  return (
    <div className="admin-page">

      <div className="admin-header">
        <h1>Create New Event</h1>
        <p>Launch your campus event with details below</p>
      </div>

      {message && <div className="admin-message">{message}</div>}

      <div className="admin-form">

        <input
          name="title"
          placeholder="Event Title"
          value={event.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Event Description"
          value={event.description}
          onChange={handleChange}
        />

        <div className="admin-row">
          <input
            name="date"
            placeholder="Event Date"
            value={event.date}
            onChange={handleChange}
          />

          <input
            name="venue"
            placeholder="Venue"
            value={event.venue}
            onChange={handleChange}
          />
        </div>

        <button onClick={createEvent} disabled={loading}>
          {loading ? "Processing..." : "Publish Event"}
        </button>

      </div>
    </div>
  );
}

export default Admin;