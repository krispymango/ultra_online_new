import React from 'react';
import dayjs from 'dayjs';
import { Controller } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function CustomDateInput({ name, rules = {}, placeholder, control, defaultValue, onChange }) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={dayjs(defaultValue)} // Set the default value for the DatePicker
      render={({ field, fieldState: { error } }) => (
        <div className="inputWrapper">
        {error ? 
          <span style={{ color: 'red', display: 'block', height: '22px', fontWeight: 'bold', fontSize: '14px' }}>
            {error ? error.message : ''}
          </span>
          : ''}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              {...field}
              slotProps={{ textField: { fullWidth: true } }}
              label={placeholder}
              //value={dayjs(field.value)} // Set the value for the DatePicker
              value={field.value && !defaultValue ? dayjs(field.value) : defaultValue && field.value ? dayjs(defaultValue) : null} 
              onChange={(date) => {
                field.onChange(date);
                onChange && onChange(date);
              }}
            />
          </LocalizationProvider>
        </div>
      )}
    />
  );
}

export default CustomDateInput;
