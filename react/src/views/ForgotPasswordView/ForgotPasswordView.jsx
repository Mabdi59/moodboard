import { useState } from 'react';
import Notification from '../../components/Notification/Notification';
import AuthService from '../../services/AuthService';
import styles from './ForgotPasswordView.module.css';

export default function ForgotPasswordView() {
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    AuthService.forgotPassword(email)
      .then(() => {
        setNotification({ type: 'success', message: 'Password reset instructions sent.' });
        setSubmitted(true);
      })
      .catch(() => {
        setNotification({ type: 'error', message: 'Failed to send reset instructions.' });
      });
  }

  return (
    <div className={styles.forgotPassword}>
      <h2>Forgot Password</h2>

      <Notification notification={notification} clearNotification={() => setNotification(null)} />

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="email">Enter your account email:</label>
            <input
              type="email"
              id="email"
              value={email}
              size="50"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className={`btn-primary ${styles.formButton}`}>
            Send Reset Instructions
          </button>
        </form>
      ) : (
        <p>Check your email for password reset instructions.</p>
      )}
    </div>
  );
}
