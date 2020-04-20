<template>
    <div class="main_page">
        <NavCom title="发布购买订单"/>
        <div class="top_page">
            <span>可用USDT</span>
            <span class="number">{{parseFloat(userInfo.usdt_coin)}}</span>
        </div>
        <div class="content">
            <!--<div class="content_row">
                <span class="row_left">当前价格:</span>
                <span class="price_now">{{cacPrice}}</span>
            </div>-->
            <div class="content_row">
                <span class="row_left">购买价格(USDT):</span>
                <input v-model="price" placeholder="请输入出售价格"/>
            </div>
            <div class="content_row">
                <span class="row_left">购买数量(CAC):</span>
                <input v-model="num" placeholder="请输入数量"/>
            </div>
            <div class="content_row">
                <span class="row_left">发布昵称:</span>
                <input v-model="name" placeholder="请输入昵称"/>
            </div>
            <div class="content_row_last">
                <span class="row_left">总金额(USDT):</span>
                <span>{{price * num}}</span>
                <div class="button_class">
                    <van-button class="button" round color="linear-gradient(to right,#A73FE2,#7E2AF2,#611DE8)"
                                @click="sell">
                        发布
                    </van-button>
                </div>
            </div>
        </div>
        <!--<div class="tips">
            <div>快速出售小技巧：</div>
            <div>在交易页面点击“我要出售”直接和求购玩家直接匹配</div>
        </div>-->
    </div>
</template>
<script>
    import NavCom from "@/components/nav.vue"
    import {Dialog} from 'vant';
    import {mapState, mapActions} from "vuex";

    export default {
        name: "releaseSellOrder",
        inject: ["reload"],
        components: {
            NavCom
        },
        data() {
            return {
                num: null,
                price: null,
                name: null,
                cacPrice: null,
            }
        },
        created() {
            this.getUserInfo();
        },
        computed: {
            // vuex state
            ...mapState(["MyContract", "web3", "myAccount", "userInfo"])
        },
        methods: {
            ...mapActions(["getUserInfo"]),
            // 卖出CAC（发布订单）
            sell() {
                Dialog.confirm({
                    message: '确认发布订单么'
                }).then(() => {
                    let data = {
                        number: this.num,
                        price: this.price,
                        name: this.name,
                    };
                    this.ajax.post("v1/deals", data).then(res => {
                        if (res.data.code === 200) {
                            this.$toast("发布成功");
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
        min-height: 100vh;
        background: url("../../assets/img/bg.png") no-repeat center;
        padding: 0 30px 60px;

        /deep/ .van-slider {
            width: 50%;
        }

        .top_page {
            width: 690px;
            height: 120px;
            background: rgba(44, 36, 74, 1);
            border-radius: 8px;
            color: rgba(255, 255, 255, .6);
            font-size: 30px;
            padding: 39px 40px;
            display: flex;
            justify-content: space-between;

            .number {
                font-size: 36px;
                font-weight: 600;
                color: rgba(255, 255, 255, 1);
            }
        }

        .content {
            width: 690px;
            background: rgba(44, 36, 74, 1);
            border-radius: 8px;
            margin-top: 30px;
            padding: 0 40px 40px 40px;
            font-size: 26px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);

            .content_row {
                position: relative;
                height: 97px;
                border-bottom: 1px solid #999393;
                border-color: rgba(255, 255, 255, .1);
                line-height: 97px;

                .row_left {
                    display: inline-block;
                    width: 240px;
                    padding-right: 20px;
                    color: rgba(255, 255, 255, .6);
                }

                .price_now {
                    color: #AB91EF;
                }

                .percentage {
                    position: absolute;
                    bottom: 100px;
                    right: 324px;
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 11px;
                    height: 30px;
                }

                .price_slider {
                    position: absolute;
                    right: 40px;
                    top: 37px;
                    width: 340px;

                    .custom_button {
                        img {
                            height: 32px;
                            width: 32px;
                            display: flex;
                            justify-content: center;
                        }
                    }
                }

                input {
                    border: 0;
                    outline: 0;
                    background-color: transparent;
                }
            }

            .content_row_last {
                height: 166px;

                .row_left {
                    width: 240px;
                    padding-right: 20px;
                    color: rgba(255, 255, 255, .6);
                    display: inline-block;
                    margin-top: 24px;
                }

                .button_class {
                    margin-top: 45px;

                    .button {
                        width: 260px;
                        height: 60px;
                        line-height: 60px;

                        display: block;
                        margin: 0 auto;
                    }
                }
            }
        }

        .tips {
            font-size: 22px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 30px;
            margin: 16px 0 0 0;
        }
    }
</style>
