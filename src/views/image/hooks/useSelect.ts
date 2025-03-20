import { ref } from 'vue';
export function useSelect() {
  const options = ref([
    { value: '鸳鸯', label: '鸳鸯', className: '鸳鸯', classId: 1 },
    { value: '凤头鹰', label: '凤头鹰', className: '凤头鹰', classId: 2 },
    { value: '灰卷尾', label: '灰卷尾', className: '灰卷尾', classId: 3 },
    { value: '八哥', label: '八哥', className: '八哥', classId: 4 },
  ]);
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const handleBlur = () => {
    console.log('blur');
  };
  const handleFocus = () => {
    console.log('focus');
  };
  const filterOption = (input: string, option: any) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
  return {
    options,
    handleBlur,
    handleChange,
    handleFocus,
    filterOption,
  };
}
