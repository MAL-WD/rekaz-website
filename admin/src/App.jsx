import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
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

const App = () => {
  const { admin } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={admin ? <Navigate to="/" replace /> : <Login />} />
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
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
