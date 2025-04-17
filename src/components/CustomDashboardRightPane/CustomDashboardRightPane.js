import React from 'react';

function CustomDashboardRightPane({render}) {
  return (
    <div style={{flex:8,backgroundColor:'#fff',
    overflow:'auto'}}>
    {render}
    </div>
  )
}

export default CustomDashboardRightPane