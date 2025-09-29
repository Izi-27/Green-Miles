import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Icon } from '@iconify/react';

// Navigation items with updated icons
const navItems = [
  { name: 'Dashboard', href: '/', icon: 'solar:home-2-bold-duotone' },
  { name: 'My Trips', href: '/trips', icon: 'solar:map-point-bold-duotone' },
  { name: 'Staking', href: '/staking', icon: 'solar:wallet-money-bold-duotone' },
  { name: 'Rewards', href: '/rewards', icon: 'solar:gift-bold-duotone' },
  { name: 'Devices', href: '/devices', icon: 'solar:smartphone-bold-duotone' },
  { name: 'Enterprise', href: '/enterprise', icon: 'solar:buildings-2-bold-duotone' },
  { name: 'Settings', href: '/settings', icon: 'solar:settings-bold-duotone' },
];

const Sidebar: React.FC = () => {
  const router = useRouter();
  
  return (
    <div className="morphism-green flex flex-col h-full" style={{
      width: '280px',
      margin: '1rem',
      borderRadius: '1.5rem',
      position: 'relative'
    }}>
      {/* Logo Section */}
      <div className="p-8 pb-6">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg">
              <Icon icon="solar:leaf-bold" className="text-2xl text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Green Miles</h1>
            <p className="text-green-200 text-sm font-medium">Eco Dashboard</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-6">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = router.pathname === item.href;
            
            return (
              <li key={item.name}>
                <Link 
                  href={item.href}
                  className="group flex items-center space-x-4 px-4 py-4 rounded-xl transition-all duration-300 relative overflow-hidden"
                  style={{
                    background: isActive 
                      ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)'
                      : 'transparent',
                    border: isActive ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid transparent',
                    boxShadow: isActive ? '0 8px 32px 0 rgba(34, 197, 94, 0.3)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.transform = 'translateX(0px)';
                    }
                  }}
                >
                  <div className={`p-2 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-white/10 text-green-200 group-hover:bg-white/15 group-hover:text-white'
                  }`}>
                    <Icon icon={item.icon} className="text-xl" />
                  </div>
                  <span className={`font-medium transition-all duration-300 ${
                    isActive 
                      ? 'text-white' 
                      : 'text-green-100 group-hover:text-white'
                  }`}>
                    {item.name}
                  </span>
                  {isActive && (
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-l-full"></div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* User Profile Section */}
      <div className="p-6 pt-4">
        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-sm">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">John Doe</p>
              <p className="text-green-200 text-xs">Premium Member</p>
            </div>
          </div>
          <button 
            className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 text-green-100 hover:text-white text-sm font-medium"
          >
            <Icon icon="solar:logout-2-bold-duotone" className="text-lg" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;