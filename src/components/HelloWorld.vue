<template>
  <div class="hello">
    <van-button type="primary">主要按钮</van-button>
    <!-- <van-area :area-list="areaList" /> -->
    <!-- <van-address-edit
      :area-list="areaList"
  @change-detail="onChangeDetail"
/> -->
<button @click="show = !show">1111</button>
<!-- <van-popup v-model="show">内容</van-popup> -->
<van-actionsheet v-model="show" :actions="actions" cancel-text="取消" />
  <van-datetime-picker
  v-model="currentDate"
  type="date"
  :min-date="minDate"
/>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      areaList: {
        minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      maxDate: new Date(2019, 10, 1),
      currentDate: new Date(),
        province_list: {
          110000: "北京市",
          120000: "天津市"
        },
        city_list: {
          110100: "北京市",
          110200: "县",
          120100: "天津市",
          120200: "县"
        },
        county_list: {
          110101: "东城区",
          110102: "西城区",
          110105: "朝阳区",
          110106: "丰台区",
          120101: "和平区",
          120102: "河东区",
          120103: "河西区",
          120104: "南开区",
          120105: "河北区"
        }
      },
      searchResult: [],
      show: false,
      actions: [
        {
          name: '选项',
          callback: this.onClick
        },
        {
          name: '选项',
          subname: '描述信息'
        },
        {
          name: '选项',
          loading: true
        }
      ]
      // currentDate: new Date(),
      // minDate: new Date(),
    };
  },
  methods: {
    onClick(item) {
      Toast(item.name);
    },
    onSave() {
      // Toast('save');
    },
    onDelete() {
      // Toast('delete');
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
