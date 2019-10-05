import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Input from '../components/Input';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

export default ({ label, maximumDate, value, onChange }) => {
  const [pickerVisible, setPickerVisible] = useState(false);
  const formattedDate = value ? moment(value).format('dddd DD/MM/YYYY') : '';
  const onConfirm = (date: Date) => {
    onChange(date);
    setPickerVisible(false);
  }

  return (
    <>
      <TouchableOpacity onPress={() => setPickerVisible(true)}>
        <Input
          label={label}
          editable={false}
          value={formattedDate}
        />
      </TouchableOpacity>
      <DateTimePicker
        isVisible={pickerVisible}
        maximumDate={maximumDate}
        titleIOS={label}
        onCancel={() => setPickerVisible(false)}
        onConfirm={onConfirm}
        date={value}
      />
    </>
  );
};
