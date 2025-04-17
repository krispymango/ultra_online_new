import React from 'react'
import Button from '@mui/material/Button';

function CustomButton({onClick,text,endIcon,startIcon,color,href}) {
  return (
    <div>
        <Button onClick={onClick} color={color} href={href} style={{borderRadius:'30px', width:'100%',paddingTop:'12px',paddingBottom:'12px'}} variant="contained" disableElevation startIcon={startIcon} endIcon={endIcon}>{text}</Button>
    </div>
  )
}

export default CustomButton