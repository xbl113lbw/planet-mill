<template>
    <!-- 资产记录页面 -->
    <div class="main_page">
        <NavCom title="资产记录"/>
        <van-tabs v-model="active" class="vanTabs">
            <van-tab v-for="(val,i) in tabData" :title="val.name" :key='i'>
                <div class="data_list">
                    <div class="data_list_row">CAC总量：<span>10000</span></div>
                    <div class="data_list_row">产出总量：<span>10000</span></div>
                    <div class="data_list_row">黑洞销毁：<span>10000</span></div>
                    <div class="data_list_row">流通数量：<span>10000</span></div>
                </div>
                <van-list
                        v-model="loading"
                        :finished="finished"
                        :offset="10"
                        finished-text="没有更多了"
                        @load="onLoad">
                    <div v-for="(item,index) in listData" :key="index" class="data_detail">
                        <div class="data_detail_row">
                            <span class="rate" :class="item.amount>0?'red':'green'">{{ item.amount }}</span>
                            <span>{{item.title}}</span>
                        </div>
                        <div class="data_detail_row">
                            <span>余额：{{ item.balance }}</span>
                            <span>{{ item.created_at }}</span>
                        </div>
                    </div>
                </van-list>
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
                tabData: [
                    {name: "充值记录"},
                    {name: "碰撞记录"},
                    {name: "挖矿记录"},
                ],
                page: 0,
                loading: false,
                finished: false,
                listData: [],
            };
        },
        methods: {
            getListsData() {
                this.page++;
                let parmes = {
                    type: this.active,
                    size: 10,
                    page: this.page,
                };
                this.ajax.get(`v1/user/asset_log/type/${this.active}/page/${this.page}/size/10`, parmes).then(res => {
                    if (res.data.code === 200) {
                        console.log(res.data);
                        let arrData = res.data.data;
                        if (arrData) {
                            this.finished = true;
                        }
                        this.listData.push(...arrData);
                        // 加载状态结束
                        this.loading = false;
                        // 数据全部加载完成
                        if (arrData.length || arrData.length < 10) {
                            this.finished = true;
                        }
                    }
                })
            },
            onLoad() {
                setTimeout(() => {
                    this.getListsData();
                }, 500);
            },
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