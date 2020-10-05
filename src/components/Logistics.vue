<template>
  <div id="app">
    <!-- 搜索框 -->
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      input-align="center"
      background="#4fc08d"
    />

    <!-- 订单id导航栏 -->
    <van-tabs
      v-model="active"
      swipeable
      class="logisttice"
      type="line"
      color="#4fc08d"
    >
      <van-tab v-for="item in ordertitle" :key="item.id" :title="item.title">
        <!-- 渲染订单列表的组件 -->
        <!-- 下拉刷新 -->
        <van-pull-refresh
          v-model="isLoading"
          @refresh="onRefresh"
          class="cartBox"
        >
          
            <!-- 进行判断状态在决定渲染在哪个文档 -->
            <!-- 循环遍历集合，进行购物车的渲染 -->
            <div
              v-for="(v, index) in orderAlls"
              :key="index.id"
              class="shop-cart-father"
            >
            <div v-if="v.status === active || active == 0" class="shop-cart">
              <!-- 订单导航条 -->
              <div class="ordernumtop">
                订单号:{{ v.order_id }}------- 时间:{{ v.create_time }}
              </div>
              <!-- 订单详情，支持多个订单 -->
              <div class="itemimg">
                <div @click.stop="redirects('/goods/id_0/buy')">
                  <img
                    :src="v.tb_order_item.pic_path"
                    alt="图片不见了"
                    srcset=""
                  />
                </div>
                <div class="itemtitles">
                  <div class="itemtitle">{{ v.tb_order_item.title }}</div>
                  <div class="itemprices">
                    <div class="itemprice">
                      ${{ v.tb_order_item.total_fee / 100 }}
                    </div>
                    <div class="itemnum">
                      <div class="ordernum">{{ v.tb_order_item.num }}</div>
                      <div
                        class="item-icon"
                        @click="addNum(v.productId)"
                        style="color:white;background-color:#4fc08d;border-radius:10px"
                      >
                        {{ item.status }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { Toast } from "vant";
import { Tab, Tabs } from "vant";
import { Search } from "vant";
import { Card } from "vant";
export default {
  name: "Logistics",
  data() {
    return {
      active: 0,
      value: "",
      ordertitle: [
        { id: 0, title: "全部", status: "去评价" },
        { id: 1, title: "待付款", status: "去付款" },
        { id: 2, title: "待发货", status: "催发货" },
        { id: 3, title: "待收货", status: "确认收货" },
        { id: 4, title: "待评价", status: "去评价" },
        { id: 5, title: "退款与售后", status: "售后" }
      ],
      isLoading: false,

      orderAlls: null
    };
  },
  computed: {
    ...mapState({
      car: state => state.carLista.car
    }),
    ...mapGetters(["cartLength", "carList"])
  },
  methods: {
    ...mapActions(["orderAllAdd"]),
    redirects(url) {
      this.$router.push(url);
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 500);
    },
    // 更改标签选项卡id
    changestatus() {}
  },
  beforeCreate() {
    //let userid = this.userid;
    let userid = this.$route.params.id;
    let data = {
      userId: userid
    };
    console.log("用户id" + userid);
    //提交请求
    this.axios
      .post("http://wyj335.xyz:8088/wechatstore-web/order/ZWH_queryOrder", data, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        }
      })
      .then(
        res => {
          if (res.status == 200) {
            this.orderAlls = res.data.obj;
            console.log("成功拿到数据");
            console.log(res.data.obj);
          }
        },
        err => {
          Toast("网络出了小差。稍后在试一下");
        }
      );
  }
};
</script>
<style lang="less" scoped>
@import url("../assets/css/home.less");
</style>
