import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/logo.png';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-rekaz-black text-white pt-16 pb-8 font-satoshi">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2 text-start">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 relative overflow-hidden rounded-full flex-shrink-0 bg-white/5 p-1">
                <img 
                  src={logo} 
                  alt="Rekaz Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bold text-2xl tracking-tight text-white">Rekaz</span>
            </Link>
            <p className="text-gray-400 mb-8 max-w-sm">
              {t('footer.slogan', 'Empowering the next generation through innovative education and practical skill development.')}
            </p>
            
            <div className="mb-8">
              <h4 className="font-semibold text-lg mb-4">{t('footer.newsletter', 'Subscribe to our newsletter')}</h4>
              <form className="flex gap-2 max-w-sm" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder={t('footer.emailPlaceholder', 'Enter your email')}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex-1 text-white placeholder:text-gray-500 focus:outline-none focus:border-rekaz-cyan transition-colors"
                />
                <button
                  type="submit"
                  className="bg-rekaz-gradient text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                  {t('footer.subscribe', 'Subscribe')}
                </button>
              </form>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-rekaz-blue transition-colors text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-rekaz-blue transition-colors text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-rekaz-blue transition-colors text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" /></svg>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="text-start">
            <h4 className="font-semibold text-lg mb-6">{t('footer.rekazLinks', 'Rekaz')}</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors">{t('footer.aboutUs', 'About Us')}</Link></li>
              <li><Link to="/team" className="hover:text-white transition-colors">{t('footer.ourTeam', 'Our Team')}</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">{t('footer.careers', 'Careers')}</Link></li>
              <li><Link to="/news" className="hover:text-white transition-colors">{t('footer.newsEvents', 'News & Events')}</Link></li>
            </ul>
          </div>

          <div className="text-start">
            <h4 className="font-semibold text-lg mb-6">{t('footer.programsTitle', 'Programs')}</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/programs/cem" className="hover:text-white transition-colors">{t('footer.middleSchool', 'Middle School (CEM)')}</Link></li>
              <li><Link to="/programs/lycee" className="hover:text-white transition-colors">{t('footer.highSchool', 'High School (Lycée)')}</Link></li>
              <li><Link to="/programs/formations" className="hover:text-white transition-colors">{t('footer.professionalTraining', 'Professional Training')}</Link></li>
              <li><Link to="/consultation" className="hover:text-white transition-colors">{t('footer.consultingLink', 'Consulting')}</Link></li>
            </ul>
          </div>

          <div className="text-start">
            <h4 className="font-semibold text-lg mb-6">{t('footer.contactTitle', 'Contact')}</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex gap-3">
                <svg className="w-5 h-5 text-rekaz-cyan mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>{t('footer.address', '123 Education Street,\nAlgiers, Algeria')}</span>
              </li>
              <li className="flex gap-3">
                <svg className="w-5 h-5 text-rekaz-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span>{t('footer.phone', '+213 (0) 555 123 456')}</span>
              </li>
              <li className="flex gap-3">
                <svg className="w-5 h-5 text-rekaz-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span>{t('footer.email', 'contact@rekaz.edu')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} {t('footer.copyright', 'Rekaz Educational Institute. All rights reserved.')}</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">{t('footer.privacy', 'Privacy Policy')}</Link>
            <Link to="/terms" className="hover:text-white transition-colors">{t('footer.terms', 'Terms of Service')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
