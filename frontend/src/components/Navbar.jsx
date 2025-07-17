import React from 'react';
import { Link,useNavigate} from 'react-router-dom'; // Import Link for routing
import ruetLogo from "../assets/rajshahi-university-of-engineering-teachnology-logo-FABBD8ADDB-seeklogo.com.png";


const Navbar = () => {
  const navigate = useNavigate();

  
//   const handleProfileClick = () => {
//   const studentId = localStorage.getItem("studentId");
//   if (studentId) {
//     navigate(`/profile/${studentId}`);
//   } else {
//     alert("Student ID not found. Please login first.");
//     navigate("/login");
//   }
// };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
      <img src={ruetLogo} alt="RUET Logo" className="navbar-logo" />
      <div className='name'>
        <p className="navbar-main-text" href="#">AutoAlloc</p><p className="ruet-name">Rajshshi University of Engineerning & Technology</p>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
          <li className="nav-item">
              <Link className="nav-link" to="/admin-login">Admin_Login</Link> {/* Link for Login */}
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/login">Student_Login</Link> {/* Link for Login */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">Sign Up</Link> {/* Link for Sign Up */}
            </li>
             {/* <li className="nav-item">
              <span className="nav-link" style={{cursor: "pointer"}} onClick={handleProfileClick}>
                Student_profile
              </span>
            </li> */}
            
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
