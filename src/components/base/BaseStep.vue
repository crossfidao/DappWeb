<template>
  <div>
    <div style="padding: 0 44px;">
      <div class="step">
        <div class="line-box">
          <div class="line" :style="style"></div>
        </div>
        <!-- :class="'left' + index" -->

        <div
          class="circle"
          v-for="(item, index) in 3"
          :key="getSymbol(index)"
          :class="getClass(index)"
          :style="getCircleStyle(index)"
        ></div>
      </div>
    </div>
    <div class="text-box">
      <div class="text" v-for="(item, index) in text" :key="getSymbol(index)">
        <p class="title">{{ $t(item.title) }}</p>
        <p>{{ $t(item.desc) }}1</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    step: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      text: [
        {
          title: 'buyProduct',
          desc: 'date',
        },
        {
          title: 'interest',
          desc: 'cycle',
        },
        {
          title: 'withtraw',
          desc: 'maturity',
        },
      ],
    }
  },
  computed: {
    style() {
      let width = this.step * 50 > 100 ? 100 : this.step * 50
      return `width: ${width}%`
    },
  },
  methods: {
    getSymbol(index) {
      return Symbol(index)
    },
    getClass(index) {
      if (this.step >= index) {
        return ` active`
      }
      return ``
    },
    getCircleStyle(index) {
      return `left: ${index * 50}%`
    },
    getTextClass(index) {
      if (this.step >= index) {
        return `text-active`
      }
      return ``
    },
  },
}
</script>

<style lang="scss" scoped>
.step {
  display: flex;
  position: relative;
  width: 100%;
  margin: 12px auto 13px;
  // padding: 0 24px;
  .line-box {
    position: relative;
    width: 100%;
    height: 2px;
    background: #ccc;
  }
  .line {
    position: absolute;
    width: 33%;
    height: 2px;
    background: #2ab2d0;
  }
  .circle {
    position: absolute;
    top: -4px;
    width: 10px;
    height: 10px;
    background: #ccc;
    border-radius: 5px;
    transform: translateX(-50%);
  }
  .active {
    background: #2ab2d0;
  }

  .bg1 {
    background: #2ab2d0;
  }
}
.text-box {
  display: flex;
  justify-content: space-around;
}
.text {
  // transform: translateX(-50%);
  // position: absolute;
  // left: 0;
  // top: 40px;
  flex: 1;
  font-size: 8px;
  font-family: PingFangSC-Light, PingFang SC;
  font-weight: 300;
  color: #707070;
  .title {
    margin-bottom: 15px;
    font-size: 10px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #707070;
  }
}
.text-active {
  color: #333;
}
</style>
