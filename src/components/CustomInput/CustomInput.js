import React from 'react'
import {Controller} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';

function CustomInput({name,rules={},placeholder,control,type,defaultValue,disabled,rows}) {
  const [showPassword, setShowPassword] = React.useState(true);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
 <Controller
 defaultValue={defaultValue}
        name={name}
        control={control}
        rules={rules}
        render={({field,fieldState:{error}}) => 
        <div className='inputWrapper'>
          {error ? <span style={{color:'#E74C3C',margin:'0px auto',backgroundColor:error ? '#FDEDEC' : 'none',padding:'5px',borderRadius:'5px',display:'block',height:'22px',fontWeight:'bold',fontSize:'14px',marginBottom:'5px'}}>{error ? error.message : ''}</span> : null}
          
          <FormControl disabled={disabled} defaultValue={defaultValue} {...field} style={{width:'100%'}} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">{placeholder}</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={type == 'password' && showPassword ? 'password' : 'text'}
            endAdornment={
              type == 'password' ?
              <>
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment> 
              </>
              : null
            }
            label={placeholder}
          />
        </FormControl>
        
        {/* <TextField endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            } disabled={disabled} defaultValue={defaultValue} style={{width:'100%'}} {...field} label={placeholder}  type={type} variant="outlined" /> */}
        </div>
        }
  />
    </>
  )
}

export default CustomInput