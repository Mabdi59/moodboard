import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

export default function UserProfileView() {
  const user = useContext(UserContext);

  if (!user) {
    return <p>Loading user profile...</p>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email || 'Not provided'}</p>
      <p>
        <strong>Role:</strong> {user.authorities?.map(auth => auth.name).join(', ')}
      </p>
      <p><strong>Member Since:</strong> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}</p>
    </div>
  );
}
