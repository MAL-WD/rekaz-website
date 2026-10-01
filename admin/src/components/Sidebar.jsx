import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  GraduationCap,
  Globe,
  UserPlus,
  Briefcase,
  MessageSquare,
  Settings,
  LogOut,
  X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/blogs', icon: FileText, label: 'Articles' },
  { to: '/teachers', icon: GraduationCap, label: 'Teachers' },
  { to: '/languages', icon: Globe, label: 'Languages' },
  { to: '/inscriptions', icon: UserPlus, label: 'Inscriptions' },
  { to: '/teacher-applications', icon: Briefcase, label: 'Applications' },
  { to: '/contacts', icon: MessageSquare, label: 'Messages' },
];

const Sidebar = ({ isOpen, onClose }) => {
  const { logout, admin } = useAuth();
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-dark text-white z-50 flex flex-col transition-transform duration-300 ease-in-out
          lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center text-white font-bold text-lg">
              R
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Rēkāz</h1>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-secondary">Admin Panel</span>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-white/60 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = item.to === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.to);

            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                  ${isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
              >
                <item.icon size={18} />
                {item.label}
              </NavLink>
            );
          })}

          <div className="my-4 border-t border-white/10" />

          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
              ${isActive
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'text-white/60 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <Settings size={18} />
            Settings
          </NavLink>
        </nav>

        {/* User + Logout */}
        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center text-white text-xs font-bold">
              {admin?.name?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{admin?.name || 'Admin'}</p>
              <p className="text-xs text-white/40 truncate">{admin?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
