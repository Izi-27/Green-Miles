import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Icon } from '@iconify/react';

// Type definitions
interface Reward {
  id: string;
  name: string;
  description: string;
  cost: number;
  category: string;
  image: string;
  available: boolean;
  popularity: number;
}

interface ClaimedReward {
  id: string;
  rewardId: string;
  rewardName: string;
  claimedAt: string;
  status: 'pending' | 'delivered' | 'expired';
  code?: string;
}

// Mock data for rewards marketplace
const rewardsMockData: Reward[] = [
  {
    id: '1',
    name: 'Starbucks Coffee',
    description: '$5 Starbucks gift card',
    cost: 50,
    category: 'Food & Drink',
    image: '☕',
    available: true,
    popularity: 95,
  },
  {
    id: '2',
    name: 'Amazon Gift Card',
    description: '$10 Amazon gift card',
    cost: 100,
    category: 'Shopping',
    image: '🛒',
    available: true,
    popularity: 88,
  },
  {
    id: '3',
    name: 'Netflix Subscription',
    description: '1 month Netflix subscription',
    cost: 150,
    category: 'Entertainment',
    image: '🎬',
    available: true,
    popularity: 76,
  },
  {
    id: '4',
    name: 'Uber Ride Credit',
    description: '$15 Uber ride credit',
    cost: 120,
    category: 'Transportation',
    image: '🚗',
    available: true,
    popularity: 82,
  },
  {
    id: '5',
    name: 'Spotify Premium',
    description: '3 months Spotify Premium',
    cost: 200,
    category: 'Entertainment',
    image: '🎵',
    available: false,
    popularity: 71,
  },
  {
    id: '6',
    name: 'Local Restaurant',
    description: '$20 voucher for eco-friendly restaurants',
    cost: 180,
    category: 'Food & Drink',
    image: '🌱',
    available: true,
    popularity: 64,
  },
];

// Mock data for claimed rewards
const claimedRewardsMockData: ClaimedReward[] = [
  {
    id: '1',
    rewardId: '1',
    rewardName: 'Starbucks Coffee',
    claimedAt: '2023-10-10',
    status: 'delivered',
    code: 'SB-ABC123',
  },
  {
    id: '2',
    rewardId: '2',
    rewardName: 'Amazon Gift Card',
    claimedAt: '2023-10-05',
    status: 'pending',
  },
];

const categories = ['All', 'Food & Drink', 'Shopping', 'Entertainment', 'Transportation'];

export default function Rewards() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [userBalance] = useState<number>(245); // GMC balance
  const [showClaimModal, setShowClaimModal] = useState<boolean>(false);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  // Filter rewards based on selected category
  const filteredRewards = rewardsMockData.filter(reward => 
    selectedCategory === 'All' || reward.category === selectedCategory
  );

  const handleClaimReward = (reward: Reward) => {
    setSelectedReward(reward);
    setShowClaimModal(true);
  };

  const confirmClaim = () => {
    if (selectedReward && userBalance >= selectedReward.cost) {
      alert(`Successfully claimed ${selectedReward.name}! Check your claimed rewards.`);
      setShowClaimModal(false);
      setSelectedReward(null);
    }
  };

  return (
    <DashboardLayout title="Rewards Marketplace">
      <div className="space-y-6">
        {/* User Balance */}
        <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{userBalance} GMC</h2>
              <p className="text-secondary-100">Available Balance</p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-secondary-500 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Rewards Marketplace */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold">Marketplace</h3>
                <p className="text-sm text-neutral-600">Redeem your GMC tokens for rewards</p>
              </div>
              <div className="card-content">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredRewards.map((reward) => (
                    <div
                      key={reward.id}
                      className={`border rounded-lg p-4 ${
                        reward.available ? 'border-neutral-200 hover:border-secondary-300' : 'border-neutral-100 opacity-60'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="text-3xl">{reward.image}</div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-secondary-600">{reward.cost} GMC</div>
                          <div className="text-xs text-neutral-500">
                            {reward.popularity}% popular
                          </div>
                        </div>
                      </div>
                      <h4 className="font-semibold text-neutral-900 mb-1">{reward.name}</h4>
                      <p className="text-sm text-neutral-600 mb-3">{reward.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded">
                          {reward.category}
                        </span>
                        <button
                          className={`text-sm px-3 py-1 rounded ${
                            reward.available && userBalance >= reward.cost
                              ? 'bg-secondary-500 text-white hover:bg-secondary-600'
                              : 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                          }`}
                          onClick={() => handleClaimReward(reward)}
                          disabled={!reward.available || userBalance < reward.cost}
                        >
                          {!reward.available ? 'Unavailable' : userBalance < reward.cost ? 'Insufficient GMC' : 'Claim'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Claimed Rewards */}
          <div>
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold">My Rewards</h3>
                <p className="text-sm text-neutral-600">Recently claimed rewards</p>
              </div>
              <div className="card-content">
                <div className="space-y-3">
                  {claimedRewardsMockData.map((claimed) => (
                    <div key={claimed.id} className="border border-neutral-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{claimed.rewardName}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          claimed.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          claimed.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {claimed.status}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600 mb-2">
                        Claimed on {new Date(claimed.claimedAt).toLocaleDateString()}
                      </p>
                      {claimed.code && (
                        <div className="bg-neutral-50 p-2 rounded text-xs">
                          <span className="font-medium">Code: </span>
                          <span className="font-mono">{claimed.code}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Earning Tips */}
            <div className="card mt-6">
              <div className="card-header">
                <h3 className="text-lg font-semibold">Earn More GMC</h3>
              </div>
              <div className="card-content">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Icon icon="carbon:bicycle" className="text-secondary-500 text-xl" />
                    <div>
                      <p className="text-sm font-medium">Take eco-friendly trips</p>
                      <p className="text-xs text-neutral-600">Earn 10 GMC per km</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon icon="carbon:piggy-bank" className="text-secondary-500 text-xl" />
                    <div>
                      <p className="text-sm font-medium">Stake your tokens</p>
                      <p className="text-xs text-neutral-600">Earn up to 15% APY</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon icon="carbon:user-multiple" className="text-secondary-500 text-xl" />
                    <div>
                      <p className="text-sm font-medium">Refer friends</p>
                      <p className="text-xs text-neutral-600">Get 50 GMC per referral</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Claim Confirmation Modal */}
      {showClaimModal && selectedReward && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">{selectedReward.image}</div>
              <h3 className="text-xl font-bold mb-2">Claim Reward</h3>
              <p className="text-neutral-600">Are you sure you want to claim this reward?</p>
            </div>
            
            <div className="bg-neutral-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{selectedReward.name}</span>
                <span className="font-bold text-secondary-600">{selectedReward.cost} GMC</span>
              </div>
              <p className="text-sm text-neutral-600 mb-3">{selectedReward.description}</p>
              <div className="flex justify-between text-sm">
                <span>Current Balance:</span>
                <span>{userBalance} GMC</span>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span>After Claim:</span>
                <span>{userBalance - selectedReward.cost} GMC</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                className="flex-1 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50"
                onClick={() => setShowClaimModal(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600"
                onClick={confirmClaim}
              >
                Confirm Claim
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}