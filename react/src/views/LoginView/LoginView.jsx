import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AuthService from '../../services/AuthService';
import Notification from '../../components/Notification/Notification';
import axios from 'axios';

import styles from './LoginView.module.css';

export default function LoginView({ onLogin }) {
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    AuthService.login({ username, password })
      .then((response) => {
        const user = response.data.user;
        const token = response.data.token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);

        onLogin(user);
        navigate('/');
      })
      .catch((error) => {
        const message = error.response?.data?.message || 'Login failed.';
        setNotification({ type: 'error', message });
        setPassword('');
      })
      .finally(() => setLoading(false));
  }

  return (
    <div id="view-login">
      <h2>Login</h2>

      <Notification notification={notification} clearNotification={() => setNotification(null)} />

      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            size="50"
            required
            autoFocus
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            size="50"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className={`btn-primary ${styles.formButton}`}
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>

        <div className={styles.links}>
          <Link to="/register">New? Register here!</Link>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
}
