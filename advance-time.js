// Run this before demo to clear all zombie cooldowns
// Usage: node advance-time.js

const Web3 = require('web3');
const web3 = new Web3('http://127.0.0.1:7545');

console.log('Advancing Ganache time by 1 day...');

web3.currentProvider.send(
  { jsonrpc: '2.0', method: 'evm_increaseTime', params: [86400], id: 1 },
  function (err, result) {
    if (err) { console.error('Error:', err); process.exit(1); }
    web3.currentProvider.send(
      { jsonrpc: '2.0', method: 'evm_mine', params: [], id: 2 },
      function (err2, result2) {
        if (err2) { console.error('Error:', err2); process.exit(1); }
        console.log('Done! Cooldowns cleared. You can now Feed and Battle.');
        process.exit(0);
      }
    );
  }
);
