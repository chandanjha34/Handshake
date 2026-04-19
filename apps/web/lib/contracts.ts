export const factoryAbi = [
  {
    type: 'function',
    name: 'createRoom',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'counterparty', type: 'address' },
      { name: 'weightA', type: 'uint8' }
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
    name: 'submitEncryptedPrice',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'encryptedCiphertext', type: 'uint256' }],
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
  }
] as const;

export const FACTORY_ADDRESS = process.env.NEXT_PUBLIC_FACTORY_ADDRESS as `0x${string}` | undefined;
