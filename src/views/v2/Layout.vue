<template>
  <div class="cont">
    <router-view class="content" />
    <BaseFooter></BaseFooter>
    <Depositdue v-if="userList.length > 0" />
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import Depositdue from '@/components/modal/depositdue.vue'

export default {
  components: {
    Depositdue,
  },
  computed: {
    showLoading() {
      return this.$store.state.showLoading
    },
    userList() {
      return this.$store.state.userList.filter((item)=>{
        return item.Days == 0
        //  || this.getEndTime(item.EndTime) < 0
      })
    },
  },

  async mounted() {},

  methods: {
    ...mapMutations(['setUserAddress']),
    ...mapActions(['initData']),
    getEndTime(value) {
      let now = parseInt(new Date().getTime())
      return value * 1000 - now
    },
  },
}
</script>

<style lang="scss" scoped>
.cont {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  // background: #3f495a url('../../assets/images/bg.png') no-repeat;
  background-size: cover;
  background-size: cover;
  .content {
    flex: 1;
    overflow: auto;
    // padding-bottom: 16px;
  }
}
</style>
