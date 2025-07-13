import axios from 'axios';

/**
 * AdminService handles requests to admin-only user management endpoints.
 * Only admins with valid tokens should use these methods.
 */
const AdminService = {
  /**
   * Get all users (admin only).
   * GET /admin/users
   */
  getAllUsers() {
    return axios.get('/admin/users');
  },

  /**
   * Toggle a user's role between ROLE_USER and ROLE_ADMIN.
   * PUT /admin/users/{userId}/toggle-role
   */
  toggleUserRole(userId) {
    return axios.put(`/admin/users/${userId}/toggle-role`);
  },

  /**
   * Delete a user by ID.
   * DELETE /admin/users/{userId}
   */
  deleteUser(userId) {
    return axios.delete(`/admin/users/${userId}`);
  },

  /**
   * (Optional) Get user by ID (not restricted to admin in backend).
   * GET /users/{userId}
   */
  getUserById(userId) {
    return axios.get(`/users/${userId}`);
  }
};

export default AdminService;
