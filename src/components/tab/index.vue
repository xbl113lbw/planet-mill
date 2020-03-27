<!--
 * @Author: liyh
 * @Date: 2020-03-27 16:10:29
 * @LastEditors: liyh
 * @LastEditTime: 2020-03-27 18:29:43
 * @描述:底部Tab组件，默认第一个,即tabIndex为0，存在Vuex里面，每次点击通过触发mutations改变vuex里面的tabIndex的值
 -->
<template>
  <div>
    <div class="placeHoderHeight"></div>
    <div class="box">
      <div
        v-for="(item,index) in tabData"
        :key="index"
        class="itemBox"
        @click="changeTabIndex(index,item)"
      >
        <div class="tabIcon">
          <img :src="tabIndex==index?item.selectIcon:item.defaultIcon" alt />
        </div>
        <div :class="[tabIndex!=index ? 'opacityName' : '', 'tabName']">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "tab",
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
          router: "/" //跳转的路由
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
  }
};
</script>

<style lang="scss" scoped>
.box {
  width: 750px;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  padding: 10px 81px 18px 81px;
  background: #000000;
  height: 150px;
  align-items: flex-start;
}
.placeHoderHeight {
  height: 150px;
}
.box_iphoneX {
  width: 750px;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  padding: 10px 81px 18px 81px;
  background: #000000;
  height: 150px;
}
.placeHoderHeight_iphoneX {
  height: 150px;
}
.itemBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .tabIcon {
    width: 48px;
    height: 48px;
    margin-bottom: 5px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .tabName {
    font-size: 18px;
    color: #ffffff;
  }
  .opacityName {
    opacity: 0.6;
  }
}
</style>
