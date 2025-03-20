//标注框属性
import { defineStore } from 'pinia';
import { ref } from 'vue';
interface RectStyleConfig {
  fillOpcity?: number; //填充透明度
  selectOpcity?: number; //选中时的透明度
  borderOpcity?: number; //边框的显隐
  color?: string; //边框和填充颜色
  type: 0 | 1; //标注框样式类型,0:标准 1:随机
}
export const useLabelConfigStore = defineStore(
  'LabelConfig',
  () => {
    //标注属性
    const config = ref<RectStyleConfig>({
      fillOpcity: 50, ///透明度
      selectOpcity: 50, //选中透明度
      borderOpcity: 1,
      color: '#FF0000',
      type: 0, //颜色模式
    });
    function setConfig<K extends keyof RectStyleConfig>(key: K, val: RectStyleConfig[K]) {
      config.value[key] = val;
    }
    function resetConfig() {
      config.value = {
        fillOpcity: 50, ///透明度
        selectOpcity: 50, //选中透明度
        borderOpcity: 1,
        color: '#FF0000',
        type: 0, //颜色模式
      };
    }
    return {
      config,
      setConfig,
      resetConfig,
    };
  },
  {
    persist: true,
  }
);
