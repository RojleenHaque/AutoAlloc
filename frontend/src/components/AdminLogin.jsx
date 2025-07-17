// components/AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('adminToken', data.token); // Store token in localStorage
        navigate('/admin-dashboard');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Error logging in. Please try again later.');
    }
  };

  return (
    <div className="admin-login-container">
      {/* Right section for branding */}
      <div className="admin-right-section">
        <h1>Welcome Admin</h1>
        <div className="divider"></div>
        <p>Manage your system efficiently with secure access.</p>
      </div>

      {/* Left section for login form */}
      <div className="admin-left-section">
        <h2>Admin Login</h2>
        {error && <p className="error">{error}</p>}
        
        <form onSubmit={handleSubmit} className="admin-form">
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="admin-login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );

};

export default AdminLogin;
