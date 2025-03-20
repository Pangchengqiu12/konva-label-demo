import {
  Pointer,
  Delete,
  RefreshLeft,
  FullScreen,
  ChatLineSquare,
} from '@element-plus/icons-vue';
//查询数据
export const searchFormSchema = [
  {
    label: '任务名称',
    field: 'surveyArea',
    component: 'Input',
    // componentProps: {
    //   api: () => defHttp.get({ url: '/integratequery/getSurveyArea' }),
    //   mode: 'multiple',
    // },
  },
  {
    label: '任务状态',
    field: 'surveyType',
    component: 'Select',
    componentProps: {
      dictCode: 'survey_type',
    },
  },
  {
    label: '时间',
    field: 'obdate',
    component: 'RangePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
];
//标注状态
export const labelOptions = [
  { label: '已标注', value: '0' },
  { label: '未标注', value: '1' },
];
//是否含有物种
export const speciesOptions = [
  { label: '包含物种', value: '0' },
  { label: '不含物种', value: '1' },
];
//数据比标注工具
export const toolsOptions = [
  {
    icon: Pointer,
    title: '移动/选择工具',
    value: 'dragOutlined',
  },
  // {
  //   icon: FullscreenOutlined,
  //   title: '缩放工具',
  //   value: 'fullscreenOutlined',
  // },
  {
    icon: Delete,
    title: '删除选中',
    value: 'deleteOutlined',
  },
  {
    icon: RefreshLeft,
    title: '还原画布大小',
    value: 'undoOutlined',
  },
  {
    icon: FullScreen,
    title: '数据标注',
    value: 'borderOutlined',
  },
  {
    icon: ChatLineSquare,
    title: '键盘快捷键',
    value: 'fileSearchOutlined',
    content: ['添加数据标注：ctrl+空格'],
  },
];
export const columns: any[] = [
  {
    title: '任务名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    width: 200,
    ellipsis: true,
  },
  {
    title: '上传时间',
    dataIndex: 'time',
    key: 'time',
    align: 'center',
    width: 160,
  },
  {
    title: '上传人',
    dataIndex: 'person',
    key: 'person',
    align: 'center',
    width: 100,
    ellipsis: true,
  },
  {
    title: '标注人',
    dataIndex: 'annotatorPerson',
    key: 'person',
    align: 'center',
    width: 100,
    ellipsis: true,
  },
  {
    title: '任务状态',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    width: 100,
  },
  {
    title: '标注数/图片数',
    dataIndex: 'progress',
    key: 'progress',
    align: 'center',
    width: 200,
    ellipsis: true,
  },
  {
    title: '验收状态',
    dataIndex: 'checkStatus',
    key: 'checkStatus',
    align: 'center',
    width: 90,
  },
  {
    title: '省',
    dataIndex: 'province',
    key: 'province',
    align: 'center',
    width: 120,
    ellipsis: true,
  },
  {
    title: '市',
    dataIndex: 'city',
    key: 'city',
    align: 'center',
    width: 150,
    ellipsis: true,
  },
  {
    title: '区',
    dataIndex: 'area',
    key: 'area',
    align: 'center',
    width: 200,
    ellipsis: true,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
    align: 'center',
    width: 200,
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
  },
];

//区间颜色
export const colorList = [
  'rgb(255, 99, 71)', // 红色
  'rgb(50, 205, 50)', // 绿色
  'rgb(30, 144, 255)', // 蓝色
  'rgb(255, 165, 0)', // 橙色
  'rgb(238, 130, 238)', // 紫色
  'rgb(255, 192, 203)', // 粉色
  'rgb(64, 224, 208)', // 青色
  'rgb(218, 165, 32)', // 金色
  'rgb(128, 0, 128)', // 深紫色
  'rgb(0, 128, 0)', // 深绿色
  'rgb(255, 0, 255)', // 洋红
  'rgb(0, 255, 255)', // 青绿
  'rgb(139, 69, 19)', // 棕色
  'rgb(176, 196, 222)', // 浅钢蓝
  'rgb(255, 215, 0)', // 金黄
  'rgb(147, 112, 219)', // 中紫色
  'rgb(60, 179, 113)', // 中海绿
  'rgb(238, 232, 170)', // 淡黄
  'rgb(106, 90, 205)', // 石板蓝
  'rgb(255, 127, 80)', // 珊瑚色
  'rgb(100, 149, 237)', // 矢车菊蓝
  'rgb(189, 183, 107)', // 深卡其布
  'rgb(153, 50, 204)', // 暗兰花紫
  'rgb(72, 209, 204)', // 中绿松石
  'rgb(199, 21, 133)', // 适中的紫罗兰红色
  'rgb(184, 134, 11)', // 深金黄色
  'rgb(32, 178, 170)', // 浅海洋绿
  'rgb(219, 112, 147)', // 浅紫红
  'rgb(0, 206, 209)', // 暗青色
  'rgb(255, 140, 0)', // 深橙色
  'rgb(153, 51, 255)', // 紫罗兰
  'rgb(50, 205, 153)', // 中绿宝石
  'rgb(233, 150, 122)', // 深鲑鱼色
  'rgb(143, 188, 143)', // 深海洋绿
  'rgb(255, 20, 147)', // 深粉色
  'rgb(0, 191, 255)', // 深天蓝
  'rgb(255, 160, 122)', // 浅鲑鱼色
  'rgb(216, 191, 216)', // 蓟色
  'rgb(240, 230, 140)', // 卡其布
  'rgb(70, 130, 180)', // 钢蓝色
  'rgb(210, 105, 30)', // 巧克力色
  'rgb(144, 238, 144)', // 淡绿色
  'rgb(255, 105, 180)', // 热粉红
  'rgb(112, 128, 144)', // 石板灰
  'rgb(255, 218, 185)', // 桃色
  'rgb(176, 224, 230)', // 粉蓝色
  'rgb(95, 158, 160)', // 军校蓝
  'rgb(123, 104, 238)', // 适中的板岩蓝色
  'rgb(75, 0, 130)', // 靛青色
  'rgb(34, 139, 34)', // 森林绿
];
