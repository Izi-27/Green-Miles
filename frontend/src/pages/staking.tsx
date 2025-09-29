import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Icon } from '@iconify/react';

export default function Staking() {
  const [stakeAmount, setStakeAmount] = useState<string>('');
  const [stakeDuration, setStakeDuration] = useState<number>(30);
  
  // Mock data
  const userBalance = 245.8;
  const totalStaked = 150.0;
  const availableToStake = userBalance - totalStaked;
  const estimatedRewards = stakeAmount ? parseFloat(stakeAmount) * 0.05 * (stakeDuration / 30) : 0;
  
  const stakingOptions = [
    { days: 30, label: '30 Days', apy: '5%' },
    { days: 90, label: '90 Days', apy: '7.5%' },
    { days: 180, label: '180 Days', apy: '10%' },
    { days: 365, label: '365 Days', apy: '15%' },
  ];
  
  const activeStakes = [
    { id: 1, amount: 50, startDate: '2023-09-15', endDate: '2023-10-15', duration: '30 Days', estimatedReward: 2.5 },
    { id: 2, amount: 100, startDate: '2023-08-01', endDate: '2024-01-28', duration: '180 Days', estimatedReward: 10 },
  ];
  
  const handleStakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Staking ${stakeAmount} GMC for ${stakeDuration} days`);
    // In a real implementation, this would call the smart contract
  };
  
  return (
    <DashboardLayout title="Staking">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card mb-6">
            <h3 className="text-lg font-semibold mb-4">Stake Your GMC Tokens</h3>
            <p className="text-neutral-600 mb-6">
              Stake your GMC tokens to earn rewards and help secure the network. 
              The longer you stake, the higher your rewards.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-neutral-500 mb-2">Available Balance</p>
                <div className="flex items-center space-x-2">
                  <Icon icon="carbon:money" className="text-secondary-500" />
                  <span className="text-2xl font-bold">{userBalance} GMC</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-neutral-500 mb-2">Total Staked</p>
                <div className="flex items-center space-x-2">
                  <Icon icon="carbon:locked" className="text-secondary-500" />
                  <span className="text-2xl font-bold">{totalStaked} GMC</span>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleStakeSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Stake Amount
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    placeholder="Enter amount to stake"
                    className="input-field pr-16"
                    min="1"
                    max={availableToStake}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-neutral-500">GMC</span>
                  </div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-neutral-500">Min: 1 GMC</span>
                  <span className="text-xs text-neutral-500">Available: {availableToStake} GMC</span>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Staking Period
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {stakingOptions.map((option) => (
                    <button
                      key={option.days}
                      type="button"
                      className={`p-3 rounded-lg border ${
                        stakeDuration === option.days
                          ? 'border-secondary-500 bg-secondary-50 text-secondary-700'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                      onClick={() => setStakeDuration(option.days)}
                    >
                      <div className="text-sm font-medium">{option.label}</div>
                      <div className="text-xs text-neutral-500">APY: {option.apy}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="bg-neutral-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-neutral-600">Estimated Rewards</span>
                  <span className="text-sm font-medium">{estimatedRewards.toFixed(2)} GMC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-600">Unlock Date</span>
                  <span className="text-sm font-medium">
                    {new Date(Date.now() + stakeDuration * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="btn-primary w-full"
                disabled={!stakeAmount || parseFloat(stakeAmount) <= 0 || parseFloat(stakeAmount) > availableToStake}
              >
                Stake Tokens
              </button>
            </form>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Active Stakes</h3>
            
            {activeStakes.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Amount</th>
                      <th className="py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Start Date</th>
                      <th className="py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">End Date</th>
                      <th className="py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Duration</th>
                      <th className="py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Est. Reward</th>
                      <th className="py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeStakes.map((stake) => (
                      <tr key={stake.id} className="border-b border-neutral-100">
                        <td className="py-4 text-sm font-medium">{stake.amount} GMC</td>
                        <td className="py-4 text-sm">{stake.startDate}</td>
                        <td className="py-4 text-sm">{stake.endDate}</td>
                        <td className="py-4 text-sm">{stake.duration}</td>
                        <td className="py-4 text-sm">{stake.estimatedReward} GMC</td>
                        <td className="py-4 text-sm">
                          <button className="text-secondary-500 hover:text-secondary-600 font-medium">
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="mb-4">
                  <Icon icon="carbon:money" className="text-neutral-300 text-4xl mx-auto" />
                </div>
                <h4 className="text-lg font-medium mb-2">No Active Stakes</h4>
                <p className="text-neutral-500 mb-4">You don't have any active stakes yet.</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="card mb-6">
            <h3 className="text-lg font-semibold mb-4">Staking Benefits</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="mt-0.5">
                  <Icon icon="carbon:chart-line" className="text-secondary-500" />
                </div>
                <div>
                  <p className="font-medium">Earn Passive Income</p>
                  <p className="text-sm text-neutral-600">Earn up to 15% APY on your staked tokens</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="mt-0.5">
                  <Icon icon="carbon:earth" className="text-secondary-500" />
                </div>
                <div>
                  <p className="font-medium">Support Sustainability</p>
                  <p className="text-sm text-neutral-600">Help secure the network and promote green transportation</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="mt-0.5">
                  <Icon icon="carbon:badge" className="text-secondary-500" />
                </div>
                <div>
                  <p className="font-medium">Premium Status</p>
                  <p className="text-sm text-neutral-600">Unlock premium features with higher stake amounts</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="card-premium">
            <h3 className="text-lg font-semibold mb-4">Premium Staking</h3>
            <p className="text-neutral-300 mb-6">
              Stake 500+ GMC tokens to unlock premium staking benefits and higher rewards.
            </p>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-center space-x-2">
                <Icon icon="carbon:checkmark" className="text-secondary-500" />
                <span>20% APY on 365-day stakes</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon icon="carbon:checkmark" className="text-secondary-500" />
                <span>Priority reward distribution</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon icon="carbon:checkmark" className="text-secondary-500" />
                <span>Voting rights on protocol updates</span>
              </li>
            </ul>
            
            <button className="btn-primary w-full">Upgrade Now</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}