<template>
  <!-- 搜索区 -->
  <van-row gutter="20" class="row-1">
    <van-col span="3" class="cols">
      <a href="#" @click="redirects('/login')" v-if="userid == 0">登录</a>
      <img src="../../static/images/icon/user.svg" v-else />
    </van-col>
    <van-col span="19" class="cols">
      <form action="/">
        <van-search
          class="search"
          v-model="value"
          style="background:white;height:35px;border-radius:22px;"
          placeholder="大家在搜索：衣服"
          @click.stop="search"
          @input="inputto"
        />
      </form>
    </van-col>
    <van-col span="2" class="cols">
      <van-icon name="qr" class="classfic" @click="redirects('/about')" />
    </van-col>
  </van-row>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "navagithub",
  computed: {
    ...mapState({
      userid: state => state.home.userid,
    }),
    ...mapGetters(["bc_notshow", "search_show"])
  },
  data() {
    return {
      flag: false
    };
  },
  methods: {
    ...mapActions(["searchA","itemSereachupdate_"]),
    search() {
      this.$router.push("/search");
    },
    redirects(url) {
      this.$router.push(url);
    },
    inputto(Event){
      console.log("输入框发生的变化");
      console.log(Event);
      let strins = Event;
      this.axios.get("http://wyj335.xyz:8088/wechatstore-web/app/user/solt",{
          params: { strings: strins }
      }).then(
        res => {
          if(res.status == 200){
            console.log("我成功回来了");
            console.log(res.data.obj);
            let items = res.data.obj;
            this.itemSereachupdate_(items);
          }
        },err =>{

        }
      )
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../assets/css/home.less");
</style>
