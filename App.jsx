import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

import Appointment from "./components/Appointment.jsx";
import Profile from "./components/Profile.jsx";
import Prescription from "./components/Prescription.jsx";
import AIChatBox from "./components/AIChatBox.jsx";
import Home from "./pages/Home.jsx";

// New Components
import Doctor from "./components/Doctor.jsx";
import { PatientForm } from "./components/PatientForm.jsx";
import LabTest from "./components/LabTest.jsx";
import MedicalTest from "./components/MedicalTest.jsx";

import { PatientProvider } from "./context/PatientContext.jsx";

// Login & Register Pages
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

function SharedHeader({ onLogout }) {
  return (
    <nav
      style={{
        padding: "10px 20px",
        background: "#007BFF",
        color: "#fff",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/appointment" style={linkStyle}>Appointment</Link>
      <Link to="/profile" style={linkStyle}>Profile</Link>
      <Link to="/prescription" style={linkStyle}>Prescription</Link>
      <Link to="/chat" style={linkStyle}>Chat</Link>

      <button
        onClick={onLogout}
        style={{
          marginLeft: "auto",
          backgroundColor: "#dc3545",
          border: "none",
          color: "#fff",
          padding: "8px 15px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </nav>
  );
}

const linkStyle = {
  marginRight: "15px",
  color: "#fff",
  textDecoration: "none",
  fontWeight: "bold",
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // store logged-in user details

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData); // save user details
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <PatientProvider>
      <Router>
        {isAuthenticated && <SharedHeader onLogout={handleLogout} />}
        <main style={{ padding: "20px" }}>
          <Routes>
            {/* Public routes */}
            <Route
              path="/login"
              element={
                !isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/register"
              element={
                !isAuthenticated ? <Register onRegister={handleLogin} /> : <Navigate to="/" replace />
              }
            />

            {/* Protected routes */}
            <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />
            <Route
              path="/appointment"
              element={isAuthenticated ? <Appointment /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/profile"
              element={isAuthenticated ? <Profile user={user} /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/prescription"
              element={isAuthenticated ? <Prescription /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/chat"
              element={isAuthenticated ? <AIChatBox /> : <Navigate to="/login" replace />}
            />

            {/* Sub Pages from Appointment */}
            <Route path="/doctor" element={isAuthenticated ? <Doctor /> : <Navigate to="/login" replace />} />
            <Route path="/consult" element={isAuthenticated ? <PatientForm /> : <Navigate to="/login" replace />} />
            <Route path="/lab" element={isAuthenticated ? <LabTest /> : <Navigate to="/login" replace />} />
            <Route path="/medical" element={isAuthenticated ? <MedicalTest /> : <Navigate to="/login" replace />} />

            {/* Redirect unknown routes */}
            <Route
              path="*"
              element={isAuthenticated ? <Navigate to="/" replace /> : <Navigate to="/login" replace />}
            />
          </Routes>
        </main>
      </Router>
    </PatientProvider>
  );
}

export default App;
