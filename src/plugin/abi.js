export const abi = [
         {
           inputs: [
             { internalType: 'address', name: 'fdAddr', type: 'address' },
             { internalType: 'address', name: 'efilAddr', type: 'address' },
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
               name: 'fdInterestRate',
               type: 'uint256',
             },
             {
               internalType: 'uint256',
               name: 'efilInterestRate',
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
               name: 'fdInterestRate',
               type: 'uint256',
             },
             {
               internalType: 'uint256',
               name: 'efilInterestRate',
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
               name: 'fdInterestRate',
               type: 'uint256',
             },
             {
               internalType: 'uint256',
               name: 'efilInterestRate',
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
                   name: 'FDInterestRate',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'EFilInterestRate',
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
                   name: 'FDInterestRate',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'EFilInterestRate',
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
             { internalType: 'uint256', name: 'nowInvestFD', type: 'uint256' },
             {
               internalType: 'uint256',
               name: 'nowInvestEFil',
               type: 'uint256',
             },
             { internalType: 'uint256', name: 'totalAffFD', type: 'uint256' },
             { internalType: 'uint256', name: 'fd', type: 'uint256' },
             { internalType: 'uint256', name: 'fdInterest', type: 'uint256' },
             { internalType: 'uint256', name: 'efil', type: 'uint256' },
             { internalType: 'uint256', name: 'efilInterest', type: 'uint256' },
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
                   name: 'FDInterestRate',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'EFilInterestRate',
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
                 { internalType: 'uint256', name: 'ParamFD', type: 'uint256' },
                 {
                   internalType: 'uint256',
                   name: 'FixInterestFD',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'ParamEFil',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'FixInterestEFil',
                   type: 'uint256',
                 },
               ],
               internalType: 'struct DemandInvest',
               name: 'demandFD',
               type: 'tuple',
             },
             {
               components: [
                 { internalType: 'uint256', name: 'Amount', type: 'uint256' },
                 { internalType: 'uint256', name: 'ParamFD', type: 'uint256' },
                 {
                   internalType: 'uint256',
                   name: 'FixInterestFD',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'ParamEFil',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'FixInterestEFil',
                   type: 'uint256',
                 },
               ],
               internalType: 'struct DemandInvest',
               name: 'demandEFil',
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
                   name: 'FDInterestRate',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'EFilInterestRate',
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
                   name: 'FDInterestRate',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'EFilInterestRate',
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
                   name: 'FDInterestRate',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'NewFDInterestRate',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'EFilInterestRate',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'NewEFilInterestRate',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'UpdateTime',
                   type: 'uint256',
                 },
                 { internalType: 'uint256', name: 'ParamFD', type: 'uint256' },
                 {
                   internalType: 'uint256',
                   name: 'ParamEFil',
                   type: 'uint256',
                 },
               ],
               internalType: 'struct DemandPackage',
               name: 'demandFD',
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
                   name: 'FDInterestRate',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'NewFDInterestRate',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'EFilInterestRate',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'NewEFilInterestRate',
                   type: 'uint256',
                 },
                 {
                   internalType: 'uint256',
                   name: 'UpdateTime',
                   type: 'uint256',
                 },
                 { internalType: 'uint256', name: 'ParamFD', type: 'uint256' },
                 {
                   internalType: 'uint256',
                   name: 'ParamEFil',
                   type: 'uint256',
                 },
               ],
               internalType: 'struct DemandPackage',
               name: 'demandEFil',
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
             { internalType: 'uint256', name: 'nowInvestFD', type: 'uint256' },
             {
               internalType: 'uint256',
               name: 'nowInvestEFil',
               type: 'uint256',
             },
             {
               internalType: 'uint256',
               name: 'efilInterestPool',
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
                           name: 'FDInterestRate',
                           type: 'uint256',
                         },
                         {
                           internalType: 'uint256',
                           name: 'EFilInterestRate',
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
