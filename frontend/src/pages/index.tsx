import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Icon } from '@iconify/react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

// Mock data
const tripData = [
  { name: 'Mon', distance: 5.2, emissions: 0 },
  { name: 'Tue', distance: 7.8, emissions: 0 },
  { name: 'Wed', distance: 3.1, emissions: 0 },
  { name: 'Thu', distance: 8.5, emissions: 0 },
  { name: 'Fri', distance: 6.2, emissions: 0 },
  { name: 'Sat', distance: 12.4, emissions: 0 },
  { name: 'Sun', distance: 4.5, emissions: 0 },
];

const transportData = [
  { name: 'Walking', value: 35 },
  { name: 'Cycling', value: 45 },
  { name: 'Public Transport', value: 15 },
  { name: 'Electric Vehicle', value: 5 },
];

const COLORS = ['#22c55e', '#16a34a', '#15803d', '#166534'];

export default function Dashboard() {
  return (
    <DashboardLayout title="Dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stats Cards */}
        <div className="morphism-glass rounded-2xl p-6 hover:scale-105 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-4 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl backdrop-blur-sm border border-green-400/30">
              <Icon icon="solar:leaf-bold-duotone" className="text-3xl text-green-400" />
            </div>
            <div className="text-right">
              <p className="text-green-300 text-sm font-medium uppercase tracking-wider">CO2 Saved</p>
              <h3 className="text-3xl font-bold text-white mt-1">128.5 <span className="text-lg text-green-300">kg</span></h3>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-green-300">
            <Icon icon="solar:arrow-up-bold" className="text-sm" />
            <span className="text-sm font-medium">+12.3% from last month</span>
          </div>
        </div>
        
        <div className="morphism-glass rounded-2xl p-6 hover:scale-105 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-4 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl backdrop-blur-sm border border-green-400/30">
              <Icon icon="solar:wallet-money-bold-duotone" className="text-3xl text-green-400" />
            </div>
            <div className="text-right">
              <p className="text-green-300 text-sm font-medium uppercase tracking-wider">GMC Tokens</p>
              <h3 className="text-3xl font-bold text-white mt-1">245.8 <span className="text-lg text-green-300">GMC</span></h3>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-green-300">
            <Icon icon="solar:arrow-up-bold" className="text-sm" />
            <span className="text-sm font-medium">+8.7% from last week</span>
          </div>
        </div>
        
        <div className="morphism-glass rounded-2xl p-6 hover:scale-105 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-4 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl backdrop-blur-sm border border-green-400/30">
              <Icon icon="solar:map-point-bold-duotone" className="text-3xl text-green-400" />
            </div>
            <div className="text-right">
              <p className="text-green-300 text-sm font-medium uppercase tracking-wider">Distance</p>
              <h3 className="text-3xl font-bold text-white mt-1">47.7 <span className="text-lg text-green-300">km</span></h3>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-green-300">
            <Icon icon="solar:arrow-up-bold" className="text-sm" />
            <span className="text-sm font-medium">+15.2% this week</span>
          </div>
        </div>
        
        {/* Trip Activity Chart */}
        <div className="morphism-glass rounded-2xl p-8 col-span-1 lg:col-span-2">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Trip Activity</h3>
              <p className="text-green-300 text-sm">Your weekly eco-friendly journey</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium text-sm shadow-lg hover:shadow-xl transition-all duration-300">
                Week
              </button>
              <button className="px-4 py-2 text-green-300 hover:bg-white/10 rounded-xl font-medium text-sm transition-all duration-300">
                Month
              </button>
              <button className="px-4 py-2 text-green-300 hover:bg-white/10 rounded-xl font-medium text-sm transition-all duration-300">
                Year
              </button>
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={tripData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#a3a3a3" fontSize={12} />
                <YAxis stroke="#a3a3a3" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(17, 17, 17, 0.9)',
                    color: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    backdropFilter: 'blur(16px)'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="distance" 
                  stroke="#22c55e" 
                  fill="url(#colorGradient)" 
                  strokeWidth={3}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Transport Mode Distribution */}
        <div style={{backgroundColor: '#111111', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.3)', border: '1px solid #333333'}} className="p-6">
          <h3 style={{fontSize: '1.125rem', fontWeight: '600', color: '#ffffff', marginBottom: '1.5rem'}}>Transport Modes</h3>
          <div className="h-64 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={transportData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {transportData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{backgroundColor: '#222222', color: '#ffffff', borderRadius: '0.375rem', boxShadow: '0 4px 6px rgba(0,0,0,0.3)', border: '1px solid #444444'}} />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="grid grid-cols-2 gap-2 w-full mt-4">
              {transportData.map((entry, index) => (
                <div key={entry.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-xs" style={{color: '#ffffff'}}>{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Recent Trips */}
        <div style={{backgroundColor: '#111111', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.3)', border: '1px solid #333333'}} className="col-span-1 lg:col-span-2 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 style={{fontSize: '1.125rem', fontWeight: '600', color: '#ffffff'}}>Recent Trips</h3>
            <button style={{color: '#22c55e', fontSize: '0.875rem', fontWeight: '500'}} 
                    onMouseOver={(e) => e.currentTarget.style.color = '#4ade80'} 
                    onMouseOut={(e) => e.currentTarget.style.color = '#22c55e'}>
              View All
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr style={{borderBottom: '1px solid #333333'}}>
                  <th style={{padding: '0.75rem 0', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#a3a3a3', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Date</th>
                  <th style={{padding: '0.75rem 0', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#a3a3a3', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Mode</th>
                  <th style={{padding: '0.75rem 0', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#a3a3a3', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Distance</th>
                  <th style={{padding: '0.75rem 0', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#a3a3a3', textTransform: 'uppercase', letterSpacing: '0.05em'}}>CO2 Saved</th>
                  <th style={{padding: '0.75rem 0', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#a3a3a3', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Tokens</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{borderBottom: '1px solid #222222', color: '#ffffff'}} className="hover:bg-neutral-900">
                  <td className="py-4 text-sm">Today, 10:30 AM</td>
                  <td className="py-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Icon icon="carbon:bicycle" style={{color: '#22c55e'}} />
                      <span>Cycling</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm">3.2 km</td>
                  <td className="py-4 text-sm">0.8 kg</td>
                  <td className="py-4 text-sm">6.4 GMC</td>
                </tr>
                <tr style={{borderBottom: '1px solid #222222', color: '#ffffff'}} className="hover:bg-neutral-900">
                  <td className="py-4 text-sm">Yesterday, 5:45 PM</td>
                  <td className="py-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Icon icon="carbon:pedestrian" style={{color: '#22c55e'}} />
                      <span>Walking</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm">1.8 km</td>
                  <td className="py-4 text-sm">0.4 kg</td>
                  <td className="py-4 text-sm">3.6 GMC</td>
                </tr>
                <tr style={{borderBottom: '1px solid #222222', color: '#ffffff'}} className="hover:bg-neutral-900">
                  <td className="py-4 text-sm">Yesterday, 8:15 AM</td>
                  <td className="py-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Icon icon="carbon:train" style={{color: '#22c55e'}} />
                      <span>Public Transport</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm">8.5 km</td>
                  <td className="py-4 text-sm">2.1 kg</td>
                  <td className="py-4 text-sm">17.0 GMC</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Premium Features Card */}
        <div className="card-premium">
          <h3 className="text-lg font-semibold mb-4">Premium Features</h3>
          <p className="text-neutral-300 mb-6">Unlock advanced analytics, higher rewards, and exclusive benefits.</p>
          
          <ul className="space-y-3 mb-6">
            <li className="flex items-center space-x-2">
              <Icon icon="carbon:checkmark" className="text-secondary-500" />
              <span>2x Reward Multiplier</span>
            </li>
            <li className="flex items-center space-x-2">
              <Icon icon="carbon:checkmark" className="text-secondary-500" />
              <span>Advanced Trip Analytics</span>
            </li>
            <li className="flex items-center space-x-2">
              <Icon icon="carbon:checkmark" className="text-secondary-500" />
              <span>Priority Verification</span>
            </li>
          </ul>
          
          <button className="btn-primary w-full">Upgrade Now</button>
        </div>
      </div>
    </DashboardLayout>
  );
}