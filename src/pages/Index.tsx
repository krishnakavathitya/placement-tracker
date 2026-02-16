
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect based on user role
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } else {
      // Not authenticated, redirect to login
      navigate('/login');
    }
  }, [navigate, isAuthenticated, user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40">
      <p>Redirecting...</p>
    </div>
  );
};

export default Index;
