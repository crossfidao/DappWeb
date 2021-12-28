/**
 * TODO 页面公用对象
 */
 export default {
    data: function() {
      return {}
    },
    methods: {
      // 获取用户信息
      getUserInfo: function() {
        let self = this
        if (self.$store.state.wallet.account) {
          self.$api.app.getUser(self.$store.state.wallet.account).then(res => {
            // console.log(res)
            self.$store.commit('SET_USER_INFO', res.data);
          }).catch(err => {
            console.log(err)
          })
        }
      },
      // 获取总质押价值量
      getConStaking() {
        let self = this
        self.$api.app.getConfigKey("wb_staking").then(res => {
          self.$store.commit('SET_STAKING', self.toFloor(res.msg));
        })
      },
      // 获取资金池USDT
      getConPoolUsdt() {
        let self = this
        self.$api.app.getConfigKey("wb_pool_usdt").then(res => {
          self.$store.commit('SET_POOL_USDT', self.toFloor(res.msg));
        })
      },
      // 获取资金池GOOD
      getConPoolGood() {
        let self = this
        self.$api.app.getConfigKey("wb_pool_good").then(res => {
          self.$store.commit('SET_POOL_GOOD', self.toFloor(res.msg));
        })
      },
      getBalanceLP() {
        return new Promise((resolve, reject) => {
          let self = this
          self.$store.dispatch('balanceOf', {contract: 'lp', symbol: 'LP'}).then(res => {
            // console.log('获取LP封装', res)
            self.$api.app.upLp(0, res)
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        })
      },
      getBalanceLPF() {
        return new Promise((resolve, reject) => {
          let self = this
          self.$store.state.wallet.contract.staking.methods.userInfo(0, self.$store.state.wallet.account).call().then(res => {
            let wei = self.$store.state.wallet.web3.utils.fromWei(res.amount, 'ether')
            self.$store.commit('SET_WALLET_BALANCE', {key: 'LPF', balance: wei})
            self.$api.app.upLp(1, wei)
            resolve(wei)
          }).catch(err => {
            reject(err)
          })
        })
      },
      getBalanceGoodF() {
        return new Promise((resolve, reject) => {
          let self = this
          self.$store.state.wallet.contract.staking.methods.pendingCake(0, self.$store.state.wallet.account).call().then(res => {
            let wei = self.$store.state.wallet.web3.utils.fromWei(res, 'ether');
            self.$store.commit('SET_WALLET_BALANCE', {key: 'GOODF', balance: wei})
            resolve(wei)
          }).catch(err => {
            reject(err)
          })
        })
      },
      getBalanceGood() {
        return new Promise((resolve, reject) => {
          let self = this
          self.$store.dispatch('balanceOf', {contract: 'good', symbol: 'GOOD'}).then(res => {
            self.$api.app.upGood(res)
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        })
      },
      getBalanceRelease() {
        return new Promise((resolve, reject) => {
          let self = this
          self.$store.state.wallet.contract.release.methods.pendingGood().call().then(res => {
            console.log('已释放数量：', res)
            let wei = self.$store.state.wallet.web3.utils.fromWei(res, 'ether');
            self.$store.commit('SET_WALLET_BALANCE', {key: 'RELEASE', balance: wei})
            resolve(wei)
          }).catch(err => {
            reject(err)
          })
        })
      },
      getBalanceLocking() {
        return new Promise((resolve, reject) => {
          let self = this
          /*let contract = self.$store.state.wallet.contract['release']
          console.log(contract)
          contract.methods.balanceOf(contract.options.address).call().then(res => {
            let balance = self.$store.state.wallet.web3.utils.fromWei(res, 'ether')
            console.log('获取余额', '币种：' + 'release' + '，数量：' + balance)
            // commit('SET_WALLET_BALANCE', {key: data.symbol, balance: balance})
            resolve(balance)
          }).catch(err => {
            reject(err)
          })*/
          let balance = 150000 - self.$store.state.wallet.balance.RELEASE;
          console.log(balance, self.$store.state.wallet.balance.RELEASE)
          self.$store.commit('SET_WALLET_BALANCE', {key: 'LOCKING', balance: balance})
          resolve()
          /*let web3 = self.$metaMask.getWeb3();
          let ct = new web3.eth.Contract(self.$abi.release.abi, '0x769A85E3E7F951adf21A82456Bd59d62750C438f')
          ct.methods.balanceOf('0x769A85E3E7F951adf21A82456Bd59d62750C438f').call().then(res => {
            let balance = web3.utils.fromWei(res, 'ether')
            console.log('获取余额', '币种：' + 'release' + '，数量：' + balance)
            resolve(balance)
          }).catch(err => {
            reject(err)
          })*/
          /*self.$store.dispatch('balance', {contract: 'release', symbol: 'LOCKING'}).then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })*/
        })
      },
      /**
       * 跳转路由
       * @param path 路由路径
       * @param query 查询参数
       */
      jumpPath(path, query) {
        query = query || {}
        this.$router.push({path: path, query: query})
      },
      openWeb(url) {
        window.location.href = url
      },
      toFloor(x, n) {
        let ff = parseFloat(x);
        if (isNaN(ff)) {
          let s = '0.0'
          while (s.length < 2 + n) {
            s += '0';
          }
          return s;
        }
        if (!n || n < 0) n = 2
        let yz = Math.pow(10, n);
        let f = Math.round(x * yz) / yz;
        let s = f.toString();
        let rs = s.indexOf('.');
        if (rs < 0) {
          rs = s.length;
          s += '.';
        }
        while (s.length <= rs + n) {
          s += '0';
        }
        let n1 = s.substr(0, rs)
        let n2 = s.substr(rs + 1)
        return String(n1).replace(/(\d)(?=(\d{3})+$)/g, "$1,") + '.' + n2;
      }
    }
  }
  