// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import VueAwesomeSwiper from 'vue-awesome-swiper'.use(VueAwesomeSwiper)
// import 'swiper/dist/css/swiper.css'


import {PullRefresh,Tabbar,TabbarItem,Stepper,Button, Row, Col, Swipe, SwipeItem, Lazyload, List, Field, NavBar, Tab, Tabs} from 'vant'
Vue.use(PullRefresh).use(Tabbar).use(TabbarItem).use(Stepper).use(Tab).use(Tabs).use(Field).use(NavBar).use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List)



import { DatetimePicker } from 'vant'
Vue.use(DatetimePicker)
import { AddressEdit } from 'vant';
Vue.use(AddressEdit);
import { Area } from 'vant';

Vue.use(Area);
import { Actionsheet } from 'vant';

Vue.use(Actionsheet);
import { Popup } from 'vant';

Vue.use(Popup);
import {
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn
} from 'vant';

Vue
  .use(GoodsAction)
  .use(GoodsActionBigBtn)
  .use(GoodsActionMiniBtn);



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
