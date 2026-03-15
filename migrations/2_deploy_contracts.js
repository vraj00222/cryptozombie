var ZombieOwnership = artifacts.require("./zombieownership.sol");
var CryptoKitties = artifacts.require("./cryptokitties.sol");

module.exports = async function(deployer) {
    await deployer.deploy(ZombieOwnership);
    await deployer.deploy(CryptoKitties);

    // Link kitty contract to zombie contract
    const zombieInstance = await ZombieOwnership.deployed();
    const kittyInstance = await CryptoKitties.deployed();
    await zombieInstance.setKittyContractAddress(kittyInstance.address);
}
