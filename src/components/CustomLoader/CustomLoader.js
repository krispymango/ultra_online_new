import React from 'react'
import LoaderImg from './loader.gif';

function CustomLoader() {
  return (
    <div style={styles.wrapper}>
        <img src={LoaderImg} style={{width:'3%',boxShadow:'0px 2px 5px rgba(0,0,0,0.7)',backgroundColor:'#fff',padding:'10px',borderRadius:'50px',position:'absolute',top:'50%',left:'0px',right:'0px',transform:'translateY(-50%)',margin:'0px auto'}} />
    </div>
  )
}

const styles = {
    wrapper:{
        zIndex:10000,
        position:'absolute',
        top:'0px',
        left:'0px',
        right:'0px',
        bottom:'0px',
        backgroundColor:'rgba(0,0,0,0.3)'
    }
}

export default CustomLoader