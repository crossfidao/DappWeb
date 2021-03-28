<template>
  <div class="about">
    <BaseHeader>
      <div class="items">
        <div class="title">
          <span>eFil {{ $t('interestRate') }}</span>
          {{ fdList }}
        </div>
        <div class="charge">
          <span></span>
          <van-field
            class="price-input"
            border
            v-model="value"
            placeholder="请输入eFil数量"
          />
          <van-button class="charge-btn" @click="handleCharge">
            充值
          </van-button>
          <van-button class="charge-btn" @click="handleChangeRate">
            修改
          </van-button>
          <van-button class="charge-btn" @click="handleDemandRate">
            修改活期
          </van-button>
        </div>
        <div class="item" v-for="item in list" :key="item.date">
          <div class="date">
            <span class="text">{{ item.Days }}{{ $t('time') }}</span>
            <p class="date-bg">{{ item.Type == 0 ? 'CRFI' : 'eFil' }}</p>
          </div>
          <div class="item-content">
            <div class="price">
              <h5 class="price-title">CRFI {{ $t('rate') }}:</h5>
              <span class="price-text" v-if="!item.show">
                {{ item.FDInterestRate }}
              </span>
              <!-- <van-field
                v-else
                class="price-input"
                border
                v-model="item.value"
                placeholder=""
              /> -->
              <span>%</span>
            </div>
            <div class="price">
              <h5 class="price-title">eFil {{ $t('rate') }}:</h5>
              <span class="price-text" v-if="!item.show">
                {{ item.EFilInterestRate }}
              </span>
              <!-- <van-field
                class="price-input"
                border
                v-model="item.EFilInterestRate"
                placeholder=""
              /> -->
              <span>%</span>
            </div>
          </div>
          <van-button
            class="item-btn"
            type="primary"
            size="mormal"
            @click="handleEdit(item)"
          >
            <!-- @click="handleEdit(item)" -->
            {{ $t('edit') }}
          </van-button>
          <!-- <van-button
            class="item-btn"
            type="primary"
            size="mormal"
            v-else
            @click="handleEdit(item)"
          >
            {{ $t('config') }}
          </van-button> -->
        </div>
      </div>
    </BaseHeader>
    <div class="content"></div>
    <!-- <div class="items mr-t">
      <div class="title">到期资产</div>
      <div class="item" v-for="item in 3" :key="item">
        <div class="date">
          <span class="text">30日</span>
          <p class="date-bg">eFile</p>
        </div>
        <div class="item-content">
          <div class="price">
            <h5>CRFI:2.4$</h5>
            <h4 class="number">1500.00</h4>
          </div>
          <div class="income">
            <span>[到期时间]09：43</span>
            <div>
              <span>+3493 eFil</span>
              <p>+3493 CRFI</p>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <!-- <div class="items">
      <div class="title">eFil 投资</div>
      <div class="item" v-for="item in 3" :key="item">
        <div class="date">
          <span class="text">30日</span>
          <p class="date-bg">eFile</p>
        </div>
        <div class="item-content">
          <div class="price">
            <h5>CRFI:2.4$</h5>
            <h4 class="number">1500.00</h4>
          </div>
          <div class="income">
            <span>[到期时间]09：43</span>
            <div>
              <span>+3493 eFil</span>
              <p>+3493 CRFI</p>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <!-- <div class="items">
      <div class="title">CRFI 投资</div>
      <div class="item" v-for="item in 3" :key="item">
        <div class="date">
          <span class="text">30日</span>
          <p class="date-bg">eFile</p>
        </div>
        <div class="item-content">
          <div class="price">
            <h5>CRFI:2.4$</h5>
            <h4 class="number">1500.00</h4>
          </div>
          <div class="income">
            <span>[到期时间]09：43</span>
            <div>
              <span>+3493 eFil</span>
              <p>+3493 CRFI</p>
            </div>
          </div>
        </div>
      </div>
    </div> -->
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
            v-model="efil"
            placeholder="请填写efil利率（%）"
          />
        </div>
        <div class="footer">
          <div class="footer-btn" @click="showMask = false">
            {{ $t('cancel') }}
          </div>
          <div class="footer-btn" @click="handleChangeRate">
            {{ $t('confirm') }}
          </div>
        </div>
      </div>
    </van-overlay>
    <!-- <van-popup v-model="show">
      <div class="filed">
        <div class="filed-title">修改利率</div>
        <van-field
          class="filed-input"
          placeholder="请填写利率"
          border
          v-model="CRFL"
        />
        <van-field
          class="filed-input"
          placeholder="请填写利率"
          border
          v-model="CRFL"
        />
      </div>
    </van-popup> -->
  </div>
</template>

<script>
import Web3 from 'web3'
import { mapActions } from 'vuex'

let web3 = new Web3()
let { utils } = web3
export default {
  name: 'admin',
  data() {
    return {
      showMask: false,
      curItem: null,
      CRFL: '',
      efil: '',
      value: '',
      list: [],
    }
  },
  computed: {
    fdList() {
      console.log('fdList', this.$store.state.fdList)
      let list = this.$store.state.fdList
      list.forEach(element => {
        // element.show = false
        let {
          Days,
          EFilInterestRate,
          FDInterestRate,
          ID,
          Type,
          deleteFlag,
        } = element
        console.log(
          Days,
          EFilInterestRate,
          FDInterestRate,
          ID,
          Type,
          deleteFlag,
        )
        EFilInterestRate = EFilInterestRate * 100
        EFilInterestRate = utils.fromWei(EFilInterestRate.toString())

        FDInterestRate = FDInterestRate * 100
        FDInterestRate = utils.fromWei(FDInterestRate.toString())
        this.list.push({
          Days,
          EFilInterestRate,
          FDInterestRate,
          ID,
          Type,
          deleteFlag,
        })
        console.log('dflkdfld', this.list)
      })
      this.curItem = this.list[0]

      return this.$store.state.fdList
    },
  },
  mounted() {},
  methods: {
    ...mapActions(['charge', 'ChangePackageRate', 'ChangeDemandRate']),
    handleCharge() {
      this.charge({ value: this.value })
    },
    handleEdit(item) {
      console.log('item', item)
      let { ID, EFilInterestRate, FDInterestRate } = this.curItem
      this.CRFL = FDInterestRate
      this.efil = EFilInterestRate

      this.curItem = item
      this.showMask = true
      // if (item.show) {
      //   item.show = false
      // } else {
      //   item.show = true
      // }
      // item.show = !item.show
      // console.log('item', item)
    },
    handleDemandRate() {
      // let { ID } = this.curItem
      this.ChangeDemandRate({
        ID: 0,
        fd: 0.1,
        efil: 0.1,
      })
    },
    handleChangeRate() {
      let { ID, EFilInterestRate, FDInterestRate } = this.curItem

      console.log(this.CRFL, this.efil, this.curItem)
      if (!(parseFloat(this.CRFL) > 0 && parseFloat(this.CRFL) < 100)) {
        this.$toast('请填写0-100的数字')
        return
      }
      this.ChangePackageRate({
        ID,
        fd: this.CRFL,
        efil: this.efil,
      })
      this.showMask = false
    },
  },
}
</script>

<style lang="scss" scoped>
.charge {
  display: flex;
  align-items: center;
  margin-top: 12px;
  border: 1px solid #63c2cd;
  padding: 8px;
  font-size: 12px;
  &-btn {
    width: 100px;
  }
}
.items {
  width: 634px;
  margin: 0 auto 40px;
  background: #fff;
  border-radius: 10px;
  text-align: left;
  font-size: 31px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #63c2cd;
    padding: 20px 50px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #63c2cd;
    .btn {
      background: #56bdc9;
      color: #fff;
      border-radius: 20px;
      padding: 4px 20px;
      font-weight: normal;
      font-size: 18px;
    }
  }
  .item {
    display: flex;
    align-items: center;
    margin: 0px 50px;
    padding: 30px 0;
    border-bottom: 1px solid #eee;
    .date {
      display: flex;
      flex-direction: column;
      width: 94px;
      height: 94px;
      margin-right: 18px;
      text-align: center;
      font-size: 17px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #ffffff;
      &-bg {
        height: 36px;
        background: #63c2cd;
        border-bottom-left-radius: 16px;
        border-bottom-right-radius: 16px;
      }
      .text {
        flex: 1;
        font-size: 33px;
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

      margin-bottom: 12px;
      &-title {
        width: 120px;
      }
      &-text {
        // width: 160px;
        margin: 0 16px;
      }
      &-input {
        width: 160px;
        border: 1px solid #ebedf0;
        margin: 0 16px;
      }
    }
    .number {
      font-size: 44px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #000000;
    }
    .income {
      font-size: 14px;
      color: #96a5bf;
    }
    &-btn {
      padding: 4px 12px;
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
.mr-t {
  margin-top: 200px;
}
</style>
