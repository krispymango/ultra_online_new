import * as React from 'react';
import {Controller} from 'react-hook-form';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function CustomSelect({name,rules={},data,placeholder,control,onChange,defaultValue,value}) {
    // Check if defaultValue matches any label in data array
    const matchedOption = data.find(option => option.value === defaultValue);

    // Set the default value based on the match
    const defaultOption = matchedOption ? matchedOption.value : defaultValue;
  
        // Check if defaultValue matches any label in data array
    const matchedOptionTwo = data.find(optionTwo => optionTwo.value === defaultValue);

    // Set the default value based on the match
    const defaultOptionTwo = matchedOptionTwo ? matchedOptionTwo.label : defaultValue;
  return (
    <>
 <Controller
        name={name}
        defaultValue={defaultOption} // Set the updated defaultValue
        control={control}
        rules={rules}
        render={({field,fieldState:{error}}) => 
        <div className='inputWrapper'>
        {error ? <span style={{color:'red',backgroundColor:error ? '#FDEDEC' : 'none',display:'block',height:'22px',fontWeight:'bold',fontSize:'14px',marginBottom:'5px'}}>{error ? error.message : ''}</span> : ''}
        <Autocomplete
        disablePortal
        options={data}
        defaultValue={defaultOptionTwo}
        onChange={(event, newValue) => {
          field.onChange(newValue !== null ? newValue.value : null); // This updates the field value in react-hook-form
          if (onChange) {
            onChange(newValue !== null ? newValue.value : null);
          }
        }}
        renderInput={(params) => <TextField {...params} label={placeholder} />}
        />
        </div>
        }
  />
    </>
  )
}


// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top


export default CustomSelect