import React, { useState } from "react";
//import a from "../assets/bus.jpg"

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    regNo: "",
    department: "",
    series: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response:", data);

      if (response.ok) {
        alert("Signup successful! Please login.");
      } else {
        alert(data.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup-page">
      <div className="left-section">
        <h1>Create New Account</h1>
        <p className="description">
          Create an account and get your room
        </p>
        <div className="divider"></div>
        <div className="login-prompt">
        <h3>Already have an account? <a className="login" href="/login">login</a>  and get started!</h3>

        </div>  
        
        <p className="description">go to homepage <a className="login" href="/">home</a></p>
      </div>
  
      <div className="right-section">
        {/* <h1>Sign Up</h1> */}
  
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="NAME" 
              required 
            />
          </div>
  
          <div className="form-group">
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="EMAIL" 
              required 
            />
          </div>
  
          <div className="form-group">
            <input 
              type="text" 
              name="studentId" 
              value={formData.studentId} 
              onChange={handleChange} 
              placeholder="STUDENT ID" 
              required 
            />
          </div>
  
          <div className="form-group">
            <input 
              type="text" 
              name="regNo" 
              value={formData.regNo} 
              onChange={handleChange} 
              placeholder="REGISTRATION NO" 
              required 
            />
          </div>
  
          <div className="form-group">
            <input 
              type="text" 
              name="department" 
              value={formData.department} 
              onChange={handleChange} 
              placeholder="DEPARTMENT" 
              required 
            />
          </div>
  
          <div className="form-group">
            <input 
              type="text" 
              name="series" 
              value={formData.series} 
              onChange={handleChange} 
              placeholder="SERIES" 
              required 
            />
          </div>
  
          <div className="form-group">
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              placeholder="PASSWORD" 
              required 
            />
          </div>
  
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
};  

export default Signup;
