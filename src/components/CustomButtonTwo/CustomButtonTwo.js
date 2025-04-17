import React from 'react'
import Button from '@mui/material/Button';

function CustomButtonTwo({onClick,text,endIcon,startIcon,color,href,disabled}) {
  return (
    <div>
        <Button disabled={disabled} target={href ? '_blank' : ''} onClick={onClick} color={color} href={href} style={{borderRadius:'30px', width:'100%',paddingTop:'12px',paddingBottom:'12px'}} variant="outlined" disableElevation startIcon={startIcon} endIcon={endIcon}>{text}</Button>
    </div>
  )
}

export default CustomButtonTwo