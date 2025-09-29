import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Icon } from '@iconify/react';

// Type definitions
interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  bio: string;
}

interface NotificationSettings {
  tripVerification: boolean;
  rewardsClaimed: boolean;
  stakingUpdates: boolean;
  marketingEmails: boolean;
  pushNotifications: boolean;
}

interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends';
  shareTrips: boolean;
  shareStats: boolean;
  dataCollection: boolean;
}

export default function Settings() {
  // Mock user data
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    avatar: '👤',
    bio: 'Passionate about sustainable transportation and reducing carbon footprint.',
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    tripVerification: true,
    rewardsClaimed: true,
    stakingUpdates: true,
    marketingEmails: false,
    pushNotifications: true,
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: 'public',
    shareTrips: true,
    shareStats: true,
    dataCollection: true,
  });

  const [walletAddress] = useState<string>('0x742d35Cc6634C0532925a3b8D4C2C4e4C4C4C4C4');
  const [activeTab, setActiveTab] = useState<string>('profile');

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrivacyChange = (key: keyof PrivacySettings, value: any) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'carbon:user' },
    { id: 'wallet', label: 'Wallet', icon: 'carbon:wallet' },
    { id: 'notifications', label: 'Notifications', icon: 'carbon:notification' },
    { id: 'privacy', label: 'Privacy', icon: 'carbon:security' },
  ];

  return (
    <DashboardLayout title="Settings">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="card-content p-0">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium rounded-lg ${
                      activeTab === tab.id
                        ? 'bg-secondary-50 text-secondary-700 border-r-2 border-secondary-500'
                        : 'text-neutral-600 hover:bg-neutral-50'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon icon={tab.icon} className="mr-3 text-lg" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold">Profile Settings</h3>
                <p className="text-sm text-neutral-600">Manage your personal information</p>
              </div>
              <div className="card-content">
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center text-3xl">
                      {userProfile.avatar}
                    </div>
                    <div>
                      <button
                        type="button"
                        className="btn-secondary text-sm"
                      >
                        Change Avatar
                      </button>
                      <p className="text-xs text-neutral-600 mt-1">JPG, PNG or SVG. Max size 2MB.</p>
                    </div>
                  </div>

                  {/* Profile Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={userProfile.name}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={userProfile.email}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={userProfile.phone}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      value={userProfile.bio}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, bio: e.target.value }))}
                      rows={3}
                      className="input-field"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div className="flex justify-end">
                    <button type="submit" className="btn-primary">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Wallet Settings */}
          {activeTab === 'wallet' && (
            <div className="space-y-6">
              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold">Wallet Connection</h3>
                  <p className="text-sm text-neutral-600">Manage your blockchain wallet</p>
                </div>
                <div className="card-content">
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Icon icon="carbon:checkmark" className="text-green-600 text-xl" />
                      </div>
                      <div>
                        <p className="font-medium text-green-800">Wallet Connected</p>
                        <p className="text-sm text-green-600 font-mono">{walletAddress}</p>
                      </div>
                    </div>
                    <button className="btn-secondary text-sm">
                      Disconnect
                    </button>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-neutral-200 rounded-lg">
                      <h4 className="font-medium mb-2">GMC Balance</h4>
                      <p className="text-2xl font-bold text-secondary-600">245.8 GMC</p>
                      <p className="text-sm text-neutral-600">≈ $24.58 USD</p>
                    </div>
                    <div className="p-4 border border-neutral-200 rounded-lg">
                      <h4 className="font-medium mb-2">Staked Amount</h4>
                      <p className="text-2xl font-bold text-purple-600">150.0 GMC</p>
                      <p className="text-sm text-neutral-600">≈ $15.00 USD</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold">Transaction History</h3>
                </div>
                <div className="card-content">
                  <div className="space-y-3">
                    {[
                      { type: 'earned', amount: '+25 GMC', description: 'Trip reward - Cycling', date: '2023-10-15' },
                      { type: 'staked', amount: '-100 GMC', description: 'Staking for 180 days', date: '2023-10-14' },
                      { type: 'claimed', amount: '-50 GMC', description: 'Starbucks reward claimed', date: '2023-10-10' },
                    ].map((tx, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            tx.type === 'earned' ? 'bg-green-100 text-green-600' :
                            tx.type === 'staked' ? 'bg-purple-100 text-purple-600' :
                            'bg-orange-100 text-orange-600'
                          }`}>
                            <Icon icon={
                              tx.type === 'earned' ? 'carbon:add' :
                              tx.type === 'staked' ? 'carbon:piggy-bank' :
                              'carbon:gift'
                            } />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{tx.description}</p>
                            <p className="text-xs text-neutral-600">{tx.date}</p>
                          </div>
                        </div>
                        <span className={`font-medium ${
                          tx.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {tx.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold">Notification Preferences</h3>
                <p className="text-sm text-neutral-600">Choose what notifications you want to receive</p>
              </div>
              <div className="card-content">
                <div className="space-y-6">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">
                          {key === 'tripVerification' && 'Trip Verification'}
                          {key === 'rewardsClaimed' && 'Rewards Claimed'}
                          {key === 'stakingUpdates' && 'Staking Updates'}
                          {key === 'marketingEmails' && 'Marketing Emails'}
                          {key === 'pushNotifications' && 'Push Notifications'}
                        </h4>
                        <p className="text-sm text-neutral-600">
                          {key === 'tripVerification' && 'Get notified when your trips are verified'}
                          {key === 'rewardsClaimed' && 'Notifications about reward claims and deliveries'}
                          {key === 'stakingUpdates' && 'Updates about your staking rewards and periods'}
                          {key === 'marketingEmails' && 'Promotional emails and product updates'}
                          {key === 'pushNotifications' && 'Browser and mobile push notifications'}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={() => handleNotificationChange(key as keyof NotificationSettings)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-secondary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Privacy Settings */}
          {activeTab === 'privacy' && (
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold">Privacy & Security</h3>
                <p className="text-sm text-neutral-600">Control your privacy and data sharing preferences</p>
              </div>
              <div className="card-content">
                <div className="space-y-6">
                  {/* Profile Visibility */}
                  <div>
                    <h4 className="font-medium mb-2">Profile Visibility</h4>
                    <p className="text-sm text-neutral-600 mb-3">Who can see your profile information</p>
                    <div className="space-y-2">
                      {['public', 'private', 'friends'].map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name="profileVisibility"
                            value={option}
                            checked={privacy.profileVisibility === option}
                            onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                            className="mr-3"
                          />
                          <span className="capitalize">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Data Sharing */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Share Trip Data</h4>
                        <p className="text-sm text-neutral-600">Allow others to see your trip statistics</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={privacy.shareTrips}
                          onChange={(e) => handlePrivacyChange('shareTrips', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-secondary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Share Statistics</h4>
                        <p className="text-sm text-neutral-600">Include your data in public leaderboards</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={privacy.shareStats}
                          onChange={(e) => handlePrivacyChange('shareStats', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-secondary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Data Collection</h4>
                        <p className="text-sm text-neutral-600">Allow anonymous usage analytics</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={privacy.dataCollection}
                          onChange={(e) => handlePrivacyChange('dataCollection', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-secondary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary-600"></div>
                      </label>
                    </div>
                  </div>

                  {/* Account Actions */}
                  <div className="pt-6 border-t border-neutral-200">
                    <h4 className="font-medium mb-4">Account Actions</h4>
                    <div className="space-y-3">
                      <button className="w-full text-left p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Export Data</p>
                            <p className="text-sm text-neutral-600">Download all your account data</p>
                          </div>
                          <Icon icon="carbon:download" className="text-neutral-400" />
                        </div>
                      </button>
                      <button className="w-full text-left p-3 border border-red-200 rounded-lg hover:bg-red-50 text-red-600">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Delete Account</p>
                            <p className="text-sm text-red-500">Permanently delete your account and data</p>
                          </div>
                          <Icon icon="carbon:trash-can" className="text-red-400" />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}