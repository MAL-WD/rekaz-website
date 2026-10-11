import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Blogs from './pages/Blogs';
import Teachers from './pages/Teachers';
import Languages from './pages/Languages';
import Inscriptions from './pages/Inscriptions';
import TeacherApplications from './pages/TeacherApplications';
import Contacts from './pages/Contacts';
import Settings from './pages/Settings';

const AdminRouteContent = () => {
  const { admin } = useAuth();

  return (
    <div dir="ltr" className="min-h-screen">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#010212',
            color: '#fff',
            borderRadius: '12px',
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif',
          },
        }}
      />
      <Routes>
        <Route path="login" element={admin ? <Navigate to="/admin" replace /> : <Login />} />
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="languages" element={<Languages />} />
          <Route path="inscriptions" element={<Inscriptions />} />
          <Route path="teacher-applications" element={<TeacherApplications />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </div>
  );
};

const AdminRoutes = () => {
  return (
    <AuthProvider>
      <AdminRouteContent />
    </AuthProvider>
  );
};

export default AdminRoutes;
