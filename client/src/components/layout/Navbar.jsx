import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('navbar.programs', 'Programs'), path: '/programs' },
    { name: t('navbar.about', 'About Us'), path: '/about' },
    { name: t('navbar.training', 'Training'), path: '/programs/formations' },
    { name: t('navbar.consulting', 'Consulting'), path: '/consultation' },
    { name: t('navbar.blog', 'Blogs'), path: '/blogs' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center w-full ${
        isScrolled ? 'bg-white shadow-sm py-[12px]' : 'bg-transparent py-[20px]'
      }`}
    >
      <div className="w-full max-w-[1200px] px-[20px] md:px-[25px] flex justify-between items-center h-[58px]">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-[10px] z-50">
          <div className="w-[35px] h-[35px] md:w-[38px] md:h-[38px] relative overflow-hidden rounded-full flex-shrink-0">
            <img 
              src={logo} 
              alt="Rekaz Logo"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <span className="font-satoshi font-medium text-[25px] tracking-[-0.025em] text-[#0a0a0a]">Rekaz</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-[22px]">
          <nav className="flex items-center gap-[24px]">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-[#0a0a0a] hover:text-[#0055ff] transition-colors text-[15px] font-medium tracking-[-0.01em] font-satoshi"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <button
            onClick={toggleLanguage}
            className="text-[14px] font-medium text-rekaz-dark hover:text-rekaz-blue transition-colors px-2"
          >
            {i18n.language === 'ar' ? 'EN' : 'عربي'}
          </button>
          
          <Link
            to="/inscription"
            className="flex items-center justify-center px-[24px] py-[13px] text-white rounded-[14px] font-satoshi font-medium text-[15px] tracking-[-0.01em] shadow-[0_4px_16px_rgba(0,165,255,0.32)] hover:shadow-[0_8px_24px_rgba(4,18,250,0.42)] hover:brightness-105 hover:-translate-y-0.5 transition-all"
            style={{ background: 'linear-gradient(180deg, rgb(0, 165, 255) 0%, rgb(4, 18, 250) 100%)' }}
          >
            <span>{t('navbar.enroll', 'Join Rekaz')}</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden z-50 p-2 text-rekaz-dark"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[62px] left-0 right-0 z-40 bg-white border-b border-gray-100 px-[36px] py-[36px] flex flex-col gap-[24px] md:hidden shadow-lg"
          >
            <nav className="flex flex-col gap-[24px] text-start">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-[18px] font-medium font-satoshi text-[#0a0a0a] hover:text-[#0055ff] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  toggleLanguage();
                  setMobileMenuOpen(false);
                }}
                className="text-start text-[18px] font-medium font-satoshi text-rekaz-blue transition-colors"
              >
                {i18n.language === 'ar' ? 'English' : 'العربية'}
              </button>
              <Link
                to="/inscription"
                className="mt-[12px] flex items-center justify-center px-[24px] py-[14px] text-white rounded-[14px] font-satoshi font-medium text-[15px] shadow-[0_4px_16px_rgba(0,165,255,0.32)]"
                style={{ background: 'linear-gradient(180deg, rgb(0, 165, 255) 0%, rgb(4, 18, 250) 100%)' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('navbar.enroll', 'Join Rekaz')}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
