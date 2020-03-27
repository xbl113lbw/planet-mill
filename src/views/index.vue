<template>
    <div>
        <van-button type="default">默认按钮</van-button>
        <div class="box">111</div>
        <div class="" @click="NavTo('/assetsRecord')">跳转到资产记录</div>
        <div class="" @click="NavTo('/releaseSellOrder')">跳转到发布出售订单</div>
    </div>
</template>

<script>
    export default {
        name: "index",
        methods:{
            NavTo(e){
                this.$router.push({
                    path:e
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .box {
        width: 100px;
        background: green;
    }
</style>
