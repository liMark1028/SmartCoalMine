<!--
 * @Author: liyumo
 * @Date: 2025-04-14 09:18:49
 * @LastEditors: li yu mo
 * @LastEditTime: 2025-04-18 09:23:10
 * @FilePath: \ahla-tkxt-web\src\views\MainWindow\production\overview\index.vue
 * @Description: 矿区概况
 * 
 *  
-->

<template>
  <div class="overview">
    <div class="header"></div>
    <div class="content">
      <div class="content_l">
        <div class="img">
          <img src="@/assets/image/production/overview/mine_indent.png" />
        </div>
        <div class="mine min_one">
          <div class="min_t">矿区面积</div>
          <div><span class="numb_one">3.93</span><span class="ten">平方公里</span></div>
        </div>
        <div class="mine min_two">
          <div class="min_t">开采深度</div>
          <div><span class="numb_two">-1200</span><span class="ten">米</span></div>
        </div>
        <div class="mine min_two">
          <div class="min_t">安全生产天数</div>
          <div><span class="numb_three">972</span><span class="ten">天</span></div>
        </div>
      </div>
      <div class="content_r">
        <div class="resource resource_one">
          <div class="resource_t">资源储存</div>
          <div><span class="numb_one">28235.78</span><span class="ten">万吨</span></div>
        </div>
        <div class="resource resource_two">
          <div class="resource_t">总开采量</div>
          <div><span class="numb_two">242</span><span class="ten">万吨</span></div>
        </div>
        <div class="resource resource_three">
          <div class="resource_t">当月开采</div>
          <div><span class="numb_three">25.6</span><span class="ten">万吨</span></div>
        </div>
        <div class="resource resource_four">
          <div class="resource_t">框体厚度</div>
          <div><span class="numb_four">60</span><span class="ten">米</span></div>
        </div>
        <div class="resource resource_five">
          <div class="resource_t">设计能力</div>
          <div><span class="numb_five">500</span><span class="ten">万吨/年</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.overview {
  height: 263px;
  .header {
    height: 39px;
    background: url('@/assets/image/production/overview/subheading.png') no-repeat;
    background-size: 100% 100%;
    z-index: 1;
  }
  .content {
    height: 224px;
    background: url('@/assets/image/production/overview/content_bg.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-around;
    font-size: 14px;

    color: #fff;
    .content_l {
      width: 204px;
      display: flex;
      flex-direction: column;

      .img {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: -8px;
        margin-bottom: 4px;
        img {
          width: 89px;
          height: 106px;
        }
      }
      .mine {
        width: 206px;
        display: flex;
        height: 35px;
        align-items: center;
        .min_t {
          margin-left: 15px;
        }
        .numb_one {
          font-size: 18px;
          color: #91d4ff;
        }
        .numb_two {
          font-size: 18px;
          color: #eed07e;
        }
        .numb_three {
          font-size: 18px;
          color: #9fdc9b;
        }
        .ten {
          margin: 0 5px;
        }
      }
      .min_one {
        height: 35px;
        background: url('@/assets/image/production/overview/mine_bg.png') no-repeat;
        margin-left: 15px;
      }
      .min_two {
        justify-content: space-between;
        margin-top: 5px;
        background: url('@/assets/image/production/overview/text_box.png') no-repeat;
      }
    }
    .content_r {
      width: 212px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      .resource {
        width: 212px;
        height: 37px;
        line-height: 41px;
        display: flex;
        justify-content: space-between;
        .resource_t {
          margin-left: 30px;
        }
        .numb_one {
          font-size: 18px;
          color: #eed07e;
        }
        .numb_two {
          font-size: 18px;
          color: #9fdc9b;
        }
        .numb_three {
          font-size: 18px;
          color: #a7e7ff;
        }
        .numb_four {
          font-size: 18px;
          color: #ea8c5b;
        }
        .numb_five {
          font-size: 18px;
          color: #a7e7ff;
        }
        .ten {
          margin: 0 5px;
        }
      }
      .resource_one {
        background: url('@/assets/image/production/overview/resource.png') no-repeat;
      }
      .resource_two {
        background: url('@/assets/image/production/overview/sum_mine.png') no-repeat;
      }
      .resource_three {
        background: url('@/assets/image/production/overview/persent.png') no-repeat;
      }
      .resource_four {
        width: 206px;
        height: 35px;
        line-height: 35px;
        background: url('@/assets/image/production/overview/text_box.png') no-repeat;
        .resource_t {
          margin-left: 15px;
        }
      }
      .resource_five {
        width: 206px;
        height: 35px;
        line-height: 35px;
        background: url('@/assets/image/production/overview/text_box.png') no-repeat;
        .resource_t {
          margin-left: 15px;
        }
      }
    }
  }
}
</style>
