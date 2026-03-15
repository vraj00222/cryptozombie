var cryptoKittiesABI = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_genes",
                "type": "uint256"
            }
        ],
        "name": "createKitty",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "getKitty",
        "outputs": [
            { "name": "isGestating", "type": "bool" },
            { "name": "isReady", "type": "bool" },
            { "name": "cooldownIndex", "type": "uint256" },
            { "name": "nextActionAt", "type": "uint256" },
            { "name": "siringWithId", "type": "uint256" },
            { "name": "birthTime", "type": "uint256" },
            { "name": "matronId", "type": "uint256" },
            { "name": "sireId", "type": "uint256" },
            { "name": "generation", "type": "uint256" },
            { "name": "genes", "type": "uint256" }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalKitties",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": false, "name": "owner", "type": "address" },
            { "indexed": false, "name": "kittyId", "type": "uint256" },
            { "indexed": false, "name": "genes", "type": "uint256" }
        ],
        "name": "Birth",
        "type": "event"
    }
];
