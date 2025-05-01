import React,{useState,useEffect} from 'react';
import {useForm,Controller} from 'react-hook-form';
import CustomInput from '../../components/CustomInput';
import CustomSelect from '../../components/CustomSelect';
import CustomButton from '../../components/CustomButton';
import Logo from '../../assets/img/logo_bg/logoTwo.png';
import LoginImg from '../../assets/img/login_bg/shieldPensions.jpg';
import CustomMessageBox from '../../components/CustomMessageBox';
import CustomLoader from '../../components/CustomLoader';
import CustomModal from '../../components/CustomModal';

import SendIcon from '@mui/icons-material/Send';
import KeyIcon from '@mui/icons-material/Key';
import { FaApple, FaWindows } from 'react-icons/fa';

function PasswordReset() {
  const {control, handleSubmit, formState:{errors}, setValue, getValues} = useForm();
  const [loader,setLoader] = useState(false);
  const [errBox,seterrBox] = useState(0);
  const [showFirstLogin,setShowFirstLogin] = useState(false);
  const [showForgotPassword,setShowForgotPassword] = useState(false);
  const [showRec,setShowRec] = useState(false);
  const [errorMessage,setErrorMessage] = useState('');
  const [usrDat,setUsrDat] = useState('');
  
  return (
    <>
    { loader ? <CustomLoader/> : null}
    {errBox == 1 ? <CustomMessageBox transition="down" display={()=>seterrBox(false)} type="success" horizontal="center" message={errorMessage} /> : errBox == 2 ? <CustomMessageBox transition="down" type="error" display={()=>seterrBox(false)} horizontal="center" message={errorMessage} /> : null }



<div className='loginWrapper'>
  <div className='loginLeftPane'>
  <div className='loginLeftPaneBox' >
    
  <img style={{width:'50%',margin:'0px auto',display:'block'}} src={Logo}/>
  <h2 style={{textAlign:'center',marginBottom:'30px'}}>Ultra Online Portal</h2>

  <h5 style={{textAlign:'center'}}>Welcome! Please sign in to your Account</h5>
  <CustomInput 
  type="text"
  rules={{
    required: 'Account Number is required'
      }}
      placeholder="Account Number"
      control={control} 
      name="accountno"/>

  <CustomInput 
  rules={{
    required: 'Password is required'
      }}
      placeholder="Password"
      control={control} 
      name="password" 
      type="password"
      />
  <h2></h2>
  <CustomButton text="Login"/>
  </div>

  </div>
  <div className='loginRightPane'>
  <div className='imageLoginBg' style={{position:'absolute',left:'0px',right:'0px',top:'50%',transform:'translateY(-50%)',overflow:'hidden'}}>
    <img style={{width:'100%',height:'100%'}} src={LoginImg}/>
    <div style={{position:'absolute',top:'0px',left:'0px',right:'0px',bottom:'0px',backgroundColor:'rgba(0,0,0,0.5',textAlign:'center'}}>
      <div style={{position:'absolute',bottom:'10px',left:'0px',right:'0px',color:'white'}}>
      {/* <p>Charisoft Ghana Ltd. &copy; 2024</p> */}
      </div>
      
      {/* <div className='dButton' style={{margin:'0px auto',width:'90%',padding:'10px',height:'90vh',fontSize:'18px',position:'absolute',left:'0px',right:'0px',top:'50%',transform:'translateY(-50%)',borderRadius:'10px',backgroundColor:'rgba(255,255,255,0.5)'}}>

      </div>  */}
  </div>
    </div>
  </div>
</div>
</>
  )
}

export default PasswordReset