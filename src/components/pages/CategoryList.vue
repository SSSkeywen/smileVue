<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar title="类别列表" />
        </div>

        <div>
            <van-row>
                <van-col span="6">
                    <div id="leftNav">
                        <ul>
                            <li @click="clickCategory(index,item.ID)" :class="{categoryActive:categoryIndex==index}" v-for="(item, index) in category" :key="index">
                                {{ item.MALL_CATEGORY_NAME }}
                            </li>
                        </ul>
                    </div>
                    
                </van-col>
                <van-col span="18">
                    <div class="tabCategorySub">
                        <van-tabs v-model="active" @click="onClikCategorySub">
                            <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">

                            </van-tab>
                        </van-tabs>
                    </div>
                    <div id="list-div">
                        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                            <van-list v-model="loading" :finished="finished" @load="onLoad">
                                <div class="list-item" @click="goGoodsInfo(item.ID)" v-for="(item,index) in goodsList" :key="index">
                                    <div class="list-item-img">
                                        <img :src="item.IMAGE1" 
                                        width="100%"
                                        :onerror="errorImg"
                                        >
                                    </div>
                                    <div class="list-item-text">
                                        <div>{{item.NAME}}</div>
                                        <div>¥ {{item.ORI_PRICE | moneyFilter}}</div>
                                    </div>
                                </div>
                            </van-list>
                        </van-pull-refresh>
                    </div>

                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import url from "@/serviceAPI.config.js";
    import { Toast } from "vant";
    import { toMoney } from '@/filter/moneyFilter.js'
    export default {
        data() {
            return {
                category: [],
                categoryIndex: 0,
                categorySub: [], //小类类别
                active: 0,    //激活标签的值
                loading: false, 
                finished: false, // 上拉加载是否有数据
                list: [], //商品数据
                page:1, //商品列表的页数
                goodsList: [],   //商品列表信息
                categorySubId: '', //商品子类ID
                isRefresh: false, //下拉刷新 
                errorImg: 'this.src="'+require('@/assets/images/errorimg.png')+'"',
                //errorImg:'this.src="' + require('@/assets/images/errorimg.png') + '"'   ,  //错误图片显示路径
            }
        },
        created(){
            this.getCategory();
            
        },
        filters: {
            moneyFilter(money){
                return toMoney(money)
            }
        },
        mounted(){
            let winHeight = document.documentElement.clientHeight;
            document.getElementById('leftNav').style.height = winHeight - 46 + 'px'
            document.getElementById('list-div').style.height = winHeight - 90 + 'px'
        },
        methods: {
            getCategory() {
                axios({
                    url: url.getCategoryList,
                    method: 'get'
                })
                .then(response => {
                    console.log(response)
                    if(response.data.code == 200 && response.data.message){
                        this.category = response.data.message
                        this.getCategorySubByCategoryID(this.category[0].ID)
                    }else{
                        Toast('服务器错误，数据获取失败')
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            },
            clickCategory(index,categoryId){
                this.categoryIndex = index
                this.page = 1
                this.finished = false
                this.goodsList = []
                this.getCategorySubByCategoryID(categoryId);
            },
            //根据大类ID读取小类类别列表
            getCategorySubByCategoryID(categoryId){
                axios({
                    url: url.getCategorySubList,
                    method: 'post',
                    data: {categoryId:categoryId}
                })
                .then(response => {
                    console.log(response)
                    if(response.data.code == 200 && response.data.message){
                        this.categorySub = response.data.message
                        this.active = 0
                        this.categorySubId = this.categorySub[0].ID
                        this.onLoad()
                    }
                })
                .catch(error=>{
                    console.log(error)
                })
            },
            //上拉加载方法
            onLoad(){
                setTimeout(() => {
                    this.categorySubId = this.categorySubId?this.categorySubId:this.categorySub[0].ID
                    this.getGoodsList()
                }, 1000)
            },
            //下拉刷新方法
            onRefresh(){
                setTimeout(() => {
                    this.isRefresh = false;
                    this.finished = false;
                    this.goodsList = []
                    this.page = 1
                    this.onLoad()

                },500)
            },
            //
            getGoodsList(){
                axios({
                    url:url.getGoodsListByCategorySubID,
                    method: 'post',
                    data: {
                        categorySubId:this.categorySubId,
                        page: this.page
                    }
                })
                .then(response => {
                    console.log(response)
                    if(response.data.code == 200 && response.data.message.length){
                        this.page++;
                        this.goodsList = this.goodsList.concat(response.data.message)
                    }else{
                        this.finished = true
                    }
                    this.loading = false;
                    
                })
                .catch(error => {
                    console.log(error)
                })
            },
            //切换小类
            onClikCategorySub(index, title){
                this.categorySubId = this.categorySub[index].ID
                console.log('categorySubId:'+this.categorySubId)
                this.goodsList = []
                this.finished = false
                this.page = 1
                this.onLoad()
            },
            //跳转到详情的页面
            goGoodsInfo(id){
                this.$router.push({name: 'Goods', params: {goodsId: id}})
            }

        },
    }
</script>

<style scoped>
#leftNav{
    background-color: aliceblue;
}
#leftNav ul li{
    line-height: 2rem;
    border-bottom: 1px solid #e4e7ed;
    padding: 3px;
    font-size: 0.8rem;
    text-align: center;
}
.categoryActive{
    background: #fff;
}
/* .list-item{
    text-align: center;
    line-height: 80px;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff; 
} */
#list-div{
    overflow: scroll;
}
.list-item{
        display: flex;
        flex-direction: row;
        font-size:0.8rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        padding:5px;
    }
    #list-div{
        overflow: scroll;
    }
    .list-item-img{
        flex:8;
    }
    .list-item-text{
        flex:16;
        margin-top:10px;
        margin-left:10px;
    }
</style>