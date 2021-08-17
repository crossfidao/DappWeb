import enLocale from 'element-ui/lib/locale/lang/en'
const cn = {
  // menubar
  dashboard: 'Home',
  cFILInvest: 'cFIL',
  CRFIInvest: 'CRFI',
  wallet: 'Wallet', // ? 保留关键字
  aaa: 'Wallet',
  loading: 'Loading...',

  purchase: 'Stake',
  cycle1: 'Period',
  profit1: 'APY',
  purchaseAmount: 'STAKE Amount',

  inexecution: 'There are transactions in progress...',

  // Header
  staking: 'Borrow',
  aboutCrossFi: 'Official Website',
  auditReport: 'Audit Report',
  supportCenter: 'Docs',
  referralRewards: 'Invite',
  admin: 'Admin',
  borrowMenu: 'Borrow',

  // home
  filStatistics: 'cFIL Statistics',
  crfiStatistics: 'CRFI Statistics',
  // fileCoinDepositTotal: 'Filecoin Deposit Total ',
  fileCoinDepositTotal: 'Deposit<br/>Total',
  lendingTotal: 'Lending<br/>Total',
  crfiDepositTotal: 'Deposit<br/>Total',
  referralRewards: 'Output Total',
  referra: 'total<br/>output',

  // CFIL
  cFILInvestment: 'cFIL STAKING',
  CRFIInvestment: 'CRFI STAKING',
  totalDeposit: 'Total Deposit',

  day: 'Days',
  Remaining: 'Remaining',
  d: 'D',
  h: 'H',
  m: 'M',

  // Wallet
  walletBalance: 'Wallet Balance',
  balance: 'Balance',
  swap: 'SWAP',
  stake: 'Storage pledge',
  myPositions: 'My Stake',
  profit: 'Profit',

  // stake
  stake: 'Borrow',
  stake1: 'Storage pledge',
  staking: 'Storage pledge',
  sFILAssets: 'sFIL Assets',
  pledge: 'Pledge',
  borrow: 'Borrow',
  loanApy: 'Loan APY',
  newProfit: 'New Profit',
  paymentDue: 'Minimum borrowing',
  pledgeRate: 'Pledge Rate',
  repay: 'Repay',
  market: 'Market',
  totalsFIL: 'Total sFIL',
  totalHashrate: 'Total Hashrate',
  cFILLoan: 'cFIL Loan',
  stakePlaceholder: 'Please input the loan amount',
  max: 'MAX',
  availableMarket: 'Available Market',
  confirm: 'Confirm',
  totalIssue: 'Total Issue',
  name: 'Name',
  email: 'Email',
  company: 'Company',
  nodeNumber: 'Node Number',
  toastPaymentDue: 'The loan cannot be less than the minimum value',

  cFILRepay: 'cFIL Repay',
  myLoan: 'My Loan',
  walletBalance: 'wallet Balance',
  trusteeship: 'Trusteeship list',
  sellWholesale: 'sell wholesale sFIL',

  // rewards
  referralRewards: 'Invite',
  claim: 'Copy invite link',
  claimedRewards: 'My Reward',
  caimedPromote: 'My invitation',

  // swap
  filSwap: 'FIL SWAP',
  copy: 'Copy',
  copySucc: 'Copy successfully',
  swapPlaceholder: 'Please input the amount',
  addressPlaceholder: 'Please input your filecoin address',
  addressError: 'Address input error',
  cfilSwap: 'cFIL SWAP',
  exchangeDescription: 'Exchange Description',
  exchangeDescriptiontext1: 'The minimum exchange quantity is 5.',
  exchangeDescriptiontext2:
    'The deposit takes about 10 to 30 minutes after the exchange.',
  exchangeDescriptiontext3:
    'cFIL is a 1:1 token of FIL, and users can exchange cFIL with FIL at any time.',
  exchangeDescriptiontext7: 'Exchange cost              0.02cFIL      ',
  exchangeDescriptiontext4: 'Minimum Exchange Quantity      Any quantity',
  exchangeDescriptiontext5:
    'The deposit takes about 10 to 120 minutes after applying for an exchange.',
  exchangeDescriptiontext6:
    'cFIL is a 1:1 token of FIL, and users can exchange cFIL with FIL at any time.',

  // base
  assets: 'assets',
  cancel: 'cancel',
  confirm: 'confirm',
  // title
  connect: 'connect wallet',
  overview: 'account overview',
  depositCoins: 'deposit coins',
  selectUser: 'select User',
  selectLang: 'select Language',
  copyText: 'copied',

  // home
  fileconinAddress: 'Filecoin address',
  invite: 'my promo code',
  inviteText:
    'get rewarded by inviting the others to invest on cFil with your promo code',
  exchangeDesc:
    'Filecoin transfered to this address will be automatically redeemed to cFil in 1:1 ratio',
  contract: 'contract',
  repurchase: 'repurchase',
  withdraw: 'Withdraw',
  withdrawAll: 'Profit withdrawal',
  eFilDesc: 'cFil can be redeemed in 1:1 ratio by Filecoin',
  FDDesc: 'CRFI can be obtained by staking and mining',
  eFilPlaceholder: 'please input your cFil selling amount',
  invitePlaceholder: 'please input your recommender address',
  FilecoinPlaceholder: 'Please in your Filecoin address',
  mining: 'deposit coins for extra interest',

  // investment
  current: 'current',
  buy: 'buy',
  buyProduct: 'buy product',
  interest: 'interest',
  withtraw: 'withdraw',
  date: 'current time',
  cycle: '30/day/60day/90day',
  maturity: '24*3600s after the selected cycle',
  desc: 'withdrawable',
  buyPlaceholder: 'please input your buyin amount',

  position: 'my position',
  redemption: '{value} value product could be redeemed currently',
  investment: 'investment',
  annualized: 'annualized',

  // assets
  // maturity: 'maturity',
  interestAssets: 'interest assets',
  expireAssets: 'expire assets',
  income: 'income',
  currentInvest: 'current invest',
  fast: 'fast',
  onDemand: 'On Demand',
  expireDate: 'expire date',

  // admin
  interestRate: 'interest rate',
  inviteRate: 'invite rate',
  rate: 'rate',
  interestPool: 'interest pool',

  time: 'day',

  charge: 'charge',
  edit: 'edit',
  config: 'configuration',

  // toast
  minNumberToast: 'Minimum Exchange Quantity is 0.1 cFil.',

  balanceToast: 'insufficient balance, please input after double check',
  toast: 'please input the amount of your buyin',
  empty: 'empty',
  // placeholder
  placeholderFilecoin: 'Please enter the withdrawal amount.',
  networkErr: 'Network error, please switch to another network',
  errorMsg: 'Loading failed, please try again',
  message: {
    name: 'Alice',
  },
  ...enLocale,
}

export default cn
