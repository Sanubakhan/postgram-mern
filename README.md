Postgram — Instagram-like Social Media App (MERN)

Postgram is a full-stack social media application inspired by Instagram, built using the MERN stack.
Users can create a profile, upload image posts, view a public feed, like posts, and manage their own profile in a clean, mobile-first UI.
The main focus of this project is backend logic, database relationships, and authentication, not just copying the UI.

Features
-User authentication (Register / Login)
-Create and edit user profiles
-Upload image posts with captions
-Home feed displaying posts from users
-Like / Unlike posts
-Profile page with posts grid
-Edit profile (avatar, username, bio)
-Responsive, mobile-style interface
-REST APIs with proper routes and controllers

Tech Stack


Frontend
-React (Vite)
-Tailwind CSS
-React Router
-Axios

Backend
-Node.js
-Express.js
-MongoDB & Mongoose
-JWT Authentication
-Multer (for image handling)


Project Structure
Postgram/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js


Authentication Flow
-JWT-based authentication
-Protected routes for creating posts and editing profiles
-Auth middleware applied on backend routes
-Cookies used for session handling

What I Learned
-Designing REST APIs properly
-Managing MongoDB relationships between users, profiles, and posts
-Authentication & authorization in a real project
-Handling image uploads and image URLs
-Connecting frontend and backend smoothly
-Debugging real-world issues (not tutorial-perfect apps)

Known Limitations / Future Improvements
-Profile and feed syncing can be improved
-Comments feature can be added
-Follow / Unfollow system
-Better loaders and error handling
-Deployment improvements

How to Run Locally

Backend
-cd backend
-npm install
-npm run dev

Frontend
-cd frontend
-npm install
-npm run dev

Author-
Sanuba Khan
Web Developer | MERN Stack
Built as a learning-focused full-stack project.