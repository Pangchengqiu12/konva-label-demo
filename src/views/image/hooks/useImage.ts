import { ref, toRefs } from 'vue';
// import { useVueKonva } from './useVueKonva.js';
// const { loadImage, reset } = useVueKonva();
import { useKonvaLabel } from './useKonvaLabel';
const { loadImage } = useKonvaLabel(); // Assuming you have a utility for Vue Konva

import { useLabelStore } from '@/store';

const { setPreLoadImage } = useLabelStore();
const { previewLsit } = toRefs(useLabelStore());

const selectedTaskId = ref('');
const detailId = ref(''); //当前标注数据的的id
const showIndex = ref(-1); //当前标注数据的下标

export function useImage() {
  function setSelectedTaskId(val: any) {
    selectedTaskId.value = val;
  }
  /**
   * 设置当前标注的id
   * @param {string | number} val
   */
  function setDetailId(val: any) {
    detailId.value = val;
    const findindex = previewLsit.value.findIndex((i) => i.id === val);
    showIndex.value = findindex;
    preloadImages();
  }
  /**
   * 设置当前标注的下标
   * @param {string | number} val
   */
  function setShowIndex(val: any) {
    showIndex.value = val;
    detailId.value = previewLsit.value[val].id;
    window.history.replaceState(
      null,
      '',
      `${window.location.pathname}?id=${detailId.value}`
    );
    preloadImages();
  }
  /**
   * 加载图片
   */
  async function preloadImages() {
    //判断当前图片是否缓存，如果没有则加载图片缓存
    if (
      !previewLsit.value[showIndex.value].image ||
      !(previewLsit.value[showIndex.value].image instanceof HTMLImageElement)
    ) {
      const offset =
        showIndex.value + 10 > previewLsit.value.length - 1
          ? previewLsit.value.length
          : showIndex.value + 10;
      for (let i = showIndex.value; i < offset; i++) {
        const item = previewLsit.value[i];
        let image;
        //判断当前图片是否有缓存，如果有直接读取缓存，如果没有则加载图片
        if (item.image && item.image instanceof HTMLImageElement) {
          image = item.image;
          // item.image = image;
        } else {
          image = await imageOnLoad(item.img);
          setPreLoadImage(i, image);
        }
      }
    }
    loadImage(previewLsit.value[showIndex.value].image, []);
  }
  /**
   * 创建图片缓存
   * @param {string} url 图片地址
   */
  function imageOnLoad(url: any) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        resolve(img);
      };
      img.onerror = (error) => {
        reject(new Error(`图片加载失败${url}: ${JSON.stringify(error)}`));
      };
    });
  }
  return {
    showIndex,
    setShowIndex,
    detailId,
    setDetailId,
    setSelectedTaskId,
  };
}
