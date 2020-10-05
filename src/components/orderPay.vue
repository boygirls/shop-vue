<template>
  <!-- 订单提交-->
  <div id="app">
    <div class="navagithubs">
      <!-- 返回 -->
      <img
        src="../../static/images/icon/backspace.svg"
        @click.prevent="search_shows"
        class="imagess"
      />
      <!-- 标题 -->
      <h4>确认订单</h4>
    </div>
    <!-- 订单详情 -->
    <div class="addressfather">
      <!-- 收货地址 -->
      <div class="addresstop">
        <div class="addressimage">
          <img
            src="../../static/images/icon/address.svg"
            alt="图片正在加载"
            srcset=""
          />
        </div>
        <div class="addressedit">
          <!-- 名字和电话号码 -->
          <div class="address-name">
            <div>范夕晨</div>
            <div class="address-phonenumber">18760015007</div>
          </div>
          <!-- 地址 -->
          <div>
            福建省福清市福建农业职业技术学院 138 号东方通信大厦 7 楼 501 室
          </div>
        </div>
        <!-- 下一步 -->
        <div class="address-next">
          <img src="../../static/images/icon/next.svg" alt="" />
        </div>
      </div>

      <!-- 购买物品详情 -->
      <div class="itemtitle" v-for="(v, index) in carList" :key="index.id">
        <!-- 头部 -->
        <div class="itemtitle-img">
          <img src="../../static/images/icon/apple.svg" alt="" />
          <div>手机旗舰店</div>
        </div>
        <!-- 商品详情 -->
        <div class="itemtitle-desc">
          <div class="itemtitle-desca">
            <img :src="v.img" alt="图片未找到" />
          </div>
          <div class="itemtitle-descb">
            {{ v.title }}
          </div>
          <div class="itemtitle-descc">
            <div>${{ v.sellPrice / 100 }}</div>
            <div>X{{ v.num }}</div>
          </div>
        </div>
        <!-- 选项 -->
        <div class="itemtitleulfather">
          <div class="itemtitleul">
            <div>配送方式</div>
            <div>
              快递免邮>
            </div>
          </div>
          <div class="itemtitleul">
            <div>运费险</div>
            <div>
              $3.00
            </div>
          </div>
          <div class="itemtitleul">
            <div>开局发票</div>
            <div>
              本次不开具发票>
            </div>
          </div>
          <div class="itemtitleul">
            <div>店铺优惠</div>
            <div>
              -$10.0>
              <!-- <img src="../../static/images/icon/next.svg" alt="" /> -->
            </div>
          </div>
          <div class="itemtitleul">
            <div>订单备注</div>
            <div></div>
          </div>
          <div class="itemtitleul">
            <div>共一件 小计 $99.9</div>
          </div>
        </div>
      </div>
    </div>

    <van-submit-bar
      :price="allMoney"
      button-text="提交订单"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { ImagePreview } from "vant";
import { Toast } from "vant";
import { AddressList } from "vant";

export default {
  name: " ",
  data() {
    return {
      // areaList: {
      //   province_list: {
      //     110000: "北京市",
      //     120000: "天津市"
      //   },
      //   city_list: {
      //     110100: "北京市",
      //     110200: "县",
      //     120100: "天津市",
      //     120200: "县"
      //   },
      //   county_list: {
      //     110101: "东城区",
      //     110102: "西城区",
      //     110105: "朝阳区",
      //     110106: "丰台区",
      //     120101: "和平区",
      //     120102: "河东区",
      //     120103: "河西区",
      //     120104: "南开区",
      //     120105: "河北区"
      //     // ....
      //   }
      //},
      searchResult: [],
      chosenAddressId: "1",
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
          isDefault: true
        }
      ]
    };
  },
  props: {},
  components: {},
  computed: {
    ...mapState({
      buyImg: state => state.home.buyInfo.img[0],
      actives: state => state.active.home.title,
      shop_info: state => state.home.shop_info,
      my_info: state => state.home.my_info,
      orderShow: state => state.home.orderShow,
      numO: state => state.home.numO,
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
    ...mapActions(["orderShows","del",]),
    onSubmit(e) {
      //先获取用户的id
      let userid = this.userid;
      if(userid == null){
        Toast("请先登录");
        this.$router.push("/login");
        return;
      };
      //从stote中获取数据进行或取
      //对字符串进行拼接拼接字符串
      let orderJson = "[";
      this.car.forEach(function(item,index){
        if(item.selected){
          if (orderJson.length > 1) {
            orderJson += ","
        }
        orderJson += "{";
        orderJson += "num:" + item.num;
        orderJson += ","
        orderJson += "itemId:" + item.productId;
        orderJson += "}";
        }
      });
      orderJson += "]";
      console.log(orderJson);
      //提交请求
      this.axios.post("http://wyj335.xyz:8088/wechatstore-web/order/ZWH_saveOrder",{
        userId:userid,
        orderJson:orderJson,
      }).then(
        res =>{
          if (res.status == 200) {
            Toast("购买成功,你的货物正在向你飞来");
            this.del();
            //如果购买成功则从store中删除购物的信息
             this.$router.back(-1);
          }
        },
        err => {
          Toast("网络出了小差。稍后在试一下");
        }
      )


    },
    search_shows() {
      this.$router.back(-1);
    },
    //商品预览
    ImagePreviews() {
      ImagePreview(this.preImgs);
    },
    //结算
    onSave() {
      Toast("save");
    },
    onDelete() {
      Toast("delete");
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区"
          }
        ];
      } else {
        this.searchResult = [];
      }
    }
  },
  watch: {},
  directives: {},
  beforeCreate() {
    this.axios.get("./static/data.json").then(
      res => {
        const buy_id = this.$route.params.id;
        console.log(buy_id);
        //或许商品信息
        if (res.status == 200) {
          const data = res.data.goods;
          const preImg = data.id_0.moreImg;
          this.preImgs = preImg;
        }
      },
      err => {
        this.imageList = this.src;
        this.broadcast = "暂无消息~~QAQ~";
      }
    );
  },
  created() {}
};
</script>

<style lang="less" scoped>
@import url("../assets/css/orderpay.less");
</style>
