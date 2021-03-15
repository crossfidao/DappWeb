<template>
  <div class="home" ref="form" :model="params" label-width="80px">
    <div>FD_H5</div>
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
      params: {
        status: 0,
        address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        abi: [
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
      },
      list: [],
      abiOptions: [],
      methods: '',
      inputs: [],
      contract: null,
    }
  },
  async mounted() {
    this.initContract()
    // let data = await this.contract.callContract('name', [])
  },
  methods: {
    async initContract() {
      if (!this.contract) {
        this.list = this.params.abi
        this.contract = new Contract(this.params)
        this.list.forEach(e => {
          let { type, payable } = e
          if (type === 'function' && !payable) {
            this.abiOptions.push(e)
          }
        })
      } else {
        let args = []
        this.inputs.forEach(e => {
          args.push(e.params)
        })
        if (this.params.status === 0) {
          let data = await this.contract.callContract('name', args)
          console.log(data)
        }
      }
    },
    changeStatus(value) {
      let payableType = value === 1
      console.log(value, payableType, this.list)
      this.abiOptions = []
      this.list.forEach(e => {
        let { type, payable } = e
        console.log(type === 'function' && payable === payableType)
        if (type === 'function' && payable === payableType) {
          this.abiOptions.push(e)
        }
      })
    },
    changeMethods(data) {
      console.log(data)
      this.inputs = []
      data.inputs.forEach((e, index) => {
        let { name, type } = e
        e.value = ''
        this.inputs.push({
          name,
          type,
          params: '',
        })
        this.$set(this.inputs, index, e)
      })
      console.log(this.inputs)
    },
  },
}
</script>

<style lang="scss" scoped>
.form {
  width: 500px;
}
</style>
