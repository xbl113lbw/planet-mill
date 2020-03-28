<template>
    <!-- 资产记录页面 -->
    <div class="main_page">
        <NavCom title="资产记录"/>
        <van-tabs v-model="active" class="vanTabs">
            <van-tab title="充值记录">
                <div class="data_list">
                    <div class="data_list_row">CAC总量：<span>{{record_data.data1}}</span></div>
                    <div class="data_list_row">产出总量：<span>{{record_data.data2}}</span></div>
                    <div class="data_list_row">黑洞销毁：<span>{{record_data.data3}}</span></div>
                    <div class="data_list_row">流通数量：<span>{{record_data.data4}}</span></div>
                </div>
                <div v-for="(item,index) in record_data2" :key="index" class="data_detail">
                    <div class="data_detail_row">
                        <span class="rate" :class="item.rate>0?'red':'green'">{{ item.number }}</span>
                        <span>静态释放</span>
                    </div>
                    <div class="data_detail_row">
                        <span>余额：{{ item.balance }}</span>
                        <span>{{ item.date }}</span>
                    </div>
                </div>
            </van-tab>
            <van-tab title="碰撞记录">
                <div class="data_list">
                    <div class="data_list_row">CAC总量：<span>{{record_data.data1}}</span></div>
                    <div class="data_list_row">产出总量：<span>{{record_data.data2}}</span></div>
                    <div class="data_list_row">黑洞销毁：<span>{{record_data.data3}}</span></div>
                    <div class="data_list_row">流通数量：<span>{{record_data.data4}}</span></div>
                </div>
                <div v-for="(item,index) in record_data2" :key="index" class="data_detail">
                    <div class="data_detail_row">
                        <span class="rate" :class="item.rate>0?'red':'green'">{{ item.number }}</span>
                        <span>静态释放</span>
                    </div>
                    <div class="data_detail_row">
                        <span>余额：{{ item.balance }}</span>
                        <span>{{ item.date }}</span>
                    </div>
                </div>
            </van-tab>
            <van-tab title="挖矿记录">
                <div class="data_list">
                    <div class="data_list_row">CAC总量：<span>{{record_data.data1}}</span></div>
                    <div class="data_list_row">产出总量：<span>{{record_data.data2}}</span></div>
                    <div class="data_list_row">黑洞销毁：<span>{{record_data.data3}}</span></div>
                    <div class="data_list_row">流通数量：<span>{{record_data.data4}}</span></div>
                </div>
                <div v-for="(item,index) in record_data2" :key="index" class="data_detail">
                    <div class="data_detail_row">
                        <span class="rate" :class="item.rate>0?'red':'green'">{{ item.number }}</span>
                        <span>静态释放</span>
                    </div>
                    <div class="data_detail_row">
                        <span>余额：{{ item.balance }}</span>
                        <span>{{ item.date }}</span>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
    import NavCom from "@/components/nav.vue"

    export default {
        name: "assetsRecord",
        components: {
            NavCom
        },
        data() {
            return {
                active: 0,
                record_data: {
                    data1: 10000000000001,
                    data2: 10000000000001,
                    data3: 10000000000001,
                    data4: 10000000000001,
                },
                record_data2: [{
                    rate: 2,
                    number: '+2425454',
                    balance: 36.68746,
                    date: "2020/03/22 15:02"
                }, {
                    rate: 2,
                    number: '+2425454',
                    balance: 36.68746,
                    date: "2020/03/22 15:02"
                }, {
                    rate: 0,
                    number: '-2425454',
                    balance: 36.68746,
                    date: "2020/03/22 15:02"
                }, {
                    rate: 0,
                    number: '-2425454',
                    balance: 36.68746,
                    date: "2020/03/22 15:02"
                }]
            };
        }
    };
</script>

<style lang="scss" scoped>
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
    }

    .data_list {
        background-color: #2C244A;
        padding: 40px;
        margin-top: 40px;
        width: 690px;
        height: 262px;
        border-radius: 8px;

        .data_list_row {
            height: 37px;
            font-size: 26px;
            font-weight: 400;
            color: rgba(255, 255, 255, .6);
            line-height: 37px;

            margin-bottom: 11px;

            span {
                font-weight: 600;
                color: #ffffff;
            }
        }
    }

    .data_detail {
        width: 690px;
        height: 168px;
        padding: 36px 40px;
        background: rgba(44, 36, 74, 1);
        border-radius: 8px;
        margin-top: 30px;
        color: rgba(255, 255, 255, .6);
        font-size: 22px;

        .data_detail_row {
            display: flex;
            justify-content: space-between;

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
</style>