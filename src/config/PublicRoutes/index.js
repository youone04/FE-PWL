import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
 const token = localStorage.getItem('token');
  return token;
};

const PublicRoutes = () => {
  const isAuth = useAuth();
  return isAuth ?  <Navigate to="/dashboard" /> : <Navigate to="/" />;
};

export default PublicRoutes;