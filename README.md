# SkyStream

SkyStream is a full-stack flight and hotel booking platform inspired by Skyscanner. Users can search and filter available flights and hotels, view listings, log in with JWT or Google OAuth, and save favorite flights. Built with a full MERN stack and designed as a portfolio project to demonstrate full stack development skills.

---

## Features

- Flight search with filters (stops, airlines, class, price)
- Hotel search with filters (price, breakfast, free cancellation, location)
- Favorites system (save flights to user account)
- Dynamic pricing and class types for each flight
- Individual flight and hotel detail pages
- Map view showing hotel location and nearby points of interest
- Authentication:
  - Register/login with email and password (JWT-based)
  - Login with Google (OAuth2)
- Fully responsive design for desktop and mobile
- Cloud-based image storage using Cloudinary

---

## Tech Stack

**Frontend:**
- React
- Redux Toolkit
- Material-UI
- Google Maps API

**Backend:**
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT authentication
- Google OAuth2

**Other Tools:**
- Cloudinary (image uploads)
- Postman (API testing)
- Git & GitHub

---

## Installation

### Clone the repository
```bash
git clone https://github.com/yourusername/skystream.git
```

### Install backend dependencies
```bash
cd skystream-api
npm install
```

### Install frontend dependencies
```bash
cd ../frontend
npm install
```

---

## Environment Variables

### Backend (`skystream-api/.env`)
```
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=360d
JWT_COOKIE_EXPIRES=1
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend (`frontend/.env`)
```
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_GOOGLE_REDIRECT_URI=http://localhost:3000
REACT_APP_BACKEND_URL=http://localhost:5000
REACT_APP_GEOLOCATION_API_KEY=your_geolocation_api_key
```

---

## Usage

### Start the backend
```bash
cd skystream-api
node src/index.mjs
```

### Start the frontend
```bash
cd frontend
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Coding Style

- Consistent formatting using Prettier
- Logical and readable folder structure
- Clear and descriptive variable and function naming
- React components organized by feature
- Redux state management using slices