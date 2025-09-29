// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract GMCToken is Initializable, ERC20Upgradeable, AccessControlUpgradeable, PausableUpgradeable {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    
    struct StakeInfo {
        uint256 amount;
        uint256 timestamp;
        uint256 duration;
        uint256 rewardRate;
    }
    
    mapping(address => StakeInfo[]) public userStakes;
    uint256 public constant BASE_REWARD_RATE = 500; // 5% APY in basis points
    
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }
    
    function initialize(string memory name, string memory symbol) public initializer {
        __ERC20_init(name, symbol);
        __AccessControl_init();
        __Pausable_init();
        
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(BURNER_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
    }
    
    function mint(address to, uint256 amount) external onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }
    
    function burn(address from, uint256 amount) external onlyRole(BURNER_ROLE) {
        _burn(from, amount);
    }
    
    function pause() external onlyRole(PAUSER_ROLE) {
        _pause();
    }
    
    function unpause() external onlyRole(PAUSER_ROLE) {
        _unpause();
    }
    
    function stake(uint256 amount, uint256 duration) external whenNotPaused {
        require(amount > 0, "Cannot stake 0 tokens");
        require(duration >= 30 days, "Minimum staking period is 30 days");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        // Calculate reward rate based on duration
        uint256 rewardRate = BASE_REWARD_RATE;
        if (duration >= 180 days) {
            rewardRate = BASE_REWARD_RATE * 2; // Double rewards for 6+ months
        } else if (duration >= 90 days) {
            rewardRate = BASE_REWARD_RATE * 3 / 2; // 1.5x rewards for 3+ months
        }
        
        // Transfer tokens from user to contract
        _transfer(msg.sender, address(this), amount);
        
        // Create stake record
        userStakes[msg.sender].push(StakeInfo({
            amount: amount,
            timestamp: block.timestamp,
            duration: duration,
            rewardRate: rewardRate
        }));
    }
    
    function unstake(uint256 stakeIndex) external whenNotPaused {
        require(stakeIndex < userStakes[msg.sender].length, "Invalid stake index");
        
        StakeInfo storage stakeInfo = userStakes[msg.sender][stakeIndex];
        require(block.timestamp >= stakeInfo.timestamp + stakeInfo.duration, "Staking period not completed");
        
        uint256 rewards = calculateStakeRewards(msg.sender, stakeIndex);
        uint256 totalAmount = stakeInfo.amount + rewards;
        
        // Remove stake by replacing with the last one and popping
        userStakes[msg.sender][stakeIndex] = userStakes[msg.sender][userStakes[msg.sender].length - 1];
        userStakes[msg.sender].pop();
        
        // Return staked tokens plus rewards
        _transfer(address(this), msg.sender, stakeInfo.amount);
        _mint(msg.sender, rewards); // Mint rewards
    }
    
    function calculateStakeRewards(address user, uint256 stakeIndex) public view returns (uint256) {
        require(stakeIndex < userStakes[user].length, "Invalid stake index");
        
        StakeInfo storage stakeInfo = userStakes[user][stakeIndex];
        
        // Calculate time staked (capped at the duration)
        uint256 timeStaked = block.timestamp - stakeInfo.timestamp;
        if (timeStaked > stakeInfo.duration) {
            timeStaked = stakeInfo.duration;
        }
        
        // Calculate rewards: amount * rate * time / (10000 * 365 days)
        uint256 rewards = stakeInfo.amount * stakeInfo.rewardRate * timeStaked / (10000 * 365 days);
        return rewards;
    }
    
    function getUserStakes(address user) external view returns (StakeInfo[] memory) {
        return userStakes[user];
    }
    
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }
}