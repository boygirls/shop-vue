<template>
  <div id="sech">
    <navagithub></navagithub>
    <!-- 搜索区域 -->
    <div class="prevshow">
      <div v-show="show">
        <van-row class="row-2">
          <van-col span="5">热门搜索</van-col>
        </van-row>
        <van-row class="row-2 row-content">
          <van-col span="4" offset="2" class="bord">羽绒服</van-col>
          <van-col span="4" offset="1" class="bord">围巾</van-col>
          <van-col span="4" offset="1" class="bord">面膜</van-col>
          <van-col span="4" offset="1" class="bord">护肤</van-col>
        </van-row>

        <van-row class="row-2 row-content">
          <van-col span="4" offset="2" class="bord">大衣</van-col>
          <van-col span="4" offset="1" class="bord">女靴</van-col>
          <van-col span="4" offset="1" class="bord">口红</van-col>
        </van-row>
      </div>

      <div v-show="sshow">
        <div class="val">
          <span>{{ value }} <van-icon name="search" class="icons"/></span>
        </div>
      </div>
    </div>
     <!-- 商品列表 -->
      <div class="over">
        <van-row gutter="18" offset="1" class="lists">
          <van-col
            v-for="(img) in itemSereach"
            :key="img.id"
            span="10"
            class="goods_list"
          >
            <div class="imgList" @click.stop="buy(img.image, img.id)">
              <img v-lazy="img.image" name="adapter" />
            </div>
            <van-col span="24" class="lazy-left">
              <span>{{ img.title }}</span>
            </van-col>

            <van-col span="24" class="lazy-bottom">
              <h4>
                ￥{{ img.price / 100 }}
                <span>￥{{ img.price / 100 }}</span>
                <div>8折</div>
              </h4>
            </van-col>
          </van-col>
        </van-row>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import navagithub from "./navagithub";

export default {
  name: "search",
  components: {
    navagithub
  },
  data() {
    return {
      tabarActive: 0,
      value: null,
      active: 0,
      path: "../../static/images/",
      imageList: [],
      activeTitle: null,
      days: null,
      disabled: false,
      broadcast: null,
      show: true,
      sshow: false
    };
  },
  computed: {
    ...mapState({
      title: state => state.home.tab.title,
      icon: state => state.home.badge.icon,
      bageTitle: state => state.home.badge.title,
      actives: state => state.active.home.title,
      src: state => state.home.lunbo.src,
      activeTitle: state => state.active.home.activeTitle,
      days: state => state.active.home.days,
      broadcast: state => state.home.broadcast,
      shop_info: state => state.home.shop_info,
      my_info: state => state.home.my_info,
      show: state => state.home.show,
      sshow: state => state.home.sshow,
      itemSereach: state => state.home.itemSereach,
    }),
    ...mapGetters(["bc_notshow"])
  },
  methods: {
    search() {
      console.log(this.value);
    },
    search_shows() {
      this.$router.back(-1);
    },
    keyboradWatch() {
      this.value == "" || this.value == null
        ? (this.show = true)
        : (this.show = false);
      this.value == "" || this.value == null
        ? (this.sshow = false)
        : (this.sshow = true);
    },
    buy(image,id) {
      this.buyParam(image);
      this.itemId(id)
      this.$router.push("/goods/"+id+"/buy");
    },
    ...mapActions(["searchA","buyParam","itemId"]),
    // 瀑布流方法
    loadMore() {
      this.disabled = true;
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          this.imageList.push(this.imageList[i]);
          this.activeTitle.push(this.activeTitle[i]);
          this.days.push(this.days[i]);
        }
        this.disabled = false;
      }, 200);
    },
    redirects(url) {
      this.$router.push(url);
    }
  },
  watch: {},
  directives: {},
  beforeCreate() {
    this.axios.get("./static/data.json").then(
      res => {
        if (res.status == 200) {
          const data = res.data.home;
          this.broadcast = data.broadcast;
          //  console.log(res.data.home.active,this.days,this.activeTitle)
        } else {
          this.imageList = this.src;
          this.broadcast = "暂无消息~~QAQ~";
        }
      },
      err => {
        this.imageList = this.src;
        this.broadcast = "暂无消息~~QAQ~";
      }
    );
  },
  created() {
    console.log(this.show, this.search_show);
  }
};
</script>

<style lang="less" scoped>
@import url("../assets/css/search.less");
@import url("../assets/css/goods.less");
</style>
