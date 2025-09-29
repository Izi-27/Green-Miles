import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Icon } from '@iconify/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Type definitions
interface EmployeeMetric {
  id: string;
  name: string;
  department: string;
  tripsThisMonth: number;
  co2Saved: number;
  gmcEarned: number;
  lastActive: string;
  avatar: string;
}

interface Campaign {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: number;
  participants: number;
  status: 'active' | 'completed' | 'draft';
  rewards: {
    totalDistributed: number;
    remaining: number;
  };
}

export default function Enterprise() {
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Mock data for enterprise analytics
  const companyStats = {
    totalEmployees: 1247,
    activeCommuters: 892,
    totalCO2Saved: 15420, // kg
    totalGMCDistributed: 45680,
    participationRate: 71.5,
    avgTripsPerEmployee: 18.3,
  };

  const monthlyData = [
    { month: 'Jan', co2Saved: 1200, participants: 650, gmcDistributed: 3200 },
    { month: 'Feb', co2Saved: 1350, participants: 720, gmcDistributed: 3800 },
    { month: 'Mar', co2Saved: 1580, participants: 780, gmcDistributed: 4200 },
    { month: 'Apr', co2Saved: 1420, participants: 850, gmcDistributed: 4600 },
    { month: 'May', co2Saved: 1680, participants: 890, gmcDistributed: 5100 },
    { month: 'Jun', co2Saved: 1750, participants: 920, gmcDistributed: 5400 },
  ];

  const departmentData = [
    { name: 'Engineering', participants: 245, co2Saved: 4200 },
    { name: 'Marketing', participants: 156, co2Saved: 2800 },
    { name: 'Sales', participants: 189, co2Saved: 3100 },
    { name: 'HR', participants: 78, co2Saved: 1200 },
    { name: 'Finance', participants: 134, co2Saved: 2300 },
    { name: 'Operations', participants: 90, co2Saved: 1820 },
  ];

  const transportModeData = [
    { name: 'Cycling', value: 35, color: '#10B981' },
    { name: 'Walking', value: 28, color: '#3B82F6' },
    { name: 'Public Transport', value: 22, color: '#8B5CF6' },
    { name: 'Electric Vehicle', value: 15, color: '#F59E0B' },
  ];

  const topEmployees: EmployeeMetric[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      department: 'Engineering',
      tripsThisMonth: 42,
      co2Saved: 85.2,
      gmcEarned: 210,
      lastActive: '2023-10-15',
      avatar: '👩‍💻',
    },
    {
      id: '2',
      name: 'Mike Rodriguez',
      department: 'Marketing',
      tripsThisMonth: 38,
      co2Saved: 76.4,
      gmcEarned: 190,
      lastActive: '2023-10-15',
      avatar: '👨‍💼',
    },
    {
      id: '3',
      name: 'Emily Watson',
      department: 'Sales',
      tripsThisMonth: 35,
      co2Saved: 70.8,
      gmcEarned: 175,
      lastActive: '2023-10-14',
      avatar: '👩‍💼',
    },
    {
      id: '4',
      name: 'David Kim',
      department: 'Engineering',
      tripsThisMonth: 33,
      co2Saved: 66.6,
      gmcEarned: 165,
      lastActive: '2023-10-15',
      avatar: '👨‍💻',
    },
    {
      id: '5',
      name: 'Lisa Thompson',
      department: 'HR',
      tripsThisMonth: 31,
      co2Saved: 62.4,
      gmcEarned: 155,
      lastActive: '2023-10-13',
      avatar: '👩‍🎓',
    },
  ];

  const activeCampaigns: Campaign[] = [
    {
      id: '1',
      name: 'Bike to Work Challenge',
      description: 'Encourage cycling with bonus rewards',
      startDate: '2023-10-01',
      endDate: '2023-10-31',
      budget: 10000,
      participants: 234,
      status: 'active',
      rewards: {
        totalDistributed: 6500,
        remaining: 3500,
      },
    },
    {
      id: '2',
      name: 'Green Commute Week',
      description: 'Company-wide sustainable transport week',
      startDate: '2023-11-01',
      endDate: '2023-11-07',
      budget: 5000,
      participants: 0,
      status: 'draft',
      rewards: {
        totalDistributed: 0,
        remaining: 5000,
      },
    },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'carbon:dashboard' },
    { id: 'employees', label: 'Employees', icon: 'carbon:user-multiple' },
    { id: 'campaigns', label: 'Campaigns', icon: 'carbon:trophy' },
    { id: 'reports', label: 'ESG Reports', icon: 'carbon:document' },
  ];

  return (
    <DashboardLayout title="Enterprise Dashboard">
      <div className="space-y-6">
        {/* Company Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card">
            <div className="card-content">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Total Employees</p>
                  <p className="text-2xl font-bold text-neutral-900">{companyStats.totalEmployees.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon icon="carbon:user-multiple" className="text-blue-600 text-xl" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Active Commuters</p>
                  <p className="text-2xl font-bold text-green-600">{companyStats.activeCommuters.toLocaleString()}</p>
                  <p className="text-xs text-green-500">+{companyStats.participationRate}% participation</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Icon icon="carbon:earth" className="text-green-600 text-xl" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">CO₂ Saved</p>
                  <p className="text-2xl font-bold text-secondary-600">{companyStats.totalCO2Saved.toLocaleString()} kg</p>
                  <p className="text-xs text-secondary-500">≈ {Math.round(companyStats.totalCO2Saved / 21.77)} trees</p>
                </div>
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <Icon icon="carbon:tree" className="text-secondary-600 text-xl" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">GMC Distributed</p>
                  <p className="text-2xl font-bold text-purple-600">{companyStats.totalGMCDistributed.toLocaleString()}</p>
                  <p className="text-xs text-purple-500">≈ ${(companyStats.totalGMCDistributed * 0.1).toLocaleString()} value</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Icon icon="carbon:wallet" className="text-purple-600 text-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-neutral-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-secondary-500 text-secondary-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon icon={tab.icon} className="mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Trends */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold">Monthly CO₂ Savings</h3>
              </div>
              <div className="card-content">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="co2Saved" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Transport Mode Distribution */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold">Transport Mode Distribution</h3>
              </div>
              <div className="card-content">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={transportModeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {transportModeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {transportModeData.map((mode) => (
                    <div key={mode.name} className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: mode.color }}></div>
                      <span className="text-sm">{mode.name}: {mode.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Department Performance */}
            <div className="card lg:col-span-2">
              <div className="card-header">
                <h3 className="text-lg font-semibold">Department Performance</h3>
              </div>
              <div className="card-content">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={departmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="participants" fill="#3B82F6" name="Participants" />
                      <Bar dataKey="co2Saved" fill="#10B981" name="CO₂ Saved (kg)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'employees' && (
          <div className="space-y-6">
            {/* Top Performers */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold">Top Performers This Month</h3>
                <p className="text-sm text-neutral-600">Employees leading in sustainable commuting</p>
              </div>
              <div className="card-content">
                <div className="space-y-4">
                  {topEmployees.map((employee, index) => (
                    <div key={employee.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-neutral-400">#{index + 1}</span>
                          <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-lg">
                            {employee.avatar}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium">{employee.name}</h4>
                          <p className="text-sm text-neutral-600">{employee.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="text-center">
                          <p className="font-medium text-blue-600">{employee.tripsThisMonth}</p>
                          <p className="text-neutral-500">Trips</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-green-600">{employee.co2Saved} kg</p>
                          <p className="text-neutral-500">CO₂ Saved</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-purple-600">{employee.gmcEarned} GMC</p>
                          <p className="text-neutral-500">Earned</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Employee Management Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="card hover:shadow-md transition-shadow">
                <div className="card-content text-center">
                  <Icon icon="carbon:user-plus" className="text-3xl text-blue-600 mb-2 mx-auto" />
                  <h4 className="font-medium">Invite Employees</h4>
                  <p className="text-sm text-neutral-600">Send invitations to join Green Miles</p>
                </div>
              </button>
              <button className="card hover:shadow-md transition-shadow">
                <div className="card-content text-center">
                  <Icon icon="carbon:download" className="text-3xl text-green-600 mb-2 mx-auto" />
                  <h4 className="font-medium">Export Data</h4>
                  <p className="text-sm text-neutral-600">Download employee activity reports</p>
                </div>
              </button>
              <button className="card hover:shadow-md transition-shadow">
                <div className="card-content text-center">
                  <Icon icon="carbon:settings" className="text-3xl text-purple-600 mb-2 mx-auto" />
                  <h4 className="font-medium">Manage Permissions</h4>
                  <p className="text-sm text-neutral-600">Control employee access levels</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            {/* Active Campaigns */}
            <div className="card">
              <div className="card-header">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Active Campaigns</h3>
                  <button className="btn-primary">
                    <Icon icon="carbon:add" className="mr-2" />
                    Create Campaign
                  </button>
                </div>
              </div>
              <div className="card-content">
                <div className="space-y-4">
                  {activeCampaigns.map((campaign) => (
                    <div key={campaign.id} className="border border-neutral-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{campaign.name}</h4>
                          <p className="text-sm text-neutral-600">{campaign.description}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                          campaign.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-neutral-100 text-neutral-800'
                        }`}>
                          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-neutral-500">Duration</p>
                          <p className="font-medium">{campaign.startDate} - {campaign.endDate}</p>
                        </div>
                        <div>
                          <p className="text-neutral-500">Budget</p>
                          <p className="font-medium">{campaign.budget.toLocaleString()} GMC</p>
                        </div>
                        <div>
                          <p className="text-neutral-500">Participants</p>
                          <p className="font-medium">{campaign.participants}</p>
                        </div>
                        <div>
                          <p className="text-neutral-500">Remaining Budget</p>
                          <p className="font-medium text-green-600">{campaign.rewards.remaining.toLocaleString()} GMC</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Campaign Templates */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold">Campaign Templates</h3>
                <p className="text-sm text-neutral-600">Quick start templates for common campaigns</p>
              </div>
              <div className="card-content">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: 'Bike Week Challenge', icon: 'carbon:bicycle', description: 'Encourage cycling with daily rewards' },
                    { name: 'Public Transport Month', icon: 'carbon:bus', description: 'Promote public transportation usage' },
                    { name: 'Walk to Work Day', icon: 'carbon:pedestrian', description: 'Single day walking challenge' },
                    { name: 'EV Adoption Drive', icon: 'carbon:car-electric', description: 'Incentivize electric vehicle usage' },
                    { name: 'Carbon Neutral Week', icon: 'carbon:earth', description: 'Multi-modal sustainability challenge' },
                    { name: 'Team Competition', icon: 'carbon:trophy', description: 'Department vs department challenge' },
                  ].map((template, index) => (
                    <button key={index} className="p-4 border border-neutral-200 rounded-lg hover:border-secondary-300 hover:bg-secondary-50 transition-colors text-left">
                      <Icon icon={template.icon} className="text-2xl text-secondary-600 mb-2" />
                      <h4 className="font-medium mb-1">{template.name}</h4>
                      <p className="text-sm text-neutral-600">{template.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-6">
            {/* ESG Summary */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold">ESG Impact Summary</h3>
                <p className="text-sm text-neutral-600">Environmental, Social, and Governance metrics</p>
              </div>
              <div className="card-content">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon icon="carbon:earth" className="text-green-600 text-2xl" />
                    </div>
                    <h4 className="font-semibold text-lg">Environmental</h4>
                    <p className="text-2xl font-bold text-green-600 mt-2">{companyStats.totalCO2Saved.toLocaleString()} kg</p>
                    <p className="text-sm text-neutral-600">CO₂ Emissions Avoided</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon icon="carbon:user-multiple" className="text-blue-600 text-2xl" />
                    </div>
                    <h4 className="font-semibold text-lg">Social</h4>
                    <p className="text-2xl font-bold text-blue-600 mt-2">{companyStats.participationRate}%</p>
                    <p className="text-sm text-neutral-600">Employee Engagement</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon icon="carbon:chart-line" className="text-purple-600 text-2xl" />
                    </div>
                    <h4 className="font-semibold text-lg">Governance</h4>
                    <p className="text-2xl font-bold text-purple-600 mt-2">A+</p>
                    <p className="text-sm text-neutral-600">Sustainability Rating</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Report Generation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold">Generate Reports</h3>
                </div>
                <div className="card-content">
                  <div className="space-y-4">
                    {[
                      { name: 'Monthly ESG Report', description: 'Comprehensive monthly sustainability metrics' },
                      { name: 'Carbon Footprint Analysis', description: 'Detailed CO₂ reduction breakdown' },
                      { name: 'Employee Engagement Report', description: 'Participation and satisfaction metrics' },
                      { name: 'ROI Analysis', description: 'Return on investment for sustainability programs' },
                    ].map((report, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
                        <div>
                          <h4 className="font-medium">{report.name}</h4>
                          <p className="text-sm text-neutral-600">{report.description}</p>
                        </div>
                        <button className="btn-secondary text-sm">
                          <Icon icon="carbon:download" className="mr-1" />
                          Generate
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold">Compliance & Certifications</h3>
                </div>
                <div className="card-content">
                  <div className="space-y-4">
                    {[
                      { name: 'ISO 14001', status: 'Compliant', color: 'green' },
                      { name: 'GRI Standards', status: 'Compliant', color: 'green' },
                      { name: 'SASB Framework', status: 'In Progress', color: 'yellow' },
                      { name: 'TCFD Reporting', status: 'Pending', color: 'red' },
                    ].map((cert, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
                        <div>
                          <h4 className="font-medium">{cert.name}</h4>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          cert.color === 'green' ? 'bg-green-100 text-green-800' :
                          cert.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {cert.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}