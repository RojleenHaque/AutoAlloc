

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Allocation = () => {
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    email: "",
    department: "",
    series: "",
    section: "",
    hallChoice: "",
    fatherName: "",
    motherName: "",
    nativeAddress: "",
    hasRelative: "",
    profilePhoto: null,
    signature: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch(
        "http://localhost:5000/api/allocation/submit-choice",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const data = await response.json();
      console.log("📩 Server Response:", data);

      if (response.ok) {
        alert("Hall allocation submitted successfully!");
         console.log("✅ Success navigating!");
        navigate(`/allocation-result/${formData.studentId}`);
        console.log("Navigating to: ", `/allocation-result/${formData.studentId}`);
 
      } else {
        console.error("❌ Backend error:", data);
        alert(data.message || "Submission failed!");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Error submitting form!");
    }
  };

  return (
    <div className="allocation-page">
      <div className="right-section">
        <div className="form-header">
          <p>Fill in your details to apply for hall allocation.</p>
        </div>

        <form onSubmit={handleSubmit} className="allocation-form">
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="studentId"
              placeholder="Student ID"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
  <select
    name="department"
    onChange={handleChange}
    required
    defaultValue=""
  >
    <option value="" disabled>
      Select Department
    </option>
    <option value="CSE">CSE</option>
    <option value="EEE">EEE</option>
    <option value="ECE">ECE</option>
    <option value="ETE">ETE</option>
    <option value="CIVIL">CIVIL</option>
    <option value="URP">URP</option>
    <option value="ME">ME</option>
    <option value="IPE">IPE</option>
    <option value="MSE">MSE</option>
    <option value="ChE">ChE</option>
    <option value="CME">CME</option>
    <option value="BECM">BECM</option>
    <option value="Architecture">Arch</option>
  </select>
</div>


          <div className="form-group">
  <select
    name="series"
    onChange={handleChange}
    required
    defaultValue=""
  >
    <option value="" disabled>
      Select Series
    </option>
    <option value="2020-2021">2020-2021</option>
    <option value="2021-2022">2021-2022</option>
    <option value="2022-2023">2022-2023</option>
    <option value="2023-2024">2023-2024</option>
    <option value="2024-2025">2024-2025</option>
  </select>
</div>


          <div className="form-group">
            <input
              type="text"
              name="nativeAddress"
              placeholder="Native Address"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="fatherName"
              placeholder="Father's Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="motherName"
              placeholder="Mother's Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <select name="section" onChange={handleChange} required>
              <option value="">Select Section</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="none">None</option>
            </select>
          </div>

          <div className="form-group">
            <select name="hallChoice" onChange={handleChange} required>
              <option value="">Select Your Hall</option>
              <option value="Shahid Lt. Selim Hall">Shahid Lt. Selim Hall</option>
              <option value="Bangabandhu Sheikh Mujibur Rahman Hall">
                Bangabandhu Sheikh Mujibur Rahman Hall
              </option>
              <option value="Tin Shed Hall">Tin Shed Hall</option>
              <option value="Shahid President Ziaur Rahman Hall">Shahid President Ziaur Rahman Hall</option>
              <option value="Shahid Shahidul Islam Hall">
                Shahid Shahidul Islam Hall
              </option>
              <option value="Deshratna Sheikh Hasina Hall">Deshratna Sheikh Hasina Hall</option>
            </select>
          </div>

          <div className="form-group">
            <label>Do you have a relative in Rajshahi?</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="hasRelative"
                  value="Yes"
                  onChange={handleChange}
                  required
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="hasRelative"
                  value="No"
                  onChange={handleChange}
                  required
                />{" "}
                No
              </label>
            </div>
          </div>

          <div className="form-group file-upload">
            <label>Upload Profile Photo</label>
            <input
              type="file"
              name="profilePhoto"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="form-group file-upload">
            <label>Upload Signature</label>
            <input
              type="file"
              name="signature"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn-form">
            Submit
          </button>
        </form>
      </div>

      <div className="left-section">
        <div className="info-box">
          <h3>About the Hall Allocation</h3>
          <div className="divider"></div>
          <p>
            Experience the best of campus living! Fill out the form accurately
            to secure your preferred hall with top-notch facilities. Don't miss
            out on the chance to live in comfort and convenience — your ideal
            hall awaits!
          </p>
          <div className="divider"></div>
          <p>If you need more information, please feel free to contact us.</p>
          <p className="description">
            go to homepage <a className="login" href="/">home</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Allocation;


