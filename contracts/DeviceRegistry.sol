// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol";

contract DeviceRegistry is Initializable, AccessControlUpgradeable, PausableUpgradeable {
    using ECDSAUpgradeable for bytes32;
    
    enum DeviceType { SMARTPHONE, FITNESS_TRACKER, BIKE_COMPUTER, EV_ONBOARD, OBD_MODULE }
    
    struct Device {
        bytes32 deviceId;
        DeviceType deviceType;
        address owner;
        uint256 registrationTime;
        bool active;
        string metadata; // JSON metadata
    }
    
    mapping(bytes32 => Device) public devices;
    mapping(address => bytes32[]) public userDevices;
    mapping(bytes32 => bool) public deviceExists;
    
    event DeviceRegistered(bytes32 indexed deviceId, address indexed owner, DeviceType deviceType);
    event DeviceRevoked(bytes32 indexed deviceId, address indexed owner);
    
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }
    
    function initialize() public initializer {
        __AccessControl_init();
        __Pausable_init();
        
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }
    
    function registerDevice(bytes32 deviceId, DeviceType deviceType, string calldata metadata) external whenNotPaused {
        require(!deviceExists[deviceId], "Device already registered");
        
        devices[deviceId] = Device({
            deviceId: deviceId,
            deviceType: deviceType,
            owner: msg.sender,
            registrationTime: block.timestamp,
            active: true,
            metadata: metadata
        });
        
        userDevices[msg.sender].push(deviceId);
        deviceExists[deviceId] = true;
        
        emit DeviceRegistered(deviceId, msg.sender, deviceType);
    }
    
    function verifyDeviceOwnership(bytes32 deviceId, bytes calldata signature) external view returns (bool) {
        require(deviceExists[deviceId], "Device not registered");
        
        // Create message hash
        bytes32 messageHash = keccak256(abi.encodePacked(deviceId, block.chainid));
        bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();
        
        // Recover signer from signature
        address signer = ethSignedMessageHash.recover(signature);
        
        // Check if signer is the device owner
        return devices[deviceId].owner == signer && devices[deviceId].active;
    }
    
    function revokeDevice(bytes32 deviceId) external whenNotPaused {
        require(deviceExists[deviceId], "Device not registered");
        require(devices[deviceId].owner == msg.sender || hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Not device owner or admin");
        
        devices[deviceId].active = false;
        
        emit DeviceRevoked(deviceId, devices[deviceId].owner);
    }
    
    function getUserDevices(address user) external view returns (bytes32[] memory) {
        return userDevices[user];
    }
    
    function getDeviceDetails(bytes32 deviceId) external view returns (Device memory) {
        require(deviceExists[deviceId], "Device not registered");
        return devices[deviceId];
    }
    
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }
    
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
}