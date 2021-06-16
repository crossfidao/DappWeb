import enLocale from 'element-ui/lib/locale/lang/en'
const cn = {
  // menubar
  dashboard: 'Home',
  cFILInvest: 'cFIL',
  CRFIInvest: 'CRFI',
  wallet: '钱包', // ? 保留关键字
  aaa: 'AAA',

  purchase: '质押',
  cycle1: '周期',
  profit1: 'APY',
  purchaseAmount: '质押数量',

  inexecution: '无法执行',

  // Header
  staking: '借贷',
  aboutCrossFi: '官网',
  auditReport: '安全审计',
  supportCenter: '文档',
  referralRewards: '邀请',
  admin: '管理',

  borrowMenu: '借贷',

  // home
  filStatistics: 'cFIL统计',
  crfiStatistics: 'CRFI统计',
  fileCoinDepositTotal: 'cFIL<br/>总存入',
  // fileCoinDepositTotal: 'FIL 质押总数',
  lendingTotal: 'cFIL<br/>总借出',
  crfiDepositTotal: 'CRFI<br/>质押总数',
  referralRewards: '推荐奖',
  referra: 'CRFI<br/>总产出',

  // CFIL
  cFILInvestment: 'cFIL STAKING',
  CRFIInvestment: 'CRFI STAKING',
  totalDeposit: '总质押',
  // purchase: '购买',
  // purchaseAmount: '购买数',
  day: '天',
  Remaining: '剩余',

  d: '天',
  h: '时',
  m: '分',

  // Wallet
  walletBalance: '钱包余额',
  balance: '余额',
  swap: '兑换',
  stake: '存力质押',
  myPositions: '我的存款',
  profit: '收益',

  // stake
  stake: '借贷',
  stake1: '存力质押',
  staking: '理财中',
  staking: '借贷',
  sFILAssets: 'sFIL 余额',
  pledge: '质押',
  borrow: '借',
  loanApy: '借贷年化',
  newProfit: '新收益',
  paymentDue: '支付期限',
  pledgeRate: '借出率',
  repay: '归还',
  market: '市场',
  totalsFIL: '总 sFIL',
  totalHashrate: '总占用率',
  cFILLoan: 'cFIL 贷',
  stakePlaceholder: '输入贷款金额',
  max: '最大',
  availableMarket: '可用池余额',
  confirm: '确认',
  totalIssue: '总发行',
  name: '姓名',
  email: 'EMAIL',
  company: '公司',
  nodeNumber: '节点编号',
  toastPaymentDue: '低于最低贷款额.',

  cFILRepay: 'cFIL 归还',
  myLoan: '我的借出',
  walletBalance: '钱包余额',

  // rewards
  referralRewards: '邀请',
  claim: '复制邀请链接',
  claimedRewards: '我的奖励',
  caimedPromote: '我的推广',

  // swap
  filSwap: 'FIL 兑换',
  copy: '复制',
  copySucc: '复制成功',
  swapPlaceholder: '请输入个数.',
  addressPlaceholder: '请输入收款账户',
  cfilSwap: 'cFIL 兑换',
  exchangeDescription: '兑换说明',
  exchangeDescriptiontext1: '最小兑换数量：5个',
  exchangeDescriptiontext2: '兑换到账时间：10到30分钟',
  exchangeDescriptiontext3:
    'cFIL为FIL的1:1锚定代币，用户可以在任意时刻把cFIL兑换成FIL',
  exchangeDescriptiontext7: '兑换费用:              0.02cFIL',
  exchangeDescriptiontext4: '最小兑换数量：任意数量',
  exchangeDescriptiontext5: '兑换到账时间：10到120分钟',
  exchangeDescriptiontext6:
    'cFIL为FIL的1:1锚定代币，用户可以在任意时刻把cFIL兑换成FIL',

  // base
  assets: '资产',
  cancel: '取消',
  confirm: '确认',
  // title
  connect: '连接',
  overview: '账户总览',
  depositCoins: '存款',
  selectUser: '选择账户',
  selectLang: '选择语言',
  copyText: '复制完成',

  // home
  fileconinAddress: 'Filecoin 地址',
  invite: '邀请',
  inviteText: '作为您的促销代码，邀请其他人投资cFil以获得回报。',
  exchangeDesc: '发送到该地址的Fil代币将会以1:1的比例自动转换到cFil。',
  contract: '合约',
  repurchase: '赎回',
  withdraw: '赎回',
  withdrawAll: '提取收益',
  eFilDesc: 'cFil可以与Filecoin以1:1的比例交换。',
  FDDesc: 'CRFI可以质押和理财',
  eFilPlaceholder: '请输入cFil兑换量',
  invitePlaceholder: '请输入您的推荐人地址',
  FilecoinPlaceholder: '请输入Filecoin地址',
  mining: '请充值来收取额外利息',

  // investment
  current: '目前',
  buy: '购买',
  buyProduct: '购买商品',
  interest: '利息',
  withtraw: '提出',
  date: '当前时间',
  cycle: '30日/60日/90日',
  maturity: '选择的间隔24*3600秒',
  desc: '无法提出',
  buyPlaceholder: '请输入购买数量',

  position: '我的位置',
  redemption: '你现在可以赎回的数量',
  investment: '投资',
  annualized: '每年',

  // assets
  // maturity: 'maturity',
  interestAssets: '利息资产',
  expireAssets: '理财到期',
  income: '收入',
  currentInvest: '当前投资',
  fast: '快',
  onDemand: '活期',
  expireDate: '期满',

  // admin
  interestRate: '利率',
  inviteRate: '邀请利率',
  rate: '比率',
  interestPool: '收益池',

  time: '日',

  charge: '充值',
  edit: '编辑',
  config: '设定',

  // toast
  minNumberToast: '最少兑换数量0.1个',
  balanceToast: '余额不足。请再次确认后输入',
  toast: '请输入您购买的数量',
  empty: '空白',
  toastFileCoin: '请输入Filecoin地址',
  networkErr: '网络错误，请切换到指定网络',

  // placeholder
  placeholderFilecoin: '请输入兑换数量',
  message: {
    name: 'Alice',
  },
  ...enLocale,
}

export default cn
