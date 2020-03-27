<template>
    <div class="main_page">
        <van-tabs v-model="active" class="vanTabs">

            <van-tab title="业务类型">
                <van-grid :column-num="3" class="table">
                    <van-grid-item v-for="value in 12" :key="value" text="X" />
                </van-grid>
            </van-tab>
            <van-tab title="数额">
                <van-grid :column-num="3" class="table">
                    <van-grid-item v-for="value in 12" :key="value" :text="value" />
                </van-grid>
            </van-tab>
            <van-tab title="当前ACA">
                <van-grid :column-num="3" class="table">
                    <van-grid-item v-for="value in 12" :key="value" text="0" />
                </van-grid>
            </van-tab>
            <van-tab title="时间">
                <van-grid :column-num="3" class="table">
                    <van-grid-item v-for="value in 12" :key="value" text="Q" />
                </van-grid>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>
<style scoped lang="scss">
    .main_page {
        height: 100vh;
        padding: 0 30px;
        background: url("../../assets/img/bg.png")no-repeat center;
        background-size: cover;

        /deep/ .vanTabs {
            .van-tabs__nav {
                background-color: transparent;

                .van-tab {
                    font-size: 14px;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 0.6);
                }

                .van-tab--active {
                    color: #AB91EF;
                    font-weight: 600;
                }
            }

            .van-tabs__line {
                position: absolute;
                bottom: 15px;
                left: 0;
                z-index: 1;
                width: 24px !important;
                height: 4px;
                background: rgba(171, 145, 239, 1);
                border-radius: 3px;
            }

            .van-hairline--top-bottom::after {
                border: none;
            }
        }
    }

    .table {
        margin-top: 40px;
        border-radius: 8px;
    }
</style>
<style lang="scss">
    .van-grid {
        &:after{
            border: 0;
        }
        .van-grid-item {
            flex-basis: 28% !important;

            &:nth-child(3n+3) {
                flex-basis: 44% !important;
            }


        }

        .van-grid-item__content {
            background-color: #2C244A !important;

            &:after {
                border-color: rgba(255, 255, 255, .1);
            }

        }

        .van-grid-item__text {

            font-size: 13px;
            font-weight: 600;
            color: rgba(255, 255, 255, 1);
        }
    }
</style>