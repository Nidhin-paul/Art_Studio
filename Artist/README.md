# 🎨 AURA GALLERY — MERN Stack Documentation

> A full-stack art gallery web application built with MongoDB, Express.js, React, and Node.js.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Features](#features)
5. [Pages & Components](#pages--components)
6. [Database Schema](#database-schema)
7. [API Endpoints](#api-endpoints)
8. [Environment Variables](#environment-variables)
9. [Setup & Installation](#setup--installation)
10. [Running the App](#running-the-app)
11. [Deployment](#deployment)

---

## 🖼️ Project Overview

**AURA GALLERY** is a premium online art gallery platform for painters and fine artists. It showcases curated artwork collections, provides a detailed artist biography, and allows visitors to submit commission inquiries directly through the site.

### Design Highlights

- Minimalist, editorial-style layout
- Cream/off-white background with dark serif typography
- Artwork grid with mixed media, oil, and fine line pieces
- Embedded artist bio section with a pull quote card
- Commission inquiry form
- Responsive navigation with a dark "Inquiry" CTA button

---

## 🛠️ Tech Stack

| Layer        | Technology                        |
| ------------ | --------------------------------- |
| Frontend     | React.js (Vite), React Router DOM |
| Styling      | Vanilla CSS / CSS Modules         |
| Backend      | Node.js, Express.js               |
| Database     | MongoDB (Mongoose ODM)            |
| HTTP Client  | Axios                             |
| Email        | Nodemailer (for inquiry emails)   |
| Image Store  | Cloudinary (for artwork uploads)  |
| Auth (Admin) | JWT + bcrypt                      |

---

## 📁 Project Structure

```
aura-gallery/
│
├── client/                        # React Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── assets/                # Static images, fonts
│   │   ├── components/
│   │   │   ├── Navbar/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Navbar.css
│   │   │   ├── Hero/
│   │   │   │   ├── Hero.jsx
│   │   │   │   └── Hero.css
│   │   │   ├── Collection/
│   │   │   │   ├── CollectionGrid.jsx
│   │   │   │   ├── ArtCard.jsx
│   │   │   │   └── Collection.css
│   │   │   ├── Artist/
│   │   │   │   ├── ArtistBio.jsx
│   │   │   │   └── ArtistBio.css
│   │   │   ├── Commission/
│   │   │   │   ├── CommissionForm.jsx
│   │   │   │   └── CommissionForm.css
│   │   │   └── Footer/
│   │   │       ├── Footer.jsx
│   │   │       └── Footer.css
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── GalleryPage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   └── ContactPage.jsx
│   │   ├── services/
│   │   │   └── api.js             # Axios API calls
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css              # Global styles
│   └── package.json
│
├── server/                        # Express Backend
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── artworkController.js
│   │   ├── artistController.js
│   │   └── inquiryController.js
│   ├── models/
│   │   ├── Artwork.js
│   │   ├── Artist.js
│   │   └── Inquiry.js
│   ├── routes/
│   │   ├── artworkRoutes.js
│   │   ├── artistRoutes.js
│   │   └── inquiryRoutes.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── utils/
│   │   └── sendEmail.js           # Nodemailer utility
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ✨ Features

### Public Features

- **Hero Section** — Full-width landing with tagline and sponsored label
- **Collection Grid** — Displays artworks with title, medium, year, and optional 360° badge
- **Artist Biography** — Profile photo, bio text, pull quote card with "PARIS" label
- **Commission Inquiries** — Contact form (Full Name, Email, Subject, Message)
- **Responsive Design** — Mobile-first layout

### Admin Features *(optional)*

- Add / Edit / Delete artworks
- Upload artwork images to Cloudinary
- View submitted commission inquiries
- Manage artist bio content

---

## 🧩 Pages & Components

### `Navbar`

| Element    | Description                         |
| ---------- | ----------------------------------- |
| Logo       | "AURA GALLERY" text logo (top-left) |
| Nav Links  | Home · Gallery · About · Contact    |
| CTA Button | Dark "Inquiry" button (top-right)   |

### `Hero`

| Element  | Description                                  |
| -------- | -------------------------------------------- |
| Badge    | "SPONSORED LIVE" small label                 |
| Headline | "Capturing the Essence of Motion and Light." |
| Subtext  | Short artist mission statement paragraph     |

### `CollectionGrid`

| Element      | Description                                 |
| ------------ | ------------------------------------------- |
| Section Label | "The Collection" with a red accent line    |
| Side Text    | Brief description about the collection      |
| Art Cards    | 6-card grid — image, title, medium, year    |
| 360° Badge   | Displayed on select artworks                |

#### Sample Artworks (from design)

| Title            | Medium                | Year |
| ---------------- | --------------------- | ---- |
| Convergences     | Mixed Media on Canvas | 2022 |
| Ephemeral Bloom  | Oil on Canvas         | 2021 |
| Solilace of Tide | Natalia and Raven     | 2023 |
| Silent Whisper   | Fine Line Art         | 2022 |
| Ethereal Ruins   | Oil on Mixed Travel   | 2024 |
| The Observer     | Oil on Canvas Mar     | 2022 |

### `ArtistBio`

| Element      | Description                                   |
| ------------ | --------------------------------------------- |
| Section Label | "THE ARTIST" small red label                 |
| Name         | "Eliza Thorne"                                |
| Bio Text     | Multi-paragraph biography                     |
| Studio Photo | Large left-side image                         |
| Pull Quote   | Yellow card with italic quote + "PARIS" label |
| CTA          | "Book a Full Biography" arrow link            |

### `CommissionForm`

| Field         | Type       | Required |
| ------------- | ---------- | -------- |
| Full Name     | `text`     | ✅        |
| Email Address | `email`    | ✅        |
| Subject       | `text`     | ✅        |
| Your Message  | `textarea` | ✅        |
| Submit Button | `button`   | —        |

### `Footer`

| Element     | Description                                    |
| ----------- | ---------------------------------------------- |
| Logo        | "AURA GALLERY" text                            |
| Copyright   | "© 2024 Aura Gallery. All Rights Reserved."   |
| Social Links | Instagram · Twitter · LinkedIn                |

---

## 🗄️ Database Schema

### `Artwork` Model

```js
// server/models/Artwork.js
const artworkSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  medium:      { type: String, required: true },   // e.g., "Oil on Canvas"
  year:        { type: Number, required: true },
  imageUrl:    { type: String, required: true },   // Cloudinary URL
  has360:      { type: Boolean, default: false },  // 360° badge
  description: { type: String },
  featured:    { type: Boolean, default: false },
  createdAt:   { type: Date, default: Date.now }
});
```

### `Artist` Model

```js
// server/models/Artist.js
const artistSchema = new mongoose.Schema({
  name:        { type: String, required: true },   // "Eliza Thorne"
  bio:         { type: String, required: true },
  quote:       { type: String },                   // Pull quote
  quoteSource: { type: String },                   // e.g., "PARIS"
  photoUrl:    { type: String },                   // Cloudinary URL
  location:    { type: String }
});
```

### `Inquiry` Model

```js
// server/models/Inquiry.js
const inquirySchema = new mongoose.Schema({
  fullName:  { type: String, required: true },
  email:     { type: String, required: true },
  subject:   { type: String, required: true },
  message:   { type: String, required: true },
  status:    { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
  createdAt: { type: Date, default: Date.now }
});
```

---

## 🔌 API Endpoints

### Base URL: `http://localhost:5000/api`

#### Artworks

| Method | Endpoint        | Description             |
| ------ | --------------- | ----------------------- |
| GET    | `/artworks`     | Get all artworks        |
| GET    | `/artworks/:id` | Get single artwork      |
| POST   | `/artworks`     | Add new artwork (Admin) |
| PUT    | `/artworks/:id` | Update artwork (Admin)  |
| DELETE | `/artworks/:id` | Delete artwork (Admin)  |

#### Artist

| Method | Endpoint  | Description               |
| ------ | --------- | ------------------------- |
| GET    | `/artist` | Get artist bio            |
| PUT    | `/artist` | Update artist bio (Admin) |

#### Inquiries

| Method | Endpoint           | Description                    |
| ------ | ------------------ | ------------------------------ |
| POST   | `/inquiries`       | Submit a commission inquiry    |
| GET    | `/inquiries`       | Get all inquiries (Admin)      |
| PATCH  | `/inquiries/:id`   | Update inquiry status (Admin)  |

---

## 🔐 Environment Variables

### `server/.env`

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/aura-gallery
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your_app_password
```

### `client/.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🚀 Setup & Installation

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (for image storage)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/aura-gallery.git
cd aura-gallery
```

### 2. Install Server Dependencies

```bash
cd server
npm install
```

### 3. Install Client Dependencies

```bash
cd ../client
npm install
```

### 4. Configure Environment Variables

- Copy `.env.example` to `.env` in the `server/` folder
- Fill in your MongoDB URI, Cloudinary credentials, and email config

---

## ▶️ Running the App

### Start the Backend (Express Server)

```bash
cd server
npm run dev        # Uses nodemon for hot-reload
```

> Runs on: `http://localhost:5000`

### Start the Frontend (React + Vite)

```bash
cd client
npm run dev
```

> Runs on: `http://localhost:5173`

### Run Both Concurrently (from root)

```bash
# Install concurrently at root level
npm install -D concurrently

# Add to root package.json scripts:
# "dev": "concurrently \"npm run dev --prefix server\" \"npm run dev --prefix client\""

npm run dev
```

---

## 📦 Key Dependencies

### Server (`server/package.json`)

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5",
    "nodemailer": "^6.9.7",
    "cloudinary": "^1.41.0",
    "multer": "^1.4.5",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

### Client (`client/package.json`)

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.2"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.0"
  }
}
```

---

## 🌐 Deployment

### Frontend — Vercel

```bash
cd client
npm run build
# Deploy dist/ folder to Vercel
```

### Backend — Render / Railway

- Connect your GitHub repo
- Set environment variables in the platform dashboard
- Set build command: `npm install`
- Set start command: `node server.js`

### MongoDB — Atlas

- Create a free M0 cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
- Whitelist `0.0.0.0/0` for deployment access
- Copy the connection string into `MONGO_URI`

---

## 🎨 Design Tokens (CSS Variables)

```css
:root {
  --color-bg:       #f5f2ec;   /* Warm cream background */
  --color-text:     #1a1a1a;   /* Near-black for body text */
  --color-accent:   #c0392b;   /* Red accent for labels/lines */
  --color-card-bg:  #ffffff;   /* White art cards */
  --color-quote-bg: #f0c040;   /* Yellow pull quote card */
  --color-btn-dark: #111111;   /* Dark inquiry button */
  --color-btn-text: #ffffff;   /* Button text */

  --font-heading: 'Playfair Display', serif;
  --font-body:    'Inter', sans-serif;

  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 2rem;
  --spacing-lg: 4rem;
  --spacing-xl: 6rem;
}
```

---

## 📸 Component Layout Map

```
┌──────────────────────────────────────────────────────┐
│  NAVBAR: Logo | Home  Gallery  About  Contact [Inquiry] │
├──────────────────────────────────────────────────────┤
│  HERO                                                │
│    SPONSORED LIVE                                    │
│    "Capturing the Essence of Motion and Light."      │
│    Subtitle paragraph                                │
├──────────────────────────────────────────────────────┤
│  COLLECTION GRID                                     │
│  ┌────────┐  ┌────────┐  ┌────────────┐             │
│  │  🖼️   │  │  🖼️   │  │  🖼️  360° │             │
│  └────────┘  └────────┘  └────────────┘             │
│  ┌────────┐  ┌────────┐  ┌────────────┐             │
│  │  🖼️   │  │  🖼️   │  │  🖼️  360° │             │
│  └────────┘  └────────┘  └────────────┘             │
├──────────────────────────────────────────────────────┤
│  ARTIST BIO                                          │
│  ┌──────────┐  THE ARTIST                            │
│  │  Studio  │  Eliza Thorne                          │
│  │  Photo   │  Bio text...                           │
│  └──────────┘  ┌──────────────────────────┐          │
│                │ "Art is the soul of the  │          │
│                │  community."  — PARIS    │          │
│                └──────────────────────────┘          │
├──────────────────────────────────────────────────────┤
│  COMMISSION FORM                                     │
│  Full Name              Email Address                │
│  Subject                                             │
│  Message (textarea)                                  │
│  [ SEND INQUIRY → ]                                  │
├──────────────────────────────────────────────────────┤
│  FOOTER: AURA GALLERY  |  Instagram  Twitter  LinkedIn │
└──────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow

```
React (Client)
    │
    │  HTTP Request (Axios)
    ▼
Express.js (Server)
    │
    │  Mongoose Query
    ▼
MongoDB Atlas (Database)
    │
    │  Response
    ▼
Express.js → React → Rendered UI
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

MIT License © 2024 Aura Gallery

---

*Built with ❤️ using the MERN Stack*
