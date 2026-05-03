import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const hasSession = localStorage.getItem('bb_session') === 'active';

  // If there's no user in memory and no session flag, redirect to login
  if (!user && !hasSession) {
    return <Navigate to="/login" replace />;
  }

  // If there is a session flag, we allow access even if user is null (refreshed page).
  // Alternatively, we could force them to log in again if user is null.
  // The instruction implies unauthenticated users go to /login, and we persist the session flag.
  return children;
}
