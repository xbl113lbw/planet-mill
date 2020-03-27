<template>
    <div class="main_page">
        <div class="content">
            <div class="content_row">
                <span class="row_left">当前价格:</span>
                <span class="price_now">{{form.price}}</span>
            </div>
            <div class="content_row">
                <span class="row_left">出售价格:</span>
                <span>{{form.price}}</span>
                <span class="percentage">%{{form.sellPrice}}</span>
                <div class="price_slider">
                    <van-slider v-model="form.sellPrice" bar-height="4px" active-color="#AB91EF"
                        inactive-color="#000000">
                        <template #button>
                            <div class="custom_button">
                                <img src="../../assets/img/releaseOrder/slider.png" />
                            </div>
                        </template>
                    </van-slider>
                </div>

            </div>
            <div class="content_row">
                <span class="row_left">出售数量:</span>
                <input :value="form.num" placeholder="请输入数量" />
            </div>
            <div class="content_row_last">
                <span class="row_left">购买金额:</span>
                <span>{{form.price}}</span>
                <div class="button_class">
                    <van-button class="button" round color="linear-gradient(to right,#A73FE2,#7E2AF2,#611DE8)">发布
                    </van-button>
                </div>


            </div>

        </div>
        <div class="tips">
            <div>快速出售小技巧：</div>
            <div>在交易页面点击“我要出售”直接和求购玩家直接匹配</div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "releaseSellOrder",
        data() {
            return {
                form: {
                    price: "0.236",
                    sellPrice: 50,
                    sellPricePer: 0
                }
            }
        }
    }
</script>
<style scoped lang="scss">
    .main_page {
        min-height: 100vh;
        background: url("../../assets/img/bg.png")no-repeat center;
        padding: 60px 30px;

        /deep/.van-slider {
            width: 50%px;
        }


        .content {
            width: 690px;
            height: 476px;
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
                    width: 130px;
                    height: 37px;
                    padding-right: 20px;
                    color: rgba(255, 255, 255, .6);
                }

                .price_now {
                    color: #AB91EF;
                }

                .percentage {
                    position: absolute;
                    /* top: 0; */
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
                    width: 140px;
                    height: 37px;
                    padding-right: 20px;
                    color: rgba(255, 255, 255, .6);
                    display: inline-block;
                    margin-top: 24px;
                }

                /* line-height: 166px; */
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