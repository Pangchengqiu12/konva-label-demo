<template>
  <div class="root">
    <!-- Your component content here -->
    <div class="top">
      <div class="top-left">
        <div class="btns">
          <el-button :disabled="showIndex === 0" @click="onChange(showIndex)"
            >上一张</el-button
          >
          <el-button
            style="margin-left: 26px"
            :disabled="showIndex === previewLsit.length - 1"
            @click="onChange(showIndex + 2)"
            >下一张</el-button
          >
        </div>
      </div>
      <el-button @click="back">返回</el-button>
    </div>
    <div class="content">
      <div class="left">
        <div class="tools">
          <div
            :class="['item', { activate: tool === item.value }]"
            v-for="item in toolsOptions"
            :key="item.value"
            placement="right"
          >
            <div @click="toolHandle(item)">
              <component style="width: 40%" :is="item.icon"></component>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="select" v-if="tool === 'borderOutlined'">
          <el-select
            v-model="label"
            value-key="classId"
            filterable
            placeholder="Select"
            style="width: 240px"
            @change="handleChange"
          >
            <el-option
              v-for="item in options"
              :key="item.classId"
              :label="item.label"
              :value="item"
            />
          </el-select>
        </div>
        <div id="konvaLabel"></div>
        <!-- <Konva /> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { toolsOptions } from '../../data';
import type { ToolsItem } from '../..';
import { useSelect } from '../../hooks/useSelect';
import { useImage } from '../../hooks/useImage';
import { useLabelStore } from '@/store';
const { previewLsit } = toRefs(useLabelStore());
const { showIndex, setShowIndex } = useImage();
const { options } = useSelect();
import { useKonvaLabel } from '../../hooks/useKonvaLabel';
const { label, setTool, tool, draw } = useKonvaLabel();

import _ from 'lodash';

//选择工具
function toolHandle(obj: ToolsItem) {
  setTool(obj.value);
}
//改变当前图片索引
function onChange(val: any) {
  setShowIndexDeb(val - 1);
}
//选择下拉框
function handleChange(value: any) {
  draw(value);
}
const setShowIndexDeb = _.debounce(setShowIndex, 200);
//返回
const router = useRouter();
function back() {
  router.back();
}
</script>

<style scoped lang="scss">
:deep(.ant-input-number-handler-wrap) {
  opacity: 1;
}
.root {
  display: flex;
  flex-direction: column;
  padding: 18px 25px 18px 0px;
  .content {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    margin-top: 14px;
    .right {
      flex: 1;
      background-color: #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      #konvaLabel {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }
      img {
        height: 100%;
      }
      .select {
        position: absolute;
        top: 33px;
        left: 17px;

        background: #ffffff;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08),
          0px 4px 8px 0px rgba(25, 15, 15, 0.07),
          0px 8px 16px 0px rgba(0, 0, 0, 0.03);
        border-radius: 6px;
        z-index: 2;
      }
    }
    .left {
      .tools {
        margin: 6px 19px;
        width: 40px;
        height: 239px;
        background: #ffffff;
        box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.05),
          0px 6px 16px 0px rgba(0, 0, 0, 0.08),
          0px 3px 6px -4px rgba(0, 0, 0, 0.12);
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        .activate {
          color: #1890ff;
        }
        .item {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .item:not(:first-child) {
          border-top: 1px solid rgba(0, 0, 0, 0.05);
        }
      }
    }
  }
  .top {
    display: flex;
    .top-left {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      .slider {
        display: flex;
        align-items: center;
        margin-left: 55px;
        .slider-item {
          width: 200px;
          margin-right: 12px;
        }
      }
    }
  }
}
/* Your styles here */
</style>
