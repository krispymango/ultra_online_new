import { IconButton } from '@mui/material';
import React,{useState} from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';



function CustomDashboardLeftPane({render,showDashSide,onClick,color}) {

  const [isVisible, setIsVisible] = useState(true); // Start with isVisible as true

  return (
    <div className='leftDashboard' style={{flex:2,display:showDashSide ? 'block' : 'none'}}>
      <div  style={{position:'relative',overflow:'hidden',height:'100%'}}>
       <div className='menuBar'><IconButton  onClick={onClick}  style={{position:'absolute',zIndex:30,right:'10px',top:'10px'}} ><FaBars size={22} color='black' /></IconButton></div> 
      <img src={require("../../assets/img/left_dashboard_bg/leftBgCity.jpg")} style={{position:'absolute',height:'100%',width:'100%'}} />
      <div style={{position:'absolute',zIndex:3,

      background: 
      color == 'red' ? 'rgb(123,36,28)' : 
      color == 'blue' ? 'rgb(28,36,123)' : 
      color == 'yellow' ? 'RGB: (255, 255, 0)' : 
      color == 'orange' ? 'RGB(255, 116, 0)' : 
      color == 'green' ? 'rgb: (28,123,36)' : 
      color == 'cream' ? 'RGB: (255, 245, 187)' :
      color == 'black' ? 'RGB: (255, 245, 187)' :
      color == 'brown' ? 'RGB: (255, 245, 187)' :
      color == 'white' ? 'RGB: (255, 245, 187)' :
      'rgb(123,36,28)',

      background: 
      color == 'red' ? 'linear-gradient(0deg, rgba(96,32,27,0.8) 54%, rgba(203,67,53,0.7665660014005602) 73%)' : 
      color == 'blue' ? 'linear-gradient(0deg, rgba(27, 32, 96, 0.8) 54%, rgba(53, 67, 203, 0.7665660014005602) 73%)' : 
      color == 'yellow' ? 'linear-gradient(0deg, rgba(255, 255, 0, 0.8) 54%, rgba(255, 255, 0, 0.7665660014005602) 73%)' : 
      color == 'orange' ? 'linear-gradient(0deg, rgba(255, 165, 0, 0.8) 54%, rgba(255, 140, 0, 0.7665660014005602) 73%)' : 
      color == 'green' ? 'linear-gradient(0deg, rgba(36, 129, 36, 0.8) 54%, rgba(46, 184, 46, 0.7665660014005602) 73%)' : 
      color == 'cream' ? 'linear-gradient(0deg, rgba(255, 253, 208, 0.8) 54%, rgba(255, 253, 208, 0.7665660014005602) 73%)':
      color == 'black' ? 'linear-gradient(0deg, rgba(255, 253, 208, 0.8) 54%, rgba(255, 253, 208, 0.7665660014005602) 73%)':
      color == 'brown' ? 'linear-gradient(0deg, rgba(255, 253, 208, 0.8) 54%, rgba(255, 253, 208, 0.7665660014005602) 73%)':
      color == 'white' ? 'linear-gradient(0deg, rgba(255, 253, 208, 0.8) 54%, rgba(255, 253, 208, 0.7665660014005602) 73%)':
      'linear-gradient(0deg, rgba(96,32,27,0.8) 54%, rgba(203,67,53,0.7665660014005602) 73%)',
      left:'0px',top:'0px',bottom:'0px',right:'0px'}}>
      </div>
    <div style={{zIndex:10,position:'relative',overflowY:'auto',height:'100%'}}>
    {render}
    </div>
    </div>
    </div>
  )
}

export default CustomDashboardLeftPane