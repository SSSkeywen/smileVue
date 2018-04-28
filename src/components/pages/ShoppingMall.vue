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
                    <img v-lazy="banner.imageUrl" width="100%">
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      msg: "Shopping Mall",
      locationIcon: require("../../assets/images/location.png"),
      bannerPicArray: [
        {
          imageUrl:
            "http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic001.jpg"
        },
        {
          imageUrl:
            "http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic002.jpg"
        },
        {
          imageUrl:
            "http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic003.jpg"
        }
      ]
    };
  },
  created(){
      axios({
          url: 'https://www.easy-mock.com/mock/5ae3d378a223347f360565ca/SmileVue/index',
          method: 'get',
      })
      .then(response =>{
          console.log(response)
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
</style>