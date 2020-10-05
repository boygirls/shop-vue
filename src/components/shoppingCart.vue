<template>
  <!-- 购物车组件 -->
  <div id="app">
    <van-row class="col-2">
      <div class="preImg" @click="ImagePreviews()">
        <img v-lazy="buyImg" name="adapter" @click="ImagePreviews()" />
      </div>
      <!--导航 -->
      <van-col span="24" class="title">
        <div class="back">
          购物车
        </div>
      </van-col>
    </van-row>

    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="cartBox" >
      <p class="edit-text edit-texts" @click="del_show = false" v-if="del_show">完成</p>
      <p class="edit-text" @click="del_show = true" v-else>编辑</p>
      <!-- 循环遍历集合，进行购物车的渲染 -->
      <div v-for="(v, index) in carList" :key="index.id" class="shop-cart" id="carboxs">
        <!-- 标签区域 -->
        <div class="edit"></div>
        <van-row class="shop-col">
          <van-col span="10" class="check" offset="1">
            <van-checkbox v-model="v.selected" @click="selected(v.id)"></van-checkbox>
          </van-col>
          <van-col span="4" offset="7">
            <span class="edit" @click="showList = true">领券 </span>
          </van-col>
        </van-row>

        <div class="itemimg">
          <div @click.stop="redirects('/goods/id_0/buy')">
            <img :src="v.img" alt="图片不见了" srcset="" />
          </div>
          <div class="itemtitles">
            <div class="itemtitle">{{ v.title }}</div>
            <div class="itemprices">
              <div class="itemprice">${{ v.sellPrice / 100 }}</div>
              <div class="itemnum">
                <div class="item-icon" v-if="v.num == 1"></div>
                <div class="item-icon" @click="jianNum(v.productId)" v-else>
                  -
                </div>
                <span>{{ v.num }}</span>
                <div class="item-icon" @click="addNum(v.productId)">+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-pull-refresh>

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

    <!-- 购买按钮 -->
    <van-submit-bar
      :price="allMoney"
      :button-text="!del_show ? '提交订单' : '删除'"
      @submit="saveorder"
      class="order"
    >
      <van-checkbox v-model="all_selsect" @click="selectAll()"
        >全选</van-checkbox
      >
    </van-submit-bar>

    <tabbar></tabbar>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { Toast } from "vant";
import tabbar from './tabbar';
const coupon = {
  available: 1,
  discount: 0,
  denominations: 10000,
  origin_condition: 0,
  reason: "",
  value: 150,
  name: "满498减100",
  start_at: 1489104000,
  end_at: 1514592000
};

export default {
  name: "shoppingCart",
  components: {
    tabbar
  },
  data() {
    return {
      tabarActive: 2,
      value: null,
      active: 0,
      path: "../../static/images/",
      imageList: [],
      activeTitle: null,
      days: null,
      disabled: false,
      broadcast: null,
      show: true,
      count: 0,
      isLoading: false,
      checked: [false, false, false, false],
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
      showList: null,
      imageUrl: [],
      goodsTitle: [],
      goodsDescription: [],
      prices: [],
      shops: [],
      //
      del_show: false,
      itemdelete:'提交订单',
    };
  },
  computed: {
    ...mapState({
      title: state => state.community.tab.title,
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
      // 
      //用户id
      userid: state => state.home.userid.id,
      car: state => state.carLista.car,

    }),
    //去store中拿缓存
    ...mapGetters([
      "bc_notshow",
      "search_show",
      "carList",
      "allMoney",
      "allSelsect"
    ])
  },
  methods: {
    ...mapActions([
      "searchA",
      "infoAction",
      "headTitle",
      "addNum",
      "jianNum",
      "select",
      "selectAll",
      "del",
      "showBtm"
    ]),
    //页面跳转
    search() {
      this.$router.push("/search");
    },
    //货品的选中状体
    selected(id){
      this.select(id);
    },
    // 刷新
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        for (let i = 0; i < 3; i++) {
          this.imageUrl.push(this.imageUrl[i]);
          this.goodsTitle.push(this.goodsTitle[i]);
          this.goodsDescription.push(this.goodsDescription[i]);
          this.shops.push(this.shops[i]);
          this.prices.push(this.prices[i]);
        }

        this.infoAction();
        const infos = document.querySelector(".van-icon__info");
        infos.innerText = this.shop_info;
      }, 500);
    },
    //优惠券
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
    },
    redirects(url) {
      this.$router.push(url);
    },


    //提交购物车的订单
    saveorder(){
      //先获取用户的id
      let userid = this.userid;
      if(userid == null){
        Toast("请先登录");
        this.$router.push("/login");
        return;
      };
      if(this.carList == null){
        Toast("购物车没有商品,快去购物吧!")
        return; 
      };
      //如果有用户进行跳转到结算页面
      this.$router.push("/orderPay");
      return;
      //console.log(this.userid);

    },

  },
  watch: {},
  directives: {
    tab: {
      inserted(el) {
        //绑定tab样式
        const tabs = el.childNodes[0].childNodes[0].children[0];
        tabs.style.backgroundColor = "#d34ba8";
      }
    },
    //tabBar 消息通知指令
    infos: {
      inserted(el, obj) {
        console.log(obj.value);
        const info = el.childNodes[0].childNodes[1];
        info.innerText = obj.value;
      }
    }
  },
  beforeCreate() {
    this.axios.get("./static/data.json").then(
      res => {
        if (res.status == 200) {
          const data = res.data.goods;
          const preImg = data.id_0.imgList[0];
          const title = data.id_0.title[0];
          const price = data.id_0.limit_price[0];
          const description = data.id_0.description;
          const shops = data.id_0.shops;
          this.imageUrl = preImg;
          this.goodsTitle = title;
          this.prices = price;
          this.goodsDescription = description;
          this.shops = shops;
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
  }
};
</script>

<style lang="less" scoped>
@import url("../assets/css/home.less");
</style>
