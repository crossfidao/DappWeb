<template>
  <div class="home" ref="form" :model="params" label-width="80px">
    <BaseHeader>
      <h4>adkfdklfjdlskfjdslfdlfkdlf</h4>
      <span class="text">
        {{ $t('exchangeDesc') }}
      </span>
    </BaseHeader>
    <!-- <div class="header">
      <div class="header-top">
        {{ $t('overview') }}
        <span>...</span>
      </div>
      <div class="header-address">
        <h4>adkfdklfjdlskfjdslfdlfkdlf</h4>
        <span class="text"
          >转入该地址的 Filecoin 将自动以 1:1 的比例兑换为 eFil</span
        >
      </div>
    </div> -->

    <div class="content">
      <h4 class="title">{{ $t('wallet') }}{{ $t('assets') }}</h4>
      <div class="item">
        <div class="number-box flex">
          <span class="text border">eFile</span>
          <div class="number">23123.32</div>
        </div>
        <div class="btn-box flex">
          <span class="text-desc">
            {{ $t('eFilDesc') }}
          </span>
          <div class="btn" @click="showMask = true">{{ $t('repurchase') }}</div>
        </div>
      </div>

      <div class="item">
        <div class="number-box flex">
          <span class="text border">FD</span>
          <div class="number">23123.32</div>
        </div>
        <div class="btn-box flex">
          <span class="text-desc">
            {{ $t('FDDesc') }}
          </span>
          <div class="btn">{{ $t('repurchase') }}</div>
        </div>
      </div>
      <h4 class="title">{{ $t('contract') }}{{ $t('assets') }}</h4>
      <div class="items">
        <div class="items-content">
          <div class="border items-item">
            <span class="text">eFil {{ $t('assets') }}</span>
            <p class="number">34343.34</p>
          </div>
          <div class="items-item">
            <span class="text">eFil {{ $t('assets') }}</span>
            <p class="number1">34343.34</p>
          </div>
        </div>
        <div class="items-content">
          <div class="border items-item">
            <span class="text">eFil {{ $t('assets') }}</span>
            <p class="number">34343.34</p>
          </div>
          <div class="items-item">
            <span class="text">eFil {{ $t('assets') }}</span>
            <p class="number1">34343.34</p>
          </div>
        </div>
      </div>
      <router-link to="/investment" tag="div" class="confirm-btn">
        {{ $t('mining') }}
      </router-link>
    </div>
    <van-overlay class="mask" :show="showMask" @click.self="showMask = false">
      <div class="mask-content">
        <h4 class="mask-title">Filcoin {{ $t('repurchase') }}</h4>
        <div class="form">
          <van-field
            class="field"
            center
            clearable
            v-model="value"
            :placeholder="$t('eFilPlaceholder')"
          />
          <van-field
            class="field"
            center
            clearable
            v-model="value"
            :placeholder="$t('FilecoinPlaceholder')"
          />
        </div>
        <div class="footer">
          <div class="footer-btn" @click="showMask = false">
            {{ $t('cancel') }}
          </div>
          <div class="footer-btn">{{ $t('confirm') }}</div>
        </div>
      </div>
    </van-overlay>
    <!-- <div class="mask" v-show="showMask">
      <div class="mask-content">
        <h4 class="mask-title">Filcoin 回购</h4>
        <div class="form">
          <van-field
            class="field"
            center
            clearable
            v-model="value"
            placeholder="请输入您要售出的eFil数目"
          />
          <van-field
            class="field"
            center
            clearable
            v-model="value"
            placeholder="请输入您自己的Filecoin地址"
          />
        </div>
        <div class="footer">
          <div class="footer-btn" @click="showMask = false">取消</div>
          <div class="footer-btn">确定</div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import Contract from '@/plugin/eth'

// @ is an alias to /src
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      showMask: false,

      price: '',
      result: '',
      value: '',
      usdt: {
        address: '',
        value: '',
      },
      usdtAbi: [
        {
          constant: true,
          inputs: [],
          name: 'name',
          outputs: [
            {
              name: '',
              type: 'string',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            {
              name: '_spender',
              type: 'address',
            },
            {
              name: '_value',
              type: 'uint256',
            },
          ],
          name: 'approve',
          outputs: [
            {
              name: '',
              type: 'bool',
            },
          ],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'totalSupply',
          outputs: [
            {
              name: '',
              type: 'uint256',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            {
              name: '_from',
              type: 'address',
            },
            {
              name: '_to',
              type: 'address',
            },
            {
              name: '_value',
              type: 'uint256',
            },
          ],
          name: 'transferFrom',
          outputs: [
            {
              name: '',
              type: 'bool',
            },
          ],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'decimals',
          outputs: [
            {
              name: '',
              type: 'uint8',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            {
              name: '_owner',
              type: 'address',
            },
          ],
          name: 'balanceOf',
          outputs: [
            {
              name: 'balance',
              type: 'uint256',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'symbol',
          outputs: [
            {
              name: '',
              type: 'string',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            {
              name: '_to',
              type: 'address',
            },
            {
              name: '_value',
              type: 'uint256',
            },
          ],
          name: 'transfer',
          outputs: [
            {
              name: '',
              type: 'bool',
            },
          ],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [
            {
              name: '_owner',
              type: 'address',
            },
            {
              name: '_spender',
              type: 'address',
            },
          ],
          name: 'allowance',
          outputs: [
            {
              name: '',
              type: 'uint256',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          payable: true,
          stateMutability: 'payable',
          type: 'fallback',
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              name: 'owner',
              type: 'address',
            },
            {
              indexed: true,
              name: 'spender',
              type: 'address',
            },
            {
              indexed: false,
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
              name: 'from',
              type: 'address',
            },
            {
              indexed: true,
              name: 'to',
              type: 'address',
            },
            {
              indexed: false,
              name: 'value',
              type: 'uint256',
            },
          ],
          name: 'Transfer',
          type: 'event',
        },
      ],
      params: {
        status: 0,
        address: '0xAD71ef607c5B8a43a81D94235f037b73A0643A62',
        abi: [
          {
            inputs: [
              {
                internalType: 'address',
                name: 'admin',
                type: 'address',
              },
            ],
            name: 'AddAdmin',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              {
                internalType: 'address',
                name: 'operator',
                type: 'address',
              },
            ],
            name: 'AddOperator',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              {
                internalType: 'address',
                name: 'signer',
                type: 'address',
              },
            ],
            name: 'AddSigner',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              {
                internalType: 'address',
                name: 'to',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
              },
              {
                internalType: 'string',
                name: 'reason',
                type: 'string',
              },
            ],
            name: 'ApplyTransferErrorBalance',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              {
                internalType: 'address',
                name: 'to',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
              },
              {
                internalType: 'string',
                name: 'reason',
                type: 'string',
              },
            ],
            name: 'AppyTransfer',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              {
                internalType: 'address',
                name: 'suAdmin',
                type: 'address',
              },
            ],
            name: 'ChangeSuperAdmin',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              {
                internalType: 'address',
                name: 'admin',
                type: 'address',
              },
            ],
            name: 'DelAdmin',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              {
                internalType: 'address',
                name: 'operator',
                type: 'address',
              },
            ],
            name: 'DelOperator',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              {
                internalType: 'address',
                name: 'signer',
                type: 'address',
              },
            ],
            name: 'DelSigner',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [],
            name: 'EnableWithdraw',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
              },
            ],
            name: 'Invest',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [],
            name: 'ManualUpdateState',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [],
            name: 'PreStart',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
              },
            ],
            name: 'ReCharge',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              {
                internalType: 'uint256',
                name: 'startTime',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'endTime',
                type: 'uint256',
              },
            ],
            name: 'Settings',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              {
                internalType: 'string',
                name: 'unlockReason',
                type: 'string',
              },
            ],
            name: 'Unlock',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [
              {
                internalType: 'bool',
                name: 'allow',
                type: 'bool',
              },
            ],
            name: 'VoteTransfer',
            outputs: [],
            stateMutability: 'nonpayable',
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
              {
                internalType: 'address',
                name: 'usdtAddr',
                type: 'address',
              },
            ],
            stateMutability: 'nonpayable',
            type: 'constructor',
          },
          {
            inputs: [],
            name: 'calcDecimal',
            outputs: [
              {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [
              {
                internalType: 'address',
                name: '_addr',
                type: 'address',
              },
            ],
            name: 'GetInvestInfoByAddr',
            outputs: [
              {
                internalType: 'address',
                name: 'addr',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'totalInvest',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'hasWithdraw',
                type: 'uint256',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [
              {
                internalType: 'uint256',
                name: '_id',
                type: 'uint256',
              },
            ],
            name: 'GetInvestInfoByID',
            outputs: [
              {
                internalType: 'address',
                name: 'addr',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'totalInvest',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'hasWithdraw',
                type: 'uint256',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [
              {
                internalType: 'uint256',
                name: 'idx',
                type: 'uint256',
              },
            ],
            name: 'NowTransferApply',
            outputs: [
              {
                internalType: 'uint256',
                name: 'errorBalance',
                type: 'uint256',
              },
              {
                internalType: 'address',
                name: 'to',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
              },
              {
                internalType: 'string',
                name: 'reason',
                type: 'string',
              },
              {
                internalType: 'uint256',
                name: 'allowNum',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'denyNum',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'result',
                type: 'uint256',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [],
            name: 'SystemInfo',
            outputs: [
              {
                internalType: 'uint256',
                name: 'state',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'startTime',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'endTime',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'actuallyEndTime',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'preStartTime',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'totalInvestReceive',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'finalMoney',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'nowCalcValue',
                type: 'uint256',
              },
              {
                internalType: 'string',
                name: 'manualUnlockReason',
                type: 'string',
              },
              {
                internalType: 'uint256',
                name: 'newInvestID',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'operatorsNum',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'signersNum',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'transferNum',
                type: 'uint256',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
        ],
      },
      list: [],
      abiOptions: [],
      methods: '',
      inputs: [],
      contract: null,
      usdtContract: null,
    }
  },
  async mounted() {
    this.initUsdt()
    this.initContract()
    window.ethereum.on('accountsChanged', account => {
      console.log(account)
    })
  },

  methods: {
    async ethereum() {
      await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
    },
    initUsdt() {
      this.usdtContract = new Contract({
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        abi: this.usdtAbi,
      })
    },
    async initContract() {
      this.list = this.params.abi
      this.contract = new Contract(this.params)
      this.list.forEach(e => {
        let { type, stateMutability } = e
        if (type === 'function' && stateMutability === 'view') {
          this.abiOptions.push(e)
        }
      })
    },
    async handleClick() {
      let args = []
      this.inputs.forEach(e => {
        let value = e.params
        if (e.type === 'uint256') {
          value = parseFloat(value)
        } else if (e.type === 'bool') {
          if (value === 'false') {
            value = false
          } else {
            value = true
          }
        }
        args.push(value)
      })
      if (this.params.status === 0) {
        let data = await this.contract.callContract(this.methods, args)
        this.result = data
      } else {
        await this.contract.executeContract(this.methods, args, this.value)
      }
    },
    async approve() {
      let args = [this.usdt.address, this.usdt.value]
      await this.usdtContract.executeContract('approve', args)
    },
    changeStatus(value) {
      this.abiOptions = []
      this.list.forEach(e => {
        let { type, stateMutability } = e
        if (value === 0 && type === 'function' && stateMutability === 'view') {
          this.abiOptions.push(e)
        }
        if (value === 1 && type === 'function' && stateMutability !== 'view') {
          this.abiOptions.push(e)
        }
      })
    },
    changeMethods(data) {
      this.inputs = []
      let { inputs } = this.abiOptions.find(n => n.name === data)

      inputs.forEach(e => {
        let { name, type } = e
        e.value = ''
        this.inputs.push({
          name,
          type,
          params: '',
        })
      })
    },
    getShow(name) {
      return isNaN(name)
    },
  },
}
</script>

<style lang="scss" scoped>
.home {
  background: #eee;
  height: 100%;
}

.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content {
  padding-top: 100px;
  padding: 100px 58px;
  .title {
    margin: 32px 0;
    font-size: 31px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #000000;
    text-align: left;
  }
  .item {
    background: #fff;
    margin-bottom: 40px;
    padding: 24px 40px;
    border-radius: 10px;
    // font-size: 46px;
    .number-box {
      height: 56px;
    }
    .number {
      font-weight: bold;
      font-size: 42px;
    }
    .btn-box {
      margin-top: 24px;
    }
    .border {
      border-bottom: 1px solid #ccebef;
    }
    .text {
      width: 312px;
      height: 56px;
      line-height: 56px;
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 300;
      text-align: left;
      font-weight: bold;
    }
    .text-desc {
      width: 400px;
      text-align: left;
      color: #96a5bf;
      font-size: 20px;
    }

    .btn {
      width: 130px;
      height: 56px;
      line-height: 56px;
      font-size: 24px;
      background: rgb(65, 181, 194);
      border-radius: 30px;
      color: #fff;
    }
  }
}
.items {
  display: flex;
  justify-content: space-around;
  &-content {
    width: 309px;
    background: #fff;
    border: 1px solid #2faebd;
    border-radius: 16px;
    text-align: left;
    font-size: 24px;
  }
  .border {
    border-bottom: 1px solid #ccebef;
  }
  &-item {
    padding: 32px 42px;
    .text {
      display: block;
      margin-bottom: 12px;
      color: #96a5bf;
    }
    .number {
      font-size: 42px;
      font-weight: bold;
    }
    .number1 {
      font-size: 32px;
      color: #4d4d4d;
    }
  }
}
.confirm-btn {
  width: 634px;
  height: 87px;
  line-height: 87px;
  background: rgb(65, 181, 194);
  margin-top: 24px;
  border-radius: 42px;
  color: #fff;
  font-size: 32px;
}

.mask {
  // position: fixed;
  // top: 0;
  // bottom: 0;
  // left: 0;
  // right: 0;
  // background: rgba(0, 0, 0, 0.6);
  &-content {
    width: 620px;
    height: 400px;
    position: absolute;
    z-index: 99;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: #fff;
    border-radius: 32px;
    font-size: 30px;
    color: #63c2cd;
  }
  &-title {
    padding: 24px 0;
  }
  .footer {
    display: flex;
    justify-content: center;
    &-btn {
      width: 174px;
      height: 64px;
      margin: 0 27px;
      line-height: 64px;
      background: #63c2cd;
      color: #fff;
      font-size: 30px;
      border-radius: 32px;
    }
  }
}
.form {
  padding: 0 32px;
}
.field {
  height: 84px;
  line-height: 84px;
  background: #eee;
  margin-bottom: 20px;
}
</style>
