<template>
    <div id="home">
        <!--头部-->
        <div class="header">
            <div class="left"></div>
            <div class="logo">GALAXY</div>
            <img src="../../assets/img/home/problemIcon.png" class="problemIcon" alt=""/>
        </div>
        <!--顶部信息展示-->
        <div class="topInfo">
            <div class="topInfo_height">
                区块高度：
                <span>43200</span>
            </div>
            <div class="topInfo_time">
                <van-count-down :time="time" format="mm:ss">
                    <template v-slot="timeData">
                        <span class="item">
                            {{ timeData.minutes }}
                            <span class="topInfo_time_text">Minutes</span>
                        </span>
                        <span class="item" style="margin: 0 20px;">:</span>
                        <span class="item">
                            {{ timeData.seconds }}
                             <span class="topInfo_time_text">Seconds</span>
                        </span>
                    </template>
                </van-count-down>
            </div>
            <div class="topInfo_plan">
                <span>目前进度 80%</span>
                <div class="topInfo_plan_line">
                    <img src="../../assets/img/home/plan_A.png" alt=""/>
                </div>
            </div>
        </div>
        <!--货币信息-->
        <div class="coinInfo">
            <div class="coinInfo_top_line">
                <div class="coinInfo_top_line_imgWrap">
                    <img src="../../assets/img/home/usdt.png" alt=""/>
                    <span>100.00 USDT</span>
                </div>
                <button>参与碰撞</button>
            </div>
            <div class="coinInfo_top_line">
                <div class="coinInfo_top_line_textWrap">
                    <div>当前排队人数：<span>100</span></div>
                    <div>排队中：<span>62</span></div>
                </div>
                <button>碰撞预排</button>
            </div>
            <div class="coinInfo_bottom">
                <div class="coinInfo_bottom_left">
                    <div>
                        可用：
                        <span>100 USDT</span>
                    </div>
                    <div>
                        冻结：
                        <span>100 USDT</span>
                    </div>
                    <div>
                        可用：
                        <span>100 CAC</span>
                    </div>
                    <div>
                        冻结：
                        <span>100 CAC</span>
                    </div>
                </div>
                <button>充币</button>
            </div>
        </div>
        <!--表格-->
        <div class="table">
            <div class="table_tr table_tr_title">
                <span>矿机类型</span>
                <span>矿机数量</span>
                <span>分红奖池</span>
                <span>矿池</span>
                <span>矿机奖励</span>
                <span>分红</span>
            </div>
            <div class="table_tr">
                <span>
                    <img src="../../assets/img/home/Mercury.png" alt=""/>
                    水星
                </span>
                <span>21</span>
                <span>0000.</span>
                <span>0000.</span>
                <span>0000.</span>
                <span>0000.</span>
            </div>
            <div class="table_tr">
                <span>
                    <img src="../../assets/img/home/Mars.png" alt=""/>
                    火星
                </span>
                <span>21</span>
                <span>0000.</span>
                <span>0000.</span>
                <span>0000.</span>
                <span>0000.</span>
            </div>
            <div class="table_tr">
                <span>
                    <img src="../../assets/img/home/Venus.png" alt=""/>
                    金星
                </span>
                <span>21</span>
                <span>0000.</span>
                <span>0000.</span>
                <span>0000.</span>
                <span>0000.</span>
            </div>
            <div class="table_tr">
                <span>
                    <img src="../../assets/img/home/Saturn.png" alt=""/>
                    木星
                </span>
                <span>21</span>
                <span>0000.</span>
                <span>0000.</span>
                <span>0000.</span>
                <span>0000.</span>
            </div>
        </div>
        <!--购买弹框-->
        <van-popup v-model="showBuy">
            <div class="alertBox">
                <img src="../../assets/img/close.png" alt="" class="closeBtn" @click="showBuy=false"/>
                <div class="title">向[XXX]购买CAC</div>
                <div class="formWrap">
                    <label for="quota" class="labelBox">
                        <span class="labelTitle">限额：</span>
                        <input type="text" id="quota" placeholder="请输入限额">
                        <span class="rightText">CAC</span>
                    </label>
                    <label for="price" class="labelBox">
                        <span class="labelTitle">价格：</span>
                        <input type="text" id="price" placeholder="请输入价格">
                    </label>
                    <label for="num" class="labelBox">
                        <span class="labelTitle">CAC数量：</span>
                        <input type="text" id="num" placeholder="请输入数量">
                        <button>全额</button>
                    </label>
                    <label for="money" class="labelBox">
                        <span class="labelTitle">金额：</span>
                        <input type="text" id="money" placeholder="">
                    </label>
                </div>
                <p class="hint">
                    <span>请输入支付密码</span>
                    <span>提示：匹配后6个小时未打款，自动取消！</span>
                </p>
                <!--密码输入框-->
                <ul class="pwdInput">
                    <li v-for="item in [1,2,3,4,5,6]" :key="item">*</li>
                </ul>
            </div>
        </van-popup>
        <!--发布弹框-->
        <van-popup v-model="showPush">
            <div class="alertBox">
                <img src="../../assets/img/close.png" alt="" class="closeBtn" @click="showPush=false"/>
                <div class="title">向[XXX]购买CAC</div>
                <div class="formWrap">
                    <label for="nowPrice" class="labelBox">
                        <span class="labelTitle">当前价格：</span>
                        <input type="text" id="nowPrice" placeholder="请输入当前价格">
                    </label>
                    <label for="sellPrice" class="labelBox">
                        <span class="labelTitle">出售价格：</span>
                        <input type="text" id="sellPrice" placeholder="请输入出售价格">
                    </label>
                    <label for="pushNum" class="labelBox">
                        <span class="labelTitle">出售数量：</span>
                        <input type="text" id="pushNum" placeholder="请输入数量">
                    </label>
                    <label for="pushMoney" class="labelBox">
                        <span class="labelTitle">购买金额：</span>
                        <input type="text" id="pushMoney" placeholder="">
                    </label>
                </div>
                <button class="pushBtn">发布</button>
                <p class="hint" style="color: rgba(0,0,0,.4)">
                    <span>快速出售小技巧：</span>
                    <span>在交易页面点击“我要出售”直接和求购玩家直接匹配</span>
                </p>
            </div>
        </van-popup>

    </div>
</template>

<script>
    export default {
        name: "home",
        data() {
            return {
                time: 30 * 60 * 60 * 1000,
                showBuy: false,
                showPush: true,
            }
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    #home {
        min-height: 100vh;
        padding: 0 30px 80px;
        background: url("../../assets/img/bg.png") no-repeat center/cover;

        .header {
            display: flex;
            align-items: center;
            padding: 8px 0;
            margin-bottom: 56px;

            .left {
                width: 40px;
                height: 40px;
                margin-right: 12px;
                border-radius: 50%;
                background: #611DE8;
            }

            .logo {
                font-size: 32px;
                font-weight: 600;
                line-height: 45px;
                color: #fff;
            }

            .problemIcon {
                width: 44px;
                height: 44px;
            }
        }

        .topInfo {
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .topInfo_height {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 37px;
                font-size: 26px;
                color: rgba(255, 255, 255, .8);
                text-align: center;

                span {
                    font-size: 36px;
                }
            }

            .topInfo_time {
                margin-bottom: 42px;

                .van-count-down {
                    font-size: 72px;
                    font-weight: 600;
                    line-height: 100px;
                    color: #FFFFFF;
                    text-align: center;
                }

                .item {
                    position: relative;
                    display: inline-block;
                    text-align: center;
                }

                .topInfo_time_text {
                    position: absolute;
                    bottom: -5px;
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: 22px;
                    color: rgba(255, 255, 255, .6);
                    line-height: 30px;
                }
            }

            .topInfo_plan {
                display: flex;
                align-items: center;
                justify-content: space-between;

                span {
                    font-size: 24px;
                    color: rgba(255, 255, 255, 1);
                    margin-right: 20px;
                }

                .topInfo_plan_line {
                    position: relative;
                    flex: 1;
                    height: 20px;
                    border-radius: 10px;
                    overflow: hidden;
                    background: #2C244A;

                    img {
                        position: absolute;
                        left: 0;
                        width: 80%;
                        height: 100%;
                    }
                }
            }
        }

        .coinInfo {
            padding: 40px;
            margin: 36px 0 30px;
            border-radius: 8px;
            background: #2C244A;

            .coinInfo_top_line {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 28px;

                &:last-child {
                    padding-bottom: 18px;
                    border-bottom: 1px solid rgba(255, 255, 255, .2);
                }

                .coinInfo_top_line_imgWrap {
                    display: flex;
                    align-items: center;

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

                .coinInfo_top_line_textWrap {
                    div {
                        margin-bottom: 2px;
                        font-size: 28px;
                        color: rgba(255, 255, 255, .6);

                        span {
                            color: #AB91EF;
                        }
                    }
                }

                button {
                    width: 160px;
                    height: 56px;
                    font-size: 26px;
                    border-radius: 32px;
                    color: #fff;
                    background: linear-gradient(90deg, rgba(167, 63, 226, 1) 0%, rgba(126, 42, 242, 1) 56%, rgba(97, 29, 232, 1) 100%);
                }
            }

            .coinInfo_bottom {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .coinInfo_bottom_left {
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;

                    div {
                        min-width: 50%;
                        margin-bottom: 12px;
                        font-size: 26px;
                        color: rgba(255, 255, 255, .6);

                        &:nth-child(3), &:nth-child(4) {
                            margin-bottom: 0;
                        }

                        span {
                            color: #FFFFFF;
                        }
                    }
                }

                button {
                    min-width: 100px;
                    height: 44px;
                    font-size: 24px;
                    font-weight: 600;
                    line-height: 33px;
                    border-radius: 32px;
                    color: rgba(192, 81, 255, 1);
                    border: 2px solid rgba(192, 81, 255, 1);
                    background: transparent;
                }
            }
        }

        .table {
            padding: 20px 8px;
            border-radius: 8px;
            background: #2C244A;

            .table_tr_title {
                span {
                    font-weight: 600;
                }
            }

            .table_tr, .table_tr_title {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 80px;
                border-bottom: 1px solid rgba(255, 255, 255, .1);

                &:last-child {
                    border: none;
                }

                span {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-wrap: wrap;
                    height: 100%;
                    font-size: 24px;
                    color: #fff;
                    border-right: 1px solid rgba(255, 255, 255, .1);

                    img {
                        width: 44px;
                        height: 44px;
                    }

                    &:nth-child(2) {
                        max-width: 70px;
                        text-align: center;
                    }

                    &:last-child {
                        border: none;
                    }
                }
            }

            .table_tr_title {
                span {
                    font-weight: 600;
                }
            }
        }

        /deep/ .van-popup {
            border-radius: 16px;
            overflow: hidden;
        }

        .alertBox {
            position: relative;
            padding: 58px 20px 40px;
            width: 600px;
            background: rgba(255, 255, 255, 1);
            text-align: center;

            .closeBtn {
                position: absolute;
                top: 24px;
                right: 30px;
                width: 44px;
                height: 44px;
            }

            .title {
                margin-bottom: 50px;
                font-size: 32px;
                font-weight: 600;
                text-align: center;
                color: rgba(0, 0, 0, 1);
            }

            .formWrap {
                width: 100%;
                margin-bottom: 38px;

                .labelBox {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    margin-bottom: 35px;
                    padding-bottom: 16px;
                    padding-right: 20px;
                    border-bottom: 1px solid rgba(0, 0, 0, .2);

                    .labelTitle {
                        display: inline-block;
                        width: 133px;
                        height: 37px;
                        font-size: 26px;
                        text-align: justify;
                        overflow: hidden;
                        color: rgba(0, 0, 0, .4);
                        /*text-align-last: justify;*/

                        &::after {
                            display: inline-block;
                            width: 100%;
                            content: '';
                        }
                    }

                    input {
                        flex: 1;
                        border: none;
                        outline: none;
                        font-size: 26px;
                        color: rgba(0, 0, 0, 1);
                    }

                    button {
                        width: 100px;
                        height: 44px;
                        font-size: 24px;
                        font-weight: 600;
                        border-radius: 32px;
                        color: rgba(192, 81, 255, 1);
                        border: 2px solid rgba(192, 81, 255, 1);
                        background: transparent;
                    }
                }

                .rightText {
                    font-size: 26px;
                    color: rgba(0, 0, 0, .4);
                }
            }

            .hint {
                font-size: 18px;
                color: rgba(0, 0, 0, 1);
                text-align: center;
                margin-bottom: 10px;

                span {
                    display: block;
                    margin-bottom: 5px;

                    &:last-child {
                        margin-bottom: 0;
                    }
                }
            }

            .pwdInput {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 80px;
                border-radius: 2px;
                border: 1px solid rgba(0, 0, 0, 0.4);
                overflow: hidden;

                li {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    font-size: 26px;
                    border-right: 1px solid rgba(0, 0, 0, .2);

                    &:last-child {
                        border: none;
                    }
                }
            }

            .pushBtn {
                width: 240px;
                height: 60px;
                margin-bottom: 12px;
                font-size: 30px;
                color: rgba(255, 255, 255, 1);
                background: linear-gradient(90deg, rgba(167, 63, 226, 1) 0%, rgba(126, 42, 242, 1) 56%, rgba(97, 29, 232, 1) 100%);
                border-radius: 32px;
            }
        }
    }
</style>
