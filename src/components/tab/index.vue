<!--
 * @Author: liyh
 * @Date: 2020-03-27 16:10:29
 * @LastEditors: liyh
 * @LastEditTime: 2020-03-28 01:47:18
 * @描述:底部Tab组件，默认第一个,即tabIndex为0，存在Vuex里面，每次点击通过触发mutations改变vuex里面的tabIndex的值
 -->
<template>
    <div>
        <div class="placeHoderHeight"></div>
        <div class="box">
            <div v-for="(item,index) in tabData"
                 :key="index"
                 class="itemBox"
                 @click="changeTabIndex(item)">
                <div class="tabIcon">
                    <img :src="tabIndex===item.name ? item.selectIcon:item.defaultIcon" alt/>
                </div>
                <div :class="[tabIndex!==item.name ? 'opacityName' : '', 'tabName']">{{item.name}}</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "tab",
        props: {
            tabIndex: {
                default: "",
                type: String,
            },
        },
        data() {
            return {
                tabData: [
                    {
                        name: "首页", //tab名称
                        defaultIcon: require("@/assets/img/tab/home.png"), //默认图片
                        selectIcon: require("@/assets/img/tab/home_A.png"), //选择图片
                        router: "/" //跳转的路由
                    },
                    {
                        name: "星球矿机", //tab名称
                        defaultIcon: require("@/assets/img/tab/deal.png"), //默认图片
                        selectIcon: require("@/assets/img/tab/deal_A.png"), //选择图片
                        router: "/planet" //跳转的路由
                    },
                    {
                        name: "交易", //tab名称
                        defaultIcon: require("@/assets/img/tab/mill.png"), //默认图片
                        selectIcon: require("@/assets/img/tab/mill_A.png"), //选择图片
                        router: "/deal" //跳转的路由
                    },
                    {
                        name: "资产", //tab名称
                        defaultIcon: require("@/assets/img/tab/property.png"), //默认图片
                        selectIcon: require("@/assets/img/tab/home_A.png"), //选择图片
                        router: "/property" //跳转的路由
                    }
                ]
            }
        },
        methods: {
            changeTabIndex(item) {
                this.$router.push({path: item.router});
            }
        }
    };
</script>

<style lang="scss" scoped>
    .box {
        width: 750px;
        position: fixed;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        padding: 10px 81px 18px 81px;
        background: #000000;
        height: 150px;
        align-items: flex-start;
    }

    .placeHoderHeight {
        height: 150px;
    }

    .box_iphoneX {
        width: 750px;
        position: fixed;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        padding: 10px 81px 18px 81px;
        background: #000000;
        height: 150px;
    }

    .placeHoderHeight_iphoneX {
        height: 150px;
    }

    .itemBox {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .tabIcon {
            width: 48px;
            height: 48px;
            margin-bottom: 5px;

            img {
                width: 100%;
                height: 100%;
                display: block;
            }
        }

        .tabName {
            font-size: 18px;
            color: #ffffff;
        }

        .opacityName {
            opacity: 0.6;
        }
    }
</style>
