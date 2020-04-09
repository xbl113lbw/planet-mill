<template>
    <div id="app">
        <router-view v-if="showView"/>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "App",
        data() {
            return {
                showView: false
            }
        },
        provide() {
            return {
                reload: this.reload
            }
        },
        created() {
            // 初始化 web3
            new Promise(res => {
                this.web3Init(res);
            }).then(() => {
                this.showView = true;
            })
        },
        methods: {
            // vuex action
            ...mapActions(["web3Init"]),
            reload() {
                this.showView = false;
                this.$nextTick().then(() => {
                    this.showView = true;
                })
            }
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
