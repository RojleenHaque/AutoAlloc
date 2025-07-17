import React from "react";
//import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Register";
import Allocation from "./components/Allocation";
import AllocationResult from "./components/Allocation_result";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/Dashboard";



import img1 from "./assets/gate_final.jpg";

function App() {
  const location = useLocation();

  const hideLayoutRoutes = [
    "/login",
    "/signup",
    "/admin-login",
    "/admin-dashboard",
    "/allocation"
  ];
 const hideLayout =
  hideLayoutRoutes.includes(location.pathname) ||
  location.pathname.startsWith("/profile/") ||
  location.pathname.startsWith("/allocation-result/");


  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/allocation" element={<Allocation />} />
        <Route path="/profile/:studentId" element={<AllocationResult />} />
        <Route path="/allocation-result/:studentId" element={<AllocationResult />} />
      </Routes>

      {!hideLayout && (
        <>
          <div className="hero-container">
            <img src={img1} alt="Entrance Gate" className="hero" />
            <h2 className="hero-text">
              Welcome to Hassle-Free <br />
              Hallroom Allocation
            </h2>
            <h4 className="hero-subtext">
              Your RUET Hallroom, Just a Click Away. We provide fast, easy, and
              stress-free hall allocations.
            </h4>
          </div>

          <section className="how-it-works">
            <h2>How Our Website Works</h2>
            <div className="steps">
              <div className="step">
                <h3>1. Sign Up</h3>
                <p>Create your account as a new user.</p>
              </div>
              <div className="step">
                <h3>2. Log In</h3>
                <p>Access your dashboard with your credentials.</p>
              </div>
              <div className="step">
                <h3>3. Fill the Form</h3>
                <p>Submit your hallroom allocation request with required details.</p>
              </div>
              <div className="step">
                <h3>4. Admin Approval</h3>
                <p>Your request will be reviewed and approved by the admin.</p>
              </div>
              <div className="step">
                <h3>5. Get Your Room</h3>
                <p>Receive your hallroom allocation confirmation online.</p>
              </div>
            </div>
          </section>

          <Footer />
        </>
      )}
    </>
  );
}

export default App;
