import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { Icon } from '@iconify/react';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen bg-black p-4 gap-4">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="morphism-green mb-6" style={{
          borderRadius: '1.5rem',
          padding: '1.5rem 2rem'
        }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                <Icon icon="solar:widget-2-bold-duotone" className="text-2xl text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">{title}</h1>
                <p className="text-green-200 text-sm font-medium mt-1">Welcome back, John</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Search */}
              <div className="relative hidden md:block">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Icon icon="solar:magnifer-bold-duotone" className="text-lg text-green-300" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm w-64 transition-all duration-300"
                />
              </div>
              
              {/* Notifications */}
              <button className="relative p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 group">
                <Icon icon="solar:bell-bold-duotone" className="text-xl text-green-200 group-hover:text-white" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">3</span>
                </div>
              </button>
              
              {/* Settings */}
              <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 group">
                <Icon icon="solar:settings-bold-duotone" className="text-xl text-green-200 group-hover:text-white" />
              </button>
              
              {/* Profile Dropdown */}
              <div className="relative">
                <button className="flex items-center space-x-3 p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    JD
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-white font-semibold text-sm">John Doe</p>
                    <p className="text-green-200 text-xs">Premium</p>
                  </div>
                  <Icon icon="solar:alt-arrow-down-bold-duotone" className="text-green-200 group-hover:text-white transition-colors duration-300" />
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="morphism-dark rounded-2xl p-8 h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;