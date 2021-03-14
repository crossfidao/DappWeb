<template>
  <div class="home" ref="form" :model="params" label-width="80px">
    <el-button @click="ethereum">连接 MetaMask</el-button>
    <!-- usdt -->
    <el-form class="form" ref="form" :model="params" label-width="80px">
      <el-form-item label="地址">
        <el-input
          v-model="usdt.address"
          placeholder="请输入合约地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="金额">
        <el-input
          v-model="usdt.value"
          placeholder="请输入金额（精度为6）"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="approve">
          {{ '调用 approve' }}
        </el-button>
      </el-form-item>
    </el-form>
    <div class="line"></div>
    <el-form class="form" ref="form" :model="params" label-width="80px">
      <el-form-item label="合约地址">
        <el-input
          v-model="params.address"
          placeholder="请输入合约地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="合约ABI">
        <!-- <el-input v-model="params.abi" placeholder="请输入合约ABI"></el-input> -->
      </el-form-item>
      <el-form-item label="方法类型" v-show="contract">
        <el-radio-group
          style="width:100%"
          v-model="params.status"
          @change="changeStatus"
        >
          <el-radio :label="0">查询</el-radio>
          <el-radio :label="1">执行</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="合约方法" v-show="contract">
        <el-select
          style="width:100%"
          v-model="methods"
          placeholder="请选择"
          @change="changeMethods"
        >
          <el-option
            v-for="item in abiOptions"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-for="(item, index) in inputs"
        :label="item.name"
        :key="item.name"
      >
        <el-input
          v-model="inputs[index].params"
          :placeholder="item.type"
        ></el-input>
      </el-form-item>
      <el-form-item label="value" v-if="inputs.stateMutability === 'payable'">
        <el-input v-model="price" placeholder="请输入金额"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="initContract" v-if="!contract">
          {{ contract ? '执行' : '初始化合约' }}
        </el-button>
        <el-button type="primary" @click="handleClick" v-else>
          {{ contract ? '执行' : '初始化合约' }}
        </el-button>
      </el-form-item>
    </el-form>
    <div class="result" v-for="(item, key, index) in result" :key="index">
      <span v-show="getShow(key)">{{ key }} {{ item }}</span>
    </div>
    <!-- <div class="result" v-for="(item, index) in result" :key="index">
      {{ item }}
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
      price: '',
      result: '',
      value: 0,
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
.form {
  width: 500px;
}
</style>
