// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'



import {Button, Row, Col, Swipe, SwipeItem, Lazyload} from 'vant'
Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload)
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




Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
