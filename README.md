<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=280&color=0:701a75,50:db2777,100:f472b6&text=Eventopia&fontColor=ffffff&fontSize=65&animation=fadeIn&fontAlignY=40"/>
</p>

<p align="center">
  <h1 align="center">🎟️ Eventopia</h1>
  <p align="center">
    Online Movie Ticket Booking Platform
  </p>
  <p align="center">
    Interactive Seat Selection • MongoDB & Mongoose • Clerk Auth • Razorpay Payments • Inngest Background Jobs
  </p>
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/alokspacy/Eventopia?style=for-the-badge">
  <img src="https://img.shields.io/github/forks/alokspacy/Eventopia?style=for-the-badge">
  <img src="https://img.shields.io/github/license/alokspacy/Eventopia?style=for-the-badge">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-Frontend-blue?style=flat-square&logo=react">
  <img src="https://img.shields.io/badge/Vite-Build--Tool-blueviolet?style=flat-square&logo=vite">
  <img src="https://img.shields.io/badge/Tailwind--CSS--v4-Styling-38bdf8?style=flat-square&logo=tailwindcss">
  <img src="https://img.shields.io/badge/Clerk-Auth-6c47ff?style=flat-square&logo=clerk">
  <img src="https://img.shields.io/badge/MongoDB-Database-47a248?style=flat-square&logo=mongodb">
  <img src="https://img.shields.io/badge/Razorpay-Payments-blue?style=flat-square&logo=razorpay">
  <img src="https://img.shields.io/badge/Inngest-Background--Queue-000000?style=flat-square">
</p>

---

# 📖 Overview

**Eventopia** is a feature-rich, high-fidelity online movie ticket booking platform branded and developed by **Alok Singh**. The platform allows users to browse currently playing movies, watch trailers, select theater showtimes, reserve seats via an interactive layout, and book tickets securely with **Razorpay** payments. 

The system leverages **Clerk** for user authentication, **MongoDB** for data persistence, and **Inngest** for background queue functions (such as confirmation emails via Brevo/Nodemailer and auto-releasing reserved seats if the booking remains unpaid).

---

# ✨ Features

| Feature | Description |
|:---|:---|
| 🎟️ **Interactive Seat Selection** | Live responsive seat layout (rows A to J) that locks selected seats, checks occupancy status, and restricts bookings. |
| 🔑 **Clerk Authentication** | Seamless user login and registration with Clerk Auth, featuring profile syncs and role-based permissions. |
| 💳 **Razorpay Checkout** | Fully integrated Razorpay checkout flows supporting secure online transactions. |
| 🔄 **Inngest Background Jobs** | Background queue handling for transactional email notifications (Brevo SMTP/HTTP API) and auto-releasing seats after 10 minutes if payment is not made. |
| 🎬 **TMDB API Integration** | Dynamic movie details, banners, ratings, and trailers populated directly from The Movie Database API. |
| 👑 **Admin Dashboard** | Revenue statistics charts, paid bookings counter, total active user analytics, and a comprehensive theater scheduling manager to add new shows. |

---

# 🏗 Architecture

```
┌──────────────────────────────────────┐
│             Web Frontend             │
│         React 19 / Vite / Tailwind   │
└──────────────────┬───────────────────┘
                   │ HTTP / API Requests
                   ▼
┌──────────────────────────────────────┐
│           Node.js Backend            │
│        Express Server / Clerk        │
└──────┬───────────┬──────────────┬────┘
       ▼           ▼              ▼
┌───────────┐ ┌──────────┐ ┌──────────┐
│  MongoDB  │ │ Razorpay │ │ Inngest  │
│  Mongoose │ │ Payments │ │ Queue    │
└───────────┘ └──────────┘ └──────────┘
```

## Directory Structure

```
Eventopia
├── client             # React + Vite + Tailwind CSS v4 Frontend
│   ├── src
│   │   ├── components # Navbar, Footer, MovieCard, TrailerModal, etc.
│   │   ├── context    # AppContext (global state, auth, axios)
│   │   ├── pages      # Home, Movies, MovieDetails, SeatLayout, MyBookings, Favorite, Admin Panel
│   │   └── lib        # Helper libraries (KConverter, dateFormat, timeFormat)
│   └── vercel.json    # Vercel SPA router config
│
└── server             # Node.js + Express.js Backend
    ├── configs        # DB connection, SMTP transporter (Brevo / Nodemailer)
    ├── controllers    # Show, Booking, Admin, and User controllers
    ├── inngest        # Inngest client, events, and background functions
    ├── models         # Mongoose models (User, Show, Booking, Movie)
    ├── routes         # API endpoint routers
    └── server.js      # Backend entry point
```

---

# 🚀 Getting Started

## Environment Variables

### Backend Configuration (`/server/.env`)
Create a `.env` file in the `/server` directory:
```env
PORT=3000
MONGODB_URI="your_mongodb_atlas_connection_string"
CLERK_SECRET_KEY="your_clerk_secret_key"
CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
RAZORPAY_KEY_ID="your_razorpay_key_id"
RAZORPAY_KEY_SECRET="your_razorpay_key_secret"
TMDB_API_KEY="your_tmdb_api_key"

# Email Configuration (Brevo)
SMTP_USER="your_brevo_smtp_login"
SMTP_PASS="your_brevo_api_key_or_smtp_password"
SENDER_EMAIL="your_verified_sender_email"

# Inngest Configuration
INNGEST_EVENT_KEY="your_inngest_event_key"
INNGEST_SIGNING_KEY="your_inngest_signing_key"
```

### Frontend Configuration (`/client/.env`)
Create a `.env` file in the `/client` directory:
```env
VITE_BASE_URL="https://your-backend-render-url.onrender.com"
VITE_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
VITE_RAZORPAY_KEY_ID="your_razorpay_key_id"
VITE_TMDB_IMAGE_BASE_URL="https://image.tmdb.org/t/p/original"
VITE_CURRENCY="₹"
```

---

## Installation & Setup

### Clone Repository
```bash
git clone https://github.com/alokspacy/Eventopia.git
cd Eventopia
```

### 1. Set Up the Backend
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm start
   ```

### 2. Set Up the Frontend
1. Open a new terminal in the root directory and navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Access the web interface at `http://localhost:5173`.

---

## 👥 Support & Contact
- **Developer/Brand**: Alok Singh
- **GitHub**: [alokspacy](https://github.com/alokspacy)
- **Contact Number**: +91 98754845XX
- **Address**: Mumbai, India

If you found this project useful, please consider giving it a star! ⭐

Built with ❤️ using React, Express, MongoDB, and Inngest
© 2026 Eventopia
