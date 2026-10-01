import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('rekaz_admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('rekaz_admin_token');
    if (token) {
      API.get('/auth/me')
        .then((res) => {
          setAdmin(res.data.data);
          localStorage.setItem('rekaz_admin_user', JSON.stringify(res.data.data));
        })
        .catch(() => {
          localStorage.removeItem('rekaz_admin_token');
          localStorage.removeItem('rekaz_admin_user');
          setAdmin(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await API.post('/auth/login', { email, password });
    const { token, admin: adminData } = res.data.data;
    localStorage.setItem('rekaz_admin_token', token);
    localStorage.setItem('rekaz_admin_user', JSON.stringify(adminData));
    setAdmin(adminData);
    return adminData;
  };

  const logout = () => {
    localStorage.removeItem('rekaz_admin_token');
    localStorage.removeItem('rekaz_admin_user');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
