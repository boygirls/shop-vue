export default {
  state: {
    tab: {
      title: ["", "今日推荐", "时尚", "美妆", "家电", "家居", "国际", "生活"]
    },
    badge: {
      icon: [
        "icon_1",
        "icon_2",
        "icon_8",
        "icon_4",
        "icon_5",
        "icon_6",
        "icon_7",
        "icon_10"
      ],
      title: [
        "鞋包馆",
        "运动馆",
        "母婴馆",
        "超市",
        "女装馆",
        "美妆馆",
        "男装馆",
        "更多"
      ]
    },
    lunbo: {
      src: [
        "../../static/images/lunbo/err.jpg",
        "../../static/images/lunbo/err.jpg",
        "../../static/images/lunbo/err.jpg",
        "../../static/images/lunbo/err.jpg",
        "../../static/images/lunbo/err.jpg",
        "../../static/images/lunbo/err.jpg",
        "../../static/images/lunbo/err.jpg"
      ]
    },
    //

    itemId: 1,
    addItem: {
      id: 1,
      title: "默认值",
      sell_point: "默认值",
      price: 0, //价格
      num: 0, //库存
      barcode: 0,
      image: "http:"
    },
    userid:0,
    //
    imageList: [],
    broadcast: [],
    bc: true,
    show: true,
    sshow: false,
    shop_info: 4,
    my_info: 2,
    buyInfo: {
      img: []
    },
    orderShow: false,
    numO: null,
    // 搜索缓存的数据
    itemSereach: null,

  },
  mutations: {
    search_(state) {
      state.show = false;
    },

    buySearch(state, img) {
      state.buyInfo.img[0] = img;
      console.log(state.buyInfo.img);
    },

    orderShow_(state) {
      state.orderShow ? (state.orderShow = false) : (state.orderShow = true);
    },

    addNum(state, e) {
      state.numO = e;
      console.log(e);
    },

    shopCartInfo(state) {
      console.log(state.shop_info);
      state.shop_info += 4;
    },
    //
    itemId(state, id) {
      state.itemId = id;
      console.log(id);
    },
    addItems(state, item) {
      (state.addItem.id = item.id),
        (state.addItem.title = item.title),
        (state.addItem.sell_point = item.sell_point),
        (state.addItem.price = item.price),
        (state.addItem.num = item.num),
        (state.addItem.barcode = item.barcode),
        (state.addItem.image = item.image),
        console.log(state.addItem);
    },
    loginuser(state,id){
      state.userid = id;
    },
    itemSereachupdate(state, all) {
      state.itemSereach = all;
    }

    //
  },
  actions: {
    //
    itemId(context, id) {
      context.commit("itemId", id);
    },
    loginuserAction(context,id){
      context.commit("loginuser",id);
    },
    //
    searchA(context, e) {
      context.commit("search_");
    },
    buyParam(context, img) {
      context.commit("buySearch", img);
    },
    orderShows(context) {
      context.commit("orderShow_");
    },
    orderNum(context, e) {
      context.commit("addNum", e);
    },
    infoAction(context) {
      context.commit("shopCartInfo");
    },
    addItemAction(context, item) {
      context.commit("addItems", item)
    },
    itemSereachupdate_(context, items) {
      context.commit("itemSereachupdate", items);
    }

  },
  getters: {
    bc_notshow(state) {
      setTimeout(() => {
        state.bc = false;
      }, 20000);
      return state.bc;
    },

    addItemgetter(state) {
      return state.addItem;
    },
    
  }
};
