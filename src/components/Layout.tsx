
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Bell, Mail, Bookmark, User, Settings } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Explore', path: '/explore' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: Mail, label: 'Messages', path: '/messages' },
    { icon: Bookmark, label: 'Bookmarks', path: '/bookmarks' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto flex">
        {/* Sidebar */}
        <div className="w-64 fixed h-full border-r border-gray-800 p-4">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">𝕏</h1>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 p-3 rounded-full hover:bg-gray-900 transition-colors ${
                    isActive ? 'font-bold' : ''
                  }`}
                >
                  <Icon size={24} />
                  <span className="text-xl">{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full mt-6 font-bold">
            Post
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
