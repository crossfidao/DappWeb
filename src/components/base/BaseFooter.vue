<template>
  <div class="footer">
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
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
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
      tabs: [
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
      ],
    }
  },
  computed: {},
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
.footer {
  position: relative;
  width: 375px;
  height: 91px;
  background: #ffffff;
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
      background-image: url('../../assets/icon/dashboard.jpg');
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
  }
}

.router-link-exact-active {
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  z-index: 2;
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
    background-image: url('../../assets/icon/dashboard-active.jpg') !important;
  }
  .CRFI {
    background-image: url('../../assets/icon/CRFI-active.png') !important;
  }

  .wallet {
    background-image: url('../../assets/icon/wallet-active.jpg') !important;
  }
}
</style>
