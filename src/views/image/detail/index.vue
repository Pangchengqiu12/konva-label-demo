<template>
  <div class="page">
    <DetailLeft class="left" />
    <DetailRight class="right" />
    <!-- Your component content here -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import DetailLeft from './components/DetailLeft.vue';
import DetailRight from './components/DetailRight.vue';
import { useRoute } from 'vue-router';
import { useKonvaLabel } from '../hooks/useKonvaLabel';
import { useImage } from '../hooks/useImage';
const { setDetailId } = useImage();
const { init, destroy } = useKonvaLabel();
const route = useRoute();
onMounted(() => {
  init();
  setDetailId(route.query.id);
});
onBeforeUnmount(() => {
  destroy();
});
</script>

<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 20px 19px;
  display: flex;
  align-items: center;
  overflow: hidden;
  height: 87.9vh;
}
.left,
.right {
  height: 100%;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}
.right {
  width: 316px;
}
.left {
  flex: 1;
  margin-right: 18px;
}
/* Your styles here */
</style>
