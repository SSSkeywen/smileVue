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
                            <div>¥ {{ item.price }}(¥ {{ item.mallPrice }})</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>

        <swiper-default></swiper-default>
        <swiper-default2></swiper-default2>
        <swiper-default3></swiper-default3>
    </div>
</template>

<script>
import axios from 'axios'
import'swiper/dist/css/swiper.css'
import {swiper , swiperSlide} from 'vue-awesome-swiper'
import swiperDefault from '../swiper/swiperDefault'
import swiperDefault2 from '../swiper/swiperDefault2'
import swiperDefault3 from '../swiper/swiperDefault3'

export default {
  data() {
    return {
      swiperOption:{
          slidesPerView: 3
      },
      msg: "Shopping Mall",
      locationIcon: require("../../assets/images/location.png"),
      bannerPicArray: [],
      category: [],
      adBanner: '',
      recommendGoods: [],
    };
  },
  components: {swiper, swiperSlide, swiperDefault, swiperDefault2, swiperDefault3},
  created(){
      axios({
          url: 'https://www.easy-mock.com/mock/5ae3d378a223347f360565ca/SmileVue/index',
          method: 'get',
      })
      .then(response =>{
          console.log(response)
          if(response.status == 200){
              this.category = response.data.data.category
              this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS
              this.bannerPicArray = response.data.data.slides
              this.recommendGoods = response.data.data.recommend
          }
      })
      .catch(error => {
          console.log(error)
      })
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
.swiper_area{
    clear: both;
    max-height: 15rem;
    overflow: hidden;
}

.type_bar{
    background-color: #fff;
    margin: 0 .3rem .3rem .3rem;
    border-radius: .3rem;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
.type_bar div{
    padding: .3rem;
    font-size: 12px;
    text-align: center;
}
.recommend_area{
    background-color: #fff;
    margin-top: .3rem;
}
.recommend_title{
    border-bottom: 1px solid #eee;
    font-size: 14px;
    padding: .2rem;
    color: #e5017d;
}
.recommend_body{
    border-bottom: 1px solid #eee;
}
.recommend_item{
    width: 99%;
    border-right: 1px solid #eee;
    font-size: 12px;
    text-align: center;
}
</style>