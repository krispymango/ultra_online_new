import React,{useState} from 'react';
import { FaChevronDown,FaChevronUp,FaHouseUser} from 'react-icons/fa';

function CustomDashboardButton({heading,icon,render,onClicked,dropdown,align,setDropown,clickedStyle,logout}) {
    const [showDropdown,setShowDropdown] = useState(false);
  return (
    <div style={{width:'100%',color:clickedStyle ? '#000' : logout ? '#E74C3C' : '#fff', borderBottomLeftRadius:'10px' ,borderTopLeftRadius:'10px',transition:'ease-in-out 0.1s', backgroundColor: clickedStyle ? '#fff' : 'rgba(0,0,0,0)'}}>
        <span onClick={onClicked}  style={styles.heading}>
             <div style={{width:'90%',margin:'0px auto',position:'relative'}}>
                <div style={{display:'flex'}}><span style={styles.icon}>{icon}</span> <span style={{flex:9,fontWeight:'bold',textAlign:align ? align:'left'}}>{heading}</span></div>
        {dropdown ? <span onClick={()=>{showDropdown ? setShowDropdown(false) : setShowDropdown(true)}}> {showDropdown ? <FaChevronUp style={{position:'absolute',right:'15px',top:'50%',transform:'translateY(-50%)'}} /> : <FaChevronDown style={{position:'absolute',right:'15px',top:'50%',transform:'translateY(-50%)'}} />}</span> : null}
             </div> 
        </span>
        {
           showDropdown || setDropown ? 
        <ul className='dropdownBox' style={{listStyle:'none',margin:'0px',padding:'0px'}}>
            {render}
        </ul> : 
        null 
        }
    </div>
  )
}

const styles = {
    icon:{
        flex:1
    },
    heading:{
        cursor:'pointer',
        position:'relative',
        display:'block',
        paddingTop:'15px',
        paddingBottom:'15px'
    }
}

export default CustomDashboardButton