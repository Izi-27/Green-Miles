import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Icon } from '@iconify/react';

// Navigation items
const navItems = [
  { name: 'Dashboard', href: '/', icon: 'carbon:dashboard' },
  { name: 'My Trips', href: '/trips', icon: 'carbon:car' },
  { name: 'Staking', href: '/staking', icon: 'carbon:money' },
  { name: 'Rewards', href: '/rewards', icon: 'carbon:gift' },
  { name: 'Devices', href: '/devices', icon: 'carbon:mobile' },
  { name: 'Enterprise', href: '/enterprise', icon: 'carbon:building' },
  { name: 'Settings', href: '/settings', icon: 'carbon:settings' },
];

const Sidebar: React.FC = () => {
  const router = useRouter();
  
  return (
    <div style={{
      backgroundColor: '#000000',
      borderRight: '1px solid #333333',
      width: '240px'
    }} className="flex flex-col">
      <div className="p-6" style={{borderBottom: '1px solid #333333'}}>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{backgroundColor: '#22c55e'}}>
            <Icon icon="carbon:sprout" className="text-xl" />
          </div>
          <span className="text-xl font-bold" style={{color: '#ffffff'}}>Green Miles</span>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = router.pathname === item.href;
            
            return (
              <li key={item.name}>
                <Link 
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg" 
                  style={{
                    backgroundColor: isActive ? '#22c55e' : 'transparent',
                    color: isActive ? '#ffffff' : '#ffffff'
                  }}
                  onMouseOver={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = '#333333';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <Icon icon={item.icon} className="text-xl" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4" style={{borderTop: '1px solid #333333'}}>
        <button 
          className="flex items-center space-x-3 px-4 py-3 rounded-lg w-full" 
          style={{color: '#ffffff'}}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#333333'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <Icon icon="carbon:logout" className="text-xl" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;