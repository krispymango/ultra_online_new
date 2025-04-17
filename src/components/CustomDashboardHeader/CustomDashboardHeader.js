import React from 'react'

function CustomDashboardHeader({render}) {
  return (
    <div style={{width:'100%',position:'sticky',zIndex:300,top:'0px',borderBottom:'1px solid #E5E5E7',paddingTop:'2vh',paddingBottom:'2vh',backgroundColor:'#fff',display:'flex'}}>
        {render}
    </div>
  )
}

export default CustomDashboardHeader