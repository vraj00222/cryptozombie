=============================================
CryptoZombies DApp - Midterm Project
=============================================

Team Members:
- Name: Vraj Patel | CWID: 811318955 | Email: vrajpatel@csu.fullerton.edu

=============================================
Improvements Made (6 Total):
=============================================

1. NICER WEBSITE 
   - Rebuilt the entire frontend with a modern dark-themed UI
   - Card-based layout for zombies with stats, hover effects, and responsive design
   - Tab navigation for My Zombies, All Zombies, Kitties, and Battle Arena sections
   - Modal dialogs for transfer, rename, and feed actions

2. MORE JS FUNCTIONALITY 
   - Added Transfer Zombie functionality (ERC-721 transferFrom)
   - Added Attack/Battle system with win/loss result display
   - Added Rename Zombie functionality (changeName for Level 2+ zombies)
   - Added Feed on Kitty functionality with kitty ID selection

3. KITTY SMART CONTRACT ADDED TO BACKEND 
   - Created a local CryptoKitties.sol contract with createKitty() and getKitty() functions
   - Contract is auto-deployed alongside ZombieOwnership during migration
   - Kitty contract address is automatically linked via setKittyContractAddress()
   - Users can create kitties and feed zombies on them

4. ZOMBIE IMAGES FROM DNA 
   - Each zombie has a unique SVG image generated from its 16-digit DNA
   - DNA determines head color, body color, eye type (5 variants), mouth type (4 variants), and accessories (6 variants)
   - Every zombie looks visually distinct based on its on-chain DNA

5. ZOMBIE ARMY / MULTIPLE ZOMBIES 
   - Removed the 1-zombie-per-account restriction to allow building a zombie army
   - Added getAllZombies() view to show every zombie on the network with owner info
   - "All Zombies" tab displays the full zombie army across all accounts

6. NO HARD-CODED VALUES 
   - Contract addresses are loaded from contract-config.js instead of being hard-coded in HTML
   - User is prompted to enter a custom zombie name instead of using the wallet address
   - Network configuration uses wildcard network_id for flexibility

=============================================
Tech Stack:
=============================================
- Truffle v5.11.5
- Ganache (local blockchain)
- Solidity 0.4.25
- Web3.js v1.2.7
- MetaMask (browser wallet)
- Vanilla HTML/CSS/JavaScript

=============================================
GitHub Repository:
=============================================
https://github.com/vraj00222/cryptozombie

=============================================
Setup Instructions:
=============================================
1. Start Ganache (Quickstart on port 7545)
2. npm install
3. truffle migrate --reset
4. Update contract-config.js with the deployed ZombieOwnership and CryptoKitties addresses from the migration output
5. npx http-server -p 8080
6. Open http://localhost:8080 in a browser with MetaMask
7. Connect MetaMask to Ganache network (RPC URL: http://127.0.0.1:7545, Chain ID: 1337)
8. Import a Ganache account into MetaMask using the private key
