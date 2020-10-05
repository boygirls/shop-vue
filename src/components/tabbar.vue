<template>
  <!-- tabBar -->
  <van-tabbar v-model="tabarActive">
    <van-tabbar-item icon="wap-home" @click="redirects('/')"
      >首页</van-tabbar-item
    >
    <van-tabbar-item
      icon="pending-evaluate"
      dot
      @click="redirects('/community')"
      >社区</van-tabbar-item
    >
    <van-tabbar-item
      icon="shopping-cart"
      :badge="cartLength"
      v-infos="shop_info"
      @click="redirects('/shoppingCart')"
      >购物车</van-tabbar-item
    >
    <van-tabbar-item
      icon="contact"
      info=""
      v-infos="my_info"
      @click="redirects('/me')"
      >我的</van-tabbar-item
    >
  </van-tabbar>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Waterfall from "@vant/waterfall";
export default {
  name: 'tabbar',
  components: {},
  data() {
      return {
          tabarActive:0,
      };
  },
  computed: {
    ...mapGetters(['cartLength']),
  },
  methods: {
    redirects(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style scoped></style>
