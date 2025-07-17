import React from 'react';


const Footer = () => {
  return (
    <footer className="footer bg">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>We help you allocate rooms in university halls efficiently and easily.</p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contact</h5>
            <p>Email: contact@hallroomallocator.com</p>
            <p>Phone:  +88 (0721) 750105 </p>
            <p> registrar@ruet.ac.bd</p>
          </div>
        </div>
        <div className="text-center mt-4">
          <p>&copy; 2025 Hallroom Allocator. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
