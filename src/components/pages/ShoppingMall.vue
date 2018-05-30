<template>
    <div>
        <div class="search_bar">
            <van-row>
                <van-col span="3">
                    <img :src="locationIcon" width="80%" class="location_icon">
                </van-col>
                <van-col span="16">
                    <input type="text" class="search_input">
                </van-col>
                <van-col span="5">
                    <van-button size="mini">查找</van-button>
                </van-col>
            </van-row>
        </div>
        <!-- swiper area -->
        <div class="swiper_area">
            <van-swipe :autoplay="1000">
                <van-swipe-item v-for="(banner, index) in bannerPicArray" :key="index">
                    <img v-lazy="banner.image" width="100%">
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- type one -->
        <div class="type_bar">
            <div v-for="(cate, index) in category" :key="index">
                <img v-lazy="cate.image" width="90%" >
                <span>{{ cate.mallCategoryName }}</span>
            </div>
        </div>
        <!-- adbanner area -->
        <div>
            <img v-lazy="adBanner" width="100%">
        </div>
        <!-- Recommend goods area -->
        <div class="recommend_area">
            <div class="recommend_title">
                商品推荐
            </div>
            <div class="recommend_body">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item, index) in recommendGoods" :key="index">
                        <div class="recommend_item">
                            <img :src="item.image" width="80%">
                            <div>{{ item.goodsName }}</div>
                            <div>¥ {{ item.price | moneyFilter }}(¥ {{ item.mallPrice | moneyFilter }})</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
       <floor-component :floorData="floor1" :floorTitle="floorName.floor1"></floor-component>
       <floor-component :floorData="floor2" :floorTitle="floorName.floor2"></floor-component>
       <floor-component :floorData="floor3" :floorTitle="floorName.floor3"></floor-component>
       <!--Hot Area-->
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
            <!--这里需要一个list组件-->
                <van-list>
                    <van-row gutter="20">
                        <van-col span="12" v-for="(item, index) in hotGoods" :key="index">
                            <goods-info :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import floorComponent from "../component/floorComponent";
import { toMoney } from "@/filter/moneyFilter.js";
import goodsInfo from "../component/goodsInfoComponent";
import url from '@/serviceAPLconfig.js'

export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 3
      },
      msg: "Shopping Mall",
      locationIcon: require("../../assets/images/location.png"),
      bannerPicArray: [],
      category: [],
      adBanner: "",
      recommendGoods: [],
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods: [],  //热卖商品
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  components: { swiper, swiperSlide, floorComponent, goodsInfo },
  created() {
    axios({
      url: url.getShopingMallInfo,
      method: "get"
    })
      .then(response => {
        console.log(response);
        if (response.status == 200) {
          this.category = response.data.data.category;
          this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS;
          this.bannerPicArray = response.data.data.slides;
          this.recommendGoods = response.data.data.recommend;
          this.floor1 = response.data.data.floor1;
          this.floor2 = response.data.data.floor2;
          this.floor3 = response.data.data.floor3;
          this.floorName = response.data.data.floorName;
          this.hotGoods = response.data.data.hotGoods;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
.search_bar {
  height: 2.2rem;
  background-color: #e5017d;
  line-height: 2.2rem;
  overflow: hidden;
}
.search_input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid #fff !important;
  background-color: #e5017d;
  color: #fff;
}
.location_icon {
  padding-top: 0.2rem;
  padding-left: 0.2rem;
}
.swiper_area {
  clear: both;
  max-height: 15rem;
  overflow: hidden;
}

.type_bar {
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.type_bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
  width: 20%;
}
.recommend_area {
  background-color: #fff;
  margin-top: 0.3rem;
}
.recommend_title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
}
.recommend_body {
  border-bottom: 1px solid #eee;
}
.recommend_item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}
.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
.hot-goods{
    overflow-x: hidden;
}
</style>