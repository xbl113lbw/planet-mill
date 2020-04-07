<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    import {mapActions} from "vuex"

    export default {
        name: "App",
        mounted() {
            this.web3Init();
        },
        methods: {
            ...mapActions(["web3Init"])
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
