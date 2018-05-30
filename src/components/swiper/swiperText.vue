<template>
    <div>
        <swiper class="swiper" :options="swiperOption">
            <swiper-slide class="text">
                <div>
                    第二届世界马克思主义大会昨天在北京开幕，来自全球30多个国家的千余名中外学者汇聚一堂，共同纪念马克思诞辰200周年。

习近平总书记在纪念马克思诞辰200周年大会上发表的重要讲话，引起与会中外学者热议。大家认为，习总书记的重要讲话，闪耀着科学真理的光芒，为开辟当代中国马克思主义、21世纪马克思主义新境界提供了强大思想武器和理论指引。



英国肯特大学哲学系教授 肖恩·塞耶斯：习近平主席强调，马克思主义的发展要结合现代的新情况，来改变和发展与现代社会的关系，这也正是马克思主义中国化所做的。中国现在对马克思主义的支持和聚焦，不仅对中国很重要，对全世界也很重要，因为中国已经成为马克思主义研究和促进的世界中心。



​美国马萨诸塞州立大学教授 大卫·科兹：习近平新时代中国特色社会主义思想是马克思主义中国化的重要新成果，如果中国共产党继续运用马克思主义的方法，就能成功解决目前中国所遇到的问题。



​北京大学教授 厉以宁：给我印象最深刻的就是谈到马克思主义的中国化，中国在原有的基础上怎么继承了马克思主义那些宝贵的东西，但更重要的是把中国下一步发展怎么来发扬光大，很多道路需要我们来研究并且是没止境的。

世界马克思主义大会由北京大学主办，今年的主题是“马克思主义与人类命运共同体”。 
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
        data() {
            return {
                swiperOption: {
                    direction: 'vertical', //竖屏
                    slidesPerView: 'auto', //个数不限制
                    freeMode: true,  //free 不贴合
                    mouseWheel: true, //鼠标可控制mousewheel
                }
            }
        },
        components: {swiper, swiperSlide}
    }
</script>

<style scoped>
.swiper{
    height: 300px;
    overflow: hidden;
}
.text{
    font-size: 18px;
    text-align: left;
    padding: 30px;
    height: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
</style>