<template>
    <div class="dealInfo">
        <!--货币信息-->
        <div class="coinBox" v-if="market_value">
            <div class="coinBox_top">
                <img src="../../../assets/img/deal/coin.png" alt=""/>
                <span>CAC ≈ {{market_value.cac_rate}} USDT</span>
            </div>
            <div class="coinBox_bottom">
                <div>
                    <span>当前价格：</span>
                    <span>{{market_value.current_price}} USDT</span>
                </div>
                <div>
                    <span>高<img src="../../../assets/img/deal/high.png" alt=""/></span>
                    <span style="color: #FB4D6E">{{market_value.high_price}} USDT</span>
                </div>
                <div>
                    <span>低<img src="../../../assets/img/deal/low.png" alt=""/></span>
                    <span style="color: #0DD393">{{market_value.low_price}} USDT</span>
                </div>
            </div>
        </div>
        <!--图表区域-->
        <!--<div class="charts">
            <div class="titleAndBtn">
                <span class="titleAndBtn_title">行情</span>
                <div class="titleAndBtn_btn">
                    <span :class="chartsIndex === 0 ? 'active' : '' " @click="chartsIndex=0">1H</span>
                    <span :class="chartsIndex === 1 ? 'active' : '' " @click="chartsIndex=1">1D</span>
                    <span :class="chartsIndex === 2 ? 'active' : '' " @click="chartsIndex=2">1W</span>
                    <span :class="chartsIndex === 3 ? 'active' : '' " @click="chartsIndex=3">1M</span>
                </div>
            </div>
            <div ref="chartWrap" class="chartsBox"></div>
        </div>-->
        <!--操作区域-->
        <div class="orderBox">
            <div class="orderBox_nav">
                <div @click="$router.push({path:'/releaseSellOrder'})">
                    <img src="../../../assets/img/deal/sell.png" alt=""/>
                    <span>发布订单</span>
                </div>
                <!--<div @click="$router.push({path:'/releaseBuyOrder'})">
                    <img src="../../../assets/img/deal/buy.png" alt=""/>
                    <span>发布购买订单</span>
                </div>-->
                <div @click="$router.push({path:'/orderList'})">
                    <img src="../../../assets/img/deal/order.png" alt=""/>
                    <span>订单</span>
                </div>
                <!--<div @click="$router.push({path:'/tradRecord'})">
                    <img src="../../../assets/img/deal/record.png" alt=""/>
                    <span>交易记录</span>
                </div>-->
            </div>
            <!--<div class="orderBox_btn">
                <button :class="orderIndex ? '' : 'active'" @click="orderIndex = 0">我要购买</button>
                <button :class="orderIndex ? 'active' : ''" @click="orderIndex = 1">我要出售</button>
            </div>-->
            <ul class="orderBox_list">
                <van-list
                        v-model="loading"
                        :finished="finished"
                        :offset="10"
                        finished-text="没有更多了"
                        @load="onLoad">
                    <li v-for="(item,index) in listData" :key="index">
                        <div class="left">
                            <img src="../../../assets/img/deal/coin.png" alt=""/>
                            <div>
                                <span>{{item.name}}</span>
                                <span>购买:{{parseFloat(item.number)}}CAC</span>
                            </div>
                        </div>
                        <div class="center">
                            <span>{{parseFloat(item.price)}} USDT</span>
                            <span>总价:{{parseFloat(item.total_amount)}}USDT</span>
                        </div>
                        <button class="right" @click="buy(item.id)">出售</button>
                    </li>
                </van-list>
            </ul>
        </div>
    </div>
</template>

<script>
    // import {createChart} from 'lightweight-charts';
    import {mapState} from "vuex";
    import {Dialog, Toast} from "vant";

    export default {
        name: "dealInfo",
        inject: ["reload"],
        data() {
            return {
                chartsIndex: 0,
                orderIndex: 0,
                chartData: [],
                candlestickSeries: null,
                market_value: null,
                // 交易列表
                listData: [],
                total: null,
                page: 0,
                loading: false,
                finished: false,
            }
        },
        computed: {
            // vuex state
            ...mapState(["cac", "cacPrice", "MyContract", "web3", "myAccount"])
        },
        mounted() {
            // 初始化图表
            /*const chart = createChart(this.$refs.chartWrap, {
                layout: {
                    backgroundColor: 'transparent',
                    textColor: 'rgba(255, 255, 255, 0.9)',
                },
            });
            this.candlestickSeries = chart.addCandlestickSeries({
                priceFormat: {
                    type: 'volume',
                    precision: 4,
                },
            });
            this.chartData = [
                {time: "2018-12-19", open: 141.77, high: 170.39, low: 120.25, close: 145.72},
                {time: "2018-12-20", open: 145.72, high: 147.99, low: 100.11, close: 108.19},
                {time: "2018-12-21", open: 108.19, high: 118.43, low: 74.22, close: 75.16},
                {time: "2018-12-22", open: 75.16, high: 82.84, low: 36.16, close: 45.72},
                {time: "2018-12-23", open: 45.12, high: 53.90, low: 45.12, close: 48.09},
                {time: "2018-12-24", open: 60.71, high: 60.71, low: 53.39, close: 59.29},
                {time: "2018-12-25", open: 68.26, high: 68.26, low: 59.04, close: 60.50},
                {time: "2018-12-26", open: 67.71, high: 105.85, low: 66.67, close: 91.04},
                {time: "2018-12-27", open: 91.04, high: 121.40, low: 82.70, close: 111.40},
                {time: "2018-12-28", open: 111.51, high: 142.83, low: 103.34, close: 131.25},
                {time: "2018-12-29", open: 131.33, high: 151.17, low: 77.68, close: 96.43},
                {time: "2018-12-30", open: 106.33, high: 110.20, low: 90.39, close: 98.10},
                {time: "2018-12-31", open: 109.87, high: 114.69, low: 85.66, close: 111.26},
            ];
            this.candlestickSeries.setData(this.chartData);*/
        },
        methods: {
            // 用户的所有的挂的单的价格（数组，从1开始到结束）
            getListData() {
                this.page++;
                this.ajax.get(`v1/deals/page/${this.page}/size/10`).then(res => {
                    if (res.data.code === 200) {
                        if (!this.market_value) {
                            this.market_value = res.data.data.market_value;
                        }
                        let size = res.data.data.deals.length;
                        this.total = res.data.data.total;
                        this.listData.push(...res.data.data.deals);
                        // 加载状态结束
                        this.loading = false;
                        // 数据全部加载完成
                        if (size < 10) {
                            this.finished = true;
                        }
                    }
                })
            },
            onLoad() {
                setTimeout(() => {
                    this.getListData();
                }, 500);
            },
            buy(id) {
                Dialog.confirm({
                    message: '确认交易么？'
                }).then(() => {
                    this.ajax.put(`v1/deals/${id}`).then(res => {
                        if (res.data.code === 200) {
                            Toast("交易成功");
                            setTimeout(() => {
                                this.reload();
                            }, 1000);
                        }
                    });
                }).catch(() => {
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .dealInfo {
        margin-top: 30px;

        .coinBox {
            padding: 40px;
            margin-bottom: 30px;
            border-radius: 8px;
            background: #2C244A;

            .coinBox_top {
                display: flex;
                align-items: center;
                padding-bottom: 30px;
                margin-bottom: 20px;
                border-bottom: 1px solid rgba(255, 255, 255, .2);

                img {
                    width: 56px;
                    height: 56px;
                    margin-right: 20px;
                }

                span {
                    font-size: 36px;
                    font-weight: 600;
                    color: rgba(255, 255, 255, 1);
                }
            }

            .coinBox_bottom {
                display: flex;
                align-items: center;

                div {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    margin-right: 70px;

                    span {
                        &:first-child {
                            font-size: 26px;
                            color: rgba(255, 255, 255, .6);

                            img {
                                width: 20px;
                                height: 24px;
                                margin-left: 4px;
                            }
                        }

                        &:last-child {
                            font-size: 26px;
                            font-weight: 600;
                            color: #fff;
                        }
                    }
                }
            }
        }

        .charts {
            padding: 40px 20px;
            margin-bottom: 30px;
            border-radius: 8px;
            background: #2C244A;

            .titleAndBtn {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-bottom: 24px;
                border-bottom: 1px solid rgba(255, 255, 255, .1);

                .titleAndBtn_title {
                    font-size: 30px;
                    font-weight: 600;
                    color: #fff;
                }

                .titleAndBtn_btn {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 360px;
                    height: 44px;
                    border-radius: 8px;
                    border: 2px solid #AB91EF;

                    span {
                        flex: 1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100%;
                        font-size: 24px;
                        color: #AB91EF;
                        border-right: 1px solid #AB91EF;
                        background: transparent;

                        &:last-child {
                            border: none;
                        }
                    }

                    .active {
                        color: #2C244A;
                        background: #AB91EF;
                    }
                }
            }

            .chartsBox {
                width: 100%;
                height: 500px;
                background: transparent;
            }
        }

        .orderBox {
            padding: 40px;
            border-radius: 8px;
            background: #2C244A;

            .orderBox_nav {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-bottom: 24px;
                border-bottom: 1px solid rgba(255, 255, 255, .1);

                div {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-width: 134px;

                    img {
                        width: 34px;
                        height: 32px;
                    }

                    span {
                        margin-top: 18px;
                        font-size: 22px;
                        color: rgba(255, 255, 255, .6);
                    }
                }
            }

            .orderBox_btn {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin: 30px 0 40px;
                border-radius: 8px;
                overflow: hidden;
                border: 2px solid rgba(171, 145, 239, 1);

                button {
                    flex: 1;
                    height: 54px;
                    font-size: 24px;
                    color: #AB91EF;
                    background: transparent;
                }

                .active {
                    color: #2C244A;
                    background: #AB91EF;
                }
            }

            .orderBox_list {
                margin-top: 20px;

                li {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 60px;

                    &:last-child {
                        margin-bottom: 0;
                    }

                    .left {
                        display: flex;
                        align-items: center;
                        margin-right: 20px;

                        img {
                            width: 72px;
                            height: 72px;
                            border-radius: 50%;
                            margin-right: 20px;
                        }

                        div {
                            span {
                                display: block;
                                max-width: 180px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;

                                &:first-child {
                                    margin-bottom: 4px;
                                    font-size: 24px;
                                    color: rgba(255, 255, 255, 1);
                                }

                                &:last-child {
                                    font-size: 22px;
                                    color: rgba(255, 255, 255, .6);
                                }
                            }
                        }
                    }

                    .center {
                        flex: 1;

                        span {
                            display: block;
                            font-size: 25px;
                            font-weight: 600;
                            color: #AB91EF;
                            max-width: 200px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;

                            &:last-child {
                                font-size: 22px;
                                color: rgba(255, 255, 255, .6);
                            }
                        }
                    }

                    .right {
                        padding: 0 20px;
                        height: 56px;
                        font-size: 26px;
                        background: linear-gradient(90deg, rgba(167, 63, 226, 1) 0%, rgba(126, 42, 242, 1) 56%, rgba(97, 29, 232, 1) 100%);
                        border-radius: 28px;
                        color: #FFFFFF;
                    }
                }
            }
        }
    }
</style>
