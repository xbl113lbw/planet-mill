<!--
 * @Author: liyh
 * @Date: 2020-03-27 12:57:16
 * @LastEditors: liyh
 * @LastEditTime: 2020-03-27 15:03:22
 -->
<template>
    <div class="box">
        <div class="bgimg"></div>
        <div class="titleBox">
            <span>资产</span>
            <img src="./../../assets/img/property/record.png" alt="" class="right"
                 @click="$router.push({path:'/assetsRecord'})">
        </div>

        <!-- 资产 -->
        <div class="top">
            <div class="totalBox">
                <div>
                    <div class="opacityText">总资产估值 (USDT)：</div>
                    <div class="whiteText">0.0000</div>
                </div>
                <div>
                    <div class="opacityText">当前价格 (CAC)：</div>
                    <div class="whiteText">0.0000</div>
                </div>
            </div>
            <div class="btnBox">
                <div class="btnItem">充值</div>
                <div class="btnItem">提币</div>
                <div class="btnItem">交易</div>
            </div>
        </div>

        <!-- 正在参与的游戏 -->
        <div class="gamesBox">
            <div class="gamesItemBox">
                <div class="gLeft">
                    <div class="gName">碰撞游戏</div>
                    <div class="gRank">
                        <span>排队中：</span>
                        <span>62</span>
                    </div>
                </div>
                <div class="gRight">取消</div>
            </div>
            <div class="line"></div>
            <div class="gamesItemBox">
                <div class="gLeft">
                    <div class="gName">矿机</div>
                    <div class="gRank">
                        <span>排队中：</span>
                        <span>62</span>
                    </div>
                </div>
                <div class="gRight">取消</div>
            </div>
        </div>

        <!-- 矿机运行情况 -->
        <div class="operationBox">
            <div class="leftBox">
                <div class="itemImg">
                    <img src="../../assets/img/property/水星.png" alt/>
                </div>
                <div class="itemName">水星</div>
            </div>
            <div class="rightBox">
                <div class="operationText">矿机运行情况</div>
                <div class="textRow">
                    <div>
                        <span class="opacityText">总产出：</span>
                        <span class="_AB91EF">100</span>
                    </div>
                    <div class="m_90">
                        <span class="opacityText">待产出：</span>
                        <span class="_AB91EF">100</span>
                    </div>
                </div>
                <div class="textRow">
                    <div>
                        <span class="opacityText">已产出：</span>
                        <span class="_AB91EF">100</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 参与游戏 -->
        <div v-if="1==2">
            <div class="itemBox" v-for="(item,index) in [1,2]" :key="index">
                <div class="topArea">
                    <div class="topAreaLeft">
                        <div class="iconBox"></div>
                        <div class="nameBox">ABCJC</div>
                    </div>
                    <div class="arrowRightBox">
                        <img src="./../../assets/img/property/arrow_right.png" alt/>
                    </div>
                </div>

                <div class="line"></div>

                <div class="bottomArea">
                    <div>
                        <div class="opacityText">可用：</div>
                        <div>100 USDT</div>
                    </div>
                    <div>
                        <div class="opacityText">冻结：</div>
                        <div>100 USDT</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 未参与游戏 -->
        <div class="imgItem">
            <img v-for="(item,index) in imgItem" :src="item" :key="index" alt/>
        </div>

        <Tab tabIndex="资产"/>
    </div>
</template>

<script>
    import Tab from "../../components/tab";

    export default {
        name: "planet",
        components: {
            Tab
        },
        data() {
            return {
                imgItem: [
                    require("../../assets/img/property/水星.png"),
                    require("../../assets/img/property/火星.png"),
                    require("../../assets/img/property/金星.png"),
                    require("../../assets/img/property/土星.png"),
                    require("../../assets/img/property/木星.png")
                ]
            };
        }
    };
</script>

<style lang="scss" scoped>
    .opacityText {
        opacity: 0.6;
    }

    .box {
        width: 750px;
        height: 100%;
        position: relative;
        padding: 40px 30px 55px 30px;
        margin: 0 auto;

        .titleBox {
            font-size: 32px;
            font-weight: 600;
            color: #ffffff;
            width: 100%;
            text-align: center;
            position: relative;
            margin-bottom: 40px;

            .right {
                position: absolute;
                width: 44px;
                height: 44px;
                top: 0;
                right: 0;
            }
        }

        .bgimg {
            width: 100%;
            background-image: url("./../../assets/img/bg.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: -1;
        }

        .top {
            width: 690px;
            height: 272px;
            padding: 40px;
            font-size: 26px;
            color: white;
            background: #2c244a;
            margin-bottom: 30px;
            border-radius: 8px;

            .totalBox {
                display: flex;
                justify-content: space-between;

                .whiteText {
                    font-size: 44px;
                    font-weight: 600;
                }
            }

            .btnBox {
                padding: 0 10px;
                display: flex;
                justify-content: space-between;
                margin-top: 30px;

                .btnItem {
                    width: 160px;
                    height: 56px;
                    border-radius: 28px;
                    text-align: center;
                    line-height: 56px;
                    border: 2px solid #c051ff;
                    font-size: 26px;
                }
            }
        }

        .gamesBox {
            padding: 20px 40px;
            width: 690px;
            height: 162px;
            background: #2c244a;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .gamesItemBox {
                display: flex;
                align-items: center;

                .gLeft {
                    .gName {
                        font-size: 30px;
                        font-weight: 600;
                        color: white;
                    }

                    .gRank {
                        font-size: 26px;

                        & span:first-child {
                            color: #ffffff;
                            opacity: 0.6;
                        }

                        & span:last-child {
                            color: #ab91ef;
                        }
                    }
                }

                .gRight {
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
                    line-height: 56px;
                    font-size: 26px;
                    color: #ffffff;
                    margin-left: 26px;
                }
            }

            .line {
                width: 1px;
                height: 122px;
                background: #ffffff;
                opacity: 0.2;
            }
        }

        .operationBox {
            width: 690px;
            height: 208px;
            background: #2c244a;
            border-radius: 8px;
            margin-top: 30px;
            padding: 40px;
            display: flex;

            .leftBox {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-top: 4px;

                .itemImg {
                    width: 100px;
                    height: 100px;

                    img {
                        width: 100%;
                        height: 100%;
                        display: block;
                    }
                }

                .itemName {
                    width: 90px;
                    height: 34px;
                    background: rgba(44, 36, 74, 1);
                    border-radius: 17px;
                    border: 1px solid rgba(178, 142, 245, 1);
                    position: relative;
                    top: -20px;
                    text-align: center;
                    line-height: 34px;
                    color: #ffffff;
                    font-size: 24px;
                }
            }

            .rightBox {
                margin-left: 30px;

                .operationText {
                    font-size: 30px;
                    font-weight: 600;
                    color: #ffffff;
                }

                .textRow {
                    font-size: 26px;
                    margin-bottom: 2px;
                    display: flex;
                    color: white;
                    margin-top: 10px;

                    .m_90 {
                        margin-left: 90px;
                    }

                    ._AB91EF {
                        color: #ab91ef;
                    }
                }
            }
        }

        .itemBox {
            width: 690px;
            height: 234px;
            background: #2c244a;
            border-radius: 8px;
            padding: 36px 40px 35px 40px;
            margin-top: 30px;

            .topArea {
                width: 100%;
                height: 56px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .topAreaLeft {
                    display: flex;

                    .iconBox {
                        width: 56px;
                        height: 56px;
                        border: 1px solid red;
                        margin-right: 20px;
                    }

                    .nameBox {
                        font-size: 36px;
                        font-weight: 600;
                        color: #ffffff;
                    }
                }

                .arrowRightBox {
                    width: 44px;
                    height: 44px;

                    img {
                        width: 100%;
                        height: 100%;
                        display: block;
                    }
                }
            }

            .line {
                width: 610px;
                height: 1px;
                background: #ffffff;
                opacity: 0.2;
                margin-top: 18px;
                margin-bottom: 14.5px;
            }

            .bottomArea {
                display: flex;
                font-size: 26px;
                color: #ffffff;

                & div {
                    flex: 1;
                }
            }
        }

        .imgItem {
            width: 750px;
            padding: 0 34px 0 32px;
            display: flex;
            justify-content: space-between;
            position: fixed;
            bottom: 350px;
            left: 0;

            img {
                width: 100px;
                height: 100px;
                display: block;
            }
        }
    }
</style>
