pragma solidity ^0.4.25;

import "./ownable.sol";

/// @title A local CryptoKitties contract for testing feedOnKitty functionality
contract CryptoKitties is Ownable {

    event Birth(address owner, uint256 kittyId, uint256 genes);

    struct Kitty {
        uint256 genes;
        uint64 birthTime;
        uint32 generation;
    }

    Kitty[] kitties;

    mapping (uint256 => address) public kittyIndexToOwner;

    /// @dev Creates a new kitty with random genes
    function createKitty(uint256 _genes) public returns (uint256) {
        Kitty memory _kitty = Kitty({
            genes: _genes,
            birthTime: uint64(now),
            generation: 0
        });
        uint256 newKittyId = kitties.push(_kitty) - 1;
        kittyIndexToOwner[newKittyId] = msg.sender;
        emit Birth(msg.sender, newKittyId, _genes);
        return newKittyId;
    }

    /// @dev Returns kitty data matching the KittyInterface expected by ZombieFeeding
    function getKitty(uint256 _id) external view returns (
        bool isGestating,
        bool isReady,
        uint256 cooldownIndex,
        uint256 nextActionAt,
        uint256 siringWithId,
        uint256 birthTime,
        uint256 matronId,
        uint256 sireId,
        uint256 generation,
        uint256 genes
    ) {
        Kitty storage kit = kitties[_id];
        isGestating = false;
        isReady = true;
        cooldownIndex = 0;
        nextActionAt = 0;
        siringWithId = 0;
        birthTime = uint256(kit.birthTime);
        matronId = 0;
        sireId = 0;
        generation = uint256(kit.generation);
        genes = kit.genes;
    }

    function totalKitties() public view returns (uint256) {
        return kitties.length;
    }
}
