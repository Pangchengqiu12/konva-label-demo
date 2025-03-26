<template>
  <div class="page">
    <!-- <Left class="left" /> -->
    <Right class="right" />
    <!-- Your component content here -->
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
// import Left from './components/Left.vue';
import Right from './components/Right.vue';
import { useLabelStore } from '@/store';
const { setPreviewList } = useLabelStore();
async function getPreivew() {
  // let res = await getPreivewApi({});
  setPreviewList([
    {
      id: '1',
      img: '/images/八哥.jpg',
      data: [],
    },
    {
      id: '3',
      img: '/images/白鹭9.jpg',
      data: [],
    },
    {
      id: '5',
      img: '/images/白头鹎1.jpg',
      data: [],
    },
  ]);
}
onMounted(() => {
  getPreivew();
});
</script>

<style scoped lang="scss">
.page {
  flex: 1;
  width: 100%;
  height: 87.9vh;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 20px 19px;
  display: flex;
  align-items: center;
}
.left,
.right {
  height: 100%;
  background-color: #fff;
  border-radius: 8px;
}
.left {
  width: 217px;
}
.right {
  flex: 1;
  margin-left: 18px;
}
/* Your styles here */
</style>
