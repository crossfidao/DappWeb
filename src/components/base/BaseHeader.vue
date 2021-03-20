<template>
  <div class="header">
    <div class="header-top">
      {{ $t('overview') }}
      <span>...</span>
    </div>
    <div class="header-address">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseHeader',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.home {
  background: #eee;
  height: 100%;
}
.header {
  position: relative;
  &-top {
    position: relative;
    background: #47b7c4;
    height: 140px;
    padding-top: 24px;
    border-bottom-left-radius: 32px;
    border-bottom-right-radius: 32px;
    color: #fff;
    font-size: 32px;
    span {
      position: absolute;
      right: 12px;
    }
  }
  &-address {
    position: absolute;
    top: 80px;
    left: 58px;
    right: 58px;
    background: #fff;
    border-radius: 16px;
    padding-top: 56px;
    padding-bottom: 12px;
    color: #808080;
    font-size: 32px;
    .text {
      font-size: 18px;
    }
  }
}
</style>
