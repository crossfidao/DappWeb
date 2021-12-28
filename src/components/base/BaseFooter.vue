<template>
  <div :class="$store.state.daynight ? 'bg' : 'bg1'"  >
    <div :class="$store.state.daynight ? 'footer1' : 'footer'"   >
      <router-link
        tag="div"
        :to="item.path"
        class="item"
        v-for="item in tabs"
        :key="item.name"
      >
        <i class="icon" :class="item.icon"></i>
        <!-- <van-icon name="chat-o" size="18" /> -->
        <p class="item-name">{{ $t(item.name) }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { CHAINIDBSC } from '@/config'
export default {
  name: 'BaseFooter',
  props: {
    title: {
      type: String,
      default: 'depositCoins',
    },
  },
  data() {
    return {
      isBg: false,
    }
  },
  watch: {
    $route(val) {
      let { name } = val
      if (name === 'CRFI' || name === 'CFIL') {
        this.isBg = true
      } else {
        this.isBg = false
      }
    },
  },
  computed: {
    tabs() {
      if (
        this.$store.state.chainId == CHAINIDBSC ||
        this.$store.state.chainId == 0x3
      ) {
        return [
          {
            path: '/',
            name: 'dashboard',
            icon: 'dashboard',
          },
          {
            name: 'cFILInvest',
            path: '/CFIL',
            icon: 'cFIL',
          },
          {
            name: 'CRFIInvest',
            path: '/CRFI',
            icon: 'CRFI',
          },
          {
            name: 'exchange',
            icon: 'exchange',
            path: '/exchange',
          },
          {
            name: 'wallet',
            icon: 'wallet',
            path: '/wallet',
          },
        ]
      } else {
        return [
          {
            path: '/',
            name: 'dashboard',
            icon: 'dashboard',
          },
          {
            name: 'cFILInvest',
            path: '/CFIL',
            icon: 'cFIL',
          },
          {
            name: 'CRFIInvest',
            path: '/CRFI',
            icon: 'CRFI',
          },
          {
            name: 'wallet',
            icon: 'wallet',
            path: '/wallet',
          },
        ]
      }
    },
  },
  methods: {
    ...mapMutations(['setUserAddress']),
    ...mapActions(['initData']),
    getStyle(item) {
      return `background: url('../../assets/icon/${item.icon}.png') no-repeat`
    },
  },
}
</script>

<style lang="scss" scoped>
.box {
  background: transparent;
  // background: red;

  // padding-top: 12px;
}
.footer1 {
  position: relative;
  height: 91px;
  background: #29282F;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  // opacity: 1;
  border-radius: 40px 40px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  // font-weight: 600;
  font-size: 10px;
  font-family: Segoe UI;
  color: #999999;
  // letter-spacing: 10px;

  .item {
    display: flex;

    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    border-radius: 18px;
    &-name {
      margin-top: 8px;
    }
    .icon {
      width: 18px;
      height: 18px;
      background-size: cover;
    }
    .dashboard {
      background-image: url('../../assets/icon/dashboard.png');
    }
    .cFIL {
      background-image: url('../../assets/icon/cFIL.png');
    }
    .CRFI {
      background-image: url('../../assets/icon/CRFI.png');
    }
    .wallet {
      background-image: url('../../assets/icon/wallet.png');
    }
    .exchange {
      background-image: url('../../assets/icon/exchange.png');
    }
  }
}

.footer {
  position: relative;
  height: 91px;
  background: #fff;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  // opacity: 1;
  border-radius: 40px 40px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  // font-weight: 600;
  font-size: 10px;
  font-family: Segoe UI;
  color: #999999;
  // letter-spacing: 10px;

  .item {
    display: flex;

    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    border-radius: 18px;
    &-name {
      margin-top: 8px;
    }
    .icon {
      width: 18px;
      height: 18px;
      background-size: cover;
    }
    .dashboard {
      background-image: url('../../assets/icon/dashboard.png');
    }
    .cFIL {
      background-image: url('../../assets/icon/cFIL.png');
    }
    .CRFI {
      background-image: url('../../assets/icon/CRFI.png');
    }
    .wallet {
      background-image: url('../../assets/icon/wallet.png');
    }
    .exchange {
      background-image: url('../../assets/icon/exchange.png');
    }
  }
}

.router-link-exact-active {
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  // z-index: 2;
  background: #2786ff;
  margin-bottom: 40px;
  color: #fff;
  .icon {
    width: 26px !important;
    height: 26px !important;
  }
  .cFIL {
    background-image: url('../../assets/icon/cFIL-active.png') !important;
  }
  .dashboard {
    background-image: url('../../assets/icon/home.png') !important;
  }
  .CRFI {
    background-image: url('../../assets/icon/CRFI-active.png') !important;
  }

  .wallet {
    background-image: url('../../assets/icon/wallet-active.png') !important;
  }
  .exchange {
    background-image: url('../../assets/icon/exchange-active.png') !important;
  }
}
// .bg {
//   background: transparent !important;
//     border-radius: 40px 40px 0px 0px !important;
// }
.bg{
   background: #29282F !important;
}
.bg1{
   background: #E6EDFF;
}
</style>
