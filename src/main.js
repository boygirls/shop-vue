import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuex from 'vuex'
// eslint-disable-next-line import/no-duplicates
import Vant from 'vant'
import 'vant/lib/index.css'
// eslint-disable-next-line import/no-duplicates
import { Lazyload } from 'vant'
// eslint-disable-next-line import/no-duplicates
import Waterfall from '@vant/Waterfall'
import store from './store/index'
import { Loading } from 'vant';
Vue.config.productionTip = false;

Vue.use(VueAxios, axios);

Vue.use(vuex);

Vue.use(Vant);

Vue.use(Lazyload);
Vue.use(Waterfall);
Vue.use(Loading)
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
