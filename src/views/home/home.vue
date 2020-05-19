<template>
    <div id="home">
        <van-pull-refresh
                v-model="isLoading"
                success-text="刷新成功"
                @refresh="onRefresh">
            <!--头部-->
            <div class="header">
                <div class="logo"><img src="../../assets/img/首页LOGO.png"/></div>
                <img src="../../assets/img/home/problemIcon.png" class="problemIcon" alt=""
                     @click="$router.push({path:'/rule'})"/>
                <span class="right">
                    <img :src="require(`@/assets/img/rankIcon/icon${userInfo.rank}.png`)" alt=""
                         v-if="userInfo.rank > 0">
                    邀请码：{{userInfo.invite_code}}
                </span>
            </div>
            <!--公告-->
            <van-notice-bar :text="homeData.content" left-icon="volume-o"
                            background="transparent" color="#fff" @click="showAll"/>
            <!--顶部信息展示-->
            <div class="topInfo">
                <div class="topInfo_height">
                    区块高度：
                    <span>{{homeData.block_num}}</span>
                </div>
                <div class="topInfo_time">
                    <van-count-down :time="time" ref="countDown">
                        <template v-slot="timeData">
                        <span class="item">
                            {{timeData.minutes}}
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
                    <span>目前进度 {{homeData.progress}}</span>
                    <div class="topInfo_plan_line">
                        <img src="../../assets/img/home/plan_A.png" alt="" :style="{width:homeData.progress}"/>
                    </div>
                </div>
            </div>
            <!--货币信息-->
            <div class="coinInfo">
                <div class="coinInfo_top_line">
                    <div class="coinInfo_top_line_imgWrap">
                        <img src="../../assets/img/home/usdt.png" alt=""/>
                        <span>100 USDT</span>
                        <span>10 CAC</span>
                    </div>
                    <button @click="start" :class="btnFlag ? 'disabledBtn' : ''" :disabled="btnFlag">参与碰撞</button>
                </div>
                <!--排队人数-->
                <div class="coinInfo_top_line">
                    <div class="coinInfo_top_line_textWrap">
                        <div>当前排队人数：<span>{{homeData.total_wait_num}}</span></div>
                        <div>
                            排队中：
                            <ul v-if="homeData.waiting_nums.length">
                                <li v-for="(item,index) in homeData.waiting_nums" :key="index">
                                    {{item}}
                                </li>
                            </ul>
                            <span v-else>0</span>
                        </div>
                    </div>
                    <button @click="start" :class="btnFlag ? '' : 'disabledBtn'" :disabled="!btnFlag">碰撞预排</button>
                </div>
                <!--钱包数据-->
                <div class="coinInfo_bottom_wrap">
                    <p style="color: rgba(255, 255, 255, 0.6);font-size: 15px;margin-bottom: 5px;">我的钱包</p>
                    <div class="coinInfo_bottom">
                        <div class="coinInfo_bottom_left">
                            <div>
                                可用：
                                <span>{{parseFloat(homeData.user.usdt_coin)}} USDT</span>
                            </div>
                            <div>
                                冻结：
                                <span>{{parseFloat(homeData.user.freeze_usdt_coin)}} USDT</span>
                            </div>
                            <div>
                                可用：
                                <span>{{parseFloat(homeData.user.cac_coin)}} CAC</span>
                            </div>
                            <div>
                                冻结：
                                <span>{{parseFloat(homeData.user.freeze_cac_coin)}} CAC</span>
                            </div>
                        </div>
                        <div class="coinInfo_bottom_right">
                            <div>
                                <button @click="recharge('usdt')">充币</button>
                                <button @click="hzEvent('usdt',1)">划转</button>
                            </div>
                            <div>
                                <button @click="recharge('cac')">充币</button>
                                <button @click="hzEvent('cac',1)">划转</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="coinInfo_bottom_wrap">
                    <p style="color: rgba(255, 255, 255, 0.6);font-size: 15px;margin-bottom: 5px;">碰撞钱包</p>
                    <div class="coinInfo_bottom">
                        <div class="coinInfo_bottom_left">
                            <div>
                                可用：
                                <span>0 USDT</span>
                            </div>
                            <div></div>
                            <div>
                                可用：
                                <span>0 CAC</span>
                            </div>
                            <div></div>
                        </div>
                        <div class="coinInfo_bottom_right">
                            <button @click="hzEvent('usdt',3)">划转</button>
                        </div>
                    </div>
                </div>
                <div class="coinInfo_bottom_wrap" v-if="userInfo.is_miner_wallet">
                    <p style="color: rgba(255, 255, 255, 0.6);font-size: 15px;margin-bottom: 5px;">矿机钱包</p>
                    <div class="coinInfo_bottom">
                        <div class="coinInfo_bottom_left">
                            <div>
                                可用：
                                <span>{{parseFloat(homeData.mimer_wallet.usdt_coin)}} USDT</span>
                            </div>
                            <div></div>
                            <div>
                                可用：
                                <span>{{parseFloat(homeData.mimer_wallet.cac_coin)}} CAC</span>
                            </div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
            <!--邀请链接-->
            <div class="invite" v-if="homeData.user.first_game>0">
                <div class="invite_url">
                    <span>邀请链接：</span>
                    <span>{{url}}</span>
                </div>
                <input id="target" v-model="url" style="opacity: 0;position: absolute;z-index: -1" readonly>
                <button class="tagRead"
                        @click="copyEvent"
                        data-clipboard-target="#target">复制邀请链接
                </button>
            </div>
            <!--表格-->
            <div>
                <p class="table_title">矿机数据</p>
                <div class="table" v-if="tableData.length">
                    <div class="table_tr table_tr_title">
                        <span>矿机类型</span>
                        <span>矿机数量</span>
                        <span>分红奖池(USDT)</span>
                        <span>矿池(USDT)</span>
                        <span>矿机奖励(USDT)</span>
                    </div>
                    <div class="table_tr" v-for="(item,index) in tableData" :key="index">
                        <span>
                            <img :src="require(`../../assets/img/property/${item.name}.png`)" alt=""/>
                            {{item.name}}
                        </span>
                        <span>{{item.number}}</span>
                        <span>{{item.bonus_pool}}</span>
                        <span>{{item.miner_pool}}</span>
                        <span>{{(parseFloat(item.miner_reward) + parseFloat(item.bonus_reward)).toFixed(4)}}</span>
                    </div>
                </div>
            </div>
            <div>
                <p class="table_title">星球荣耀</p>
                <div class="table">
                    <div class="table_tr table_two_tr">
                        <span>级别</span>
                        <span>人数</span>
                        <span>总分红（USDT）</span>
                        <span>我的分红（USDT）</span>
                    </div>
                    <div class="table_tr table_two_tr" v-for="(item,index) in ranks" :key="index">
                        <span>
                            <img :src="require(`@/assets/img/rankIcon/icon${index+1}.png`)" alt="">
                            {{item.name}}
                        </span>
                        <span>{{item.user_num}}</span>
                        <span>{{item.total_amount}}</span>
                        <span>{{item.amount}}</span>
                    </div>
                </div>
            </div>
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
                            <input type="text" id="sellPrice" placeholder=""
                                   style="max-width: 70px;" value="0.062">
                            <div class="price_slider">
                                <span class="price_slider_val">{{sellPrice}}%</span>
                                <van-slider v-model="sellPrice" bar-height="4px" active-color="#AB91EF"
                                            inactive-color="#AB91EF">
                                    <div slot="button" class="custom-button">
                                        <img src="../../assets/img/releaseOrder/slider.png"/>
                                    </div>
                                </van-slider>
                            </div>
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
            <!--充币弹框-->
            <van-dialog v-model="rechargeShow"
                        title="请输入充值数量"
                        show-cancel-button
                        confirmButtonColor="#2C244A"
                        @confirm="submit"
                        class="recharge">
                <div class="rechargeBox">
                    <van-stepper v-model="rechargeValue" input-width="50%" button-size="32px"/>
                </div>
            </van-dialog>
            <!--划转弹框-->
            <van-dialog v-model="hzShow"
                        title="请输入划转至矿机钱包数量"
                        show-cancel-button
                        confirmButtonColor="#2C244A"
                        @confirm="hzSubmit"
                        class="recharge">
                <div class="rechargeBox">
                    <van-stepper v-model="hzValue" input-width="50%" button-size="32px"/>
                </div>
            </van-dialog>
            <!--参与弹框-->
            <van-dialog v-model="joinShow"
                        title="请选择参与的钱包"
                        show-cancel-button
                        confirmButtonColor="#2C244A"
                        @confirm="joinEvent"
                        class="recharge">
                <div class="rechargeBox">
                    <van-radio-group v-model="radio">
                        <van-radio name="1" checked-color="#2C244A">我的钱包</van-radio>
                        <!--<van-radio name="3" checked-color="#2C244A">碰撞钱包</van-radio>-->
                        <van-radio name="2" checked-color="#2C244A">矿机钱包</van-radio>
                    </van-radio-group>
                </div>
            </van-dialog>
        </van-pull-refresh>
        <!--底部-->
        <Tab tabIndex="首页"/>
    </div>
</template>

<script>
    import Tab from "../../components/tab";
    import {mapState, mapActions} from "vuex";
    import Clipboard from "clipboard";
    import {Dialog, Toast} from "vant";

    export default {
        name: "home",
        components: {
            Tab
        },
        inject: ["reload"],
        data() {
            return {
                showBuy: false,
                showPush: false,
                rechargeShow: false,
                sellPrice: 50,
                time: null,
                homeData: {
                    user: {},
                    waiting_nums: [],
                    mimer_wallet: {}
                },
                tableData: [],
                ranks: [],
                finishFlag: true,
                t: null,
                rechargeValue: 1,
                coinType: "",
                isLoading: false,
                hzShow: false,
                hzValue: 1,
                coin_type: null,
                wallet_type: null,
                joinShow: false,
                radio: "1",
            }
        },
        async mounted() {
            await this.getHomeData();
            // 获取货币余额
            await this.getUserInfo();
        },
        computed: {
            // vuex state
            ...mapState(["myAccount", "usdtContract", "MyContract", "userInfo", "web3"]),
            btnFlag() {
                return this.homeData.progress === "100%";
            },
            url() {
                return `${window.location.host}/#/register?aid=${this.userInfo.invite_code}`;
            }
        },
        methods: {
            ...mapActions(["getUserInfo"]),
            // 获取首页数据
            async getHomeData() {
                await this.ajax.get("v1/index").then(res => {
                    if (res.data.code === 200) {
                        this.homeData = res.data.data;
                        this.tableData = this.homeData.machines;
                        this.ranks = this.homeData.ranks;
                        this.time = res.data.data.time * 1000;
                        this.t = setInterval(() => {
                            this.time -= 1000;
                            if (this.time <= 0) {
                                this.time = 0;
                                clearInterval(this.t);
                                setTimeout(() => {
                                    this.getHomeData();
                                }, 100)
                            }
                        }, 1000);
                    }
                })
            },
            recharge(type) {
                this.rechargeShow = true;
                this.coinType = type;
                this.rechargeValue = 1;
            },
            submit() {
                // 根据类型 切换合约
                let Contract, rechargeValue;
                if (this.coinType === "usdt") {
                    Contract = this.usdtContract;
                    rechargeValue = this.rechargeValue * 1000000;
                } else {
                    Contract = this.MyContract;
                    rechargeValue = this.web3.utils.toWei(String(this.rechargeValue), "ether");
                }
                Contract.methods.transfer(this.userInfo.recharge_address, rechargeValue).send({
                    from: this.myAccount
                }).then(() => {
                });
            },
            /*复制功能*/
            copyEvent() {
                let clipboard = new Clipboard(".tagRead");
                clipboard.on("success", (e) => {
                    this.$toast('复制成功');
                    e.clearSelection();
                });
                clipboard.on("error", (e) => {
                    // 不支持复制
                    this.$toast("暂不支持复制功能");
                    e.clearSelection();
                });
            },
            start() {
                if (this.userInfo.is_miner_wallet) {
                    this.joinShow = true;
                    return
                }
                Dialog.confirm({
                    message: '确认参与么？'
                }).then(() => {
                    if (this.homeData.user.usdt_coin < 100) {
                        Toast("USDT余额不足");
                        return
                    }
                    this.ajax.get("v1/user/collide", {}).then(res => {
                        if (res.data.code === 200) {
                            Toast("成功");
                            setTimeout(() => {
                                this.reload();
                            }, 1000);
                        }
                    });
                }).catch(() => {
                });
            },
            onRefresh() {
                setTimeout(() => {
                    this.isLoading = false;
                    this.reload();
                }, 1000);
            },
            showAll() {
                this.$dialog(
                    {
                        message: this.homeData.content,
                        messageAlign: "left"
                    }
                );
            },
            // 划转功能
            hzEvent(coin_type, wallet_type) {
                if (wallet_type === 3 || !this.userInfo.is_miner_wallet) {
                    this.$toast({
                        message: "功能暂未开放",
                        duration: 3000
                    });
                    return
                }
                this.coin_type = coin_type;
                this.wallet_type = wallet_type; // 1我得钱包，2矿机钱包，3碰撞钱包
                this.hzShow = true;
            },
            hzSubmit() {
                let data = {
                    number: this.hzValue,
                    coin_type: this.coin_type,
                    // wallet_type: this.wallet_type,
                    wallet_type: 2,
                };
                this.ajax.post("v1/transfer", data).then(res => {
                    let that = this;
                    if (res.data.code === 200) {
                        console.log(res);
                        this.$toast({
                            message: res.data.message,
                            duration: 2500,
                            onClose() {
                                that.reload();
                            }
                        });
                    }
                    this.hzShow = false;
                    this.hzValue = 1;
                })
            },
            joinEvent() {
                this.ajax.get(`v1/user/collide/wallet_type/${this.radio}`).then(res => {
                    let that = this;
                    if (res.data.code === 200) {
                        this.$toast({
                            message: "碰撞成功",
                            duration: 2500,
                            onClose() {
                                that.reload();
                            }
                        });
                    }
                });
            }
        },
        beforeDestroy() {
            clearInterval(this.t);
        }
    }
</script>

<style lang="scss" scoped>
    #home {
        min-height: 100vh;
        padding: 0 30px 80px;
        background: url("../../assets/img/bg.png") no-repeat center/cover;

        .van-radio {
            margin-bottom: 10px;
        }

        .header {
            position: relative;
            display: flex;
            align-items: center;
            padding: 40px 0 20px;

            .right {
                display: flex;
                align-items: center;
                position: absolute;
                right: 0;
                font-size: 24px;
                color: #fff;

                img {
                    width: 40px;
                    height: 40px;
                    margin-right: 10px;
                }
            }

            .logo {
                img {
                    width: 340px;
                    height: 85px;
                }
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
            margin-top: 20px;

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
                padding-bottom: 20px;
                border-bottom: 1px solid #fff;
                margin-bottom: 20px;

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
                        display: block;
                        margin-right: 20px;
                        font-size: 36px;
                        font-weight: 600;
                        color: rgba(255, 255, 255, 1);
                    }
                }

                .coinInfo_top_line_textWrap {
                    div {
                        display: flex;
                        margin-bottom: 5px;
                        font-size: 28px;
                        color: rgba(255, 255, 255, .6);

                        ul {
                            max-width: 300px;
                            overflow-x: auto;
                            white-space: nowrap;

                            &::-webkit-scrollbar {
                                display: none;
                            }

                            li {
                                display: inline-block;
                                width: 40px;
                                height: 40px;
                                line-height: 40px;
                                margin-right: 10px;
                                border-radius: 50%;
                                text-align: center;
                                border: 1px solid #AB91EF;
                                color: #AB91EF;
                            }
                        }

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

                .disabledBtn {
                    background: gray;
                }
            }

            .coinInfo_bottom_wrap {
                padding-bottom: 20px;
                margin-bottom: 20px;
                border-bottom: 1px solid #fff;
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
                        min-width: 40%;
                        /*max-width: 50%;*/
                        margin-bottom: 12px;
                        font-size: 20px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        color: rgba(255, 255, 255, .6);

                        &:nth-child(3), &:nth-child(4) {
                            margin-bottom: 0;
                        }

                        span {
                            color: #FFFFFF;
                        }
                    }
                }

                .coinInfo_bottom_right {
                    div {
                        display: flex;
                    }

                    button {
                        min-width: 100px;
                        height: 40px;
                        margin-bottom: 10px;
                        margin-right: 10px;
                        font-size: 24px;
                        font-weight: 600;
                        border-radius: 32px;
                        color: rgba(192, 81, 255, 1);
                        border: 2px solid rgba(192, 81, 255, 1);
                        background: transparent;

                        &:last-child {
                            margin-bottom: 0;
                            margin-right: 0;
                        }
                    }
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
                    text-align: center;
                    flex-wrap: wrap;
                    height: 100%;
                    font-size: 24px;
                    color: #fff;
                    border-right: 1px solid rgba(255, 255, 255, .1);

                    img {
                        width: 44px;
                        height: 44px;
                        margin-right: 10px;
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

        .price_slider {
            position: relative;
            width: 250px;

            .price_slider_val {
                position: absolute;
                left: 20px;
                top: -35px;
                display: block;
                font-size: 20px;
                color: rgba(0, 0, 0, .6);
            }

            .custom-button {
                img {
                    height: 32px;
                    width: 32px;
                    display: flex;
                    justify-content: center;
                }
            }
        }

        /deep/ .recharge {
            .rechargeBox {
                margin: 30px;
                text-align: center;
            }
        }

        .invite {
            padding: 40px;
            margin-bottom: 30px;
            border-radius: 8px;
            text-align: center;
            background: #2C244A;

            .invite_url {
                display: flex;
                align-items: flex-start;
                margin-bottom: 30px;
                text-align: left;

                span {
                    &:first-child {
                        word-break: keep-all;
                        margin-right: 10px;
                        font-size: 26px;
                        color: rgba(255, 255, 255, .6);
                    }

                    &:last-child {
                        font-size: 26px;
                        word-break: break-all;
                        color: #fff;
                    }
                }
            }

            button {
                width: 280px;
                height: 60px;
                font-size: 30px;
                color: rgba(255, 255, 255, 1);
                border-radius: 32px;
                background: linear-gradient(90deg, rgba(167, 63, 226, 1) 0%, rgba(126, 42, 242, 1) 56%, rgba(97, 29, 232, 1) 100%);
            }
        }

        .table_two_tr {
            span {
                &:nth-child(2) {
                    max-width: 100% !important;
                    text-align: center;
                }
            }
        }

        .table_title {
            display: flex;
            justify-content: space-between;
            margin: 30px 0;
            color: #fff;
            font-size: 30px;
        }
    }
</style>
