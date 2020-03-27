<template>
    <div class="main_page">
        <div class="top_page">
            <span>可用CAC</span>
            <span class="number">{{CAC}}</span>
        </div>
        <div class="content">
            <div class="content_row">
                当前价格<span>{{form.price}}</span>
            </div>
            <div class="content_row">
                <span>出售价格</span>
                <div class="price_slider">
                    <span>%{{sellPrice}}</span>
                    <van-slider v-model="form.sellPrice" bar-height="4px" active-color="#AB91EF" />
                </div>

            </div>
            <div class="content_row">
                出售数量<span>{{form.price}}</span>
            </div>
            <div class="content_row">
                购买金额<span>{{form.price}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "releaseSellOrder",
        data() {
            return {
                CAC: '0',
                form: {
                    price: "0.236",
                    sellPrice: "0.236"
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
            height: 476px;
            background: rgba(44, 36, 74, 1);
            border-radius: 8px;
            margin-top: 30px;
            padding: 36px 40px 40px 40px;
            font-size: 26px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);

            .content_row {
                position: relative;
                height: 97px;
                border-bottom: 1px solid #999393;
                line-height: 97px;

                .price_slider {
                    position: absolute;
                    right: 40px;
                    top: 37px;
                    width: 340px;
                }
            }
        }
    }
</style>