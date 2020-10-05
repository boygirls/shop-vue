export default {
  state: {
    tab: {
      title: ["", "动态", "热门", "发现"]
    },
    share: {
      title: ["转发", "发送给好友", "取消分享"]
    },

    orderAll: {},


  },
  mutations: {
    orderAllAdd_(state, orderAlls) {
      state.orderAllAdd = orderAlls;
    }
  },
  actions: {
    orderAllAdd(context, orderAlls) {
      context.commit("orderAllAdd_", orderAlls);
    },
    itemSereachupdate_(context, items) {
      context.commit("itemSereachupdate", items);
    }
  },
  getters: {}
};
