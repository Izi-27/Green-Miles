import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { Icon } from '@iconify/react';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen" style={{backgroundColor: "#000000"}}>
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header style={{backgroundColor: "#111111", borderBottom: "1px solid #333333"}}>
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold" style={{color: "#ffffff"}}>{title}</h1>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full" style={{color: "#ffffff"}} onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#333333"} onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
                <Icon icon="carbon:notification" className="text-xl" />
              </button>
              <button className="p-2 rounded-full" style={{color: "#ffffff"}} onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#333333"} onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
                <Icon icon="carbon:help" className="text-xl" />
              </button>
              <div className="relative">
                <button className="flex items-center space-x-2 p-2 rounded-lg" style={{color: "#ffffff"}} onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#333333"} onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{backgroundColor: "#22c55e"}}>
                    <span className="font-semibold">JD</span>
                  </div>
                  <span className="font-medium">John Doe</span>
                  <Icon icon="carbon:chevron-down" />
                </button>
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;