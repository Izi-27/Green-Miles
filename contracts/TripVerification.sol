// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./GMCToken.sol";

contract TripVerification is Initializable, AccessControlUpgradeable, PausableUpgradeable {
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");
    
    enum TransportMode { WALK, BIKE, EV, BUS, CARPOOL }
    
    struct TripData {
        uint256 tripId;
        address user;
        TransportMode mode;
        uint256 distance; // in meters
        uint256 timestamp;
        uint256 carbonSaved; // in grams CO2
        bytes32 routeHash;
        bool verified;
        bool rewardsClaimed;
    }
    
    struct EmissionFactor {
        uint256 co2PerKm; // grams CO2 per km
        uint256 gmcPerKm; // GMC tokens per km (18 decimals)
        bool active;
    }
    
    GMCToken public gmcToken;
    mapping(uint256 => TripData) public trips;
    mapping(TransportMode => EmissionFactor) public emissionFactors;
    mapping(address => uint256[]) public userTrips;
    
    uint256 public nextTripId;
    uint256 public constant MIN_TRIP_DISTANCE = 100; // 100 meters minimum
    uint256 public constant MAX_TRIP_DISTANCE = 100000; // 100km maximum
    
    event TripSubmitted(uint256 indexed tripId, address indexed user, TransportMode mode);
    event TripVerified(uint256 indexed tripId, uint256 carbonSaved);
    event RewardsClaimed(uint256 indexed tripId, address indexed user, uint256 gmcAmount);
    
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }
    
    function initialize(address _gmcToken) public initializer {
        __AccessControl_init();
        __Pausable_init();
        
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(VERIFIER_ROLE, msg.sender);
        
        gmcToken = GMCToken(_gmcToken);
        nextTripId = 1;
        
        // Set default emission factors
        emissionFactors[TransportMode.WALK] = EmissionFactor(0, 10 * 10**18, true); // 0g CO2/km, 10 GMC/km
        emissionFactors[TransportMode.BIKE] = EmissionFactor(0, 8 * 10**18, true); // 0g CO2/km, 8 GMC/km
        emissionFactors[TransportMode.EV] = EmissionFactor(50, 5 * 10**18, true); // 50g CO2/km, 5 GMC/km
        emissionFactors[TransportMode.BUS] = EmissionFactor(70, 3 * 10**18, true); // 70g CO2/km, 3 GMC/km
        emissionFactors[TransportMode.CARPOOL] = EmissionFactor(90, 2 * 10**18, true); // 90g CO2/km, 2 GMC/km
    }
    
    function submitTrip(TransportMode mode, uint256 distance, bytes32 routeHash) external whenNotPaused {
        require(distance >= MIN_TRIP_DISTANCE, "Trip distance too short");
        require(distance <= MAX_TRIP_DISTANCE, "Trip distance too long");
        require(emissionFactors[mode].active, "Transport mode not supported");
        
        uint256 tripId = nextTripId++;
        
        // Calculate carbon saved (compared to average car emissions of ~200g CO2/km)
        uint256 carbonSaved = (200 - emissionFactors[mode].co2PerKm) * distance / 1000; // Convert meters to km
        
        trips[tripId] = TripData({
            tripId: tripId,
            user: msg.sender,
            mode: mode,
            distance: distance,
            timestamp: block.timestamp,
            carbonSaved: carbonSaved,
            routeHash: routeHash,
            verified: false,
            rewardsClaimed: false
        });
        
        userTrips[msg.sender].push(tripId);
        
        emit TripSubmitted(tripId, msg.sender, mode);
    }
    
    function verifyTrip(uint256 tripId, bytes calldata zkProof) external onlyRole(VERIFIER_ROLE) whenNotPaused {
        require(tripId < nextTripId, "Trip does not exist");
        require(!trips[tripId].verified, "Trip already verified");
        
        // In a real implementation, we would verify the ZK proof here
        // For MVP, we'll just mark it as verified
        
        trips[tripId].verified = true;
        
        emit TripVerified(tripId, trips[tripId].carbonSaved);
    }
    
    function claimRewards(uint256 tripId) external whenNotPaused {
        require(tripId < nextTripId, "Trip does not exist");
        require(trips[tripId].user == msg.sender, "Not trip owner");
        require(trips[tripId].verified, "Trip not verified");
        require(!trips[tripId].rewardsClaimed, "Rewards already claimed");
        
        uint256 rewards = calculateRewards(trips[tripId].mode, trips[tripId].distance);
        trips[tripId].rewardsClaimed = true;
        
        // Mint GMC tokens to the user
        gmcToken.mint(msg.sender, rewards);
        
        emit RewardsClaimed(tripId, msg.sender, rewards);
    }
    
    function calculateRewards(TransportMode mode, uint256 distance) public view returns (uint256) {
        // Convert distance from meters to kilometers for calculation
        uint256 distanceInKm = distance / 1000;
        
        // Calculate rewards based on the emission factors
        uint256 rewards = emissionFactors[mode].gmcPerKm * distanceInKm;
        
        return rewards;
    }
    
    function setEmissionFactors(TransportMode mode, uint256 co2PerKm, uint256 gmcPerKm) external onlyRole(DEFAULT_ADMIN_ROLE) {
        emissionFactors[mode] = EmissionFactor({
            co2PerKm: co2PerKm,
            gmcPerKm: gmcPerKm,
            active: true
        });
    }
    
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }
    
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
    
    function getUserTrips(address user) external view returns (uint256[] memory) {
        return userTrips[user];
    }
}