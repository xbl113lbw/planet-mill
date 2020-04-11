<template>
    <div class="myPerformance">
        <div class="teamNum">
            <span>团队总人数：</span>
            <span>{{myPerformanceData.team_num}}</span>
        </div>
        <!--邀请链接-->
        <!--<div class="invite">
            <div class="invite_url">
                <span>邀请链接：</span>
                <span id="target">{{url}}</span>
            </div>
            <button class="tagRead"
                    @click="copyEvent"
                    data-clipboard-action="copy"
                    data-clipboard-target="#target">复制邀请链接
            </button>
        </div>-->
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
    import {mapState} from "vuex";

    export default {
        name: "myPerformance",
        data() {
            return {
                myPerformanceData: {},
            }
        },
        created() {
            this.getData();

        },
        computed: {
            // vuex state
            ...mapState(["myAccount"])
        },
        methods: {

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
