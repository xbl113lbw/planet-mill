<!--空页面 仅用于想服务器传递交易记录-->
<template>
    <div id="serveIndex"></div>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: "serveIndex",
        created() {
            console.log("serve");
            /*初始化 web3.js*/
            new Promise((res) => {
                this.web3Init(res);
            }).then(() => {
                this.getExchangeData();
            });
        },
        methods: {
            /* Vuex action 分发*/
            ...mapActions([
                "web3Init",
                "getExchangeData",
            ]),
        }
    }
</script>

<style scoped>
    #serveIndex {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 300px;
        background: #fff;
    }
</style>