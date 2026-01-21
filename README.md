📸 Postgram — Instagram-like Social Media App (MERN)

Postgram is a full-stack social media application inspired by Instagram, built using the MERN stack.
Users can create profiles, upload image posts, view a feed, like posts, and manage their own profiles through a clean, mobile-first interface.

This project focuses on real backend logic, database relationships, and authentication, rather than just UI cloning.

✨ Features

User authentication (Register / Login)

Create and edit user profiles

Upload image posts with captions

Home feed showing posts from users

Like / Unlike posts

Profile page with posts grid

Edit profile (avatar, username, bio)

Responsive, mobile-style UI

REST API with proper controllers and routes

🛠️ Tech Stack

Frontend
React (Vite)
Tailwind CSS
React Router
Axios

Backend
Node.js
Express.js
MongoDB & Mongoose
JWT Authentication
Multer (for image handling)

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

JWT-based authentication

Protected routes for creating posts and editing profiles

Auth middleware used on backend routes

Cookies used for session handling

🧠 What I Learned
Designing REST APIs properly
MongoDB relationships between users, profiles, and posts
Authentication & authorization in real projects
Handling file uploads and image URLs
Managing frontend + backend integration
Debugging real-world issues (not tutorial-perfect apps)

🚧 Known Limitations / Future Improvements
Profile-feed data syncing can be improved
Comments feature can be added
Follow / Unfollow system
Better error handling and loaders
Deployment improvements

(This project is actively improvable and intentionally left open for enhancements.)

▶️ How to Run Locally
Backend
cd backend
npm install
npm run dev


Create a .env file:
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

Frontend
cd frontend
npm install
npm run dev

-> Author
Sanuba Khan
Web Developer | MERN Stack
Built as a learning-focused full-stack project.