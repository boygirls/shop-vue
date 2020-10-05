<template>
  <div id="app">
    <van-row class="col-2">
      <!--活动 标题 -->
      <van-col span="24" class="title">
        <!-- <a href="javaScript:;" @click.prevent="search_shows">{{ "《" }}</a> -->
        <img src="../../static/images/icon/backspace.svg" @click.prevent="search_shows" class="imagess">
        <h4>手机专卖专场</h4>
      </van-col>
    </van-row>
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 商品列表 -->
      <div class="over">
        <van-row gutter="18" offset="1" class="lists">
          <van-col
            v-for="(img, index) in mydata"
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
                <div>{{ discount.dis_1[index] }}折</div>
              </h4>
            </van-col>
          </van-col>
        </van-row>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Waterfall from "@vant/waterfall";
import { Toast } from "vant";

export default {
  name: "goodsInfo",
  data() {
    return {
      rows: 20,
      page: 1,
      mydata: null,
      tabarActive: 0,
      count: 0,
      isLoading: false,
      value: null,
      active: 0,
      path: "../../static/images/",
      imageList: {
        img_1: []
      },
      title: {
        title_1: []
      },
      limit_price: {
        limit_p1: []
      },
      original_price: {
        origin_p1: []
      },
      discount: {
        dis_1: [6,8,8,3,3,9,8,8,9,8,7,8,7,6,5,8,6,4,6,9]
      },
      days: null,
      disabled: false,
      broadcast: null
    };
  },

  props: {},

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
      my_info: state => state.home.my_info
    }),
    ...mapGetters(["bc_notshow",""])
  },
  methods: {
    requestdata() {
      this.axios
        .get("http://wyj335.xyz:8088/wechatstore-web/goods/query", {params:{
          page: this.page,
          rows: this.rows
        }})
        .then(
          res => {
            if (res.status == 200) {
              console.log(res);
              this.mydata = res.data.obj;
            } else {
              this.imageList = this.src;
              this.broadcast = "服务器正在来的路上";
            }
          },
          err => {
            this.imageList = this.src;
            this.broadcast = "暂无消息~~QAQ~";
          }
        );
    },

    search() {
      console.log(this.value);
    },
    search_shows() {
      this.$router.push("/");
    },
    buy(image,id) {
      this.buyParam(image);
      this.itemId(id)
      this.$router.push("/goods/"+id+"/buy");
    },
    ...mapActions(["buyParam","itemId"]),
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.page = (this.page+1);
        this.requestdata();
      }, 800);
    }
  },
  watch: {},
  directives: {
    //瀑布流
    WaterfallLower: Waterfall("lower")
  },
  beforeCreate() {

      this.axios
        .get("http://wyj335.xyz:8088/wechatstore-web/goods/query", {params:{
          page: 1,
          rows: 20
        }})
        .then(
          res => {
            if (res.status == 200) {
              console.log(res);
              this.mydata = res.data.obj;
            } else {
              this.imageList = this.src;
              this.broadcast = "服务器正在来的路上";
            }
          },
          err => {
            this.imageList = this.src;
            this.broadcast = "暂无消息~~QAQ~";
          }
        );
  },
  created() {
    Toast("加载完毕 ^_^,");
  }
};
</script>

<style lang="less" scoped>
@import url("../assets/css/goods.less");
</style>
