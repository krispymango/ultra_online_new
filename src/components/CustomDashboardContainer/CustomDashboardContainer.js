import React from 'react';

function CustomDashboardContainer({render}) {
  return (
    <div style={{display:'flex',width:'100%',height:'100vh'}}>
        {render}
    </div>
  )
}

export default CustomDashboardContainer