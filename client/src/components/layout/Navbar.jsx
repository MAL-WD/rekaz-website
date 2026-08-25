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
      setIsScrolled(window.scrollY > 20);
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
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full pointer-events-none">
      <motion.div
        animate={isScrolled ? {
          width: '90%',
          maxWidth: '1120px',
          marginTop: '12px',
          borderRadius: '9999px',
          backgroundColor: 'rgba(255,255,255,0.88)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.09), inset 0 0 0 1px rgba(0,0,0,0.07)',
        } : {
          width: '100%',
          maxWidth: '100%',
          marginTop: '0px',
          borderRadius: '0px',
          backgroundColor: 'rgba(255,255,255,0)',
          boxShadow: '0 0 0 rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        style={{
          backdropFilter: isScrolled ? 'blur(20px) saturate(1.6)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(1.6)' : 'none',
        }}
        className="flex justify-between items-center px-5 md:px-7 py-3 pointer-events-auto"
      >
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-[33px] h-[33px] relative overflow-hidden rounded-full flex-shrink-0">
            <img src={logo} alt="Rekaz Logo" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <span className="font-satoshi font-semibold text-[21px] tracking-[-0.03em] text-[#0a0a0a]">Rekaz</span>
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <nav className="flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="px-3.5 py-1.5 text-[#0a0a0a]/70 hover:text-[#0412fa] hover:bg-[rgba(4,18,250,0.05)] rounded-full transition-all duration-200 text-[14px] font-medium tracking-[-0.01em] font-satoshi"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <button
            onClick={toggleLanguage}
            className="text-[13px] font-medium text-rekaz-dark/60 hover:text-rekaz-blue transition-colors px-2.5 py-1.5 rounded-full hover:bg-[rgba(4,18,250,0.05)]"
          >
            {i18n.language === 'ar' ? 'EN' : 'عربي'}
          </button>

          <Link
            to="/inscription"
            className="flex items-center justify-center px-5 py-2.5 text-white rounded-full font-satoshi font-semibold text-[14px] tracking-[-0.01em] hover:-translate-y-px hover:scale-[1.02] transition-all duration-200"
            style={{ background: 'linear-gradient(150deg,#00a5ff 0%,#0412fa 100%)', boxShadow: '0 4px 16px rgba(0,165,255,0.28), inset 0 1px 0 rgba(255,255,255,0.18)' }}
          >
            {t('navbar.enroll', 'Join Rekaz')}
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-rekaz-dark flex-shrink-0"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </motion.div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[66px] inset-x-3 z-40 bg-white/92 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] rounded-[22px] px-5 py-5 flex flex-col gap-4 md:hidden ring-1 ring-black/[0.06] pointer-events-auto"
          >
            <nav className="flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-[15px] font-medium font-satoshi text-[#0a0a0a]/75 hover:text-[#0412fa] hover:bg-[rgba(4,18,250,0.04)] rounded-xl px-3 py-2.5 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => { toggleLanguage(); setMobileMenuOpen(false); }}
                className="text-start text-[15px] font-medium font-satoshi text-rekaz-blue px-3 py-2.5 rounded-xl hover:bg-[rgba(4,18,250,0.04)] transition-colors"
              >
                {i18n.language === 'ar' ? 'English' : 'العربية'}
              </button>
            </nav>
            <Link
              to="/inscription"
              className="flex items-center justify-center px-6 py-3.5 text-white rounded-[14px] font-satoshi font-semibold text-[15px]"
              style={{ background: 'linear-gradient(150deg,#00a5ff 0%,#0412fa 100%)', boxShadow: '0 4px 16px rgba(0,165,255,0.28)' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('navbar.enroll', 'Join Rekaz')}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
