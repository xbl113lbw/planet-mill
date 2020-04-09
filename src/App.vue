<template>
    <div id="app">
        <router-view v-if="showView"/>
    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";

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
                this.getToken();
            })
        },
        computed: {
            ...mapState(["myAccount"])
        },
        methods: {
            // vuex action
            ...mapActions(["web3Init"]),
            // 获取 token
            getToken() {
                let address = this.myAccount;
                let obj = {
                    address: address,
                    invite_address: "",
                };
                this.ajax.post("v1/users", obj).then(res => {
                    if (res.data.code === 200) {
                        let token = res.data.data.token;
                        sessionStorage.setItem("token", token);
                        this.showView = true;
                    }
                })
            },
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
