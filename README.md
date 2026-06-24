# Eventopia – Online Movie Ticket Booking Platform

Eventopia is a feature-rich, high-fidelity online movie ticket booking platform built with **React, Vite, Tailwind CSS v4**, and a **Node.js + Express** backend. It allows browsing now showing movies, selecting dates/showtimes, reserving seats via an interactive layout, and reviewing booking history.

---

## 🚀 Features & Customizations

1. **Brand Identity**: The platform has been customized as **Eventopia** with a neon pink/white SVG ticket branding logo.
2. **Interactive Seat Selection**: A responsive layout (rows A to J) that locks seats, checks availability, and restricts single bookings to a maximum of 5 seats.
3. **Simulated Integrations**:
   - **Auth (Clerk Mock)**: Toggles seamlessly between regular user (**Alok Singh**) and **Admin** profiles with a single click.
   - **Payments (Stripe Mock)**: Simulates a credit card billing screen at `/pay/:bookingId` that writes paid records back to the database.
4. **Admin Panel**:
   - **Dashboard stats**: Displays total revenue, paid bookings count, user counts, and active shows list.
   - **Scheduling manager**: Select now playing movies, set prices, and select multiple datetimes to host theater shows.
5. **Tailored Footer**: Consists of:
   - **Made with ❤️ By Alok Singh**
   - **Contact no. +91 98754845XX**
   - **Address - Mumbai, India**

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React (Vite) + Tailwind CSS v4 + Lucide Icons + React Hot Toast |
| **Backend** | Node.js + Express + Local File Database |
| **Persistence** | `db.json` (Local JSON file acting as a database) |

---

## 📦 Installation & Setup

All dependencies for both the frontend (`client/`) and backend (`server/`) can be installed and launched from the root folder.

### 1. Install Dependencies
Run the install command in the root folder of Eventopia:
```bash
npm install
npm run install-all
```
This installs root, client, and server packages automatically.

### 2. Configure Environment Variables
The environment is pre-configured to run out-of-the-box. If you want to connect to TMDB api for fetching fresh live movies, add your TMDB key in `server/.env`:
- **Server `.env` (`server/.env`)**
  ```env
  PORT=3000
  TMDB_API_KEY=YOUR_TMDB_API_KEY
  ```
- **Client `.env` (`client/.env`)**
  ```env
  VITE_CURRENCY=$
  VITE_BASE_URL=http://localhost:3000
  VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/original
  ```

### 3. Run Locally
To boot up both the Express backend API and the Vite frontend concurrently in watch mode:
```bash
npm run dev
```

- **Frontend Site**: `http://localhost:5173`
- **Backend API**: `http://localhost:3000`

---

## 👥 Pre-Configured Test Profiles

You can toggle profiles immediately in the Navbar's **Login** modal:
- **Regular User**: logs in as **Alok Singh** (`alok.singh@example.com`) to browse movies, favorite films, choose seats, and pay for tickets.
- **Admin**: logs in as **Admin** (`admin@eventopia.com`) to manage shows and view earnings stats.
