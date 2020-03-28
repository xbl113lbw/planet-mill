<!--
 * @Author: liyh
 * @Date: 2020-03-27 09:41:00
 * @LastEditors: liyh
 * @LastEditTime: 2020-03-27 15:48:08
 -->
<template>
    <div class="box">
        <NavCom title="直推详情"/>
        <div class="bgimg"></div>
        <div class="content">
            <div class="verticalLine left_194"></div>
            <div class="verticalLine right_194"></div>
            <div class="thead">
                <div class="left">地址</div>
                <div class="center">注册时间</div>
                <div class="right">参与业绩</div>
            </div>
            <div class="line"></div>
            <div v-for="(item,index) in data" :key="index">
                <div class="tItem">
                    <div class="left">KFHFHKHD</div>
                    <div class="center">2020/03/22 10:49:56</div>
                    <div class="right">24794387</div>
                </div>
                <div v-if="index!==data.length-1" class="line"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import NavCom from "@/components/nav.vue"

    export default {
        name: "planet",
        components: {
            NavCom
        },
        data() {
            return {
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
            };
        }
    };
</script>

<style lang="scss" scoped>
    .opacityText {
        opacity: 0.6;
        display: inline-block;
        width: 120px;
        text-align-last: justify;
        text-align: justify;
    }

    .whiteText {
        position: relative;
        left: -10px;
    }

    .box {
        width: 750px;
        height: 100%;
        position: relative;
        padding: 40px 30px 55px 30px;
        margin: 0 auto;
        .bgimg {
            width: 100%;
            background-image: url("./../../assets/img/bg.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: -1;
        }
        .content {
            width: 690px;
            background: #2c244a;
            border-radius: 8px;
            padding: 20px;
            position: relative;
            .verticalLine {
                position: absolute;
                width: 1px;
                top: 20px;
                bottom: 20px;
                background: #ffffff;
                opacity: 0.1;
            }
            .left_194 {
                left: 194px;
            }
            .right_194 {
                right: 194px;
            }
            .thead {
                display: flex;
                justify-content: space-between;
                font-size: 26px;
                color: #ffffff;
                font-weight: 600;
                padding: 10px 0 24px 0;
            }
            .tItem {
                display: flex;
                justify-content: space-between;
                font-size: 26px;
                color: #ffffff;
                font-weight: 400;
                opacity: 0.6;
                padding: 23.5px 0 20px 0;
            }
            .line {
                width: 650px;
                height: 1px;
                background: #ffffff;
                opacity: 0.1;
            }
            .left {
                width: 174px;
                text-align: center;
            }
            .center {
                flex: 1;
                text-align: center;
            }
            .right {
                width: 174px;
                text-align: center;
            }
        }
    }
</style>
