<template>
    <div class="myPerformance">
        <div class="teamNum">
            <span>团队总人数：</span>
            <span>{{myPerformanceData.team_num}}</span>
        </div>
        <!--邀请链接-->
        <div class="invite">
            <div class="invite_url">
                <span>邀请链接：</span>
                <span id="target">http://www.belewtech.com/?bd_vid=8151767933530422775</span>
            </div>
            <button class="tagRead"
                    @click="copyEvent"
                    data-clipboard-action="copy"
                    data-clipboard-target="#target">复制邀请链接
            </button>
        </div>
        <!--直推人数-->
        <div class="directNum">
            <div class="left">
                <span>直推人数：</span>
                <span>{{myPerformanceData.direct_num}}人</span>
            </div>
            <button @click="$router.push({path:'/directPushDetail',query:{type:0}})">查看详情</button>
        </div>
        <!--间推人数-->
        <div class="indirectNum">
            <div class="left">
                <span>间推人数：</span>
                <span>{{myPerformanceData.indirect_num}}人</span>
            </div>
            <button @click="$router.push({path:'/directPushDetail',query:{type:1}})">查看详情</button>
        </div>
    </div>
</template>

<script>
    import Clipboard from "clipboard"

    export default {
        name: "myPerformance",
        data() {
            return {
                myPerformanceData: {}
            }
        },
        created() {
            this.getData()
        },
        methods: {
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
            getData() {
                this.ajax.get("v1/user/team").then(res => {
                    if (res.data.code === 200) {
                        console.log(res.data);
                        this.myPerformanceData = res.data.data;
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .myPerformance {
        margin-top: 30px;

        .teamNum {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 120px;
            padding: 0 40px;
            margin-bottom: 30px;
            border-radius: 8px;
            background: #2C244A;

            span {
                &:first-child {
                    font-size: 30px;
                    color: rgba(255, 255, 255, .6);
                }

                &:last-child {
                    font-size: 36px;
                    font-weight: 600;
                    color: #fff;
                }
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

        .directNum, .indirectNum {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 40px;
            margin-bottom: 30px;
            border-radius: 8px;
            background: #2C244A;

            .left {
                span {
                    display: block;

                    &:first-child {
                        font-size: 30px;
                        color: rgba(255, 255, 255, .6);
                    }

                    &:last-child {
                        font-size: 44px;
                        font-weight: 600;
                        color: #fff;
                    }
                }
            }

            button {
                width: 160px;
                height: 56px;
                font-size: 26px;
                font-weight: 600;
                border-radius: 28px;
                border: 2px solid rgba(192, 81, 255, 1);
                color: rgba(192, 81, 255, 1);
                background: transparent;
            }
        }
    }
</style>
