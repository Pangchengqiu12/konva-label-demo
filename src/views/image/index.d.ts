/**
 * ## 标注工具
 */
export interface ToolsItem {
  icon?: DragOutlinedIconType;
  title?: string;
  value: ToolsValues;
  content?: Array<string>;
}
/**
 * ## 标注属性tab
 */
export interface ColorTab {
  label: string;
  value: 0 | 1;
}
