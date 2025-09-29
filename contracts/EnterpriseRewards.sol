// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./GMCToken.sol";
import "./TripVerification.sol";

contract EnterpriseRewards is Initializable, AccessControlUpgradeable, PausableUpgradeable {
    bytes32 public constant COMPANY_ADMIN_ROLE = keccak256("COMPANY_ADMIN_ROLE");
    
    struct Campaign {
        uint256 campaignId;
        bytes32 companyId;
        string name;
        uint256 startTime;
        uint256 endTime;
        uint256 totalBudget;
        uint256 spentBudget;
        uint256 rewardPerKm;
        TripVerification.TransportMode[] allowedModes;
        bool active;
    }
    
    struct Employee {
        address employeeAddress;
        bytes32 companyId;
        uint256 registrationTime;
        bool active;
    }
    
    GMCToken public gmcToken;
    
    mapping(uint256 => Campaign) public campaigns;
    mapping(bytes32 => mapping(address => Employee)) public employees;
    mapping(address => bytes32) public employeeToCompany;
    mapping(bytes32 => address) public companyAdmins;
    
    uint256 public nextCampaignId;
    
    event CampaignCreated(uint256 indexed campaignId, bytes32 indexed companyId, string name);
    event EmployeeAdded(address indexed employee, bytes32 indexed companyId);
    event EmployeeRemoved(address indexed employee, bytes32 indexed companyId);
    event RewardDistributed(uint256 indexed campaignId, address indexed employee, uint256 amount);
    
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }
    
    function initialize(address _gmcToken) public initializer {
        __AccessControl_init();
        __Pausable_init();
        
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        
        gmcToken = GMCToken(_gmcToken);
        nextCampaignId = 1;
    }
    
    function registerCompany(bytes32 companyId, address admin) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(companyAdmins[companyId] == address(0), "Company already registered");
        
        companyAdmins[companyId] = admin;
        _grantRole(COMPANY_ADMIN_ROLE, admin);
    }
    
    function createCampaign(
        bytes32 companyId,
        string calldata name,
        uint256 duration,
        uint256 budget,
        uint256 rewardPerKm,
        TripVerification.TransportMode[] calldata allowedModes
    ) external whenNotPaused {
        require(companyAdmins[companyId] == msg.sender || hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Not company admin");
        require(duration > 0, "Duration must be positive");
        require(budget > 0, "Budget must be positive");
        require(rewardPerKm > 0, "Reward per km must be positive");
        require(allowedModes.length > 0, "Must allow at least one transport mode");
        
        uint256 campaignId = nextCampaignId++;
        
        campaigns[campaignId] = Campaign({
            campaignId: campaignId,
            companyId: companyId,
            name: name,
            startTime: block.timestamp,
            endTime: block.timestamp + duration,
            totalBudget: budget,
            spentBudget: 0,
            rewardPerKm: rewardPerKm,
            allowedModes: allowedModes,
            active: true
        });
        
        emit CampaignCreated(campaignId, companyId, name);
    }
    
    function addEmployee(address employee, bytes32 companyId) external whenNotPaused {
        require(companyAdmins[companyId] == msg.sender || hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Not company admin");
        require(employeeToCompany[employee] == bytes32(0), "Employee already registered");
        
        employees[companyId][employee] = Employee({
            employeeAddress: employee,
            companyId: companyId,
            registrationTime: block.timestamp,
            active: true
        });
        
        employeeToCompany[employee] = companyId;
        
        emit EmployeeAdded(employee, companyId);
    }
    
    function removeEmployee(address employee, bytes32 companyId) external whenNotPaused {
        require(companyAdmins[companyId] == msg.sender || hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Not company admin");
        require(employeeToCompany[employee] == companyId, "Employee not registered with company");
        
        employees[companyId][employee].active = false;
        employeeToCompany[employee] = bytes32(0);
        
        emit EmployeeRemoved(employee, companyId);
    }
    
    function distributeCorporateReward(uint256 campaignId, address employee, uint256 distance) external whenNotPaused {
        require(campaignId < nextCampaignId, "Campaign does not exist");
        require(campaigns[campaignId].active, "Campaign not active");
        require(block.timestamp >= campaigns[campaignId].startTime, "Campaign not started");
        require(block.timestamp <= campaigns[campaignId].endTime, "Campaign ended");
        
        Campaign storage campaign = campaigns[campaignId];
        bytes32 companyId = campaign.companyId;
        
        require(companyAdmins[companyId] == msg.sender || hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Not company admin");
        require(employeeToCompany[employee] == companyId, "Employee not registered with company");
        require(employees[companyId][employee].active, "Employee not active");
        
        // Calculate reward amount
        uint256 rewardAmount = campaign.rewardPerKm * distance / 1000; // Convert meters to km
        
        // Check if there's enough budget
        require(campaign.spentBudget + rewardAmount <= campaign.totalBudget, "Insufficient campaign budget");
        
        // Update campaign budget
        campaign.spentBudget += rewardAmount;
        
        // Mint GMC tokens to the employee
        gmcToken.mint(employee, rewardAmount);
        
        emit RewardDistributed(campaignId, employee, rewardAmount);
    }
    
    function deactivateCampaign(uint256 campaignId) external whenNotPaused {
        require(campaignId < nextCampaignId, "Campaign does not exist");
        
        Campaign storage campaign = campaigns[campaignId];
        bytes32 companyId = campaign.companyId;
        
        require(companyAdmins[companyId] == msg.sender || hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Not company admin");
        
        campaign.active = false;
    }
    
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }
    
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
    
    function isTransportModeAllowed(uint256 campaignId, TripVerification.TransportMode mode) public view returns (bool) {
        require(campaignId < nextCampaignId, "Campaign does not exist");
        
        Campaign storage campaign = campaigns[campaignId];
        
        for (uint256 i = 0; i < campaign.allowedModes.length; i++) {
            if (campaign.allowedModes[i] == mode) {
                return true;
            }
        }
        
        return false;
    }
}