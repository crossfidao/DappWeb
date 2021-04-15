<template>
  <div class="apply">
    <BaseHeader title="lend">
      <div class="desc">
        <div class="process">
          <span class="text">{{ $t('mailForApply') }}</span>
          <span class="arrow">→</span>
          <van-icon name="" />
          <span class="text">{{ $t('filecoin') }}</span>
        </div>
        <p class="text">{{ $t('annualizedRate') }}</p>
        <div class="date">
          <div class="date-item br">
            <span class="day">90{{ $t('day') }}</span>
            <span>5%</span>
          </div>
          <div class="date-item br">
            <span class="day">90{{ $t('day') }}</span>
            <span>5%</span>
          </div>
          <div class="date-item">
            <span class="day">90{{ $t('day') }}</span>
            <span>5%</span>
          </div>
        </div>
        <p class="text">{{ $t('applyText1') }}</p>
        <p class="text">{{ $t('applyText2') }}</p>
      </div>
    </BaseHeader>
    <div class="content">
      <p class="item">{{ $t('nodeNumber') }}:</p>
      <p class="item">{{ $t('totalPower') }}:</p>
      <p class="item">{{ $t('demand') }}:</p>
      <p class="item">{{ $t('deadline') }}:</p>
      <p class="item">{{ $t('company') }}:</p>
      <p class="item">{{ $t('email') }}:</p>
      <p class="item">{{ $t('name') }}:</p>
      <p class="item">{{ $t('receiveAddress') }}:</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.applay {
}
.content {
  width: 320px;
  background: #fff;
  margin: 220px auto 0;
  border-radius: 8px;
  padding: 26px 32px;
  font-size: 10px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #707070;
  text-align: left;
}
.desc {
  padding: 25px;
  text-align: left;
  .text {
    font-size: 10px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #707070;
  }
  .date {
    display: flex;
    justify-content: space-around;
    margin: 10px 0 20px;
    font-size: 10px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #000000;
    &-item {
      flex: 1;
      text-align: center;
      .day {
        margin-right: 12px;
      }
    }
    .br {
      border-right: 1px solid #000;
    }
  }
}
.process {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  .text {
    text-align: center;
    width: 100px;
    height: 50px;
    border: 1px solid #25aab9;
    border-radius: 12px;
    padding: 4px;
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #63c2cd;
    line-height: 17px;
  }
  .arrow {
    font-size: 40px;
    margin: 0 24px;
    color: #63c2cd;
  }
}
</style>
