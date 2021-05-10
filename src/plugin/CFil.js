export const CFilAbi = [
         {
           inputs: [
             {
               internalType: 'address[]',
               name: 'defaultOperators_',
               type: 'address[]',
             },
             { internalType: 'address', name: 'CRFIAddr', type: 'address' },
           ],
           stateMutability: 'nonpayable',
           type: 'constructor',
         },
         {
           anonymous: false,
           inputs: [
             {
               indexed: true,
               internalType: 'address',
               name: 'owner',
               type: 'address',
             },
             {
               indexed: true,
               internalType: 'address',
               name: 'spender',
               type: 'address',
             },
             {
               indexed: false,
               internalType: 'uint256',
               name: 'value',
               type: 'uint256',
             },
           ],
           name: 'Approval',
           type: 'event',
         },
         {
           anonymous: false,
           inputs: [
             {
               indexed: true,
               internalType: 'address',
               name: 'operator',
               type: 'address',
             },
             {
               indexed: true,
               internalType: 'address',
               name: 'tokenHolder',
               type: 'address',
             },
           ],
           name: 'AuthorizedOperator',
           type: 'event',
         },
         {
           anonymous: false,
           inputs: [
             {
               indexed: true,
               internalType: 'address',
               name: 'operator',
               type: 'address',
             },
             {
               indexed: true,
               internalType: 'address',
               name: 'from',
               type: 'address',
             },
             {
               indexed: false,
               internalType: 'uint256',
               name: 'amount',
               type: 'uint256',
             },
             {
               indexed: false,
               internalType: 'bytes',
               name: 'data',
               type: 'bytes',
             },
             {
               indexed: false,
               internalType: 'bytes',
               name: 'operatorData',
               type: 'bytes',
             },
           ],
           name: 'Burned',
           type: 'event',
         },
         {
           anonymous: false,
           inputs: [
             {
               indexed: true,
               internalType: 'address',
               name: 'account',
               type: 'address',
             },
             {
               indexed: false,
               internalType: 'uint256',
               name: 'amount',
               type: 'uint256',
             },
             {
               indexed: false,
               internalType: 'bytes',
               name: 'data',
               type: 'bytes',
             },
           ],
           name: 'BurnedCRFICFil',
           type: 'event',
         },
         {
           anonymous: false,
           inputs: [
             {
               indexed: true,
               internalType: 'address',
               name: 'operator',
               type: 'address',
             },
             {
               indexed: true,
               internalType: 'address',
               name: 'to',
               type: 'address',
             },
             {
               indexed: false,
               internalType: 'uint256',
               name: 'amount',
               type: 'uint256',
             },
             {
               indexed: false,
               internalType: 'bytes',
               name: 'data',
               type: 'bytes',
             },
             {
               indexed: false,
               internalType: 'bytes',
               name: 'operatorData',
               type: 'bytes',
             },
           ],
           name: 'Minted',
           type: 'event',
         },
         {
           anonymous: false,
           inputs: [
             {
               indexed: true,
               internalType: 'address',
               name: 'operator',
               type: 'address',
             },
             {
               indexed: true,
               internalType: 'address',
               name: 'tokenHolder',
               type: 'address',
             },
           ],
           name: 'RevokedOperator',
           type: 'event',
         },
         {
           anonymous: false,
           inputs: [
             {
               indexed: true,
               internalType: 'address',
               name: 'operator',
               type: 'address',
             },
             {
               indexed: true,
               internalType: 'address',
               name: 'from',
               type: 'address',
             },
             {
               indexed: true,
               internalType: 'address',
               name: 'to',
               type: 'address',
             },
             {
               indexed: false,
               internalType: 'uint256',
               name: 'amount',
               type: 'uint256',
             },
             {
               indexed: false,
               internalType: 'bytes',
               name: 'data',
               type: 'bytes',
             },
             {
               indexed: false,
               internalType: 'bytes',
               name: 'operatorData',
               type: 'bytes',
             },
           ],
           name: 'Sent',
           type: 'event',
         },
         {
           anonymous: false,
           inputs: [
             {
               indexed: true,
               internalType: 'address',
               name: 'from',
               type: 'address',
             },
             {
               indexed: true,
               internalType: 'address',
               name: 'to',
               type: 'address',
             },
             {
               indexed: false,
               internalType: 'uint256',
               name: 'value',
               type: 'uint256',
             },
           ],
           name: 'Transfer',
           type: 'event',
         },
         {
           inputs: [
             { internalType: 'address', name: 'adminAddr', type: 'address' },
           ],
           name: 'AddAdmin',
           outputs: [],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [
             { internalType: 'address[]', name: 'addrs', type: 'address[]' },
           ],
           name: 'AddBlackList',
           outputs: [],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [
             { internalType: 'address[]', name: 'addrs', type: 'address[]' },
           ],
           name: 'AddWhiteList',
           outputs: [],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [{ internalType: 'uint256', name: 'rate', type: 'uint256' }],
           name: 'ChangeBurnCFilRateCRFI',
           outputs: [],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [
             {
               internalType: 'enum CFil.Erc777ModeType',
               name: 'mode',
               type: 'uint8',
             },
           ],
           name: 'ChangeMode',
           outputs: [],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [
             { internalType: 'address', name: 'suAdminAddr', type: 'address' },
           ],
           name: 'ChangeSuperAdmin',
           outputs: [],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [
             { internalType: 'address', name: 'adminAddr', type: 'address' },
           ],
           name: 'DelAdmin',
           outputs: [],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [
             { internalType: 'address[]', name: 'addrs', type: 'address[]' },
           ],
           name: 'DelBlackList',
           outputs: [],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [
             { internalType: 'address[]', name: 'addrs', type: 'address[]' },
           ],
           name: 'DelWhiteList',
           outputs: [],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [
             { internalType: 'address[]', name: 'addrs', type: 'address[]' },
           ],
           name: 'FreezeAddr',
           outputs: [],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [
             { internalType: 'address[]', name: 'addrs', type: 'address[]' },
           ],
           name: 'UnfreezeAddr',
           outputs: [],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [
             { internalType: 'uint256', name: 'CRFINum', type: 'uint256' },
           ],
           name: '_calcBurnCFil',
           outputs: [
             { internalType: 'uint256', name: 'CFilNum', type: 'uint256' },
           ],
           stateMutability: 'view',
           type: 'function',
         },
         {
           inputs: [
             { internalType: 'uint256', name: 'CFilNum', type: 'uint256' },
           ],
           name: '_calcNeedBurnCRFI',
           outputs: [
             { internalType: 'uint256', name: 'CRFINum', type: 'uint256' },
           ],
           stateMutability: 'view',
           type: 'function',
         },
         {
           inputs: [{ internalType: 'address', name: '', type: 'address' }],
           name: 'admins',
           outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
           stateMutability: 'view',
           type: 'function',
         },
         {
           inputs: [
             { internalType: 'address', name: 'holder', type: 'address' },
             { internalType: 'address', name: 'spender', type: 'address' },
           ],
           name: 'allowance',
           outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
           stateMutability: 'view',
           type: 'function',
         },
         {
           inputs: [
             { internalType: 'address', name: 'spender', type: 'address' },
             { internalType: 'uint256', name: 'value', type: 'uint256' },
           ],
           name: 'approve',
           outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [
             { internalType: 'address', name: 'operator', type: 'address' },
           ],
           name: 'authorizeOperator',
           outputs: [],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [
             { internalType: 'address', name: 'tokenHolder', type: 'address' },
           ],
           name: 'balanceOf',
           outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
           stateMutability: 'view',
           type: 'function',
         },
         {
           inputs: [{ internalType: 'address', name: '', type: 'address' }],
           name: 'blacklist',
           outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
           stateMutability: 'view',
           type: 'function',
         },
         {
           inputs: [
             { internalType: 'uint256', name: 'amount', type: 'uint256' },
             { internalType: 'bytes', name: 'data', type: 'bytes' },
           ],
           name: 'burn',
           outputs: [],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [],
           name: 'burnCFilRateCRFI',
           outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
           stateMutability: 'view',
           type: 'function',
         },
         {
           inputs: [],
           name: 'decimals',
           outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
           stateMutability: 'pure',
           type: 'function',
         },
         {
           inputs: [],
           name: 'defaultOperators',
           outputs: [
             { internalType: 'address[]', name: '', type: 'address[]' },
           ],
           stateMutability: 'view',
           type: 'function',
         },
         {
           inputs: [],
           name: 'erc777Mode',
           outputs: [
             {
               internalType: 'enum CFil.Erc777ModeType',
               name: '',
               type: 'uint8',
             },
           ],
           stateMutability: 'view',
           type: 'function',
         },
         {
           inputs: [],
           name: 'granularity',
           outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
           stateMutability: 'view',
           type: 'function',
         },
         {
           inputs: [
             { internalType: 'address', name: 'operator', type: 'address' },
             { internalType: 'address', name: 'tokenHolder', type: 'address' },
           ],
           name: 'isOperatorFor',
           outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
           stateMutability: 'view',
           type: 'function',
         },
         {
           inputs: [
             { internalType: 'address', name: 'account', type: 'address' },
             { internalType: 'uint256', name: 'amount', type: 'uint256' },
             { internalType: 'bytes', name: 'userData', type: 'bytes' },
           ],
           name: 'mint',
           outputs: [],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [],
           name: 'name',
           outputs: [{ internalType: 'string', name: '', type: 'string' }],
           stateMutability: 'view',
           type: 'function',
         },
         {
           inputs: [
             { internalType: 'address', name: 'account', type: 'address' },
             { internalType: 'uint256', name: 'amount', type: 'uint256' },
             { internalType: 'bytes', name: 'data', type: 'bytes' },
             { internalType: 'bytes', name: 'operatorData', type: 'bytes' },
           ],
           name: 'operatorBurn',
           outputs: [],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [
             { internalType: 'address', name: 'sender', type: 'address' },
             { internalType: 'address', name: 'recipient', type: 'address' },
             { internalType: 'uint256', name: 'amount', type: 'uint256' },
             { internalType: 'bytes', name: 'data', type: 'bytes' },
             { internalType: 'bytes', name: 'operatorData', type: 'bytes' },
           ],
           name: 'operatorSend',
           outputs: [],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [
             { internalType: 'address', name: 'operator', type: 'address' },
           ],
           name: 'revokeOperator',
           outputs: [],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [
             { internalType: 'address', name: 'recipient', type: 'address' },
             { internalType: 'uint256', name: 'amount', type: 'uint256' },
             { internalType: 'bytes', name: 'data', type: 'bytes' },
           ],
           name: 'send',
           outputs: [],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [],
           name: 'superAdmin',
           outputs: [{ internalType: 'address', name: '', type: 'address' }],
           stateMutability: 'view',
           type: 'function',
         },
         {
           inputs: [],
           name: 'symbol',
           outputs: [{ internalType: 'string', name: '', type: 'string' }],
           stateMutability: 'view',
           type: 'function',
         },
         {
           inputs: [
             { internalType: 'address', name: 'operator', type: 'address' },
             { internalType: 'address', name: 'from', type: 'address' },
             { internalType: 'address', name: 'to', type: 'address' },
             { internalType: 'uint256', name: 'amount', type: 'uint256' },
             { internalType: 'bytes', name: 'userData', type: 'bytes' },
             { internalType: 'bytes', name: 'operatorData', type: 'bytes' },
           ],
           name: 'tokensReceived',
           outputs: [],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [],
           name: 'totalSupply',
           outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
           stateMutability: 'view',
           type: 'function',
         },
         {
           inputs: [
             { internalType: 'address', name: 'recipient', type: 'address' },
             { internalType: 'uint256', name: 'amount', type: 'uint256' },
           ],
           name: 'transfer',
           outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [
             { internalType: 'address', name: 'holder', type: 'address' },
             { internalType: 'address', name: 'recipient', type: 'address' },
             { internalType: 'uint256', name: 'amount', type: 'uint256' },
           ],
           name: 'transferFrom',
           outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [{ internalType: 'address', name: '', type: 'address' }],
           name: 'whitelist',
           outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
           stateMutability: 'view',
           type: 'function',
         },
       ]