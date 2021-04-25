<template>
  <div class="footer">
    <router-link
      tag="div"
      :to="item.path"
      class="item"
      v-for="item in tabs"
      :key="item.name"
    >
      <!-- <i class="icon">icon</i> -->
      <van-icon name="chat-o" size="18" />
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
          name: 'dashboard',
          path: '/',
        },
        {
          name: 'cFILInvest',
          path: '/CFIL',
        },
        {
          name: 'CRFIInvest',
          path: '/cfri',
        },
        {
          name: 'aaa',
          path: '/wallet',
        },
      ],
    }
  },
  computed: {},
  methods: {
    ...mapMutations(['setUserAddress']),
    ...mapActions(['initData']),
  },
}
</script>

<style lang="scss" scoped>
.footer {
  width: 375px;
  height: 91px;
  background: #ffffff;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 40px 40px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  // font-weight: 600;
  font-size: 10px;
  font-family: Segoe UI;
  color: #999999;
  // letter-spacing: 10px;
  opacity: 1;

  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 64px;
    height: 64px;
    border-radius: 18px;
    &-name {
      margin-top: 8px;
    }
  }
}

.router-link-exact-active {
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  background: #2786ff;
  margin-bottom: 40px;
  color: #fff;
}
</style>
