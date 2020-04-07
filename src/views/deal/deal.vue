<template>
    <div class="deal">
        <!--导航-->
        <van-tabs v-model="activeName"
                  color="#FFFFFF"
                  title-inactive-color="rgba(255,255,255,.6)"
                  title-active-color="#fff"
                  background="transparent"
                  :border="false"
                  line-height="3px"
                  line-width="12px">
            <van-tab title="市值/交易" name="dealInfo">
                <DealInfo/>
            </van-tab>
            <van-tab title="我的业绩" name="myPerformance">
                <MyPerformance/>
            </van-tab>
        </van-tabs>
        <Tab tabIndex="交易"/>
    </div>
</template>

<script>
    import DealInfo from "./components/dealInfo.vue"
    import MyPerformance from "./components/myPerformance.vue"
    import Tab from "../../components/tab";

    export default {
        name: "deal",
        components: {
            DealInfo, MyPerformance, Tab
        },
        data() {
            return {
                activeName: ""
            }
        }
    }
</script>

<style lang="scss" scoped>
    .deal {
        min-height: 100vh;
        padding: 0 30px 80px;
        background: url("../../assets/img/bg.png") no-repeat center/cover;
    }
</style>
