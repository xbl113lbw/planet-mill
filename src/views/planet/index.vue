<!--
 * @Author: liyh
 * @Date: 2020-03-27 09:41:00
 * @LastEditors: liyh
 * @LastEditTime: 2020-03-27 15:37:43
 -->
<template>
    <div class="box">
        <!-- 导航 -->
        <NavCom title="星球矿机" :showLeft="false"/>
        <div class="bgimg"></div>
        <div class="top">
            <div class="textBox">
                <div>
                    <span>可用:</span> {{parseFloat(userInfo.cac_coin)}} CAC
                </div>
                <div>
                    <span>冻结:</span> {{parseFloat(userInfo.freeze_cac_coin)}} CAC
                </div>
            </div>
            <!--<div class="chargeBtn" @click="recharge">充币</div>-->
        </div>
        <div v-for="(item,index) in listData" :key="index" class="itemBox">
            <div class="leftBox">
                <div class="itemImg">
                    <img :src="require(`../../assets/img/property/${item.name}.png`)" alt/>
                </div>
                <div class="itemName">{{item.name}}</div>
                <div class="itemGold">{{parseInt(item.price)}} CAC</div>
            </div>
            <div class="line"></div>
            <div class="rightBox">
                <div class="textBox">
                    <div class="rowBox">
                        <div>
                            <span class="opacityText">产出总量：</span>
                            <span class="whiteText">{{item.all_num}} USDT</span>
                        </div>
                        <div>
                            <span class="opacityText">矿机总量：</span>
                            <span class="whiteText rightNumber">{{item.machine_num}}台</span>
                        </div>
                    </div>
                    <div class="rowBox">
                        <div>
                            <span class="opacityText">日产出：</span>
                            <span class="whiteText">{{item.miner_proportion*100}} %</span>
                        </div>
                        <div>
                            <span class="opacityText">已运行：</span>
                            <span class="whiteText rightNumber">{{item.running_num}}台</span>
                        </div>
                    </div>
                    <div class="rowBox">
                        <div>
                            <span class="opacityText">分红比例：</span>
                            <span class="whiteText">{{item.proportion * 100}}%</span>
                        </div>
                        <div>
                            <span class="opacityText">排队人数：</span>
                            <span class="whiteText rightNumber">{{item.waiting_num}}人</span>
                        </div>
                    </div>
                    <div class="rowBox">
                        <div>
                            <span class="opacityText">算力：</span>
                            <span class="whiteText">{{slVal(index)}}GH/S</span>
                        </div>
                    </div>
                </div>
                <div class="btnBox">
                    <button class="btnItem"
                            :class="parseInt(item.running_num) >= parseInt(item.machine_num) ? 'disabledBtn' : ''"
                            @click="buy(index+1)"
                            :disabled="parseInt(item.running_num) >= parseInt(item.machine_num)">
                        购买
                    </button>
                    <button class="btnItem"
                            :class="parseInt(item.running_num) >= parseInt(item.machine_num) ? '' : 'disabledBtn'"
                            @click="buy(index+1)"
                            :disabled="parseInt(item.running_num) < parseInt(item.machine_num)">
                        参与排队
                    </button>
                </div>
            </div>
        </div>
        <div class="itemBox">
            <div class="leftBox">
                <div class="itemName" style="width: auto;border: none">{{super_node.name}}</div>
                <div class="itemGold" style="width: auto">{{parseInt(super_node.price)}} CAC</div>
            </div>
            <div class="line"></div>
            <div class="rightBox"
                 style="display: flex;align-items: center;flex-direction: column;justify-content: center;margin-top: 10px;">
                <div class="textBox">
                    <div class="rowBox">
                        <div>
                            <span class="opacityText" style="display: block;width: auto">{{super_node.desc}}</span>
                        </div>
                    </div>
                </div>
                <div class="btnBox">
                    <button class="btnItem" @click="joinEvent">确认参与</button>
                </div>
            </div>
        </div>
        <!--底部-->
        <Tab tabIndex="星球矿机"/>
    </div>
</template>

<script>
    import NavCom from "@/components/nav.vue"
    import Tab from "../../components/tab";
    import {mapActions, mapState} from "vuex";
    import {Dialog, Toast} from "vant";

    export default {
        name: "planet",
        inject: ["reload"],
        components: {
            NavCom,
            Tab
        },
        data() {
            return {
                listData: [],
                super_node: {},
            };
        },
        created() {
            this.getListData();
            this.getUserInfo();
        },
        computed: {
            // vuex state
            ...mapState(["MyContract", "myAccount", "userInfo",])
        },
        methods: {
            ...mapActions(["getUserInfo"]),
            getListData() {
                this.ajax.get("v1/goods").then(res => {
                    if (res.data.code === 200) {
                        this.listData = res.data.data.miners;
                        this.super_node = res.data.data.super_node;
                    }
                })
            },
            buy(index) {
                Dialog.confirm({
                    message: '确认购买么？'
                }).then(() => {
                    this.ajax.get(`v1/goods/${index}/buy`, {good_id: index}).then(res => {
                        if (res.data.code === 200) {
                            Toast("成功");
                            this.reload();
                        }
                    });
                }).catch(() => {
                });
            },
            slVal(index) {
                switch (index) {
                    case 0:
                        return "1";
                    case 1:
                        return "3";
                    case 2:
                        return "9";
                    case 3:
                        return "27";
                    case 4:
                        return "45";
                }
            },
            joinEvent() {
                Dialog.confirm({
                    message: '确认参与么？'
                }).then(() => {
                    this.ajax.get(`v1/super_node`, {}).then(res => {
                        if (res.data.code === 200) {
                            Toast("参与超级节点成功");
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
    .opacityText {
        opacity: 0.6;
        display: inline-block;
        width: 120px;
        text-align-last: justify;
        text-align: justify;
    }

    .whiteText {
        position: relative;
        left: -10px;
    }

    .rightNumber {
        width: 65px;
        display: inline-block;
    }

    .box {
        width: 750px;
        height: 100%;
        position: relative;
        padding: 40px 30px 55px 30px;
        margin: 0 auto;

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
            height: 116px;
            padding: 0 40px;
            font-size: 26px;
            color: white;
            background: #2c244a;
            margin-bottom: 30px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .textBox {
                display: flex;

                & div:first-child {
                    margin-right: 46px;
                }

                & div span {
                    color: #ffffff;
                    opacity: 0.6;
                }
            }

            .chargeBtn {
                width: 100px;
                height: 44px;
                border: 2px solid #c051ff;
                color: #c051ff;
                font-size: 24px;
                border-radius: 32px;
                text-align: center;
                line-height: 44px;
            }
        }

        .itemBox {
            width: 690px;
            background: #2c244a;
            border-radius: 8px;
            margin-bottom: 30px;
            display: flex;
            align-items: center;
            padding: 40px 29px 40px 34px;

            .leftBox {
                display: flex;
                flex-direction: column;
                align-items: center;

                .itemImg {
                    width: 118px;
                    height: 120px;

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

                .itemGold {
                    width: 150px;
                    height: 42px;
                    font-size: 25px;
                    font-weight: 600;
                    color: rgba(255, 255, 255, 1);
                    line-height: 42px;
                }
            }

            .line {
                width: 1px;
                min-width: 1px;
                height: 180px;
                background: rgba(255, 255, 255, 1);
                opacity: 0.2;
                margin-left: 20px;
            }

            .rightBox {
                flex: 1;
                margin-left: 19px;
                align-self: flex-start;

                .textBox {
                    font-size: 24px;
                    color: #ffffff;
                    // display: flex;
                    .rowBox {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 12px;

                        div {
                            white-space: nowrap;
                        }
                    }

                    & .rowBox:nth-child(2) {
                        margin-bottom: 10px;
                    }

                    & .rowBox:last-child {
                        margin-bottom: 0;
                    }
                }

                .btnBox {
                    display: flex;
                    justify-content: space-between;
                    padding: 23px 18px 0 14px;

                    .btnItem {
                        width: 160px;
                        height: 56px;
                        background: linear-gradient(
                                        90deg,
                                        rgba(167, 63, 226, 1) 0%,
                                        rgba(126, 42, 242, 1) 56%,
                                        rgba(97, 29, 232, 1) 100%
                        );
                        border-radius: 32px;
                        font-size: 26px;
                        color: #ffffff;
                        line-height: 56px;
                        text-align: center;
                    }

                    .disabledBtn {
                        background: gray;
                    }
                }
            }
        }
    }
</style>
