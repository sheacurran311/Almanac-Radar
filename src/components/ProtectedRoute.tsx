import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, client, isLoading } = useAuth();
  const { tenantId } = useParams<{ tenantId: string }>();

  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated, 'client:', client, 'isLoading:', isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (client && client.tenantId !== tenantId) {
    return <Navigate to={`/dashboard/${client.tenantId}`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;