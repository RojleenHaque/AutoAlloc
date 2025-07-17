# RUET Hallroom Allocation Management System (RHAMS)

An automated web-based application designed to simplify and streamline the hallroom allocation process for students and administrators at RUET (Rajshahi University of Engineering & Technology).

## 🔍 Features

- **Home Page**: Introductory page with navigation to login and registration.
- **Student Registration & Login**: Secure user authentication using JWT.
- **Hallroom Application Form**: Students submit room requests with required credentials.
- **Credential Page**: Displays filled application details and current status (Pending/Approved/Rejected); downloadable.
- **Live Status Tracking**: Students can track admin actions on their application in real-time.
- **Admin Dashboard**: Admin can log in, view all applications, and accept or reject requests.
- **MongoDB Integration**: Centralized NoSQL database for managing users and applications.

## 🛠️ Technologies Used

- **Frontend**: React.js, Axios, CSS, Bootstrap/Tailwind
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Optional Tools**: Multer (file uploads), Cloudinary (media management)

## 🚀 How to Run the Project

### Backend
```bash
cd backend
npm install
node server.js
Backend Stack Includes:
Node.js + Express.js: Handles API requests and routes.
Multer: For handling file uploads (e.g., images, documents).
JWT: For secure student and admin authentication.
MongoDB: Stores user data, application forms, and admin actions.
dotenv: For managing environment variables.

### Frontned
cd frontend
npm install
npm start

###Folder structure
project/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── middleware/
│   ├── controllers/
│   └── server.js
│
├── frontend/
│   ├── /src/components/
│   ├── src/index.css
│   └── src/App.jsx

🎯 Future Enhancements
Email notifications for application status changes.
Role-based admin control.
Room assignment logic based on preferences and availability.
👨‍🎓 Developed By
Rojleen Haque
Undergraduate Student, Department of Computer Science & Engineering
Rajshahi University of Engineering & Technology (RUET)
