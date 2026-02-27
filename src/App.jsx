import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";   // ⭐ IMPORTANT

function App() {
  return (
    <BrowserRouter>

      <Navbar />
      <main>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Events />} />

        {/* Event pages */}
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/register/:id" element={<Register />} />

        {/* User auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register-user" element={<RegisterUser />} />

        {/* Admin */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
</main>
    </BrowserRouter>
  );
}

export default App;