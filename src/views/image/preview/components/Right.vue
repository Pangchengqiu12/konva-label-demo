<template>
  <div class="root">
    <!-- Your component content here -->
    <div class="back">
      <el-link
        href="https://github.com/Pangchengqiu12/konva-label-demo"
        target="_blank"
      >
        <i class="el-icon" style="font-size: 24px" data-v-b5250014=""
          ><svg
            viewBox="0 0 24 24"
            width="1.2em"
            height="1.2em"
            data-v-b5250014=""
          >
            <path
              fill="currentColor"
              d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.338 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.688c-.1-.25-.45-1.275.1-2.65c0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337c1.912-1.3 2.75-1.024 2.75-1.024c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.562 4.938c.362.312.675.912.675 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z"
            ></path></svg></i
        >项目地址</el-link
      >
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
