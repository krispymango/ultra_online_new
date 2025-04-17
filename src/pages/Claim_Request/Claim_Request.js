import React,{useState,useEffect} from 'react'
import {useForm,Controller} from 'react-hook-form';
import CustomLoader from '../../components/CustomLoader';
import CustomInput from '../../components/CustomInput';
import CustomTextArea from '../../components/CustomTextArea';
import CustomMessageBox from '../../components/CustomMessageBox';
import CustomButton from '../../components/CustomButton';
import SendIcon from '@mui/icons-material/Send';
import KeyIcon from '@mui/icons-material/Key';
// import Url from '../../config/apiLink';
import { FaFilePdf, FaInfoCircle, FaRegFilePdf } from 'react-icons/fa';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CustomSelect from '../../components/CustomSelect';

import Logo from '../../assets/img/icons/Business_Analysis.gif';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

function Claim_Request({returnData}) {
  const {control, handleSubmit, formState:{errors}, setValue } = useForm();
  const [loader,setLoader] = useState(false);
  const [errBox,seterrBox] = useState(0);
  const [errorMessage,setErrorMessage] = useState('');
  const [schemeData,setSchemeData] = useState([]);
    const [loaded, setLoaded] = useState(false);
  

  const setErrorBox = (numData) => 
  {
    seterrBox(numData);
    setTimeout(() => {
      seterrBox(0);
  }, 5000);
  }



const submitData = (data) => {
  setLoader(true);
  try 
  {
    const userData = sessionStorage.getItem('loggedData');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
        controller.abort();
    }, 15000);

    const formData = new FormData();
    formData.append('token', userData ? userData : '');
    formData.append('scheme', data.scheme ? data.scheme : '');
    formData.append('amount', data.amount ? data.amount : '');
    formData.append('instructions', data.instructions ? data.instructions : '');

    const requestOptions = {
      method: 'POST',
      body: formData, // Send the FormData directly
      signal: controller.signal // Associate the AbortController's signal with the fetch
    };




fetch(process.env.REACT_APP_API_URL+'/claimsRequest', requestOptions)
.then((response) => response.json())
  .then((jsonData) => {
      ////////console.log(jsonData);
    
    clearTimeout(timeoutId); // Clear the timeout if an error occurs
    seterrBox(0);
    if(jsonData.status == 1)
    {
      seterrBox(1);
      ////////console.log(jsonData);
      returnData(true);
      setErrorMessage(jsonData.message || 'Successful');
    }
    else
    {
      setErrorMessage('Could not submit Claims Request, Please try again!');
      seterrBox(2);
    }
    setLoader(false);
    
  })
.catch((error) => {
  clearTimeout(timeoutId); // Clear the timeout if an error occurs
  setErrorMessage('Request Timeout!');
  seterrBox(2);
  setLoader(false);
  
});
  } catch (error) {
    setLoader(false);
    seterrBox(false);
    //////console.log(error);
  }


}


const fetchSchemeData = (data) => {
  // setLoader(true);
   

       const controller = new AbortController();
       const timeoutId = setTimeout(() => {
           controller.abort();
       }, 15000);



       const encryptedUserData = sessionStorage.getItem('loggedData');

   
       const formData = new FormData();
       formData.append('token', encryptedUserData);



         const requestOptions = {
           method: 'POST',
           body: formData,
           signal: controller.signal // Associate the AbortController's signal with the fetch
         };


 

   fetch(process.env.REACT_APP_API_URL+'/schemes', requestOptions)
   .then((response) => response.json())
     .then((jsonData) => {

       setSchemeData(jsonData.data);
       
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
    fetchSchemeData();
  },[]);


  return (
    <div className='container' style={styles.container}>
    { loader ? <CustomLoader/> : null}
        {errBox == 1 ? <CustomMessageBox transition="down" display={()=>seterrBox(false)} type="success" horizontal="right" message={errorMessage} /> : errBox == 2 ? <CustomMessageBox transition="down" type="error" display={()=>seterrBox(false)} horizontal="right" message={errorMessage} /> : null }
    <h2>Claim Request</h2>


        <div className='inputFieldTwo'>
        <div>
        <div style={{backgroundColor:'#fff',padding:'0px',paddingBottom:'10px'}}>
        <h3 style={{width:'100%',borderBottom:'1px solid #D1D1D1',color:'rgb(147, 147, 147)',paddingBottom:'20px'}}>Make a claim Request</h3>
        </div>


        <div style={{display:'flex',flexDirection:'column',width:'100%',justifyContent:'center'}}>
        <CustomSelect
  rules={{
    required: 'Scheme is required'
      }}
                control={control}
                name="scheme"
                placeholder="Scheme"
                data={schemeData}
                />
        <CustomInput 
  rules={{
    required: 'Amount is required',
    minLength: { value: 1, message: 'Amounnt should be minimum 1 characters' }
      }}
      placeholder="Amount"
      control={control} 
      name="amount"/>

        <CustomTextArea
        
        rules={{
          required: 'Instructions is required',
          minLength: { value: 5, message: 'Instructions should be minimum 5 characters' }
            }}
      
      placeholder="Instructions"
      control={control} 
      name="instructions"/>

        <div style={{backgroundColor:'#fff'}}>
        <div style={{width:"90%",margin:"0px auto"}}><CustomButton onClick={handleSubmit(submitData)} text="Submit" endIcon={<SendIcon/>} /></div>
    </div>
    </div>
        </div>
    <div>
    {!loaded && 
      <p style={{width:'70%',margin:'0px auto'}}>
      <Skeleton variant="rectangular" width={"100%"} height={220} />
      <Box sx={{ width:"100%" }}>
        <Skeleton width="80%" />
        <Skeleton width="100%" />
      </Box>
      </p>
      }
        <div style={{width:'100%', margin:'0px auto',overflow:'hidden',marginTop:'-30px',display:'flex',justifyContent:'center'}}>

       <img 
       onLoad={() => setLoaded(true)}
       style={{width:'60%',display:'block'}} 
       src={Logo}/>
        </div>
        <div>
        <ul>
          <li>Scheme: Select the scheme under which you're making a claim.</li>
          <li>Amount: Enter the claim amount you are requesting.</li>
          <li>Instruction: Type in further instructions for your claim request.</li>
        </ul>
        </div>
    </div>
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

export default Claim_Request