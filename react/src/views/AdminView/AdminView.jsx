import { useEffect, useState } from 'react';
import styles from './AdminView.module.css';
import AdminService from '../../services/AdminService';
import Notification from '../../components/Notification/Notification';

export default function AdminView() {
  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  function loadUsers() {
    setLoading(true);
    AdminService.getAllUsers()
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        const message = error.response?.data?.message || 'Failed to load user list.';
        setNotification({ type: 'error', message });
        setLoading(false);
      });
  }

  function handleToggleRole(userId) {
    AdminService.toggleUserRole(userId)
      .then(() => {
        setNotification({ type: 'success', message: 'User role updated.' });
        loadUsers();
      })
      .catch(() => {
        setNotification({ type: 'error', message: 'Failed to update user role.' });
      });
  }

  function handleDeleteUser(userId) {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    AdminService.deleteUser(userId)
      .then(() => {
        setNotification({ type: 'success', message: 'User deleted.' });
        loadUsers();
      })
      .catch(() => {
        setNotification({ type: 'error', message: 'Failed to delete user.' });
      });
  }

  return (
    <div className={styles.adminPanel}>
      <h1 className={styles.heading}>Admin Panel</h1>
      <p className={styles.subheading}>Manage users and view system activity.</p>

      <Notification
        notification={notification}
        clearNotification={() => setNotification(null)}
      />

      {loading && <p>Loading users...</p>}

      {!loading && users.length > 0 && (
        <div className={styles.userList}>
          <h2>Registered Users</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id} className={styles.userItem}>
                <span className={styles.username}>{user.username}</span>
                <span className={styles.roleTag}>
                  {user.authorities?.[0]?.name || user.role}
                </span>

                <button
                  className={styles.actionButton}
                  onClick={() => handleToggleRole(user.id)}
                >
                  Toggle Role
                </button>

                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!loading && users.length === 0 && (
        <p className={styles.empty}>No users found.</p>
      )}
    </div>
  );
}
