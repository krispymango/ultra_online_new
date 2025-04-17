import React,{useState,useEffect} from 'react'
import {useForm,Controller} from 'react-hook-form';
import CustomLoader from '../../components/CustomLoader';
import CustomInput from '../../components/CustomInput';
import CustomMessageBox from '../../components/CustomMessageBox';
import CustomButton from '../../components/CustomButton';
import SendIcon from '@mui/icons-material/Send';
import KeyIcon from '@mui/icons-material/Key';
// import Url from '../../config/apiLink';
import { FaFilePdf, FaInfoCircle, FaRegFilePdf } from 'react-icons/fa';
import Logo from '../../assets/img/icons/404.png';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';


function NewsArticle(blogpostId) {
  const {control, handleSubmit, formState:{errors}, setValue } = useForm();
  const [loader,setLoader] = useState(false);
  const [errBox,seterrBox] = useState(0);
  const [errorMessage,setErrorMessage] = useState('');
  const [homeData,setHomeData] = useState([]);




    const fetchData = () => {
      ////console.log(blogpostId);
      
      // setLoader(true);
       
   
           const controller = new AbortController();
           const timeoutId = setTimeout(() => {
               controller.abort();
           }, 15000);
   
  
   
           const formData = new FormData();
           formData.append('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50bm8iOiJTMTIzNDUiLCJpYXQiOjE3MzgxNzQ1MTR9.SLoZEg-VeGLk1GomPWKXsExxurJCtXl_CbbYe1mt_9M');
           formData.append('id', blogpostId.blogpostId);

   
   
   
             const requestOptions = {
               method: 'POST',
               body: formData,
               signal: controller.signal // Associate the AbortController's signal with the fetch
             };
   
   
     
   
       fetch(process.env.REACT_APP_API_URL+'/specNews', requestOptions)
       .then((response) => response.json())
         .then((jsonData) => {
           ////console.log(jsonData.data);
           setHomeData(jsonData.data);
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
    <h2 style={{borderBottom:'1px solid #D1D1D1',paddingBottom:'10px'}}>{Array.isArray(homeData) && homeData.length > 0 ? homeData[0].title.toUpperCase() : '-'}</h2>

        {/* <div style={{backgroundColor:'#fff',padding:'20px',paddingBottom:'10px'}}>
        <h3 style={{width:'100%',borderBottom:'1px solid #D1D1D1',paddingBottom:'20px'}}> {Array.isArray(homeData) && homeData.length > 0 ? homeData[0].title.toUpperCase() : '-'}</h3>
        </div> */}
        <div style={{width:'60%'}}>
        <img src={Array.isArray(homeData) && homeData.length > 0 ? homeData[0].img[0].data.imageBase64 : Logo} style={{width:'100%',objectFit:'contain'}}/>
        </div>
        <div style={{whiteSpace: "pre-line",marginTop:'20px'}}>
        {Array.isArray(homeData) && homeData.length > 0 ? homeData[0].description : 'Not found!'}
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

export default NewsArticle