<template>
    <div class="main_page">
        <NavCom title="订单列表"/>
        <van-tabs v-model="active" class="vanTabs">
            <van-tab v-for="(item,index) in tabNav" :key="index"
                     :title="item.title" :name="item.name">
                <ul class="listWrap">
                    <li v-for="(v,i) in [1,2,3]" :key="i">
                        <span>1</span>
                        <span>1</span>
                        <span>1</span>
                    </li>
                </ul>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import NavCom from "@/components/nav.vue"

    export default {
        components: {
            NavCom
        },
        data() {
            return {
                active: "push",
                tabNav: [
                    {title: "已发布", name: "push"},
                    {title: "已完成", name: "ready"},
                ]
            }
        }
    }
</script>

<style scoped lang="scss">
    .main_page {
        height: 100vh;
        padding: 0 30px;
        background: url("../../assets/img/bg.png") no-repeat center;
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

        .listWrap {
            margin-top: 40px;
            padding: 20px;
            border-radius: 8px;
            background: #2C244A;

            li {
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid rgba(255, 255, 255, .1);

                &:last-child {
                    border: none;
                }

                span {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 70px;
                    font-size: 26px;
                    font-weight: 600;
                    color: #fff;
                    border-right: 1px solid rgba(255, 255, 255, .1);

                    &:nth-child(1) {
                        flex: 1;
                    }

                    &:nth-child(2) {
                        flex: 1.5;
                    }

                    &:nth-child(3) {
                        flex: 2;
                        border: none;
                    }
                }
            }
        }
    }
</style>

