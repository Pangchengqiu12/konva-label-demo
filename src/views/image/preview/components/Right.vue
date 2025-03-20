<template>
  <div class="root">
    <!-- Your component content here -->
    <div class="back">
      <button @click="back">返回</button>
    </div>
    <div class="content">
      <div
        class="item"
        v-for="item in previewLsit"
        :key="item.id"
        @click="handleClick(item)"
      >
        <div class="parent">
          <div class="item-content">
            <div class="imgbox">
              <img :src="item.img" alt="" />
            </div>
            <div class="mask">
              <div class="mast-text">
                <div class="text-item">空片</div>
              </div>
            </div>
            <div class="tag">
              <a-tag color="#F56C6C"> 未鉴定 </a-tag>
            </div>
          </div>
        </div>
      </div>
      <div class="palceholder"></div>
      <div class="palceholder"></div>
      <div class="palceholder"></div>
      <div class="palceholder"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useLabelStore } from '@/store';
const { previewLsit } = toRefs(useLabelStore());

const router = useRouter();
//返回上一页
function back() {
  router.back();
}
//页面跳转
function handleClick(obj: any) {
  router.push({
    path: 'detail',
    query: {
      id: obj.id,
    },
  });
}
</script>

<style scoped lang="scss">
.root {
  display: flex;
  flex-direction: column;
  padding: 18px 25px;
  .content {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .back,
  .page {
    display: flex;
    justify-content: end;
  }
  .back {
    margin-bottom: 16px;
  }
  .page {
    margin-top: 16px;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    align-content: start;
    justify-content: space-between;
    .item {
      width: 24%;
      // width: 370px;
      // height: 253px;
      height: auto;
      margin-bottom: 1%;
      cursor: pointer;
      overflow: hidden;
      .parent {
        width: 100%;
        padding-bottom: 68%;
        overflow: hidden;
        border-radius: 4px;
        position: relative;
      }
      .item-content {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
      .imgbox {
        width: 100%;
        height: 100%;
        overflow: hidden;
        img {
          height: 100%;
        }
      }
      .tag {
        position: absolute;
        z-index: 2;
        top: 6px;
        right: 8px;
      }
      .mask {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding-bottom: 12%;
        background: rgba(11, 11, 11, 0.53);
        z-index: 2;
        .mast-text {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow-x: hidden;
          overflow-y: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          color: #fff;
          font-size: 0.7292vw;
          .text-item {
            margin-bottom: 4px;
            margin-right: 4px;
          }
        }
      }
    }
    .palceholder {
      width: 23%;
      height: 0;
    }
  }
}
/* Your styles here */
</style>
