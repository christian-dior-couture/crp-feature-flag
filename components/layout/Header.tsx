'use client';

import { Bell, Search, User } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

const Header = ({ title = 'Dashboard', subtitle }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm" automation-id="main-header">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search..."
              automation-id="header-search"
            />
          </div>
          
          {/* Notifications */}
          <button 
            className="p-1 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none"
            automation-id="notifications-button"
          >
            <Bell className="h-6 w-6" />
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          
          {/* User Menu */}
          <div className="relative">
            <button 
              className="flex items-center max-w-xs text-sm bg-gray-800 rounded-full focus:outline-none"
              automation-id="user-menu-button"
            >
              <span className="sr-only">Open user menu</span>
              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                <User className="h-5 w-5" />
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Optional Navigation Bar */}
      <nav className="px-6 py-2 border-t border-gray-200">
        <div className="flex space-x-6">
          <Link 
            href="/dashboard" 
            className="text-sm font-medium text-indigo-600 pb-2 border-b-2 border-indigo-500" 
            automation-id="nav-item-dashboard"
          >
            Dashboard
          </Link>
          <Link 
            href="/projects" 
            className="text-sm font-medium text-gray-500 hover:text-gray-700 pb-2 border-b-2 border-transparent hover:border-gray-300" 
            automation-id="nav-item-projects"
          >
            Projects
          </Link>
          <Link 
            href="/teams" 
            className="text-sm font-medium text-gray-500 hover:text-gray-700 pb-2 border-b-2 border-transparent hover:border-gray-300" 
            automation-id="nav-item-teams"
          >
            Teams
          </Link>
          <Link 
            href="/analytics" 
            className="text-sm font-medium text-gray-500 hover:text-gray-700 pb-2 border-b-2 border-transparent hover:border-gray-300" 
            automation-id="nav-item-analytics"
          >
            Analytics
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
