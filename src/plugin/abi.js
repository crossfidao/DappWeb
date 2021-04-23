export const abi = [
         {
           inputs: [
             { internalType: 'address', name: 'crfiAddr', type: 'address' },
             { internalType: 'address', name: 'cfilAddr', type: 'address' },
           ],
           stateMutability: 'nonpayable',
           type: 'constructor',
         },
         {
           inputs: [
             { internalType: 'address', name: 'admin', type: 'address' },
           ],
           name: 'AddAdmin',
           outputs: [],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [
             {
               internalType: 'enum FinancialType',
               name: '_type',
               type: 'uint8',
             },
             { internalType: 'uint256', name: 'dayTimes', type: 'uint256' },
             {
               internalType: 'uint256',
               name: 'crfiInterestRate',
               type: 'uint256',
             },
             {
               internalType: 'uint256',
               name: 'cfilInterestRate',
               type: 'uint256',
             },
           ],
           name: 'AddPackage',
           outputs: [],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [{ internalType: 'uint256', name: 'rate', type: 'uint256' }],
           name: 'ChangeAffRate',
           outputs: [],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [
             { internalType: 'uint256', name: 'amount', type: 'uint256' },
           ],
           name: 'ChangeAffRequire',
           outputs: [],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [
             {
               internalType: 'enum FinancialType',
               name: 'fType',
               type: 'uint8',
             },
             {
               internalType: 'uint256',
               name: 'crfiInterestRate',
               type: 'uint256',
             },
             {
               internalType: 'uint256',
               name: 'cfilInterestRate',
               type: 'uint256',
             },
           ],
           name: 'ChangeDemandRate',
           outputs: [],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [
             { internalType: 'uint256', name: 'packageID', type: 'uint256' },
             {
               internalType: 'uint256',
               name: 'crfiInterestRate',
               type: 'uint256',
             },
             {
               internalType: 'uint256',
               name: 'cfilInterestRate',
               type: 'uint256',
             },
           ],
           name: 'ChangePackageRate',
           outputs: [],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [
             { internalType: 'address', name: 'suAdmin', type: 'address' },
           ],
           name: 'ChangeSuperAdmin',
           outputs: [],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [
             { internalType: 'address', name: 'admin', type: 'address' },
           ],
           name: 'DelAdmin',
           outputs: [],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [
             { internalType: 'uint256', name: 'packageID', type: 'uint256' },
             { internalType: 'bool', name: 'deleteFlag', type: 'bool' },
           ],
           name: 'DeletePackage',
           outputs: [],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [],
           name: 'GetAllFinancialPackage',
           outputs: [
             {
               components: [
                 {
                   internalType: 'enum FinancialType',
                   name: 'Type',
                   type: 'uint8',
                 },
                 {
                   internalType: 'uint256',
                   name: 'deleteFlag',
                   type: 'uint256',
                 },
                 { internalType: 'uint256', name: 'Days', type: 'uint256' },
                 {
                   internalType: 'uint256',
                   name: 'CRFIInterestRate',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'CFilInterestRate',
                   type: 'uint256',
                 },
                 { internalType: 'uint256', name: 'ID', type: 'uint256' },
               ],
               internalType: 'struct FinancialPackage[]',
               name: 'packages',
               type: 'tuple[]',
             },
           ],
           stateMutability: 'view',
           type: 'function',
         },
         {
           inputs: [],
           name: 'GetFinancialPackage',
           outputs: [
             {
               components: [
                 {
                   internalType: 'enum FinancialType',
                   name: 'Type',
                   type: 'uint8',
                 },
                 {
                   internalType: 'uint256',
                   name: 'deleteFlag',
                   type: 'uint256',
                 },
                 { internalType: 'uint256', name: 'Days', type: 'uint256' },
                 {
                   internalType: 'uint256',
                   name: 'CRFIInterestRate',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'CFilInterestRate',
                   type: 'uint256',
                 },
                 { internalType: 'uint256', name: 'ID', type: 'uint256' },
               ],
               internalType: 'struct FinancialPackage[]',
               name: 'packages',
               type: 'tuple[]',
             },
           ],
           stateMutability: 'view',
           type: 'function',
         },
         {
           inputs: [
             { internalType: 'uint256', name: 'uid', type: 'uint256' },
             { internalType: 'address', name: 'addr', type: 'address' },
           ],
           name: 'GetInvestInfo',
           outputs: [
             { internalType: 'bool', name: 'admin', type: 'bool' },
             { internalType: 'uint256', name: 'id', type: 'uint256' },
             {
               internalType: 'uint256',
               name: 'nowInvestCRFI',
               type: 'uint256',
             },
             {
               internalType: 'uint256',
               name: 'nowInvestCFil',
               type: 'uint256',
             },
             { internalType: 'uint256', name: 'totalAffCRFI', type: 'uint256' },
             { internalType: 'uint256', name: 'crfi', type: 'uint256' },
             { internalType: 'uint256', name: 'crfiInterest', type: 'uint256' },
             {
               internalType: 'uint256',
               name: 'crfiDemandInterest',
               type: 'uint256',
             },
             { internalType: 'uint256', name: 'cfil', type: 'uint256' },
             { internalType: 'uint256', name: 'cfilInterest', type: 'uint256' },
             {
               internalType: 'uint256',
               name: 'cfilDemandInterest',
               type: 'uint256',
             },
           ],
           stateMutability: 'view',
           type: 'function',
         },
         {
           inputs: [{ internalType: 'address', name: 'addr', type: 'address' }],
           name: 'GetInvestRecords',
           outputs: [
             {
               components: [
                 {
                   internalType: 'enum FinancialType',
                   name: 'Type',
                   type: 'uint8',
                 },
                 {
                   internalType: 'uint256',
                   name: 'PackageID',
                   type: 'uint256',
                 },
                 { internalType: 'uint256', name: 'Days', type: 'uint256' },
                 { internalType: 'uint256', name: 'EndTime', type: 'uint256' },
                 {
                   internalType: 'uint256',
                   name: 'CRFIInterestRate',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'CFilInterestRate',
                   type: 'uint256',
                 },
                 { internalType: 'uint256', name: 'AffID', type: 'uint256' },
                 { internalType: 'uint256', name: 'Amount', type: 'uint256' },
                 {
                   internalType: 'uint256',
                   name: 'ReleaseTime',
                   type: 'uint256',
                 },
               ],
               internalType: 'struct QueueData[]',
               name: 'records',
               type: 'tuple[]',
             },
             {
               components: [
                 { internalType: 'uint256', name: 'Amount', type: 'uint256' },
                 {
                   internalType: 'uint256',
                   name: 'ParamCRFI',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'FixInterestCRFI',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'ParamCFil',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'FixInterestCFil',
                   type: 'uint256',
                 },
               ],
               internalType: 'struct DemandInvest',
               name: 'demandCRFI',
               type: 'tuple',
             },
             {
               components: [
                 { internalType: 'uint256', name: 'Amount', type: 'uint256' },
                 {
                   internalType: 'uint256',
                   name: 'ParamCRFI',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'FixInterestCRFI',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'ParamCFil',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'FixInterestCFil',
                   type: 'uint256',
                 },
               ],
               internalType: 'struct DemandInvest',
               name: 'demandCFil',
               type: 'tuple',
             },
           ],
           stateMutability: 'view',
           type: 'function',
         },
         {
           inputs: [{ internalType: 'address', name: 'addr', type: 'address' }],
           name: 'GetInvesterFinRecords',
           outputs: [
             {
               components: [
                 {
                   internalType: 'enum FinancialType',
                   name: 'Type',
                   type: 'uint8',
                 },
                 {
                   internalType: 'uint256',
                   name: 'PackageID',
                   type: 'uint256',
                 },
                 { internalType: 'uint256', name: 'Days', type: 'uint256' },
                 { internalType: 'uint256', name: 'EndTime', type: 'uint256' },
                 {
                   internalType: 'uint256',
                   name: 'CRFIInterestRate',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'CFilInterestRate',
                   type: 'uint256',
                 },
                 { internalType: 'uint256', name: 'AffID', type: 'uint256' },
                 { internalType: 'uint256', name: 'Amount', type: 'uint256' },
                 {
                   internalType: 'uint256',
                   name: 'ReleaseTime',
                   type: 'uint256',
                 },
               ],
               internalType: 'struct QueueData[]',
               name: 'records',
               type: 'tuple[]',
             },
           ],
           stateMutability: 'view',
           type: 'function',
         },
         {
           inputs: [],
           name: 'GetPackages',
           outputs: [
             {
               components: [
                 {
                   internalType: 'enum FinancialType',
                   name: 'Type',
                   type: 'uint8',
                 },
                 {
                   internalType: 'uint256',
                   name: 'deleteFlag',
                   type: 'uint256',
                 },
                 { internalType: 'uint256', name: 'Days', type: 'uint256' },
                 {
                   internalType: 'uint256',
                   name: 'CRFIInterestRate',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'CFilInterestRate',
                   type: 'uint256',
                 },
                 { internalType: 'uint256', name: 'ID', type: 'uint256' },
               ],
               internalType: 'struct FinancialPackage[]',
               name: 'financialPackages',
               type: 'tuple[]',
             },
             {
               components: [
                 {
                   internalType: 'enum FinancialType',
                   name: 'Type',
                   type: 'uint8',
                 },
                 {
                   internalType: 'uint256',
                   name: 'ChangeFlag',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'CRFIInterestRate',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'NewCRFIInterestRate',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'CFilInterestRate',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'NewCFilInterestRate',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'UpdateTime',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'ParamCRFI',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'ParamCFil',
                   type: 'uint256',
                 },
               ],
               internalType: 'struct DemandPackage',
               name: 'demandCRFI',
               type: 'tuple',
             },
             {
               components: [
                 {
                   internalType: 'enum FinancialType',
                   name: 'Type',
                   type: 'uint8',
                 },
                 {
                   internalType: 'uint256',
                   name: 'ChangeFlag',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'CRFIInterestRate',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'NewCRFIInterestRate',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'CFilInterestRate',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'NewCFilInterestRate',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'UpdateTime',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'ParamCRFI',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'ParamCFil',
                   type: 'uint256',
                 },
               ],
               internalType: 'struct DemandPackage',
               name: 'demandCFil',
               type: 'tuple',
             },
           ],
           stateMutability: 'view',
           type: 'function',
         },
         {
           inputs: [],
           name: 'GetSystemInfo',
           outputs: [
             { internalType: 'uint256', name: 'personNum', type: 'uint256' },
             { internalType: 'uint256', name: 'affRate', type: 'uint256' },
             { internalType: 'uint256', name: 'affRequire', type: 'uint256' },
             {
               internalType: 'uint256',
               name: 'nowInvestCRFI',
               type: 'uint256',
             },
             {
               internalType: 'uint256',
               name: 'nowInvestCFil',
               type: 'uint256',
             },
             {
               internalType: 'uint256',
               name: 'cfilInterestPool',
               type: 'uint256',
             },
             {
               internalType: 'uint256',
               name: 'crfiInterestPool',
               type: 'uint256',
             },
           ],
           stateMutability: 'view',
           type: 'function',
         },
         {
           inputs: [],
           name: 'Withdraw',
           outputs: [],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [
             { internalType: 'uint256', name: 'amount', type: 'uint256' },
           ],
           name: 'WithdrawCFilInterestPool',
           outputs: [],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [
             { internalType: 'uint256', name: 'amount', type: 'uint256' },
           ],
           name: 'WithdrawCRFIInterestPool',
           outputs: [],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [],
           name: 'WithdrawDemand',
           outputs: [],
           stateMutability: 'nonpayable',
           type: 'function',
         },
         {
           inputs: [],
           name: 'getChainMDetail',
           outputs: [
             {
               components: [
                 {
                   components: [
                     { internalType: 'uint256', name: 'Next', type: 'uint256' },
                     { internalType: 'uint256', name: 'Prev', type: 'uint256' },
                     { internalType: 'uint256', name: 'My', type: 'uint256' },
                     {
                       components: [
                         {
                           internalType: 'enum FinancialType',
                           name: 'Type',
                           type: 'uint8',
                         },
                         {
                           internalType: 'uint256',
                           name: 'PackageID',
                           type: 'uint256',
                         },
                         {
                           internalType: 'uint256',
                           name: 'Days',
                           type: 'uint256',
                         },
                         {
                           internalType: 'uint256',
                           name: 'EndTime',
                           type: 'uint256',
                         },
                         {
                           internalType: 'uint256',
                           name: 'CRFIInterestRate',
                           type: 'uint256',
                         },
                         {
                           internalType: 'uint256',
                           name: 'CFilInterestRate',
                           type: 'uint256',
                         },
                         {
                           internalType: 'uint256',
                           name: 'AffID',
                           type: 'uint256',
                         },
                         {
                           internalType: 'uint256',
                           name: 'Amount',
                           type: 'uint256',
                         },
                         {
                           internalType: 'uint256',
                           name: 'ReleaseTime',
                           type: 'uint256',
                         },
                       ],
                       internalType: 'struct QueueData',
                       name: 'Data',
                       type: 'tuple',
                     },
                   ],
                   internalType: 'struct ChainItem[]',
                   name: 'rawQueue',
                   type: 'tuple[]',
                 },
                 {
                   components: [
                     {
                       internalType: 'uint256',
                       name: 'First',
                       type: 'uint256',
                     },
                     { internalType: 'uint256', name: 'End', type: 'uint256' },
                     { internalType: 'uint256', name: 'Size', type: 'uint256' },
                   ],
                   internalType: 'struct ChainQueue',
                   name: 'avaiQueue',
                   type: 'tuple',
                 },
               ],
               internalType: 'struct ChainManager',
               name: 'chaimM',
               type: 'tuple',
             },
           ],
           stateMutability: 'view',
           type: 'function',
         },
         {
           inputs: [{ internalType: 'uint256', name: 'id', type: 'uint256' }],
           name: 'getInvestChainDetail',
           outputs: [
             {
               components: [
                 { internalType: 'uint256', name: 'First', type: 'uint256' },
                 { internalType: 'uint256', name: 'End', type: 'uint256' },
                 { internalType: 'uint256', name: 'Size', type: 'uint256' },
               ],
               internalType: 'struct ChainQueue[]',
               name: 'chains',
               type: 'tuple[]',
             },
           ],
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
       ]
