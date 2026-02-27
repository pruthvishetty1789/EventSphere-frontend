import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Event.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("/api/events");

        if (Array.isArray(res.data)) {
          setEvents(res.data);
        } else {
          setEvents([]);
        }
      } catch (error) {
        setEvents([]);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  /* ---------- LOADING ---------- */
  if (loading)
    return (
      <div className="center">
        <div className="spinner"></div>
        <p>Fetching Campus Vibes...</p>
      </div>
    );

  /* ---------- UI ---------- */
  return (
    <div className="page-container">

      <div className="events-header">
        <h1 className="page-title">Campus Events</h1>
        <p className="page-subtitle">
          Discover what's happening around EventSphere today.
        </p>
      </div>

      {events.length === 0 ? (
        <div className="empty-state">
          <p>No upcoming events found. Check back later!</p>
        </div>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <div key={event._id} className="event-card">

              <div className="date-badge">
                📅 {event.date}
              </div>

              <h3 className="event-title">{event.title}</h3>

              <p className="venue-text">
                📍 {event.venue || "Campus Location"}
              </p>

              <Link to={`/event/${event._id}`}>
                <button className="view-btn">View Details</button>
              </Link>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;