<template>
  <div class="about">
    <div class="content"></div>
    <div class="items">
      <div class="title">到期资产</div>
      <div class="item" v-for="item in 3" :key="item">
        <div class="date">
          <span class="text">30日</span>
          <p class="date-bg">eFile</p>
        </div>
        <div class="item-content">
          <div class="price">
            <h5>FD:2.4$</h5>
            <h4 class="number">1500.00</h4>
          </div>
          <div class="income">
            <span>[到期时间]09：43</span>
            <div>
              <span>+3493 eFil</span>
              <p>+3493 FD</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="items">
      <div class="title">eFil 投资</div>
      <div class="item" v-for="item in 3" :key="item">
        <div class="date">
          <span class="text">30日</span>
          <p class="date-bg">eFile</p>
        </div>
        <div class="item-content">
          <div class="price">
            <h5>FD:2.4$</h5>
            <h4 class="number">1500.00</h4>
          </div>
          <div class="income">
            <span>[到期时间]09：43</span>
            <div>
              <span>+3493 eFil</span>
              <p>+3493 FD</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="items">
      <div class="title">FD 投资</div>
      <div class="item" v-for="item in 3" :key="item">
        <div class="date">
          <span class="text">30日</span>
          <p class="date-bg">eFile</p>
        </div>
        <div class="item-content">
          <div class="price">
            <h5>FD:2.4$</h5>
            <h4 class="number">1500.00</h4>
          </div>
          <div class="income">
            <span>[到期时间]09：43</span>
            <div>
              <span>+3493 eFil</span>
              <p>+3493 FD</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.items {
  width: 634px;
  margin: 0 auto 40px;
  background: #fff;
  border-radius: 10px;
  text-align: left;
  font-size: 31px;
  .title {
    border-bottom: 1px solid #63c2cd;
    padding: 40px 50px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #63c2cd;
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
  }
}
</style>
