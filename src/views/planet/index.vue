<!--
 * @Author: liyh
 * @Date: 2020-03-27 09:41:00
 * @LastEditors: liyh
 * @LastEditTime: 2020-03-27 15:37:43
 -->
<template>
  <div class="box">
    <div class="bgimg"></div>
    <div class="top">
      <div class="textBox">
        <div>
          <span>可用:</span> 100 USDT
        </div>
        <div>
          <span>冻结:</span> 100 USDT
        </div>
      </div>
      <div class="chargeBtn">充币</div>
    </div>
    <div v-for="(item,index) in [1,2,3,4,5]" :key="index" class="itemBox">
      <div class="leftBox">
        <div class="itemImg">
          <img src="./../../assets/img/property/Mercury.png" alt />
        </div>
        <div class="itemName">水星</div>
        <div class="itemGold">1200 CAC</div>
      </div>
      <div class="line"></div>
      <div class="rightBox">
        <div class="textBox">
          <div class="rowBox">
            <div>
              <span class="opacityText">产出总量：</span>
              <span class="whiteText">1000 USDT</span>
            </div>
            <div>
              <span class="opacityText">矿机总量：</span>
              <span class="whiteText rightNumber">21台</span>
            </div>
          </div>
          <div class="rowBox">
            <div>
              <span class="opacityText">日产出：</span>
              <span class="whiteText">100 USDT</span>
            </div>
            <div>
              <span class="opacityText">已运行：</span>
              <span class="whiteText rightNumber">21台</span>
            </div>
          </div>
          <div class="rowBox">
            <div>
              <span class="opacityText">分红比例：</span>
              <span class="whiteText">1%</span>
            </div>
            <div>
              <span class="opacityText">排队人数：</span>
              <span class="whiteText rightNumber">36人</span>
            </div>
          </div>
        </div>

        <div class="btnBox">
          <div class="btnItem">购买</div>
          <div class="btnItem">参与排队</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "planet",
  data() {
    return {};
  }
};
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
  width: 53px;
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
        font-size: 30px;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        line-height: 42px;
      }
    }
    .line {
      width: 1px;
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
      }
    }
  }
}
</style>
