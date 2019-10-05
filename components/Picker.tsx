import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import Input from '../components/Input';

export default ({ label, value, onChange, items }) => {
  const selectedItem = items.find(item => item.value === value);

  return (
    <RNPickerSelect
      onValueChange={(value) => onChange(value)}
      items={items}
      placeholder={{}}
    >
      <Input
        label={label}
        editable={false}
        value={selectedItem ? selectedItem.label : ''}
      />
    </RNPickerSelect>
  );
};
