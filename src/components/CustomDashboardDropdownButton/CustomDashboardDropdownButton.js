import React from 'react';

function CustomDashboardDropdownButton({text,onClicked}) {
  return (
    <li onClick={onClicked} className='dropdownButton' style={styles.listItem}>
       <div style={{display:'flex'}}><span style={styles.icon}></span> <span style={{flex:9}}>{text}</span></div>
    </li>
  )
}

const styles = {
    icon:{
        flex:1
    },
    listItem:{
        cursor:'pointer',
        width:'90%',
        margin:'0px auto',
        paddingTop:'10px',
        paddingBottom:'10px'
    }
}

export default CustomDashboardDropdownButton