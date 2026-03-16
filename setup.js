const Web3 = require('web3');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const METAMASK_ADDRESS = '0x92C481Da034F568F66D2689aB04822694a6A094e';
const web3 = new Web3('http://127.0.0.1:7545');

async function setup() {
    // Step 1: Check Ganache is running
    console.log('\n=== STEP 1: Checking Ganache ===');
    try {
        const block = await web3.eth.getBlockNumber();
        console.log('Ganache is running. Block:', block);
    } catch(e) {
        console.error('ERROR: Ganache is NOT running!');
        console.error('Start Ganache first in another terminal:');
        console.error('  npx ganache --port 7545 --chain.chainId 1337');
        process.exit(1);
    }

    // Step 2: Deploy contracts
    console.log('\n=== STEP 2: Deploying contracts ===');
    try {
        const output = execSync('truffle migrate --reset', { cwd: __dirname, encoding: 'utf8' });
        console.log('Contracts deployed!');

        // Extract addresses from output
        const zombieMatch = output.match(/Replacing 'ZombieOwnership'[\s\S]*?> contract address:\s+(0x[a-fA-F0-9]+)/);
        const kittyMatch = output.match(/Replacing 'CryptoKitties'[\s\S]*?> contract address:\s+(0x[a-fA-F0-9]+)/) ||
                          output.match(/Deploying 'CryptoKitties'[\s\S]*?> contract address:\s+(0x[a-fA-F0-9]+)/);

        if (!zombieMatch && !kittyMatch) {
            // Try Deploying pattern
            const zombieMatch2 = output.match(/Deploying 'ZombieOwnership'[\s\S]*?> contract address:\s+(0x[a-fA-F0-9]+)/);
            const kittyMatch2 = output.match(/Deploying 'CryptoKitties'[\s\S]*?> contract address:\s+(0x[a-fA-F0-9]+)/);
            if (zombieMatch2) var zombieAddr = zombieMatch2[1];
            if (kittyMatch2) var kittyAddr = kittyMatch2[1];
        }

        var zombieAddr = zombieAddr || (zombieMatch && zombieMatch[1]);
        var kittyAddr = kittyAddr || (kittyMatch && kittyMatch[1]);

        if (!zombieAddr || !kittyAddr) {
            // Fallback: read from build artifacts
            const zombieBuild = JSON.parse(fs.readFileSync(path.join(__dirname, 'build/contracts/ZombieOwnership.json')));
            const kittyBuild = JSON.parse(fs.readFileSync(path.join(__dirname, 'build/contracts/CryptoKitties.json')));
            const networkKeys1 = Object.keys(zombieBuild.networks);
            const networkKeys2 = Object.keys(kittyBuild.networks);
            zombieAddr = zombieBuild.networks[networkKeys1[networkKeys1.length - 1]].address;
            kittyAddr = kittyBuild.networks[networkKeys2[networkKeys2.length - 1]].address;
        }

        console.log('ZombieOwnership:', zombieAddr);
        console.log('CryptoKitties:', kittyAddr);

        // Step 3: Update contract-config.js
        console.log('\n=== STEP 3: Updating contract-config.js ===');
        const configContent = `// Auto-generated after truffle migrate - update these after each deployment
var CONTRACT_CONFIG = {
    zombieOwnershipAddress: "${zombieAddr}",
    cryptoKittiesAddress: "${kittyAddr}"
};
`;
        fs.writeFileSync(path.join(__dirname, 'contract-config.js'), configContent);
        console.log('contract-config.js updated!');

    } catch(e) {
        console.error('Deploy failed:', e.message);
        process.exit(1);
    }

    // Step 4: Send ETH to MetaMask
    console.log('\n=== STEP 4: Sending 50 ETH to MetaMask ===');
    const accounts = await web3.eth.getAccounts();
    await web3.eth.sendTransaction({
        from: accounts[0],
        to: METAMASK_ADDRESS,
        value: web3.utils.toWei('50', 'ether')
    });
    console.log('50 ETH sent to', METAMASK_ADDRESS);

    // Step 5: Advance time
    console.log('\n=== STEP 5: Advancing time by 1 day ===');
    await new Promise((resolve, reject) => {
        web3.currentProvider.send({ jsonrpc: '2.0', method: 'evm_increaseTime', params: [86400], id: 1 }, (err) => {
            if (err) reject(err);
            web3.currentProvider.send({ jsonrpc: '2.0', method: 'evm_mine', params: [], id: 2 }, (err2) => {
                if (err2) reject(err2);
                resolve();
            });
        });
    });
    console.log('Time advanced! Cooldowns cleared.');

    console.log('\n========================================');
    console.log('SETUP COMPLETE!');
    console.log('========================================');
    console.log('1. Open http://127.0.0.1:8080');
    console.log('2. Hard refresh: Cmd + Shift + R');
    console.log('3. MetaMask: make sure Localhost 8545 is selected');
    console.log('4. MetaMask: Settings > Advanced > Clear activity data');
    console.log('5. Start creating zombies!');
    console.log('========================================\n');
    process.exit(0);
}

setup().catch(e => { console.error(e); process.exit(1); });
