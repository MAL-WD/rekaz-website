import { createContext, useState } from 'react';
import { Link } from 'react-router-dom';
import BlogEditor from '../components/BlogEditor';
import PublishForm from '../components/PublishForm';
import { useStateContext } from '../contexts/ContextProvider';

// Context shared between BlogEditor and PublishForm
export const EditorContext = createContext({});

const blogStructure = {
  title: '',
  banner: '',
  des: '',
  content: {},
  tags: [],
  author: 'Rekaz Team',
  authorImage: '',
};

// ─── Login Gate ──────────────────────────────────────────────────────────────
const LoginGate = () => {
  const { login } = useStateContext();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Small delay for UX
    setTimeout(() => {
      const success = login(password);
      if (!success) {
        setError('Incorrect password. Access denied.');
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-5">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="font-satoshi font-semibold text-2xl text-rekaz-dark">Rekaz</span>
          </Link>
          <p className="text-rekaz-grey font-dm text-sm mt-2">
            Editor access requires authentication
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-card border border-rekaz-border p-8 shadow-sm">
          <h2 className="font-satoshi font-semibold text-xl text-rekaz-dark mb-1">
            Editor Login
          </h2>
          <p className="text-rekaz-muted font-dm text-sm mb-6">
            Enter the editor password to create or edit articles.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-rekaz-dark font-satoshi text-sm font-medium mb-1.5 block">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter editor password"
                autoFocus
                className="w-full px-4 py-3 rounded-btn border border-rekaz-border font-dm text-sm text-rekaz-dark placeholder:text-rekaz-muted/50 outline-none focus:border-rekaz-blue focus:ring-2 focus:ring-rekaz-blue/10 transition-all"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm font-dm bg-red-50 px-3 py-2 rounded-btn">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3 rounded-btn font-satoshi font-medium text-sm text-white bg-rekaz-blue hover:bg-rekaz-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_2px_8px_rgba(4,18,250,0.25)]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Verifying...
                </span>
              ) : (
                'Access Editor'
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-rekaz-muted font-dm text-xs">
          <Link to="/blogs" className="text-rekaz-blue hover:underline">
            ← Back to Blog
          </Link>
        </p>
      </div>
    </div>
  );
};

// ─── Editor Page ─────────────────────────────────────────────────────────────
const EditorPage = () => {
  const { userAuth } = useStateContext();
  const [blog, setBlog] = useState(blogStructure);
  const [editorState, setEditorState] = useState('editor'); // 'editor' | 'publish'
  const [textEditor, setTextEditor] = useState({ isReady: false });

  // Auth gate
  if (!userAuth?.access_token) {
    return <LoginGate />;
  }

  return (
    <EditorContext.Provider
      value={{ blog, setBlog, editorState, setEditorState, textEditor, setTextEditor }}
    >
      {editorState === 'editor' ? <BlogEditor /> : <PublishForm />}
    </EditorContext.Provider>
  );
};

export default EditorPage;
