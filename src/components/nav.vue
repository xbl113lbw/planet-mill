<template>
    <div class="NavCom">
        <img src="../assets/img/left.png" class="left" v-show="showLeft" @click="$router.go(-1)"/>
        <span>{{title}}</span>
    </div>
</template>

<script>
    export default {
        name: "NavCom",
        props: {
            title: {
                default: ""
            },
            showLeft: {
                default: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .NavCom {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 30px 0 0;
        margin-bottom: 30px;
        background: transparent;

        .left {
            position: absolute;
            left: 0;
            width: 44px;
            height: 44px;
        }
        span {
            font-size: 32px;
            font-weight: 600;
            color: rgba(255, 255, 255, 1);
        }
    }
</style>