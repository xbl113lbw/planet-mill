<template>
    <div class="main_page">
        <NavCom title="订单列表"/>
        <van-tabs v-model="active" class="vanTabs">
            <van-tab v-for="(item,index) in tabNav" :key="index" :title="item.title" :name="item.name">
                <div v-for="(v,i) in listData" :key="i" class="data_detail">
                    <div class="data_detail_row">
                        <span class="rate red">数量：{{i.num}}</span>
                        <button v-if="active !== 'ready'">取消</button>
                    </div>
                    <div class="data_detail_row">
                        <span>价格：{{i.price}}</span>
                        <span>{{statusText(i.status)}}</span>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import NavCom from "@/components/nav.vue"
    import {mapState} from "vuex";

    export default {
        components: {
            NavCom
        },
        data() {
            return {
                active: "push",
                tabNav: [
                    {title: "未完成", name: "push"},
                    {title: "已完成", name: "ready"},
                ],
                listId: 1,
                listData: []
            }
        },
        computed: {
            // vuex state
            ...mapState(["MyContract", "web3", "myAccount"]),
        },
        watch: {
            active() {
                this.listData = [];
                this.exchangeList();
            }
        },
        created() {
            this.exchangeList()
        },
        methods: {
            // 用户的所有的挂的单的价格（数组，从1开始到结束）
            exchangeList() {
                this.MyContract.methods.exchangeList(this.listId).call().then(res => {
                    let flag;
                    switch (this.active) {
                        case "push":
                            flag = res.status === 1 && this.myAccount === res.adAddress;
                            break;
                        case "ready":
                            flag = res.status >= 2 && this.myAccount === res.adAddress;
                            break;
                    }
                    console.log(flag);
                    if (flag) {
                        console.log(res);
                        let item = {};
                        item.adAddress = res.adAddress;
                        item.exAddress = res.exAddress;
                        item.price = res.price;
                        item.num = this.web3.utils.fromWei(res.num);
                        item.allNum = res.allNum;
                        item.status = res.status;
                        this.listId++;
                        this.listData.push(item);
                        this.exchangeList();
                    }
                }).catch(error => console.log(error));
            },
            statusText(status) {
                switch (status) {
                    case 1:
                        return "发布中";
                    case 2:
                        return "已完成";
                    case 3:
                        return "已取消";
                }
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

        .data_detail {
            width: 690px;
            padding: 36px 40px;
            background: rgba(44, 36, 74, 1);
            border-radius: 8px;
            margin-top: 30px;
            color: rgba(255, 255, 255, .6);
            font-size: 22px;

            .data_detail_row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 20px;

                &:last-child {
                    margin-bottom: 0;
                }

                span {
                    font-size: 24px;
                }

                button {
                    width: 120px;
                    height: 56px;
                    background: linear-gradient(
                                    90deg,
                                    rgba(167, 63, 226, 1) 0%,
                                    rgba(126, 42, 242, 1) 56%,
                                    rgba(97, 29, 232, 1) 100%
                    );
                    border-radius: 28px;
                    text-align: center;
                    font-size: 26px;
                    color: #ffffff;
                }

                .rate {
                    height: 50px;
                    font-size: 36px;
                    font-weight: 600;
                    line-height: 50px;
                }

                .red {
                    color: rgba(251, 77, 110, 1);

                }

                .green {
                    color: #0DD393;
                }
            }
        }
    }
</style>

