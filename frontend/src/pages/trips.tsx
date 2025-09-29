import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Icon } from '@iconify/react';

// Type definitions
type TransportMode = 'WALKING' | 'CYCLING' | 'PUBLIC_TRANSPORT' | 'ELECTRIC_VEHICLE';
type TripStatus = 'VERIFIED' | 'PENDING' | 'REJECTED';

interface Trip {
  id: string;
  date: string;
  startLocation: string;
  endLocation: string;
  distance: number;
  transportMode: TransportMode;
  co2Saved: number;
  gmcEarned: number;
  status: TripStatus;
  duration: number;
}

// Mock data for trips
const tripsMockData: Trip[] = [
  {
    id: '1',
    date: '2023-10-15',
    startLocation: 'Home',
    endLocation: 'Office',
    distance: 12.5,
    transportMode: 'CYCLING',
    co2Saved: 2.8,
    gmcEarned: 125,
    status: 'VERIFIED',
    duration: 45,
  },
  {
    id: '2',
    date: '2023-10-14',
    startLocation: 'Office',
    endLocation: 'Shopping Mall',
    distance: 8.2,
    transportMode: 'PUBLIC_TRANSPORT',
    co2Saved: 1.9,
    gmcEarned: 82,
    status: 'VERIFIED',
    duration: 32,
  },
  {
    id: '3',
    date: '2023-10-14',
    startLocation: 'Shopping Mall',
    endLocation: 'Home',
    distance: 15.3,
    transportMode: 'WALKING',
    co2Saved: 3.4,
    gmcEarned: 153,
    status: 'PENDING',
    duration: 180,
  },
  {
    id: '4',
    date: '2023-10-13',
    startLocation: 'Home',
    endLocation: 'Gym',
    distance: 5.7,
    transportMode: 'ELECTRIC_VEHICLE',
    co2Saved: 1.2,
    gmcEarned: 57,
    status: 'VERIFIED',
    duration: 18,
  },
];

// Transport mode icons and colors
const transportModes = {
  WALKING: { icon: 'carbon:pedestrian', color: 'bg-blue-100 text-blue-600', label: 'Walking' },
  CYCLING: { icon: 'carbon:bicycle', color: 'bg-green-100 text-green-600', label: 'Cycling' },
  PUBLIC_TRANSPORT: { icon: 'carbon:train', color: 'bg-purple-100 text-purple-600', label: 'Public Transport' },
  ELECTRIC_VEHICLE: { icon: 'carbon:ev-charge', color: 'bg-orange-100 text-orange-600', label: 'Electric Vehicle' },
};

// Status badges
const statusBadges = {
  VERIFIED: { color: 'bg-green-100 text-green-800', label: 'Verified' },
  PENDING: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
  REJECTED: { color: 'bg-red-100 text-red-800', label: 'Rejected' },
};

export default function Trips() {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [filterMode, setFilterMode] = useState<TransportMode | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Filter trips based on transport mode and search term
  const filteredTrips = tripsMockData.filter(trip => {
    const matchesMode = filterMode === 'ALL' || trip.transportMode === filterMode;
    const matchesSearch = trip.startLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.endLocation.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesMode && matchesSearch;
  });
  
  return (
    <DashboardLayout title="My Trips">
      <div className="mb-6">
        <p className="text-neutral-600 mb-4">
          Track your sustainable journeys and earn GMC tokens for eco-friendly transportation.
        </p>
        
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Icon icon="carbon:search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search trips by location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filterMode === 'ALL' ? 'bg-secondary-500 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
              onClick={() => setFilterMode('ALL')}
            >
              All
            </button>
            {Object.entries(transportModes).map(([mode, { icon, label }]) => (
              <button
                key={mode}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
                  filterMode === mode ? 'bg-secondary-500 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
                onClick={() => setFilterMode(mode as TransportMode)}
              >
                <Icon icon={icon} className="mr-1" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trip List */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {filteredTrips.map((trip) => (
              <div
                key={trip.id}
                className={`card p-4 cursor-pointer transition-all ${
                  selectedTrip?.id === trip.id ? 'ring-2 ring-secondary-500' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedTrip(trip)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${transportModes[trip.transportMode].color}`}>
                      <Icon icon={transportModes[trip.transportMode].icon} className="text-lg" />
                    </div>
                    <div>
                      <h3 className="font-medium">{trip.startLocation} → {trip.endLocation}</h3>
                      <p className="text-sm text-neutral-500">{trip.date}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${statusBadges[trip.status].color}`}>
                    {statusBadges[trip.status].label}
                  </span>
                </div>
                
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-neutral-500">Distance</p>
                    <p className="font-medium">{trip.distance} km</p>
                  </div>
                  <div>
                    <p className="text-neutral-500">CO₂ Saved</p>
                    <p className="font-medium">{trip.co2Saved} kg</p>
                  </div>
                  <div>
                    <p className="text-neutral-500">GMC Earned</p>
                    <p className="font-medium text-secondary-600">{trip.gmcEarned}</p>
                  </div>
                  <div>
                    <p className="text-neutral-500">Duration</p>
                    <p className="font-medium">{trip.duration} min</p>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredTrips.length === 0 && (
              <div className="card p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-neutral-100">
                    <Icon icon="carbon:location" className="text-3xl text-neutral-400" />
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-2">No Trips Found</h3>
                <p className="text-neutral-500">
                  {searchTerm || filterMode !== 'ALL' 
                    ? 'Try adjusting your search or filter criteria.' 
                    : 'Start your first sustainable journey to see it here.'}
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Trip Details */}
        <div className="lg:col-span-1">
          {selectedTrip ? (
            <div className="card p-6 sticky top-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">Trip Details</h3>
                <button
                  onClick={() => setSelectedTrip(null)}
                  className="p-1 hover:bg-neutral-100 rounded"
                >
                  <Icon icon="carbon:close" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
                  <div className={`p-2 rounded-full ${transportModes[selectedTrip.transportMode].color}`}>
                    <Icon icon={transportModes[selectedTrip.transportMode].icon} className="text-xl" />
                  </div>
                  <div>
                    <p className="font-medium">{transportModes[selectedTrip.transportMode].label}</p>
                    <p className="text-sm text-neutral-500">{selectedTrip.date}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">From:</span>
                    <span className="font-medium">{selectedTrip.startLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">To:</span>
                    <span className="font-medium">{selectedTrip.endLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Distance:</span>
                    <span className="font-medium">{selectedTrip.distance} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Duration:</span>
                    <span className="font-medium">{selectedTrip.duration} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">CO₂ Saved:</span>
                    <span className="font-medium text-green-600">{selectedTrip.co2Saved} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">GMC Earned:</span>
                    <span className="font-medium text-secondary-600">{selectedTrip.gmcEarned} GMC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Status:</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${statusBadges[selectedTrip.status].color}`}>
                      {statusBadges[selectedTrip.status].label}
                    </span>
                  </div>
                </div>
                
                {selectedTrip.status === 'PENDING' && (
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start">
                      <Icon icon="carbon:time" className="text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-yellow-800">Verification Pending</p>
                        <p className="text-xs text-yellow-700 mt-1">
                          Your trip is being verified. This usually takes 2-24 hours.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex space-x-2 mt-6">
                  <button className="btn-outline flex-1 py-2 text-sm">
                    <Icon icon="carbon:map" className="mr-1" /> View Route
                  </button>
                  <button className="btn-outline flex-1 py-2 text-sm">
                    <Icon icon="carbon:share" className="mr-1" /> Share
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="card p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-neutral-100">
                  <Icon icon="carbon:location" className="text-3xl text-neutral-400" />
                </div>
              </div>
              <h3 className="font-medium mb-2">Select a Trip</h3>
              <p className="text-sm text-neutral-500">
                Click on a trip from the list to view detailed information.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}