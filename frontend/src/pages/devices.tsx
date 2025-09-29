import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Icon } from '@iconify/react';

// Type definitions
type DeviceType = 'SMARTPHONE' | 'FITNESS_TRACKER' | 'BIKE_COMPUTER' | 'EV_ONBOARD' | 'OBD_MODULE';

interface Device {
  id: string;
  name: string;
  deviceId: string;
  deviceType: DeviceType;
  registeredAt: string;
  lastActive: string;
  active: boolean;
}

// Mock data for devices
const devicesMockData: Device[] = [
  {
    id: '1',
    name: 'iPhone 13 Pro',
    deviceId: '0x7a3bc7e5d9b2f1a8c6e4d0b9f8a7c6e5d4b3a2f1',
    deviceType: 'SMARTPHONE',
    registeredAt: '2023-09-15',
    lastActive: '2023-10-15',
    active: true,
  },
  {
    id: '2',
    name: 'Garmin Forerunner 945',
    deviceId: '0x3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d',
    deviceType: 'FITNESS_TRACKER',
    registeredAt: '2023-08-20',
    lastActive: '2023-10-14',
    active: true,
  },
  {
    id: '3',
    name: 'Wahoo ELEMNT BOLT',
    deviceId: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
    deviceType: 'BIKE_COMPUTER',
    registeredAt: '2023-07-10',
    lastActive: '2023-10-10',
    active: true,
  }
];

// Device type icons and labels
const deviceTypes = {
  SMARTPHONE: { icon: 'carbon:mobile', label: 'Smartphone' },
  FITNESS_TRACKER: { icon: 'carbon:watch', label: 'Fitness Tracker' },
  BIKE_COMPUTER: { icon: 'carbon:bicycle', label: 'Bike Computer' },
  EV_ONBOARD: { icon: 'carbon:ev-charge', label: 'EV Onboard' },
  OBD_MODULE: { icon: 'carbon:car', label: 'OBD Module' },
};

export default function Devices() {
  const [showAddDevice, setShowAddDevice] = useState<boolean>(false);
  const [newDeviceName, setNewDeviceName] = useState<string>('');
  const [newDeviceType, setNewDeviceType] = useState<DeviceType>('SMARTPHONE');
  
  const handleAddDevice = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Adding new device: ${newDeviceName} (${newDeviceType})`);
    // In a real implementation, this would call the API
    setShowAddDevice(false);
    setNewDeviceName('');
    setNewDeviceType('SMARTPHONE');
  };
  
  return (
    <DashboardLayout title="My Devices">
      <div className="mb-6 flex justify-between items-center">
        <p className="text-neutral-600">
          Manage your connected devices for trip verification and data collection.
        </p>
        <button 
          className="btn-primary flex items-center space-x-2"
          onClick={() => setShowAddDevice(true)}
        >
          <Icon icon="carbon:add" />
          <span>Add New Device</span>
        </button>
      </div>
      
      {/* Device List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devicesMockData.map((device) => (
          <div key={device.id} className="card">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-secondary-100">
                  <Icon 
                    icon={deviceTypes[device.deviceType].icon} 
                    className="text-xl text-secondary-500" 
                  />
                </div>
                <div>
                  <h3 className="font-medium">{device.name}</h3>
                  <p className="text-sm text-neutral-500">{deviceTypes[device.deviceType].label}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                  device.active ? 'bg-green-100 text-green-800' : 'bg-neutral-100 text-neutral-800'
                }`}>
                  {device.active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-neutral-500">Device ID</span>
                <span className="text-sm font-mono">{`${device.deviceId.substring(0, 6)}...${device.deviceId.substring(device.deviceId.length - 4)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-neutral-500">Registered</span>
                <span className="text-sm">{device.registeredAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-neutral-500">Last Active</span>
                <span className="text-sm">{device.lastActive}</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="btn-outline flex-1 py-1.5 text-sm">
                <Icon icon="carbon:view" className="mr-1" /> View Details
              </button>
              <button className="btn-outline flex-1 py-1.5 text-sm text-accent-red border-accent-red hover:bg-accent-red">
                <Icon icon="carbon:trash-can" className="mr-1" /> Remove
              </button>
            </div>
          </div>
        ))}
        
        {/* Add Device Card */}
        <div 
          className={`card border-2 border-dashed border-neutral-200 flex flex-col items-center justify-center p-6 cursor-pointer hover:border-secondary-300 transition-colors ${
            showAddDevice ? 'hidden' : ''
          }`}
          onClick={() => setShowAddDevice(true)}
        >
          <div className="p-3 rounded-full bg-neutral-100 mb-3">
            <Icon icon="carbon:add" className="text-xl text-neutral-500" />
          </div>
          <h3 className="font-medium mb-1">Add New Device</h3>
          <p className="text-sm text-neutral-500 text-center">
            Connect a new device to track your sustainable trips
          </p>
        </div>
      </div>
      
      {/* Add Device Modal */}
      {showAddDevice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-premium max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Device</h3>
              <button 
                className="p-1 hover:bg-neutral-100 rounded"
                onClick={() => setShowAddDevice(false)}
              >
                <Icon icon="carbon:close" />
              </button>
            </div>
            
            <form onSubmit={handleAddDevice}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Device Name
                </label>
                <input
                  type="text"
                  value={newDeviceName}
                  onChange={(e) => setNewDeviceName(e.target.value)}
                  placeholder="Enter device name"
                  className="input-field"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Device Type
                </label>
                <select
                  value={newDeviceType}
                  onChange={(e) => setNewDeviceType(e.target.value as DeviceType)}
                  className="input-field"
                  required
                >
                  {Object.entries(deviceTypes).map(([type, { label }]) => (
                    <option key={type} value={type}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  type="button" 
                  className="btn-outline flex-1"
                  onClick={() => setShowAddDevice(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary flex-1"
                  disabled={!newDeviceName}
                >
                  Add Device
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}