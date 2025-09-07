// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DigitalIDStorage {
    // Mapping from hash to boolean to track stored hashes
    mapping(string => bool) private storedHashes;
    
    // Event emitted when a new hash is stored
    event HashStored(string hash, address sender, uint256 timestamp);
    
    // Function to store a new hash
    function storeHash(string memory hash) public {
        require(!storedHashes[hash], "Hash already exists");
        storedHashes[hash] = true;
        emit HashStored(hash, msg.sender, block.timestamp);
    }
    
    // Function to verify if a hash exists
    function verifyHash(string memory hash) public view returns (bool) {
        return storedHashes[hash];
    }
}
