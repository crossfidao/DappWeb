<template>
  <div class="container home">
    <BaseHeader :isBack="true" :title="$t('staking')" />
    <div class="content">
      <div class="items">
        <h4 class="item-title">{{ $t('staking') }}</h4>
        <div class="item">
          <span class="item-label">{{ $t('totalIssue') }}:</span>
          <span class="item-content">{{ totalSupply | decimals }}</span>
        </div>
        <div class="item-input">
          <span class="item-input-label">{{ $t('name') }}:</span>
          <van-field class="field" center clearable v-model="params.name" />
          <!-- :placeholder="$t('purchaseAmount')" -->
        </div>
        <div class="item-input">
          <span class="item-input-label">{{ $t('email') }}:</span>
          <van-field class="field" center clearable v-model="params.email" />
        </div>
        <div class="item-input">
          <span class="item-input-label">{{ $t('company') }}:</span>
          <van-field class="field" center clearable v-model="params.company" />
        </div>
        <div class="item-input">
          <span class="item-input-label">{{ $t('nodeNumber') }}:</span>
          <van-field
            class="field"
            center
            clearable
            v-model="params.nodeNumber"
          />
        </div>
        <div class="item-btn">
          <span class="btn" @click="handleStaking">{{ $t('confirm') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      showMask: false,
      currentRate: 0,
      params: {
        name: '',
        email: '',
        company: '',
        nodeNumber: '',
      },
      totalSupply: '',
    }
  },
  computed: {
    showLoading() {
      return this.$store.state.showLoading
    },
    text() {
      return this.currentRate.toFixed(0) + '%'
    },
  },
  async mounted() {
    this.totalSupply = await this.getTotalSupply()
    console.log('dkfldlkf', this.totalSupply)
  },
  methods: {
    ...mapMutations(['setUserAddress']),
    ...mapActions(['applyStaking', 'getTotalSupply']),
    async handleStaking() {
      if (
        this.params.name == '' ||
        this.params.email == '' ||
        this.params.company == '' ||
        this.params.nodeNumber == ''
      ) {
        return
      }
      await this.applyStaking(JSON.stringify(this.params))
    },
    getStyle(index) {
      let target = index % 5
      let arr = ['#F57620', '#B406C3', '#3655E7', '#7CB732', '#6D06C3']
      return `background: ${arr[target]}`
    },
  },
}
</script>

<style lang="scss" scoped>
.home {
  z-index: 99;
}
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #3f495a url('../../assets/images/bg.png') no-repeat;

  background-size: cover;

  color: #fff;
  .content {
    padding-bottom: 24px;
  }
}
.content {
  padding: 0 32px;
}
.stake {
}
.stake-btn {
  display: inline-block;
  width: 127px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  background: #6e4af7;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 10px;
  font-size: 18px;
  font-family: Montserrat;
  font-weight: 500;
  color: #ffffff;
}
.items {
  background: #3f4c5d;
  margin-top: 15px;
  opacity: 1;
  border-radius: 13px;
  padding: 16px 16px 0;
  font-size: 16px;
  font-family: Montserrat;
  font-weight: 500;
  color: #ffffff;
  text-align: left;
  .item-title {
    margin-bottom: 20px;
    font-size: 22px;
    font-family: Montserrat;
    font-weight: 500;
    line-height: 27px;
    color: #ffffff;
    text-align: center;
  }
}
.item {
  display: flex;
  align-items: center;
  margin-bottom: 42px;
  padding-bottom: 16px;
  &-label,
  &-content {
    flex: 1;
  }
  &-label {
    width: 150px;
  }
  &-content {
    text-align: center;
  }
  &-btn {
    display: flex;
    justify-content: center;
    .btn {
      width: 127px;
      height: 36px;
      line-height: 36px;
      background: #18ced2;
      margin-bottom: 36px;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
      border-radius: 10px;
      text-align: center;
    }
  }
  &-input-label {
    width: 90px;
  }
}
.item-input {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .field {
    width: 200px;
    border-radius: 10px;
    background: #2c3546;
  }
}

.mask {
  &-content {
    width: 320px;
    position: absolute;
    z-index: 99;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: #3f4c5d;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    padding-bottom: 20px;
    border-radius: 13px;
    font-size: 13px;
    font-family: Segoe UI;
    font-weight: bold;
    line-height: 16px;
    color: #ffffff;
  }
  &-title {
    padding: 12px 0;
    font-size: 22px;
    font-family: Montserrat;
    font-weight: 600;
    line-height: 27px;
    color: #ffffff;
  }
  &-text {
    margin-bottom: 24px;
    padding-left: 14px;
    text-align: left;
  }
  &-desc {
    margin-bottom: 16px;
    margin-left: 12px;
    font-size: 10px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #fff;
    &-name {
      display: flex;
      align-items: center;
    }
    &-balance {
      width: 150px;
      height: 24px;
      line-height: 24px;
      background: #2c3546;
      margin-top: 10px;
      border-radius: 10px;
    }
  }
  .footer {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    &-btn {
      width: 108px;
      height: 32px;
      line-height: 32px;
      background: #18ced2;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
      opacity: 1;
      border-radius: 10px;
      font-size: 15px;
      font-family: Segoe UI;
      font-weight: 600;
      color: #ffffff;
    }
  }
}
.form {
  display: flex;
  margin-bottom: 24px;
  padding: 0 16px;
  // background: #2c3546;
  .max {
    width: 58px;
    height: 42px;
    line-height: 42px;
    background: #1fced2;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    border-radius: 8px;
  }
  .field {
    height: 42px;
    line-height: 42px;
    background: #2c3546;
    margin-bottom: 10px;
    margin-right: 8px;
    color: #fff;
    border: none !important;
    border-radius: 10px;
  }
}
/deep/ .van-field__control {
  color: #fff;
}
</style>
