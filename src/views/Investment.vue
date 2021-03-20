<template>
  <div class="about">
    <BaseHeader>
      <div class="step-box">
        <base-step></base-step>
      </div>
      <div class="header-title">
        <h4>我的持仓</h4>
        <span>icon</span>
      </div>
      <div class="desc">当前有3款产品可赎回</div>
    </BaseHeader>

    <div class="items mr-t">
      <h4 class="title">eFil 投资</h4>
      <div
        class="item-box"
        :class="index % 2 == 0 ? 'flex-start' : 'flex-end'"
        v-for="(item, index) in 3"
        :key="item"
      >
        <div class="item" :style="getStyle(index)">
          <div
            class="item-content "
            :class="index % 2 == 0 ? 'content-left' : ''"
          >
            <div class="name">
              <h5 class="">FDdf3933</h5>
              <span class="text">本期年化</span>
            </div>
            <div class="btn">购买</div>
          </div>
          <span
            class="date"
            :class="index % 2 == 0 ? 'date-left' : 'date-right'"
          >
            30日
          </span>
        </div>
      </div>
    </div>
    <div class="items">
      <h4 class="title">eFil 投资</h4>
      <div
        class="item-box"
        :class="index % 2 == 0 ? 'flex-start' : 'flex-end'"
        v-for="(item, index) in 3"
        :key="item"
      >
        <div class="item" :style="getStyle(index)">
          <div
            class="item-content "
            :class="index % 2 == 0 ? 'content-left' : ''"
          >
            <div class="name">
              <h5 class="">FDdf3933</h5>
              <span class="text">本期年化</span>
            </div>
            <div class="btn">购买</div>
          </div>
          <span
            class="date"
            :class="index % 2 == 0 ? 'date-left' : 'date-right'"
          >
            30日
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseStep from '@/components/base/BaseStep.vue'
export default {
  components: {
    BaseStep,
  },
  data() {
    return {
      active: 0,
    }
  },
  methods: {
    getStyle(index) {
      console.log(index)
      return `background: no-repeat center/100% url('./bg${index}.png');`
      return `background: url('../assets/images/bg${index}.png');`
    },
  },
}
</script>

<style scoped lang="scss">
.step-box {
  // padding: 0 64px;
  border-bottom: 1px solid #9cd8df;
}
.header-title {
  display: flex;
  justify-content: space-between;
  margin: 80px 48px 64px;
  font-size: 30px;
  color: #63c2cd;
}
.desc {
  margin-bottom: 75px;
  color: #96a5bf;
  font-size: 22px;
}
.mr-t {
  margin-top: 550px;
}
.items {
  position: relative;
  background: #fff;
  margin: 0 42px 90px;
  padding-top: 100px;
  padding-bottom: 42px;
  border-radius: 12px;
  font-size: 25px;
  .title {
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    right: 0;
    width: 173px;
    height: 60px;
    line-height: 60px;
    background: #63c2cd;
    border-radius: 32px;
    font-size: 30px;
    color: #fff;
    font-weight: bold;
  }
  .item-box {
    display: flex;
    margin-bottom: 40px;
    height: 148px;
    background-size: cover;
  }
  .flex-start {
    justify-content: flex-start;
  }
  .flex-end {
    justify-content: flex-end;
  }
  .item {
    position: relative;
    display: flex;
    text-align: center;
    width: 620px;
    height: 148px;
    &-content {
      width: 440px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #000000;
      .btn {
        background: #63c2cd;
        margin-top: 64px;
        width: 96px;
        border-radius: 32px;
        font-size: 24px;
        height: 42px;
        line-height: 42px;
        color: #fff;
      }

      .name {
        margin-top: 12px;
        padding-left: 42px;
      }
      .text {
        margin-top: 24px;
        display: block;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 300;
        color: #96a5bf;
      }
    }
    .content-left {
      margin-left: 160px;
    }
    .date {
      position: absolute;
      bottom: 24px;
      font-size: 44px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #27abba;
      &-left {
        left: 24px;
      }
      &-right {
        right: 24px;
      }
    }
  }
}
.mr-t {
  margin-top: 550px;
}
</style>
