import React from 'react'
import {Controller} from 'react-hook-form';
import TextField from '@mui/material/TextField';

function CustomTextArea({name,rules={},placeholder,control,type,defaultValue}) {
  return (
    <>
 <Controller
 defaultValue={defaultValue}
        name={name}
        control={control}
        rules={rules}
        render={({field,fieldState:{error}}) => 
        <div className='inputWrapper'>
          {error ? <span style={{color:'red',backgroundColor:error ? '#FDEDEC' : 'none',marginBottom:'5px',display:'block',height:'22px',fontWeight:'bold',fontSize:'14px'}}>{error ? error.message : ''}</span> : ''}
          <TextField multiline rows={4} defaultValue={defaultValue} style={{width:'100%'}} {...field} label={placeholder}  type={type} variant="outlined" />
        </div>
        }
  />
    </>
  )
}

export default CustomTextArea