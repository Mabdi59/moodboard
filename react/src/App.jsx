import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import AuthService from './services/AuthService';
import axios from 'axios';

import HomeView from './views/HomeView/HomeView';
import LoginView from './views/LoginView/LoginView';
import LogoutView from './views/LogoutView';
import RegisterView from './views/RegisterView/RegisterView';
import UserProfileView from './views/UserProfileView/UserProfileView';
import MoodEntryView from './views/MoodEntryView/MoodEntryView';
import MoodHistoryView from './views/MoodHistoryView/MoodHistoryView';
import MoodStatsView from './views/MoodStatsView/MoodStatsView';
import AdminView from './views/AdminView/AdminView';
import ForgotPasswordView from './views/ForgotPasswordView/ForgotPasswordView';

import MainNav from './components/MainNav/MainNav';
import ProtectedRoute from './components/ProtectedRoute';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
  const [user, setUser] = useState(null);

  function handleLogin(userData) {
    setUser(userData);
  }

  function handleLogout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  }

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');

      if (storedUser && token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        AuthService.getUserProfile(storedUser.id)
          .then((response) => handleLogin(response.data))
          .catch(() => handleLogout());
      }
    } catch (err) {
      console.error('Error loading auth data:', err);
      handleLogout();
    }
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={user}>
        <div id="app">
          <header id="app-header">
            <div id="app-info">
              <img src="/moodboard-logo.png" alt="MoodBoard Logo" className="app-logo" />
              <h1>MoodBoard</h1>
            </div>
            <ThemeToggle />
          </header>

          <nav id="main-nav">
            <MainNav />
          </nav>

          <main id="main-content">
            <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/login" element={<LoginView onLogin={handleLogin} />} />
              <Route path="/logout" element={<LogoutView onLogout={handleLogout} />} />
              <Route path="/register" element={<RegisterView />} />
              <Route path="/forgot-password" element={<ForgotPasswordView />} />

              <Route
                path="/userProfile"
                element={
                  <ProtectedRoute>
                    <UserProfileView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/mood"
                element={
                  <ProtectedRoute>
                    <MoodEntryView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/history"
                element={
                  <ProtectedRoute>
                    <MoodHistoryView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/stats"
                element={
                  <ProtectedRoute>
                    <MoodStatsView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    {user?.authorities?.some(a => a.name === 'ROLE_ADMIN') ? (
                      <AdminView />
                    ) : (
                      <Navigate to="/" replace />
                    )}
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>

          <footer id="app-footer">
            © 2025 MoodBoard. All rights reserved.
          </footer>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
