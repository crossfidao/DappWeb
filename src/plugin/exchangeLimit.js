export const ExchangeLimitAbi = [
  {
    'constant': true,
    'inputs': [
      {
        'name': '',
        'type': 'address',
      },
    ],
    'name': 'owners',
    'outputs': [
      {
        'name': '',
        'type': 'bool',
      },
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': 'qinumber',
        'type': 'uint256',
      },
    ],
    'name': 'getIssueInfoMap',
    'outputs': [
      {
        'name': 'issuenumber',
        'type': 'uint256',
      },
      {
        'name': 'totalCfil',
        'type': 'uint256',
      },
      {
        'name': 'totalDepoistCrfil',
        'type': 'uint256',
      },
      {
        'name': 'userlimit',
        'type': 'uint256',
      },
      {
        'name': 'ratio',
        'type': 'uint256',
      },
      {
        'name': 'starttime',
        'type': 'uint256',
      },
      {
        'name': 'endtime',
        'type': 'uint256',
      },
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': 'qinumber',
        'type': 'uint256',
      },
      {
        'name': 'user',
        'type': 'address',
      },
    ],
    'name': 'getUserInfo',
    'outputs': [
      {
        'name': 'useraddress',
        'type': 'address',
      },
      {
        'name': 'Crfilnum',
        'type': 'uint256',
      },
      {
        'name': 'isentry',
        'type': 'bool',
      },
      {
        'name': 'hadwithdraw',
        'type': 'uint256',
      },
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': 'qinumber',
        'type': 'uint256',
      },
      {
        'name': 'user',
        'type': 'address',
      },
    ],
    'name': 'getuserSwapCfil',
    'outputs': [
      {
        'name': 'cfils',
        'type': 'uint256',
      },
      {
        'name': 'crfllite',
        'type': 'uint256',
      },
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': 'qinumber',
        'type': 'uint256',
      },
    ],
    'name': 'withdraw',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'governance',
    'outputs': [
      {
        'name': '',
        'type': 'address',
      },
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'CRFIL',
    'outputs': [
      {
        'name': '',
        'type': 'address',
      },
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': 'amount',
        'type': 'uint256',
      },
    ],
    'name': 'getCFIL',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'numbs',
    'outputs': [
      {
        'name': '',
        'type': 'bytes32',
      },
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_owner',
        'type': 'address',
      },
    ],
    'name': 'addOwner',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'CFIL',
    'outputs': [
      {
        'name': '',
        'type': 'address',
      },
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': 'number',
        'type': 'uint256',
      },
      {
        'name': 'totalCfil',
        'type': 'uint256',
      },
      {
        'name': 'userlimit',
        'type': 'uint256',
      },
      {
        'name': 'ratio',
        'type': 'uint256',
      },
      {
        'name': 'starttime',
        'type': 'uint256',
      },
      {
        'name': 'endtime',
        'type': 'uint256',
      },
    ],
    'name': 'setIssueInfoNumber',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': 'amount',
        'type': 'uint256',
      },
    ],
    'name': 'getCRFIL',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': 'qinumber',
        'type': 'uint256',
      },
      {
        'name': 'amount',
        'type': 'uint256',
      },
    ],
    'name': 'swapCfil',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '',
        'type': 'uint256',
      },
    ],
    'name': 'IssueInfoMap',
    'outputs': [
      {
        'name': 'issuenumber',
        'type': 'uint256',
      },
      {
        'name': 'totalCfil',
        'type': 'uint256',
      },
      {
        'name': 'totalDepoistCrfil',
        'type': 'uint256',
      },
      {
        'name': 'ratio',
        'type': 'uint256',
      },
      {
        'name': 'userlimit',
        'type': 'uint256',
      },
      {
        'name': 'starttime',
        'type': 'uint256',
      },
      {
        'name': 'endtime',
        'type': 'uint256',
      },
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function',
  },
  {
    'inputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'constructor',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'name': 'number',
        'type': 'uint256',
      },
      {
        'indexed': false,
        'name': 'totalCfil',
        'type': 'uint256',
      },
      {
        'indexed': false,
        'name': 'userlimit',
        'type': 'uint256',
      },
      {
        'indexed': false,
        'name': 'ratio',
        'type': 'uint256',
      },
      {
        'indexed': false,
        'name': 'starttime',
        'type': 'uint256',
      },
      {
        'indexed': false,
        'name': 'endtime',
        'type': 'uint256',
      },
    ],
    'name': 'SetIssueInfoNumber',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'name': 'user',
        'type': 'address',
      },
      {
        'indexed': false,
        'name': 'qinumber',
        'type': 'uint256',
      },
      {
        'indexed': false,
        'name': 'amount',
        'type': 'uint256',
      },
    ],
    'name': 'SwapCfil',
    'type': 'event',
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'name': 'user',
        'type': 'address',
      },
      {
        'indexed': false,
        'name': 'qinumber',
        'type': 'uint256',
      },
      {
        'indexed': false,
        'name': 'amount',
        'type': 'uint256',
      },
    ],
    'name': 'Withdraw',
    'type': 'event',
  },
]
