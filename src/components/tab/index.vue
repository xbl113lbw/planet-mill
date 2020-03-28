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
                 @click="changeTabIndex(index,item)">
                <div class="tabIcon">
                    <img :src="tabIndex===index?item.selectIcon:item.defaultIcon" alt/>
                </div>
                <div :class="[tabIndex!==index ? 'opacityName' : '', 'tabName']">{{item.name}}</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "tab",
        props: {
            tabIndex: {
                type: Number,
                required: true
            },
            tabData: {
                ype: Array,
                required: true
            }
        },
        methods: {
            changeTabIndex(index, item) {
                this.$emit("changeTabIndex", index, item);
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
