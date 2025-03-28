import Konvalabel from 'konva-label';
// import  Konvalabel from '@/utils/konvaLabel/index.ts'
import { useLabelConfigStore } from '@/store';
import { ref, toRefs } from 'vue'; // Import types for Konvalabel
import { colorList } from '../data';
const toRgba = (color: string, alpha: number = 1) => {
  let r, g, b;
  if (color.startsWith('#')) {
    let hex = color.slice(1);
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((x) => x + x)
        .join('');
    }
    [r, g, b] = [0, 2, 4].map((start) =>
      parseInt(hex.slice(start, start + 2), 16)
    );
  } else if (color.startsWith('rgb')) {
    [r, g, b] = color.match(/\d+/g)!.map(Number);
  } else if (color.startsWith('hsl')) {
    const [h, s, l] = color.match(/\d+/g)!.map(Number);
    // 将 HSL 转换为 RGB
    const hue = h / 360;
    const saturation = s / 100;
    const lightness = l / 100;

    if (saturation === 0) {
      r = g = b = Math.round(lightness * 255);
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q =
        lightness < 0.5
          ? lightness * (1 + saturation)
          : lightness + saturation - lightness * saturation;
      const p = 2 * lightness - q;

      r = Math.round(hue2rgb(p, q, hue + 1 / 3) * 255);
      g = Math.round(hue2rgb(p, q, hue) * 255);
      b = Math.round(hue2rgb(p, q, hue - 1 / 3) * 255);
    }
  } else {
    throw new Error('Invalid color format');
  }
  return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, alpha))})`;
};
interface Tools {
  MOVE: 'dragOutlined'; //移动画布
  RESET: 'undoOutlined'; //还原画布
  RECTANGLE: 'borderOutlined'; //绘制矩形
  DELETE: 'deleteOutlined'; //删除选中
}
type ToolsValues = Tools[keyof Tools];

interface LabelInfo {
  label: string; //页面标签名
  classId: number | string;
  color?: string;
}
const rectList = ref<any[]>([]); //标注框列表
const { config } = toRefs(useLabelConfigStore()); //标注属性配置
const konvaLabel = ref<InstanceType<typeof Konvalabel> | null>(null); // Konvalabel实例
const tool = ref<string>('dragOutlined'); // 当前的工具
//KonvaLabel实例的ref，初始值为null
function init() {
  konvaLabel.value = new Konvalabel({
    el: 'konvaLabel',
    onChange,
    labelConfig: {
      fillOpacity: config.value.fillOpcity! / 100, //填充透明度
      selectOpacity: config.value.selectOpcity! / 100, //选中透明度
    },
  });
  window.addEventListener('keydown', ctrlAndSpace);
}
//KonvaLabel实例的回调
function onChange(data: any) {
  rectList.value = [];
  rectList.value = data.data;
  console.log(data);
}
//加载图片
function loadImage(img: HTMLImageElement | string, bboxes: any) {
  if (konvaLabel.value) {
    konvaLabel.value.loadImage(img, bboxes);
  }
}
//重置缩放
function resetZoom() {
  if (konvaLabel.value) {
    konvaLabel.value.resetZoom();
  }
}
// 删除选中的标注框
function deleteSelected() {
  if (konvaLabel.value) {
    konvaLabel.value.deleteSelected();
  }
}
//销毁KonvaLabel实例，移出事件监听
function destroy() {
  if (konvaLabel.value) {
    konvaLabel.value.destroy();
    konvaLabel.value = null;
    window.removeEventListener('keydown', ctrlAndSpace);
  }
  rectList.value = [];
  tool.value = 'dragOutlined';
  label.value = '';
}
//绘制标注框
function draw(obj: LabelInfo) {
  if (konvaLabel.value && label.value) {
    if (config.value.type === 1) {
      obj.color = colorList[rectList.value.length];
    } else {
      obj.color = config.value.color;
    }
    konvaLabel.value.draw(obj);
  }
}
//取消绘制标注框
function cancelDraw() {
  if (konvaLabel.value) {
    konvaLabel.value.cancelDraw();
  }
}
const label = ref<any>(''); // 当前标注的文本
//设置工具
function setTool(val: ToolsValues) {
  switch (val) {
    case 'borderOutlined':
      tool.value = val;
      draw(label.value as LabelInfo);
      break;
    case 'dragOutlined':
      tool.value = val;
      cancelDraw();
      break;
    case 'deleteOutlined':
      deleteSelected();
      break;
    case 'undoOutlined':
      resetZoom();
      break;
  }
}
//快捷键ctrl+space
function ctrlAndSpace(e: any) {
  e.preventDefault();
  if (e.ctrlKey && e.keyCode === 32) {
    //ctrl+空格
    setTool('borderOutlined');
  }
}
//更新透明度
function updateOpacity() {
  if (konvaLabel.value) {
    konvaLabel.value.updateFillOpacity(config.value.fillOpcity! / 100);
  }
}
//更新选中透明度
function updateSelectOpacity() {
  if (konvaLabel.value) {
    konvaLabel.value.updateSelectOpacity(config.value.selectOpcity! / 100);
  }
}
//更新指定标签名
function updateLabelName(id: any, obj: LabelInfo) {
  if (konvaLabel.value) {
    konvaLabel.value.updateLabelName(id, obj);
  }
}
//根据不同模式更新标注框颜色
function updateLabelColor() {
  if (konvaLabel.value) {
    const rects = konvaLabel.value.getAllRect();
    const texts = konvaLabel.value.getAllText();
    if (config.value.type === 0) {
      rects.forEach((item, index) => {
        item.setAttr('stroke', config.value.color);
        item.setAttr(
          'fill',
          toRgba(config.value.color as string, config.value.fillOpcity! / 100)
        );
        texts[index].setAttr('fill', config.value.color);
      });
    } else if (config.value.type === 1) {
      rects.forEach((item, index) => {
        item.setAttr('stroke', colorList[index]);
        item.setAttr(
          'fill',
          toRgba(colorList[index], config.value.fillOpcity! / 100)
        );
        texts[index].setAttr('fill', colorList[index]);
      });
    }
  }
}
//选中标注框
function createTransformer(rect: any) {
  if (konvaLabel.value && rect) {
    konvaLabel.value.createTransformer(rect);
  }
}
export function useKonvaLabel() {
  return {
    konvaLabel,
    tool,
    label,
    rectList,
    createTransformer,
    updateLabelColor,
    draw,
    init,
    updateSelectOpacity,
    destroy,
    setTool,
    deleteSelected,
    cancelDraw,
    resetZoom,
    loadImage,
    updateOpacity,
    updateLabelName,
  };
}
