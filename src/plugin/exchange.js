export const ExchangeAbi = [
  {
    'constant': true,
    'inputs': [
      {
        'name': 'onenumber',
        'type': 'uint256',
      },
    ],
    'name': 'getIssueInfoMapNotLimit',
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
        'name': 'fee',
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
      {
        'name': 'remainderCfil',
        'type': 'uint256',
      },
      {
        'name': 'swapoutCfil',
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
        'name': 'onenumber',
        'type': 'uint256',
      },
    ],
    'name': 'withdrawLimit',
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
        'name': 'onenumber',
        'type': 'uint256',
      },
    ],
    'name': 'getIssueInfoMapLimit',
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
      {
        'name': 'remainderCfil',
        'type': 'uint256',
      },
      {
        'name': 'swapoutCfil',
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
        'name': 'onenumber',
        'type': 'uint256',
      },
      {
        'name': 'user',
        'type': 'address',
      },
    ],
    'name': 'getUserInfoNotLimit',
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
        'name': '',
        'type': 'uint256',
      },
    ],
    'name': 'IssueInfoMapLimit',
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
        'name': 'allcrfillimit',
        'type': 'uint256',
      },
      {
        'name': 'swapoutCfil',
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
    'constant': false,
    'inputs': [
      {
        'name': 'onenumber',
        'type': 'uint256',
      },
      {
        'name': 'amount',
        'type': 'uint256',
      },
    ],
    'name': 'swapCfilLimit',
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
    'name': 'IssueInfoMapNotLimit',
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
        'name': 'fee',
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
      {
        'name': 'remainderCfil',
        'type': 'uint256',
      },
      {
        'name': 'swapoutCfil',
        'type': 'uint256',
      },
    ],
    'payable': false,
    'stateMutability': 'view',
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
        'name': 'onenumber',
        'type': 'uint256',
      },
      {
        'name': 'amount',
        'type': 'uint256',
      },
    ],
    'name': 'swapCfilNotLimit',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
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
        'name': 'allcrfillimit',
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
    'name': 'setIssueInfoNumberLimit',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': 'onenumber',
        'type': 'uint256',
      },
      {
        'name': 'user',
        'type': 'address',
      },
    ],
    'name': 'getUserInfoLimit',
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
        'name': 'ratio',
        'type': 'uint256',
      },
      {
        'name': 'fee',
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
    'name': 'setIssueInfoNumberNotLimit',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function',
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': 'onenumber',
        'type': 'uint256',
      },
      {
        'name': 'user',
        'type': 'address',
      },
    ],
    'name': 'getuserSwapCfilNotLimit',
    'outputs': [
      {
        'name': 'nsend',
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
    'constant': true,
    'inputs': [
      {
        'name': 'onenumber',
        'type': 'uint256',
      },
      {
        'name': 'user',
        'type': 'address',
      },
    ],
    'name': 'getuserSwapCfilLimit',
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
        'name': 'onenumber',
        'type': 'uint256',
      },
    ],
    'name': 'withdrawNotLimit',
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
    'name': 'onemapLimit',
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
        'name': '',
        'type': 'uint256',
      },
    ],
    'name': 'onemapNotLimit',
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
        'name': 'ratio',
        'type': 'uint256',
      },
      {
        'indexed': false,
        'name': 'fee',
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
    'name': 'SetIssueInfoNumberNotLimit',
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
        'name': 'onenumber',
        'type': 'uint256',
      },
      {
        'indexed': false,
        'name': 'amount',
        'type': 'uint256',
      },
    ],
    'name': 'SwapCfilNotLimit',
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
        'name': 'onenumber',
        'type': 'uint256',
      },
      {
        'indexed': false,
        'name': 'amount',
        'type': 'uint256',
      },
      {
        'indexed': false,
        'name': 'crfllite',
        'type': 'uint256',
      },
    ],
    'name': 'WithdrawNotLimit',
    'type': 'event',
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
    'name': 'SetIssueInfoNumberLimit',
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
        'name': 'onenumber',
        'type': 'uint256',
      },
      {
        'indexed': false,
        'name': 'amount',
        'type': 'uint256',
      },
    ],
    'name': 'SwapCfilLimit',
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
        'name': 'onenumber',
        'type': 'uint256',
      },
      {
        'indexed': false,
        'name': 'amount',
        'type': 'uint256',
      },
      {
        'indexed': false,
        'name': 'crfllite',
        'type': 'uint256',
      },
    ],
    'name': 'WithdrawLimit',
    'type': 'event',
  },
]
