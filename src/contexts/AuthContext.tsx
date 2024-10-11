import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

interface Client {
  id: string;
  email: string;
  tenantId: string;
  companyName: string;
}

interface AuthContextType {
  client: Client | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [client, setClient] = useState<Client | null>(() => {
    const storedClient = sessionStorage.getItem('client');
    return storedClient ? JSON.parse(storedClient) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('isAuthenticated') === 'true';
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const login = useCallback(async (email: string, password: string) => {
    console.log('Logging in:', email);
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        throw new Error(error.message);
      }

      if (data.session) {
        const user = data.user;

        const clientData: Client = {
          id: user.id,
          email: user.email,
          tenantId: user.user_metadata.tenant_id,
          companyName: user.user_metadata.company_name || 'Default Company',
        };

        // Update state and storage
        localStorage.setItem('token', data.session.access_token);
        setClient(clientData);
        setIsAuthenticated(true);
        sessionStorage.setItem('client', JSON.stringify(clientData));
        sessionStorage.setItem('isAuthenticated', 'true');
        navigate(`/dashboard/${clientData.tenantId}`, { replace: true });
      }
    } catch (error: any) {
      console.error('Error during login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const logout = useCallback(async () => {
    console.log('Logging out');
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Clear storage and state
      localStorage.removeItem('token');
      sessionStorage.removeItem('client');
      sessionStorage.removeItem('isAuthenticated');
      setClient(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const checkSession = async () => {
      const persistedToken = localStorage.getItem('token');
      if (persistedToken) {
        try {
          const { data: user, error } = await supabase.auth.getUser(persistedToken);
          if (error || !user) {
            throw new Error('No user found');
          }

          // Retrieve client data based on the user information
          const clientData: Client = {
            id: user.id,
            email: user.email,
            tenantId: user.user_metadata?.tenant_id,
            companyName: user.user_metadata?.company_name || 'Default Company',
          };

          setClient(clientData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error fetching session:', error);
          logout(); // Logout if the token is not valid
        }
      }
      setIsLoading(false);
    };

    checkSession();
  }, [logout]);

  return (
    <AuthContext.Provider value={{ client, isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
