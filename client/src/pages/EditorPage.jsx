import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogEditorStudio from '../components/BlogEditorStudio';
import { useStateContext } from '../contexts/ContextProvider';

// ─── Login Gate for Unauthenticated Users ────────────────────────────────────
const LoginGate = ({ onAuthSuccess }) => {
  const { login } = useStateContext();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      const success = login(password);
      if (success) {
        onAuthSuccess();
      } else {
        setError('Incorrect password. Access denied.');
      }
      setLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#fafafc] flex items-center justify-center px-5">
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="font-satoshi font-bold text-3xl gradient-text">Rēkāz</span>
          </Link>
          <h2 className="text-xl font-satoshi font-bold text-rekaz-dark mt-3">
            Blog Editor Studio
          </h2>
          <p className="text-rekaz-grey font-dm text-sm mt-1">
            Sign in with admin credentials to write or edit articles.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-rekaz-border p-8 shadow-xl shadow-rekaz-blue/5">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-rekaz-dark font-satoshi text-xs font-bold uppercase tracking-wider mb-2 block">
                Editor Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter editor password"
                autoFocus
                className="w-full px-4 py-3 rounded-xl border border-rekaz-border font-dm text-sm text-rekaz-dark placeholder:text-rekaz-muted/50 outline-none focus:border-rekaz-blue focus:ring-4 focus:ring-rekaz-blue/10 transition-all"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-500 text-xs font-dm bg-red-50 px-3.5 py-2.5 rounded-xl border border-red-200">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3.5 rounded-xl font-satoshi font-bold text-sm text-white bg-rekaz-blue hover:bg-rekaz-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-rekaz-blue/20"
            >
              {loading ? 'Verifying...' : 'Access Studio'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-rekaz-border flex items-center justify-between text-xs font-satoshi">
            <Link to="/admin/login" className="text-rekaz-blue hover:underline">
              Log in to Admin Panel →
            </Link>
            <Link to="/blogs" className="text-rekaz-muted hover:text-rekaz-dark">
              Return to Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Editor Page ─────────────────────────────────────────────────────────────
const EditorPage = () => {
  const { userAuth, setUserAuth } = useStateContext();
  const [isAdminTokenValid, setIsAdminTokenValid] = useState(() => {
    // Check if user is logged into the admin panel
    const token = localStorage.getItem('rekaz_admin_token');
    return Boolean(token);
  });

  const isAuthenticated = Boolean(userAuth?.access_token || isAdminTokenValid);

  if (!isAuthenticated) {
    return <LoginGate onAuthSuccess={() => setIsAdminTokenValid(true)} />;
  }

  return <BlogEditorStudio />;
};

export default EditorPage;
