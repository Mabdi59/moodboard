# 🎨 MoodBoard React Project Starter

This is the React starter project for **MoodBoard**, a minimalist mood tracking and journaling app. This guide walks you through how to set up and run the frontend, as well as explains key features like routing, authentication, and styling.

---

## 📆 Project Setup

1. **Install Dependencies**

```bash
npm install
```

2. **Configure Environment**

Edit the `.env` file in the root of the project:

```env
VITE_REMOTE_API=http://localhost:9000
```

> ⚠️ Note: The backend Java Spring Boot app is configured to run on port `9000`.

3. **Start the Dev Server**

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to view the app in development mode.

---

## 🎨 Application Styling

Global styles are located in:

* `public/css/reset.css` – resets browser styles
* `public/css/global.css` – your base styles (fonts, layout, etc.)

You're encouraged to customize these files to match your desired mood, theme, and visual language.

---

## 🔐 Authentication System

This project includes a simple email/password login system powered by JWT and local storage.

### Authentication Flow:

* The login form authenticates via the backend `/login` endpoint.
* Upon success, a token and user info are stored in `localStorage`.
* Protected routes check for token validity.

### Key Files:

* `src/context/UserContext.jsx`: Provides global access to user state.
* `src/App.jsx`: Handles login, logout, and session persistence.

  * `handleLogin()` stores the token
  * `handleLogout()` clears the session
  * `useEffect()` restores the session on page refresh

### Navigation Behavior:

* Before login: nav shows **Login**
* After login: nav shows **Profile** and **Logout**
* `Profile` is a protected route (`<ProtectedRoute>`) that only renders for authenticated users

