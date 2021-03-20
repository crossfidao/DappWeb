<template>
  <div class="about">
    <BaseHeader>
      <div class="items">
        <div class="title">
          <span>eFil {{ $t('interestRate') }}</span>
          <div class="btn">一键赎回</div>
        </div>
        <div class="item" v-for="item in fdList" :key="item.date">
          <div class="date">
            <span class="text">{{ item.date }}{{ $t('time') }}</span>
            <!-- <p class="date-bg">eFile</p> -->
          </div>
          <div class="item-content">
            <div class="price">
              <h5 class="price-title">FD {{ $t('rate') }}:</h5>
              <span class="price-text" v-if="item.show">
                {{ item.fdRate }}
              </span>
              <van-field
                v-else
                class="price-input"
                border
                v-model="value"
                placeholder=""
              />
              <span>%</span>
            </div>
            <div class="price">
              <h5 class="price-title">eFil {{ $t('rate') }}:</h5>
              <span class="price-text" v-if="item.show">
                {{ item.eFilRate }}
              </span>
              <van-field
                v-else
                class="price-input"
                border
                v-model="value"
                placeholder=""
              />
              <span>%</span>
            </div>
          </div>
          <van-button
            class="item-btn"
            type="primary"
            size="mormal"
            v-if="item.show"
            @click="handleEdit(item)"
          >
            {{ $t('edit') }}
          </van-button>
          <van-button
            class="item-btn"
            type="primary"
            size="mormal"
            v-else
            @click="handleEdit(item)"
          >
            {{ $t('config') }}
          </van-button>
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
    </div> -->
    <!-- <div class="items">
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
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'admin',
  data() {
    return {
      value: '',
      fdList: [
        {
          date: '24',
          fdRate: '123',
          eFilRate: 234,
          show: true,
          showeFil: true,
        },
      ],
    }
  },
  methods: {
    handleEdit(item) {
      item.show = !item.show
    },
  },
}
</script>

<style lang="scss" scoped>
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
        width: 160px;
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
  }
}
.mr-t {
  margin-top: 200px;
}
</style>
