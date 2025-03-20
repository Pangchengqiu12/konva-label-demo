import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useLabelStore = defineStore(
  'LabelData',
  () => {
    //任务列表
    const taskList = ref<any[]>([]);
    //预览标注图片列表
    const previewLsit = ref<any[]>([]);
    /**
     * 任务列表赋值
     * @param {any[]} list
     */
    function setTaskList(list: any[]) {
      taskList.value = list;
    }
    /**
     * 预览列表赋值
     * @param {any[]} list
     */
    function setPreviewList(list: any[]) {
      previewLsit.value = list;
    }
    function setPreLoadImage(index: any, image: any) {
      previewLsit.value[index].image = image;
    }
    return {
      taskList,
      setTaskList,
      previewLsit,
      setPreviewList,
      setPreLoadImage,
    };
  },
  {
    persist: true,
  }
);
