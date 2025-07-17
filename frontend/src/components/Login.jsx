import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [studentId, setStudentId] = useState('');
  const [regNo, setRegNo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, regNo }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Login successful!");
        navigate('/allocation'); // Redirect to allocation page
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="right-section">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            {/* <label htmlFor="studentId">Student ID</label> */}
            <input
              type="text"
              id="studentId"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Enter your Student ID"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="regNo">Registration No</label> */}
            <input
              type="text"
              id="regNo"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              placeholder="Enter your Registration Number"
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
      <div className="left-section">
        <h2>Welcome Back!</h2>
        <div className="divider"></div>
        <p className="description">Please enter your Student ID and Registration Number to log in to your account.</p>
        <p>Don't have an account? <a href="/signup">Sign up</a> now and get started!</p>
      </div>
    </div>
  );
  
}  

export default Login;

