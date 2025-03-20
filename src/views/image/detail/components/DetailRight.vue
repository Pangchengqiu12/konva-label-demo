<template>
  <div class="root">
    <div class="list">
      <div
        :class="['item']"
        :style="{
          backgroundColor:
            config.type === 0 ? 'rgba(131, 190, 254, 0.08)' : colorList[index],
        }"
        v-for="(item, index) in rectList"
        :key="item.id || index"
        @click="createTransformer(item.rect)"
      >
        <div class="left">{{ index + 1 }}</div>
        <div class="right">
          <div class="top">
            <el-select
              v-model="item.label"
              value-key="classId"
              filterable
              placeholder="Select"
              style="width: 240px"
              @change="
                (val:any) => {
                  item.label = val.label;
                  item.classId = val.classId;
                  updateLabelName(item.id, item);
                }
              "
            >
              <el-option
                v-for="item in options"
                :key="item.classId"
                :label="item.label"
                :value="item"
              />
            </el-select>
          </div>
          <div class="bottom">
            <div class="show" @click.stop="isShowHandler(item)"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="setting">
      <a-collapse v-model:activeKey="activeKey" expandIconPosition="end">
        <a-collapse-panel key="1" header="标注属性">
          <div class="title">颜色</div>
          <div class="btns">
            <el-button
              v-for="item in colorTabs"
              :key="item.value"
              :type="config.type === item.value ? 'primary' : 'default'"
              size="small"
              style="margin-right: 26px"
              @click="colorTabHandler(item)"
            >
              {{ item.label }}
            </el-button>
          </div>
          <div class="tab tab1">
            <div class="title">填充透明度</div>
            <div class="slider">
              <el-slider
                v-model="config.fillOpcity"
                :max="100"
                :min="0"
                @change="fillOpcityChange"
              />
            </div>
            <div class="title">选中透明度</div>
            <div class="slider">
              <el-slider
                v-model="config.selectOpcity"
                :max="100"
                :min="0"
                @change="selectOpcityChange"
              />
            </div>
            <div class="borderBox" v-show="config.type === 0">
              <a-radio :checked="config.borderOpcity">填充颜色</a-radio>
              <input type="color" :value="config.color" @change="colorChange" />
            </div>
          </div>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue';
import type { ColorTab } from '../../index.js';
import { useSelect } from '../../hooks/useSelect.js';
import { useLabelConfigStore } from '@/store';
const { config } = toRefs(useLabelConfigStore());
const { setConfig } = useLabelConfigStore();
const { options } = useSelect();
import { useKonvaLabel } from '../../hooks/useKonvaLabel.js';
const {
  updateSelectOpacity,
  updateOpacity,
  updateLabelName,
  updateLabelColor,
  rectList,
  createTransformer,
} = useKonvaLabel();
import _ from 'lodash';
import { colorList } from '../../data.js';

//填充透明度变化
function fillOpcityChange(val: number) {
  setConfig('fillOpcity', val);
  fillOpcityDebounce();
}
//选中透明度变化
function selectOpcityChange(val: number) {
  setConfig('selectOpcity', val);
  selectOpcityDebounce();
}
const selectOpcityDebounce = _.debounce(updateSelectOpacity, 150);
const fillOpcityDebounce = _.debounce(updateOpacity, 150);
const activeKey = ref(['1']); //当前的颜色模式

//标准属性tab
const colorTabs = ref<ColorTab[]>([
  {
    label: '标准',
    value: 0,
  },
  {
    label: '区间',
    value: 1,
  },
]);
//模式切换
function colorTabHandler(obj: ColorTab) {
  setConfig('type', obj.value);
  updateLabelColor();
}
//选择边框颜色
function colorChange(e: any) {
  setConfig('color', e.target.value);
  updateLabelColor();
}
function isShowHandler(obj: any) {
  obj.rect.visible(!obj.rect.visible());
  obj.text.visible(!obj.text.visible());
}
</script>

<style scoped lang="scss">
:deep(.ant-checkbox-group) {
  display: flex;
  flex-direction: column;
}
.root {
  display: flex;
  flex-direction: column;
  padding: 27px 20px;
  .list {
    flex: 1;
    overflow: auto;
    .itemActivate {
      background: rgba(131, 190, 254, 0.2) !important;
    }
    .item {
      display: flex;
      height: 81px;
      background: rgba(131, 190, 254, 0.08);
      border-radius: 8px;
      border: 1px solid rgba(0, 0, 0, 0.15);
      padding-top: 11px;
      margin-bottom: 11px;
      cursor: pointer;
      .left {
        width: 56px;
        font-weight: 400;
        font-size: 14px;
        color: #262626;
        line-height: 20px;
        text-align: center;
      }
      .right {
        flex: 1;

        .top,
        .bottom {
          height: 50%;
          width: 90%;
          display: flex;
          align-items: center;
          justify-content: center;
          > .show {
            cursor: pointer;
          }
        }
      }
    }
  }
  .setting {
    cursor: pointer;
    .tab {
      height: 140px;
      overflow: auto;
    }
    .title {
      font-size: 14px;
      color: #262626;
      margin-bottom: 8px;
    }
    .btns {
      margin-bottom: 8px;
    }
    .slider {
      margin: 0 auto;
      width: 90%;
      height: 19px;
    }
    .borderBox {
      display: flex;
      align-items: center;
      margin-top: 8px;
    }
    input[type='color'] {
      width: 22px;
      height: 22px;
    }
  }
}
.activate {
  :deep(.ant-collapse-header) {
    color: #1566ff;
  }
}
/* Your styles here */
</style>
