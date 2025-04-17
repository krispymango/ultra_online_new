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

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

function Settings() {
  const {control, handleSubmit, formState:{errors}, setValue } = useForm();
  const [loader,setLoader] = useState(false);
  const [errBox,seterrBox] = useState(0);
  const [errorMessage,setErrorMessage] = useState('');
  

  const setErrorBox = (numData) => 
  {
    seterrBox(numData);
    setTimeout(() => {
      seterrBox(0);
  }, 5000);
  }


const submitData = (mainData) => {
      
  setLoader(true);
  try 
  {
    const userData = localStorage.getItem('loggedData');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
        controller.abort();
    }, 15000);

    const formData = new FormData();
    formData.append('token', userData ? userData : '');
    formData.append('old_password', mainData.old_password ? mainData.old_password : '');
    formData.append('new_password', mainData.new_password ? mainData.new_password : '');
    formData.append('confirm_new_password', mainData.confirm_new_password ? mainData.confirm_new_password: '');

    const requestOptions = {
      method: 'POST',
      body: formData, // Send the FormData directly
      signal: controller.signal // Associate the AbortController's signal with the fetch
    };



fetch(process.env.REACT_APP_API_URL+'/updatePassword', requestOptions)
.then((response) => response.json())
  .then((jsonData) => {
    
    clearTimeout(timeoutId); // Clear the timeout if an error occurs
    seterrBox(0);
    if(jsonData.status == 1)
    {
      seterrBox(1);
      setErrorMessage(jsonData.message || 'Successfully Changed Password!');
      setValue('old_password','');
      setValue('new_password','');
      setValue('confirm_new_password','');
    }
    else
    {
      setErrorMessage('Error could not update password, please try again!');
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
  }

}

    
  return (
    <div className='container' style={styles.container}>
    { loader ? <CustomLoader/> : null}
        {errBox == 1 ? <CustomMessageBox transition="down" display={()=>seterrBox(false)} type="success" horizontal="right" message={errorMessage} /> : errBox == 2 ? <CustomMessageBox transition="down" type="error" display={()=>seterrBox(false)} horizontal="right" message={errorMessage} /> : null }
    <h2>Settings </h2>

        <div style={{backgroundColor:'#fff',padding:'20px',paddingBottom:'10px'}}>
        <h3 style={{width:'100%',borderBottom:'1px solid #D1D1D1',paddingBottom:'20px'}}>Change Password</h3>
        </div>
        <div className='inputFieldOne'>
    <CustomInput 
    type={"password"}
  rules={{
    required: 'Old Password is required',
    minLength: { value: 5, message: 'Old Password should be minimum 5 characters' }
      }}
      placeholder="Old Password"
      control={control} 
      name="old_password"/>

    <CustomInput 
    type={"password"}
  rules={{
    required: 'New Password is required',
    minLength: { value: 5, message: 'New Password should be minimum 5 characters' }
      }}
      placeholder="New Password"
      control={control} 
      name="new_password"/>

        <CustomInput 
    type={"password"}
  rules={{
    required: 'Confirm New Password is required',
    minLength: { value: 5, message: 'Confirm New Password should be minimum 5 characters' }
      }}
      placeholder="Confirm New Password"
      control={control} 
      name="confirm_new_password"/>
    </div>


    <div style={{backgroundColor:'#fff',paddingTop:'20px',paddingBottom:'50px'}}>
        <div style={{width:"40%",margin:"0px auto"}}><CustomButton onClick={handleSubmit(submitData)} text="Change Password" endIcon={<KeyIcon/>} /></div>
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

export default Settings