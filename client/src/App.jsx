import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import SmoothScroll from './components/SmoothScroll';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import ProgramsPage from './pages/ProgramsPage';
import ProgramCEM from './pages/ProgramCEM';
import ProgramLycee from './pages/ProgramLycee';
import ProgramFormations from './pages/ProgramFormations';
import Consultation from './pages/Consultation';
import Contact from './pages/Contact';
import Inscription from './pages/Inscription';
import BlogsPage from './pages/BlogsPage';
import BlogPage from './pages/BlogPage';
import EditorPage from './pages/EditorPage';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language || 'en';
  }, [i18n.language]);

  return (
    <HelmetProvider>
      <Router>
        <SmoothScroll>
          <Routes>
            {/* Pages with shared Navbar + Footer */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/programs" element={<ProgramsPage />} />
              <Route path="/programs/cem" element={<ProgramCEM />} />
              <Route path="/programs/lycee" element={<ProgramLycee />} />
              <Route path="/programs/formations" element={<ProgramFormations />} />
              <Route path="/consultation" element={<Consultation />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/inscription" element={<Inscription />} />
              <Route path="/join" element={<Inscription />} />
              <Route path="/enroll" element={<Inscription />} />
              {/* Blog pages */}
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/blogs/:blog_id" element={<BlogPage />} />
            </Route>

            {/* Editor – full-page, no shared layout */}
            <Route path="/editor" element={<EditorPage />} />
            <Route path="/editor/:blog_id" element={<EditorPage />} />
          </Routes>
        </SmoothScroll>
      </Router>
    </HelmetProvider>
  );
}

export default App;
