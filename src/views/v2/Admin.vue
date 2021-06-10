<template>
  <div class="about">
    <BaseHeader></BaseHeader>
    <div class="content">
      <van-tabs v-model="active">
        <van-tab title="管理页面">
          <div class="items">
            <div class="title">
              <span> {{ $t('inviteRate') }}</span>
            </div>
            <div class="charge">
              <van-field
                class="price-input"
                border
                v-model="affRate"
                placeholder="请输入cFil数量"
              />
              <van-button class="charge-btn" @click="handleAffRate">
                {{ $t('edit') }}
              </van-button>
            </div>
          </div>

          <div class="items">
            <div class="title">
              <span> 邀请返利最低限制</span>
            </div>
            <div class="charge">
              <van-field
                class="price-input"
                border
                v-model="affRateLimit"
                placeholder="请输入cFil数量"
              />
              <van-button class="charge-btn" @click="handleAffRequire">
                {{ $t('edit') }}
              </van-button>
            </div>
          </div>
          <!-- 修改crfiPrice -->
          <div class="charge-title" style="margin: 0 32px">
            <span>
              汇率设置（crfiPrice）
              {{ crfiPrice | decimals }}</span
            >
          </div>
          <div class="charge" style="margin: 0 32px">
            <van-field
              class="price-input"
              placeholder="请输入cFil汇率"
              border
              v-model="rate.crfiPrice"
            />
            <van-button class="charge-btn" @click="changeRate('crfiPrice')">
              修改
            </van-button>
          </div>
          <!-- 修改cfilPrice -->
          <div class="charge-title" style="margin: 0 32px">
            <span>
              汇率设置（cfilPrice）
              {{ cfilPrice | decimals }}
            </span>
          </div>
          <div class="charge" style="margin: 0 32px">
            <van-field
              class="price-input"
              placeholder="请输入cFil汇率"
              border
              v-model="rate.cfilPrice"
            />
            <van-button class="charge-btn" @click="changeRate('cfilPrice')">
              修改
            </van-button>
          </div>
          <!-- 重置 -->
          <div class="charge-title" style="margin: 0 32px">
            <span>
              {{ $t('charge') }} cFil {{ $t('interestPool') }}
              {{ systemInfo.cfilInterestPool | decimals }}</span
            >
          </div>
          <div class="charge" style="margin: 0 32px">
            <van-field
              class="price-input"
              placeholder="请输入cFil数量"
              border
              v-model="value"
            />
            <van-button class="charge-btn" @click="handleCharge">
              {{ $t('charge') }}
            </van-button>
          </div>
          <!-- 充值CRFI -->
          <div class="charge-title" style="margin: 0 32px">
            <span>
              {{ $t('charge') }} CRFI {{ $t('interestPool') }}
              {{ systemInfo.crfiInterestPool | decimals }}</span
            >
          </div>
          <div class="charge" style="margin: 0 32px">
            <van-field
              class="price-input"
              placeholder="请输入CRFI数量"
              border
              v-model="CRFIValue"
            />
            <van-button class="charge-btn" @click="handleChargeCRFI">
              {{ $t('charge') }}
            </van-button>
          </div>
          <div class="items">
            <h4 class="title">CRFI {{ $t('investment') }}</h4>
            <div class="item" v-for="item in crfiList" :key="item.date">
              <div class="date">
                {{ item.Days || $t('current') }}

                <span class="text">
                  {{ item.Days || $t('current') }}
                  <template v-if="item.Days">
                    {{ $t('time') }}
                  </template>
                </span>
                <p class="date-bg">{{ item.Type == 0 ? 'CRFI' : 'cFil' }}</p>
              </div>
              <div class="item-content">
                <div class="price" v-show="item.NewCRFIInterestRate">
                  <h5 class="price-title">CRFI {{ $t('rate') }}(新):</h5>
                  <span class="price-text">
                    {{ item.NewCRFIInterestRate }}
                  </span>

                  <span>%</span>
                </div>
                <div class="price" v-show="item.NewCFilInterestRate">
                  <h5 class="price-title">cFil {{ $t('rate') }}(新):</h5>
                  <span class="price-text">
                    {{ item.NewCFilInterestRate }}
                  </span>

                  <span>%</span>
                </div>
                <div class="price">
                  <h5 class="price-title">CRFI {{ $t('rate') }}:</h5>
                  <span class="price-text" v-if="!item.show">
                    {{ item.CRFIInterestRate }}
                  </span>

                  <span>%</span>
                </div>

                <div class="price">
                  <h5 class="price-title">cFil {{ $t('rate') }}:</h5>
                  <span class="price-text">
                    {{ item.CFilInterestRate }}
                  </span>

                  <span>%</span>
                </div>
              </div>
              <van-button
                class="item-btn"
                type="primary"
                size="mormal"
                @click="handleEdit(item)"
              >
                {{ $t('edit') }}
              </van-button>
            </div>
          </div>
          <div class="items">
            <h4 class="title">cFil {{ $t('investment') }}</h4>
            <div class="item" v-for="item in eFilList" :key="item.date">
              <div class="date">
                {{ item.Days || $t('current') }}

                <span class="text">
                  {{ item.Days || $t('current') }}
                  <template v-if="item.Days">
                    {{ $t('time') }}
                  </template>
                </span>
                <p class="date-bg">{{ item.Type == 0 ? 'CRFI' : 'cFil' }}</p>
              </div>
              <div class="item-content">
                <div class="price" v-show="item.NewCRFIInterestRate">
                  <h5 class="price-title">CRFI {{ $t('rate') }}（新）:</h5>
                  <span class="price-text">
                    {{ item.NewCRFIInterestRate }}
                  </span>

                  <span>%</span>
                </div>
                <div class="price" v-show="item.NewCFilInterestRate">
                  <h5 class="price-title">cFil {{ $t('rate') }}（新）:</h5>
                  <span class="price-text">
                    {{ item.NewCFilInterestRate }}
                  </span>

                  <span>%</span>
                </div>
                <div class="price">
                  <h5 class="price-title">CRFI {{ $t('rate') }}:</h5>
                  <span class="price-text" v-if="!item.show">
                    {{ item.CRFIInterestRate }}
                  </span>

                  <span>%</span>
                </div>

                <div class="price">
                  <h5 class="price-title">cFil {{ $t('rate') }}:</h5>
                  <span class="price-text">
                    {{ item.CFilInterestRate }}
                  </span>

                  <span>%</span>
                </div>
              </div>
              <van-button
                class="item-btn"
                type="primary"
                size="mormal"
                @click="handleEdit(item)"
              >
                {{ $t('edit') }}
              </van-button>
            </div>
          </div>
        </van-tab>
        <van-tab title="SFIL 配置">
          <div
            style="background: #2c3546; margin: 0 32px 24px; border-radius: 8px; padding: 12px;"
          >
            <h4 class="title">
              <span>参数配置</span>
              <van-button type="primary" size="small" @click="handleEditLoan">
                修改
              </van-button>
            </h4>
            <div class="item" style="color: #fff">
              <div class="label">抵押率</div>
              <div class="input">{{ loanCFil.APY | rate }} %</div>
            </div>
            <div class="item" style="color: #fff">
              <div class="label">借贷利率</div>
              <div class="input">{{ loanCFil.PledgeRate | rate }} %</div>
            </div>
            <div
              class="item"
              style="color: #fff; margin-bottom: 24px; border-bottom: 1px solid #ccc; padding-bottom: 12px;"
            >
              <div class="label">PaymentDue</div>
              <div class="input">{{ loanCFil.PaymentDue | decimals }}</div>
            </div>
          </div>

          <div
            class="apply-item"
            v-for="item in applyList"
            :key="item.SID"
            style="margin-bottom: 24px; border-bottom: 1px solid #ccc;padding-bottom: 12px;"
          >
            <div class="item-text" v-for="(obj, key) in item.Info" :key="key">
              <span>{{ $t(key) }}: </span>
              <span>{{ obj }}</span>
            </div>
            <div class="item-wallet">
              <span>Addr:</span>
              <span>
                {{ item.Addr.slice(0, 12) + '...' + item.Addr.slice(30, 42) }}
              </span>
              <span
                class="tag-read copy"
                :data-clipboard-text="item.Addr"
                @click="copy"
              >
                <van-icon name="description" size="18" color="#A2A2A2" />
              </span>
            </div>
            <div class="item-wallet">
              <span>CFIL{{ $t('balance') }}:</span>
              <span>{{ wallet.walletCFil | decimals }}</span>
            </div>
            <div class="item-wallet">
              <span>CRFI{{ $t('balance') }}:</span>
              <span>{{ wallet.walletCRFI | decimals }}</span>
            </div>
            <div class="item-wallet">
              <span>SFIL{{ $t('balance') }}:</span>
              <span>{{ wallet.walletSFil | decimals }}</span>
            </div>
            <div class="item-btn">
              <van-button
                type="primary"
                size="small"
                @click="handleApplyPass(item)"
              >
                通过
              </van-button>
              <van-button
                type="danger"
                size="small"
                @click="handleRefuse(item)"
              >
                拒绝
              </van-button>
            </div>
          </div>
        </van-tab>
        <van-dialog
          v-model="show"
          color="#000000"
          title="通过"
          show-cancel-button
          @confirm="handlePassConfirm"
          @cancel="show = false"
        >
          <van-field v-model="value" placeholder="请输入要分发的SFIL数量" />
        </van-dialog>
      </van-tabs>
    </div>

    <van-overlay class="mask" :show="showMask" @click.self="showMask = false">
      <div class="mask-content">
        <h4 class="mask-title">Filcoin {{ $t('repurchase') }}</h4>
        <div class="form">
          <van-field
            class="field"
            center
            clearable
            v-model="CRFL"
            placeholder="请填写CRFL利率（%）"
          />
          <van-field
            class="field"
            center
            clearable
            v-model="cfil"
            placeholder="请填写cFil利率（%）"
          />
        </div>
        <div class="footer">
          <div class="footer-btn" @click="showMask = false">
            {{ $t('cancel') }}
          </div>
          <div class="footer-btn" @click="handleRate">
            {{ $t('confirm') }}
          </div>
        </div>
      </div>
    </van-overlay>
    <van-overlay class="mask" :show="showEdit" @click.self="showMask = false">
      <div class="mask-content">
        <h4 class="mask-title">利率修改</h4>
        <div class="form">
          <van-field
            class="field"
            label="抵押率"
            center
            clearable
            v-model="params.APY"
            placeholder="请填写抵押率（%）"
          />
          <van-field
            label="借贷利率"
            class="field"
            center
            clearable
            v-model="params.PledgeRate"
            placeholder="请填写借贷利率（%）"
          />
          <van-field
            label="借贷下限"
            class="field"
            center
            clearable
            v-model="params.PaymentDue"
            placeholder="请填写PaymentDue"
          />
          <!-- <van-field
            class="field"
            center
            clearable
            v-model="cfil"
            placeholder="请填写cFil利率（%）"
          /> -->
        </div>
        <div class="footer">
          <div class="footer-btn" @click="showEdit = false">
            {{ $t('cancel') }}
          </div>
          <div class="footer-btn" @click="handleLoanRateConfirm">
            {{ $t('confirm') }}
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import Web3 from 'web3'
import { mapActions } from 'vuex'
import Clipboard from 'clipboard'

let web3 = new Web3()
let { utils } = web3
export default {
  name: 'admin',
  data() {
    return {
      active: 0,
      show: false,
      showMask: false,
      showEdit: false,
      isDemand: false,
      affRate: '',
      affRateLimit: '',

      curItem: null,
      CRFL: '',
      cfil: '',
      value: '',
      CRFIValue: '',
      curItem: null,
      rate: {
        crfiPrice: '',
        cfilPrice: '',
      },
      params: {
        APY: '',
        PledgeRate: '',
        PaymentDue: '',
      },
    }
  },
  computed: {
    cfilPrice() {
      return this.$store.state.cfilPrice
    },
    crfiPrice() {
      return this.$store.state.crfiPrice
    },
    wallet() {
      return this.$store.state.wallet
    },
    loanCFil() {
      return this.$store.state.loanCFil
    },
    applyList() {
      return this.$store.state.applyList
    },
    systemInfo() {
      return this.$store.state.systemInfo
    },
    eFilList() {
      let list = this.$store.state.CFilList
      let tmp = []
      list.forEach(element => {
        // element.show = false
        let {
          Days,
          CFilInterestRate,
          CRFIInterestRate,
          NewCFilInterestRate,
          NewCRFIInterestRate,
          ID,
          Type,
          deleteFlag,
        } = element

        if (NewCFilInterestRate) {
          NewCFilInterestRate = NewCFilInterestRate * 100
          NewCFilInterestRate = utils.fromWei(NewCFilInterestRate.toString())
        }
        if (NewCRFIInterestRate) {
          NewCRFIInterestRate = NewCRFIInterestRate * 100
          NewCRFIInterestRate = utils.fromWei(NewCRFIInterestRate.toString())
        }
        CFilInterestRate = CFilInterestRate * 100
        CFilInterestRate = utils.fromWei(CFilInterestRate.toString())

        CRFIInterestRate = CRFIInterestRate * 100
        CRFIInterestRate = utils.fromWei(CRFIInterestRate.toString())
        tmp.push({
          Days,
          CFilInterestRate,
          CRFIInterestRate,
          NewCFilInterestRate,
          NewCRFIInterestRate,
          ID,
          Type,
          deleteFlag,
        })
      })

      return tmp
    },
    crfiList() {
      let list = this.$store.state.CRFIList

      let tmp = []
      list.forEach(element => {
        // element.show = false
        let {
          Days,
          CFilInterestRate,
          CRFIInterestRate,
          NewCFilInterestRate,
          NewCRFIInterestRate,
          ID,
          Type,
          deleteFlag,
        } = element
        CFilInterestRate = CFilInterestRate * 100
        CFilInterestRate = utils.fromWei(CFilInterestRate.toString())
        if (NewCFilInterestRate) {
          NewCFilInterestRate = NewCFilInterestRate * 100
          NewCFilInterestRate = utils.fromWei(NewCFilInterestRate.toString())
        }
        if (NewCRFIInterestRate) {
          NewCRFIInterestRate = NewCRFIInterestRate * 100
          NewCRFIInterestRate = utils.fromWei(NewCRFIInterestRate.toString())
        }

        CRFIInterestRate = CRFIInterestRate * 100
        CRFIInterestRate = utils.fromWei(CRFIInterestRate.toString())
        tmp.push({
          Days,
          CFilInterestRate,
          CRFIInterestRate,
          NewCFilInterestRate,
          NewCRFIInterestRate,
          ID,
          Type,
          deleteFlag,
        })
      })
      return tmp
    },
  },
  watch: {
    systemInfo(val) {
      this.affRate = utils.fromWei(this.systemInfo.affRate) * 100
      this.affRateLimit = utils.fromWei(this.systemInfo.affRequire)
    },
    loanCFil(val) {
      this.getParams(val)
    },
  },
  async mounted() {
    this.getParams(this.loanCFil)
    await this.init()
    await this.getApplyStaking()
  },
  methods: {
    ...mapActions([
      'init',
      'charge',
      'chargeCRFI',
      'ChangeAffRate',
      'ChangeAffRateLimit',
      'ChangePackageRate',
      'ChangeDemandRate',
      'getApplyStaking',
      'issusStaking',
      'deleteStaking',
      'changeLoanRate',
      'setKeyValue',
    ]),
    changeRate(key) {
      if (key === 'crfiPrice') {
        this.setKeyValue({ key, value: this.rate.crfiPrice })
      } else if (key === 'cfilPrice') {
        this.setKeyValue({ key, value: this.rate.cfilPrice })
      }
    },
    copy() {
      var clipboard = new Clipboard('.tag-read')
      clipboard.on('success', e => {
        this.$toast(this.$t('copySucc'))
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        console.log('该浏览器不支持自动复制')
        // 释放内存
        clipboard.destroy()
      })
    },
    getParams(data) {
      let { APY, PledgeRate, PaymentDue } = data
      this.params = {
        APY: (utils.fromWei(APY) * 100).toFixed(2),
        PledgeRate: (utils.fromWei(PledgeRate) * 100).toFixed(2),
        PaymentDue: utils.fromWei(PaymentDue),
      }
    },
    handleEditLoan() {
      this.getParams(this.loanCFil)
      this.showEdit = true
    },
    // 拒绝
    handleRefuse(data) {
      this.curItem = data
      let { SID } = data
      this.$dialog
        .confirm({
          title: '拒绝',
          message: '确定拒绝该用户的申请吗？',
        })
        .then(async () => {
          this.deleteStaking({ SID })
          // on confirm
        })
        .catch(() => {
          // on cancel
        })
    },
    handleApplyPass(data) {
      this.curItem = data
      this.show = true
    },
    // 通过
    async handlePassConfirm() {
      let { SID } = this.curItem
      await this.issusStaking({
        SID,
        value: this.value,
      })
    },
    handleCharge() {
      this.charge({ value: this.value })
    },
    // 充值CRFI
    handleChargeCRFI() {
      this.chargeCRFI({ value: this.CRFIValue })
    },
    handleEdit(item) {
      this.curItem = item
      let {
        Days = undefined,
        CFilInterestRate,
        CRFIInterestRate,
      } = this.curItem
      this.CRFL = CRFIInterestRate
      this.cfil = CFilInterestRate
      this.isDemand = Days == 0
      this.curItem = item
      this.showMask = true
      // if (item.show) {
      //   item.show = false
      // } else {
      //   item.show = true
      // }
      // item.show = !item.show
    },
    // 更改利率
    handleRate() {
      if (this.isDemand) {
        this.handleDemandRate()
      } else {
        this.handleChangeRate()
      }
    },
    handleAffRate() {
      this.ChangeAffRate({
        value: this.affRate,
      })
    },
    handleAffRequire() {
      this.ChangeAffRateLimit({
        value: this.affRateLimit,
      })
    },
    handleDemandRate() {
      let { Type } = this.curItem
      this.ChangeDemandRate({
        ID: Type,
        crfi: this.CRFL,
        cfil: this.cfil,
      })
      this.showMask = false
    },
    handleChangeRate() {
      let { ID, CFilInterestRate, CRFIInterestRate } = this.curItem
      if (!(parseFloat(this.CRFL) > 0 && parseFloat(this.CRFL) < 100)) {
        this.$toast('请填写0-100的数字')
        return
      }
      this.ChangePackageRate({
        ID,
        crfi: this.CRFL,
        cfil: this.cfil,
      })
      this.showMask = false
    },
    handleLoanRateConfirm() {
      this.changeLoanRate(this.params)
      this.showEdit = false
    },
  },
}
</script>

<style lang="scss" scoped>
/deep/ .van-dialog__header {
  color: #333;
}
.about {
  background: #3f495a url('../../assets/images/bg.png') no-repeat;
  background-size: cover;

  height: 100%;
  overflow: auto;
}
.content {
  color: #333;
  width: 375px;
  margin: 0 auto;
  // padding: 0 24px;
  // padding-top: 130px;
}

// 配置
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 12px 0;
  color: #fff;
  font-size: 12px;
}
.item {
  display: flex;
  margin-bottom: 12px;
  padding-left: 12px;
  // color: #fff;
  font-size: 10px;
  .label {
    width: 100px;
    margin-right: 12px;
    text-align: left;
  }
}
.apply-item {
  background: #2c3546;
  border-radius: 8px;
  padding: 12px;
  margin: 0 32px 24px;
  color: #fff;
  font-size: 14px;
  text-align: left;
  .item-text,
  .item-wallet {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }
}
.charge {
  display: flex;
  align-items: center;
  margin: 12px auto 20px;
  padding: 12px 0;
  background: #fff;
  border: 1px solid #63c2cd;
  border-radius: 5px;
  padding: 4px;
  font-size: 6px;
  &-btn {
    width: 50px;
  }
}
.charge-title {
  background: #fff;
  border-bottom: 1px solid #63c2cd;
  padding: 10px 25px;
  border-radius: 5px;
  font-family: PingFang SC;
  font-weight: 600;
  font-size: 15px;
  text-align: left;
  color: #63c2cd;
}
.items {
  background: #fff;
  margin: 0 32px;
  border-radius: 5px;
  text-align: left;
  font-size: 15px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #63c2cd;
    padding: 10px 25px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #63c2cd;
    .btn {
      background: #56bdc9;
      color: #fff;
      border-radius: 10px;
      padding: 2px 10px;
      font-weight: normal;
      font-size: 9px;
    }
  }
  .item {
    display: flex;
    align-items: center;
    margin: 0px 25px;
    padding: 15px 0;
    border-bottom: 1px solid #eee;
    .date {
      display: flex;
      flex-direction: column;
      width: 47px;
      height: 47px;
      margin-right: 9px;
      text-align: center;
      font-size: 10px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #ffffff;
      &-bg {
        height: 18px;
        background: #63c2cd;
        border-bottom-left-radius: 16px;
        border-bottom-right-radius: 16px;
      }
      .text {
        flex: 1;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 600;
        color: #000000;
      }
    }
    &-content {
      flex: 1;
    }
    .price,
    .income {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .price {
      justify-content: flex-start;

      margin-bottom: 6px;
      &-title {
        width: 60px;
      }
      &-text {
        // width: 160px;
        margin: 0 8px;
      }
      &-input {
        width: 80px;
        border: 1px solid #ebedf0;
        margin: 0 8px;
      }
    }
    .number {
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #000000;
    }
    .income {
      font-size: 10px;
      color: #96a5bf;
    }
    &-btn {
      padding: 2px 6px;
      border-radius: 5px;
    }
  }
}
.mask {
  // position: fixed;
  // top: 0;
  // bottom: 0;
  // left: 0;
  // right: 0;
  // background: rgba(0, 0, 0, 0.6);
  &-content {
    width: 310px;
    // height: 200px;
    position: absolute;
    z-index: 99;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: #fff;
    border-radius: 16px;
    padding-bottom: 12px;
    font-size: 15px;
    color: #63c2cd;
  }
  &-title {
    padding: 12px 0;
  }
  .footer {
    display: flex;
    justify-content: center;
    &-btn {
      width: 87px;
      height: 32px;
      margin: 0 14px;
      line-height: 32px;
      background: #63c2cd;
      color: #fff;
      font-size: 15px;
      border-radius: 16px;
    }
  }
}
.form {
  padding: 0 16px;
}
.field {
  height: 42px;
  line-height: 42px;
  background: #eee;
  margin-bottom: 10px;
}
.mr-t {
  margin-top: 100px;
}
</style>
