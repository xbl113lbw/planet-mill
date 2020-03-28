<template>
    <div id="app">
        <router-view/>
        <Tab :tabIndex="tabIndex" @changeTabIndex="changeTabIndex" :tabData="tabData"/>
    </div>
</template>

<script>
    import Tab from "./components/tab";
    import {mapState, mapMutations} from "vuex";

    export default {
        name: "App",
        data() {
            return {
                tabData: [
                    {
                        name: "首页", //tab名称
                        defaultIcon: require("@/assets/img/tab/home.png"), //默认图片
                        selectIcon: require("@/assets/img/tab/home_A.png"), //选择图片
                        router: "/" //跳转的路由
                    },
                    {
                        name: "星球矿机", //tab名称
                        defaultIcon: require("@/assets/img/tab/deal.png"), //默认图片
                        selectIcon: require("@/assets/img/tab/deal_A.png"), //选择图片
                        router: "/planet" //跳转的路由
                    },
                    {
                        name: "交易", //tab名称
                        defaultIcon: require("@/assets/img/tab/mill.png"), //默认图片
                        selectIcon: require("@/assets/img/tab/mill_A.png"), //选择图片
                        router: "/deal" //跳转的路由
                    },
                    {
                        name: "资产", //tab名称
                        defaultIcon: require("@/assets/img/tab/property.png"), //默认图片
                        selectIcon: require("@/assets/img/tab/home_A.png"), //选择图片
                        router: "/property" //跳转的路由
                    }
                ]
            };
        },
        mounted() {
            //获取当前hash值，并去掉#符号
            let currentHash = window.location.hash.substr(
                1,
                window.location.hash.length
            );
            //匹配当前路由的tabIndex是几。默认是0即第一个，但是可能不一定从首页进来
            let currentIndex = this.tabData.findIndex(
                item => item.router == currentHash
            );
            this.changeTabIndexAction(currentIndex > -1 ? currentIndex : 0);
        },
        computed: {
            ...mapState({
                tabIndex: state => state.tabIndex //获取tabIndex
            })
        },
        methods: {
            ...mapMutations({
                changeTabIndexAction: "changeTabIndex" // 将 `this.changeTabIndexAction()` 映射为 `this.$store.commit('changeTabIndexAction')`
            }),
            changeTabIndex(index, item) {
                if (window.location.hash == `#${item.router}`) return; //当前路由相等，不做其他操作
                this.changeTabIndexAction(index); //触发mutation修改tabIndex的值为当前点击的值
                this.$router.replace({
                    path: item.router
                });
            }
        },
        components: {
            Tab
        }
    };
</script>

<style lang="scss">
    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    a {
        text-decoration: none;
    }

    ul,
    li {
        list-style: none;
    }

    button {
        outline: none;
        border: none;
    }
</style>
