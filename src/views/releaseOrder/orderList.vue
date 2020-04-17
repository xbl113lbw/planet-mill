<template>
    <div class="main_page">
        <NavCom title="订单列表"/>
        <van-tabs v-model="active" class="vanTabs">
            <van-tab v-for="(item,index) in tabNav" :key="index" :title="item.title" :name="index">
                <van-list
                        v-model="loading"
                        :finished="finished"
                        :offset="10"
                        finished-text="没有更多了"
                        @load="onLoad">
                    <div v-for="(v,i) in listData" :key="i" class="data_detail">
                        <div class="data_detail_row">
                            <span class="rate red">数量：{{parseFloat(v.number) }} CAC</span>
                            <button v-if="active === 0" @click="cancel(v.id)">取消</button>
                        </div>
                        <div class="data_detail_row">
                            <span>价格：{{parseFloat(v.price)}} USDT</span>
                            <!--<span>{{statusText(v.status)}}</span>-->
                        </div>
                    </div>
                </van-list>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import NavCom from "@/components/nav.vue"
    import {Dialog} from "vant";

    export default {
        components: {
            NavCom
        },
        inject: ["reload"],
        data() {
            return {
                active: 0,
                tabNav: [
                    {title: "未完成"},
                    {title: "已完成"},
                ],
                listData: [],
                total: null,
                page: 0,
                loading: false,
                finished: false,
            }
        },
        watch: {
            active() {
                this.page = 0;
                this.listData = [];
                this.finished = false;
            }
        },
        methods: {
            // 获取列表
            getListData() {
                this.page++;
                this.ajax.get(`v1/deals/type/${this.active}/page/${this.page}/size/10`).then(res => {
                    if (res.data.code === 200) {
                        let arrData = res.data.data.deals;
                        this.total = res.data.data.total;
                        this.listData.push(...arrData);
                        // 加载状态结束
                        this.loading = false;
                        // 数据全部加载完成
                        if (this.listData.length >= this.total) {
                            this.finished = true;
                        }
                    }
                })
            },
            // 状态格式化
            statusText(status) {
                switch (status) {
                    case "0":
                        return "未完成";
                    case "1":
                        return "已完成";
                }
            },
            // 下拉刷新初始化
            onLoad() {
                setTimeout(() => {
                    this.getListData();
                }, 500);
            },
            // 取消事件
            cancel(id) {
                Dialog.confirm({
                    message: '确认取消么？'
                }).then(() => {
                    this.ajax.cancel(`v1/deals/${id}`).then(res => {
                        if (res.data.code === 200) {
                            this.$toast("取消成功");
                            setTimeout(() => {
                                this.reload();
                            }, 1000);
                        }
                    })
                }).catch(() => {
                });
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

