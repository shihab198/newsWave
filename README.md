mon# 📰 NewsWave — Full Stack News Portal

A complete, production-ready news portal built with **React + Zustand** (frontend) and **Node.js + Express + MongoDB** (backend).

## 🚀 Live Demo
- **Frontend:** https://your-newswave.vercel.app
- **Backend API:** https://your-newswave-api.vercel.app

---

## ✅ Features Implemented

| Feature | Status |
|---|---|
| Home page with 5 sections (hero, ticker, categories, latest news, CTA) | ✅ |
| Top 6 news fetched via API | ✅ |
| News listing page with pagination, search & filter | ✅ |
| Single news detail page with related articles | ✅ |
| Register & Login with JWT auth | ✅ |
| User dashboard with stats | ✅ |
| Create / Edit / Delete news articles | ✅ |
| Profile update (name, bio, avatar) | ✅ |
| Change password | ✅ |
| Contact Us page | ✅ |
| Header + Footer | ✅ |
| Protected routes | ✅ |
| Responsive design (mobile-first) | ✅ |

---

## 🛠 Tech Stack

### Frontend
- **React 18** + Vite
- **Zustand** (state management)
- **React Router v6** (routing)
- **Axios** (API calls)
- **React Hot Toast** (notifications)
- **Custom CSS** (no Tailwind/Bootstrap — unique editorial design)

### Backend
- **Node.js + Express**
- **MongoDB + Mongoose**
- **JWT** authentication
- **bcryptjs** password hashing
- **Express Validator** input validation

---

## 📁 Project Structure

```
newsportal/
├── backend/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── cloudinary.js      # Image upload config
│   ├── middleware/
│   │   └── auth.js            # JWT middleware
│   ├── models/
│   │   ├── User.js
│   │   └── News.js
│   ├── routes/
│   │   ├── auth.js            # /api/auth
│   │   ├── news.js            # /api/news
│   │   └── users.js           # /api/users
│   ├── .env.example
│   ├── package.json
│   ├── server.js
│   └── vercel.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Header.jsx
    │   │   ├── Footer.jsx
    │   │   ├── NewsCard.jsx
    │   │   ├── NewsForm.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── NewsPage.jsx
    │   │   ├── SingleNews.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Contact.jsx
    │   │   └── NotFound.jsx
    │   ├── store/
    │   │   ├── authStore.js    # Zustand auth state
    │   │   └── newsStore.js    # Zustand news state
    │   ├── utils/
    │   │   ├── api.js          # Axios instance
    │   │   └── helpers.js      # Utility functions
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .env.example
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Git

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/newsportal.git
cd newsportal
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your values:
# MONGODB_URI=mongodb+srv://...
# JWT_SECRET=your_secret_key
# CLIENT_URL=http://localhost:5173

npm run dev
# API running at http://localhost:5000
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Create .env file
cp .env.example .env
# Set VITE_API_URL=http://localhost:5000/api

npm run dev
# App running at http://localhost:5173
```

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get current user |

### News
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/news` | Get all news (paginated, filterable) |
| GET | `/api/news/top` | Get top 6 news |
| GET | `/api/news/my` | Get current user's news (auth) |
| GET | `/api/news/:slug` | Get single news |
| POST | `/api/news` | Create news (auth) |
| PUT | `/api/news/:id` | Update news (auth, owner) |
| DELETE | `/api/news/:id` | Delete news (auth, owner) |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/api/users/profile` | Update profile (auth) |
| PUT | `/api/users/change-password` | Change password (auth) |
| GET | `/api/users/:id` | Get public user profile |

**Query params for GET /api/news:**
- `page` — Page number (default: 1)
- `limit` — Items per page (default: 12)
- `category` — Filter by category
- `search` — Full text search

---

## 🚀 Deployment

### Deploy Backend to Render

1. Create new **Web Service** on [render.com](https://render.com)
2. Connect your GitHub repo
3. Set:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
4. Add Environment Variables from `.env.example`

### Deploy Backend to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. `cd backend && vercel`
3. Set environment variables in Vercel dashboard

### Deploy Frontend to Vercel

1. `cd frontend && vercel`
2. Set `VITE_API_URL` to your backend URL
3. Or connect GitHub repo in Vercel dashboard

### Deploy Frontend to Netlify

1. Build: `npm run build`
2. Deploy `dist/` folder
3. Add `_redirects` file: `/* /index.html 200`

---

## 🎨 Design System

The app uses a custom **editorial/newspaper** design aesthetic:
- **Font Display:** Playfair Display (serif)
- **Font Body:** DM Sans
- **Primary Color:** `#c9410a` (warm burnt red)
- **Background:** `#f8f5f0` (newsprint cream)
- **Dark:** `#0d0d0d`

---

## 📝 License
MIT License — free for educational use.
