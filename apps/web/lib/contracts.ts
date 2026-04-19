export const factoryAbi = [
  {
    type: 'function',
    name: 'createRoom',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'counterparty', type: 'address' },
      { name: 'creatorPrice', type: 'uint256' }
    ],
    outputs: [{ name: 'room', type: 'address' }]
  },
  {
    type: 'function',
    name: 'allRooms',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'address[]' }]
  }
] as const;

export const roomAbi = [
  {
    type: 'function',
    name: 'submitCounterpartyPrice',
    stateMutability: 'payable',
    inputs: [{ name: '_counterpartyPrice', type: 'uint256' }],
    outputs: []
  },
  {
    type: 'function',
    name: 'respondToProposal',
    stateMutability: 'payable',
    inputs: [{ name: 'accept', type: 'bool' }],
    outputs: []
  },
  {
    type: 'function',
    name: 'getStatusLabel',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'string' }]
  },
  {
    type: 'function',
    name: 'finalSettlement',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    type: 'function',
    name: 'creatorPrice',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    type: 'function',
    name: 'counterpartyPrice',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    type: 'function',
    name: 'proposedSettlement',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    type: 'function',
    name: 'hasDeal',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'bool' }]
  },
  {
    type: 'function',
    name: 'partyA',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'address' }]
  },
  {
    type: 'function',
    name: 'partyB',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'address' }]
  },
  {
    type: 'function',
    name: 'acceptedA',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'bool' }]
  },
  {
    type: 'function',
    name: 'acceptedB',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'bool' }]
  },
  {
    type: 'function',
    name: 'decidedA',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'bool' }]
  },
  {
    type: 'function',
    name: 'decidedB',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'bool' }]
  }
] as const;

export const FACTORY_ADDRESS = process.env.NEXT_PUBLIC_FACTORY_ADDRESS as `0x${string}` | undefined;
