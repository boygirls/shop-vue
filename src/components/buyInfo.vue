<template>
  <!-- 购买信息组件  大部分都是一样的 所以数据方面 我就用同一个 作为展示作用-->
  <div id="app">
    <van-row class="col-2">
      <div class="preImg" @click="ImagePreviews()">
        <img v-lazy="buyImg" name="adapter" @click="ImagePreviews()" />
      </div>
      <!--导航 -->
      <van-col span="24" class="title">
        <div class="back">
          <!-- <a href="javaScript:;" @click.prevent="search_shows">{{ "<" }}</a> -->
          <img src="../../static/images/icon/backspace.svg" @click.prevent="search_shows" class="imagess">
        </div>
        <span>{{ actives[2] }}</span>
      </van-col>
    </van-row>

    <van-row class="col-3">
      <van-col span="24" class="lazy-bottom">
        <h4>
          ￥{{ item.price / 100 }} <span>￥899</span>
          <div>5.7折</div>
        </h4>
      </van-col>

      <van-col span="24" class="lazy-left">
        <span>{{ item.title }}</span>
      </van-col>

      <hr />
      <van-col class="empty"></van-col>
    </van-row>
    <!-- 优惠券单元格 -->
    <van-coupon-cell
      :coupons="coupons"
      :chosen-coupon="chosenCoupon"
      @click="showList = true"
      class="lists"
    />

    <!-- 优惠券列表 -->
    <van-popup v-model="showList" position="bottom">
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
      />
    </van-popup>

    <order class="order" />

    <!-- 底部购买 -->
    <van-goods-action>
      <van-goods-action-icon
        icon="chat-o"
        text="客服"
        dot
        @click="onClickMiniBtn"
      />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        :badge="cartLength"
        @click="onClickshopcar"
      />
      <van-goods-action-icon icon="shop-o" text="已收藏" color="#ff5000" />

      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="onClickBigBtns"
      />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="onClickBigBtns"
      />
    </van-goods-action>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { ImagePreview } from "vant";
import { Toast } from "vant";

import Order from "./orderList";

//obj 优惠券
const coupon = {
  available: 1,
  discount: 0,
  denominations: 150,
  origin_condition: 0,
  reason: "",
  value: 150,
  name: "满498减100",
  start_at: 1489104000,
  end_at: 1514592000,
};

export default {
  name: "buyInfo",
  data() {
    return {
      item: null,
      itemdesc: null,
      preImgs: [],
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
      showList: null,
      oShow: false,

    };
  },
  props: {},
  components: {
    Order
  },
  computed: {
    ...mapState({
      itemId: state => state.home.itemId,
      addItem: state => state.home.addItem,
      buyImg: state => state.home.buyInfo.img[0],
      actives: state => state.active.home.title,
      shop_info: state => state.home.shop_info,
      my_info: state => state.home.my_info,
      orderShow: state => state.home.orderShow,

    }),
    ...mapGetters(["bc_notshow",'cartLength'])
  },


  methods: {
    ...mapActions(["orderShows","addItemAction"]),
    //返回上一个页面
    search_shows() {
      this.$router.back(-1);
    },
    //商品预览
    ImagePreviews() {
      ImagePreview(this.preImgs);
    },
    //优惠券
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
    },
    onClickMiniBtn() {
      Toast("系统繁忙 请稍后再试");
    },
    // 跳转到购物车
    onClickshopcar(){
      this.$router.push("/shoppingCart");
    },
    onClickBigBtn() {
      Toast("请选择商品规格");
      this.orderShows();
      console.log(this.orderShow);
    },
    onClickBigBtns() {
      this.orderShows();
      this.addItemAction(this.item);
    }
  },



  watch: {},
  directives: {},
  beforeCreate() {
    const buy_id = this.$route.params.id;
    // this.axios.get("./static/data.json").then(
    //   res => {
    //     console.log(buy_id);
    //     //或许商品信息
    //     if (res.status == 200) {
    //       const data = res.data.goods;
    //       const preImg = data.id_0.moreImg;
    //       this.preImgs = preImg;
    //     }
    //   },
    //   err => {
    //     this.imageList = this.src;
    //     this.broadcast = "暂无消息~~QAQ~";
    //   }
    // );

    this.axios
      .get("http://wyj335.xyz:8088/wechatstore-web/goods/queryGoodsById", {
        params: { id: buy_id }
      })
      .then(
        res => {
          if (res.status == 200) {
            this.item = res.data.obj.goods;
            this.addItem = res.data.obj.goods;
            this.itemdesc = res.data.obj.desc;
          }
        },
        err => {
          this.imageList = this.src;
          this.broadcast = "暂无消息~~QAQ~";
        }
      );

  },
  created() {
    console.log(this.buyImg);
    if (this.buyImg == "undefined") {
      this.buyImg =
        "https://a4.vimage1.com/upload/merchandise/pdc/544/548/464510208477548544/0/880555-001-5_218x274_70.jpg";
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../assets/css/buyInfo.less");
</style>
