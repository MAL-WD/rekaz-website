import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Top bar (mobile) */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl hover:bg-border/50 transition-colors"
            >
              <Menu size={20} />
            </button>
            <span className="text-sm font-semibold">Rēkāz Admin</span>
            <div className="w-9" />
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
