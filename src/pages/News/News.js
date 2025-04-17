import React,{useState,useEffect} from 'react'
import {useForm,Controller} from 'react-hook-form';
import CustomLoader from '../../components/CustomLoader';
import CustomInput from '../../components/CustomInput';
import CustomMessageBox from '../../components/CustomMessageBox';
import CustomCard from '../../components/CustomCard';
import CustomButton from '../../components/CustomButton';
import SendIcon from '@mui/icons-material/Send';
import KeyIcon from '@mui/icons-material/Key';
// import Url from '../../config/apiLink';
import { FaFilePdf, FaInfoCircle, FaRegFilePdf } from 'react-icons/fa';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';


function News({blogpost}) {
  const {control, handleSubmit, formState:{errors}, setValue } = useForm();
  const [loader,setLoader] = useState(false);
  const [errBox,seterrBox] = useState(0);
      const [newsData,setNewsData] = useState([]);
  const [errorMessage,setErrorMessage] = useState('');
  

  const setErrorBox = (numData) => 
  {
    seterrBox(numData);
    setTimeout(() => {
      seterrBox(0);
  }, 5000);
  }


  const fetchData = (data) => {
    // setLoader(true);
     
 
         const controller = new AbortController();
         const timeoutId = setTimeout(() => {
             controller.abort();
         }, 15000);
 

 
         const formData = new FormData();
         formData.append('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50bm8iOiJTMTIzNDUiLCJpYXQiOjE3MzgxNzQ1MTR9.SLoZEg-VeGLk1GomPWKXsExxurJCtXl_CbbYe1mt_9M');
 
 
 
           const requestOptions = {
             method: 'POST',
             body: formData,
             signal: controller.signal // Associate the AbortController's signal with the fetch
           };
 
 
   
 
     fetch(process.env.REACT_APP_API_URL+'/news', requestOptions)
     .then((response) => response.json())
       .then((jsonData) => {
         //////console.log(jsonData.data);
         setNewsData(jsonData.data);
         clearTimeout(timeoutId); // Clear the timeout if an error occurs
         setLoader(false);
       })
     .catch((error) => {
       clearTimeout(timeoutId); // Clear the timeout if an error occurs
       setLoader(false);
       ////////console.log(error);
     });
 }

    
     useEffect(()=>{
     fetchData();
     },[]);

  return (
    <div className='container' style={styles.container}>
    { loader ? <CustomLoader/> : null}
        {errBox == 1 ? <CustomMessageBox transition="down" display={()=>seterrBox(false)} type="success" horizontal="right" message={errorMessage} /> : errBox == 2 ? <CustomMessageBox transition="down" type="error" display={()=>seterrBox(false)} horizontal="right" message={errorMessage} /> : null }
    <h2></h2>

        <div style={{backgroundColor:'#fff',padding:'20px',paddingBottom:'10px'}}>
        <h3 style={{width:'100%',borderBottom:'1px solid #D1D1D1',paddingBottom:'20px'}}>Recent News Feed</h3>
        </div>
        <div style={{marginBottom:'20px'}} className='inputFieldFour'>

        {
            Array.isArray(newsData) && newsData.length > 0 ?
            newsData.slice(0,4).map((val,index)=>{
              ////console.log(val);
                return(
                    <>
            <CustomCard
            onClick={()=>blogpost(val.id)}
            img={true}
            img_url={val.img[0].data.imageBase64}
            description={val.description.slice(0,100)+'...'}
            />
                    </>
                )
            } )
             : <>
             <div>
        <Skeleton variant="rectangular" width={"100%"} height={150} />
            <Box sx={{ width:"100%" }}>
              <Skeleton width="80%" />
              <Skeleton width="100%" />
            </Box>
        </div>
             <div>
        <Skeleton variant="rectangular" width={"100%"} height={150} />
            <Box sx={{ width:"100%" }}>
              <Skeleton width="80%" />
              <Skeleton width="100%" />
            </Box>
        </div>
             <div>
        <Skeleton variant="rectangular" width={"100%"} height={150} />
            <Box sx={{ width:"100%" }}>
              <Skeleton width="80%" />
              <Skeleton width="100%" />
            </Box>
        </div>
             <div>
        <Skeleton variant="rectangular" width={"100%"} height={150} />
            <Box sx={{ width:"100%" }}>
              <Skeleton width="80%" />
              <Skeleton width="100%" />
            </Box>
        </div>
        </>
        }
        </div>
        <div style={{backgroundColor:'#fff',padding:'20px',paddingBottom:'10px'}}>
        <h3 style={{width:'100%',borderBottom:'1px solid #D1D1D1',paddingBottom:'20px'}}>News Feed</h3>
        </div>
        <div style={{marginBottom:'20px'}} className='inputFieldFour'>

        {
            Array.isArray(newsData) && newsData.length > 0 ?
            newsData.map((val,index)=>{
                return(
                    <>
            <CustomCard
            onClick={()=>blogpost(val.id)}
            img={true}
            img_url={val.img[0].data.imageBase64}
            description={val.description.slice(0,100)+'...'}
            />
                    </>
                )
            } )
             : <>
             <div>
        <Skeleton variant="rectangular" width={"100%"} height={150} />
            <Box sx={{ width:"100%" }}>
              <Skeleton width="80%" />
              <Skeleton width="100%" />
            </Box>
        </div>
             <div>
        <Skeleton variant="rectangular" width={"100%"} height={150} />
            <Box sx={{ width:"100%" }}>
              <Skeleton width="80%" />
              <Skeleton width="100%" />
            </Box>
        </div>
             <div>
        <Skeleton variant="rectangular" width={"100%"} height={150} />
            <Box sx={{ width:"100%" }}>
              <Skeleton width="80%" />
              <Skeleton width="100%" />
            </Box>
        </div>
             <div>
        <Skeleton variant="rectangular" width={"100%"} height={150} />
            <Box sx={{ width:"100%" }}>
              <Skeleton width="80%" />
              <Skeleton width="100%" />
            </Box>
        </div>
             <div>
        <Skeleton variant="rectangular" width={"100%"} height={150} />
            <Box sx={{ width:"100%" }}>
              <Skeleton width="80%" />
              <Skeleton width="100%" />
            </Box>
        </div>
             <div>
        <Skeleton variant="rectangular" width={"100%"} height={150} />
            <Box sx={{ width:"100%" }}>
              <Skeleton width="80%" />
              <Skeleton width="100%" />
            </Box>
        </div>
             <div>
        <Skeleton variant="rectangular" width={"100%"} height={150} />
            <Box sx={{ width:"100%" }}>
              <Skeleton width="80%" />
              <Skeleton width="100%" />
            </Box>
        </div>
             <div>
        <Skeleton variant="rectangular" width={"100%"} height={150} />
            <Box sx={{ width:"100%" }}>
              <Skeleton width="80%" />
              <Skeleton width="100%" />
            </Box>
        </div>
        </>
        }
        </div>
    </div>
  )
}


const styles = {
    container:{
        width:'90%',
        margin:'0px auto',
        marginBottom:'40px'
    }
}


export default News