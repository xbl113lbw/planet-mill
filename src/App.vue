<template>
  <div id="app">
    <router-view />
    <Tab></Tab>
  </div>
</template>

<script>
import Tab from "./components/tab";
export default {
  name: "App",
  components: {
    Tab
  },
  mounted() {}
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
</style>
