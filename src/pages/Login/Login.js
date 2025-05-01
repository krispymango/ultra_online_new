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



function Login({feedback}) {
  const {control, handleSubmit, formState:{errors}, setValue, getValues} = useForm();
  const [loader,setLoader] = useState(false);
  const [errBox,seterrBox] = useState(0);
  const [showFirstLogin,setShowFirstLogin] = useState(false);
  const [showForgotPassword,setShowForgotPassword] = useState(false);
  const [showRec,setShowRec] = useState(false);
  const [errorMessage,setErrorMessage] = useState('');
  const [usrDat,setUsrDat] = useState('');



  const checkFirstLogin = (rsp) => {

    if (rsp.first_login == 1 || rsp.first_login === '1') 
    {
      setShowFirstLogin(true);
    }
    else
    {
      saveData(rsp.data);
    }
    
  }

  const updatePasswordFirstLogin = (data) => {
    
    
    setLoader(true);

    if (data.conf_new_password && data.new_password && data.old_password) 
    {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
          controller.abort();
      }, 15000);

      const formData = new FormData();
      formData.append('token', usrDat ? usrDat : '');
      formData.append('old_password', data.old_password ? data.old_password : '');
      formData.append('new_password', data.new_password ? data.new_password : '');
      formData.append('conf_new_password', data.conf_new_password ? data.conf_new_password : '');




      const requestOptions = {
        method: 'POST',
        body: formData,
        signal: controller.signal // Associate the AbortController's signal with the fetch
      };



        fetch(process.env.REACT_APP_API_URL+'/firstLogin', requestOptions)
  .then((response) => response.json())
    .then((jsonData) => {
      clearTimeout(timeoutId); // Clear the timeout if an error occurs
      setErrorBox(0);
      if(jsonData.status == 1 || jsonData.status == '1')
      {
        saveData(usrDat.data);
      }
      else
      {
        setErrorMessage(jsonData.message ? jsonData.message : 'Wrong credentials!');
        setErrorBox(2);
      }
      setLoader(false);
    })
  .catch((error) => {
    clearTimeout(timeoutId); // Clear the timeout if an error occurs
    setErrorMessage('Error, Kindly try again later!');
    setErrorBox(2);
    setLoader(false);
    ////////////console.log(error);
  });
    } else {
      
      setLoader(false);
      setErrorMessage('Kindly fill all required fields!');
    }


  }

  const saveData = (rsp) => {
    try {
      sessionStorage.setItem('loggedData', rsp);
      feedback(true);
    } catch (error) {
      setErrorMessage('Error, Kindly try again later!');
      setLoader(false);
      seterrBox(true);
      feedback(false);
    }
  }

  const checkUserLogged = () => {
    setLoader(true);
    try 
    {
      const encryptedUserData = sessionStorage.getItem('loggedData');
      if (encryptedUserData !== null) {
        //const decryptedUserData = decryptData(encryptedUserData);
        //sessionStorage.setItem('loggedData', decryptedUserData);
        setLoader(false);
        feedback(true);
      }
      else
      {
        setLoader(false);
        seterrBox(false);
      }
    } catch (error) {
      setLoader(false);
      seterrBox(false);
    }
}



  const fetchData = (data) => {
    //////console.log(data);
    
    setLoader(true);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            controller.abort();
        }, 15000);

        

        const formData = new FormData();
        formData.append('accountno', data.accountno ? data.accountno : '');
        formData.append('password', data.password ? data.password : '');



          const requestOptions = {
            method: 'POST',
            body: formData,
            signal: controller.signal // Associate the AbortController's signal with the fetch
          };


  

    fetch(process.env.REACT_APP_API_URL+'/login', requestOptions)
    .then((response) => response.json())
      .then((jsonData) => {
        ////console.table(jsonData);
        clearTimeout(timeoutId); // Clear the timeout if an error occurs
        setErrorBox(0);
        if(jsonData.status !== 0)
        {//console.log(jsonData);
        
          setUsrDat(jsonData.data);
          checkFirstLogin(jsonData);
        }
        else
        {
          setErrorMessage(jsonData.message ? jsonData.message : 'Error, Please try again!');
          setErrorBox(2);
        }
        setLoader(false);
      })
    .catch((error) => {
      clearTimeout(timeoutId); // Clear the timeout if an error occurs
      setErrorMessage('Error, Please try again!');
      setErrorBox(2);
      setLoader(false);
      ////////console.log(error);
    });
}

// const fetchData = (data) => {
//   setLoader(true);
  
//         const controller = new AbortController();
//         const timeoutId = setTimeout(() => {
//             controller.abort();
//         }, 15000);

//           const formData = new FormData();
//         formData.append('type', 'login');
//         formData.append('username', data.username ? data.username : '');
//         formData.append('password', data.password ? data.password : '');

//   fetch('http://localhost:5000/api', {
//     method: 'POST',
//     body: formData, // Convert FormData to JSON
//   })
//     .then((response) => response.json())
//     .then((jsonData) => {
//         clearTimeout(timeoutId); // Clear the timeout if an error occurs
//         setErrorBox(0);
//         if(jsonData[0].status != 0)
//         {
//           saveData(jsonData[0]);
//         }
//         else
//         {
//           setErrorMessage(jsonData.message ? jsonData.message : 'Error, Please try again!');
//           setErrorBox(2);
//         }
//         setLoader(false);
//     })
//     .catch((error) => {
//       clearTimeout(timeoutId); // Clear the timeout if an error occurs
//       setErrorMessage('Error, Please try again!');
//       setErrorBox(2);
//       setLoader(false);
//       ////////////console.log(error);
//     });
// };



const setErrorBox = (numData) => 
{
  seterrBox(numData);
  setTimeout(() => {
    seterrBox(0);
}, 5000);
}

useEffect(() => {
  checkUserLogged();
}, []);


const SetForgotPasswordOption = (data) => {
if(data == 1)
{
  setShowRec('sms');
  setValue('phone','');
  setValue('email','');
}
else if(data == 2)
{
  setShowRec('email');
  setValue('phone','');
  setValue('email','');
}
else
{
  setShowRec(false);
  setValue('phone','');
  setValue('email','');
}
}


const sendPasswordRecovery = () => {
  var sphone = getValues('phone');
  var semail = getValues('email');
if (sphone && sphone > 5) 
{
  
  setLoader(true);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
          controller.abort();
      }, 15000);

      

      const formData = new FormData();
      formData.append('reset_option', 1);
      formData.append('phone', sphone ? sphone : '');



        const requestOptions = {
          method: 'POST',
          body: formData,
          signal: controller.signal // Associate the AbortController's signal with the fetch
        };




  fetch(process.env.REACT_APP_API_URL+'/resetPasswordLink', requestOptions)
  .then((response) => response.json())
    .then((jsonData) => {
      ////console.table(jsonData);
      clearTimeout(timeoutId); // Clear the timeout if an error occurs
      setErrorBox(0);
      if(jsonData.status !== 0)
      {//console.log(jsonData);
        setErrorMessage(jsonData.message ? jsonData.message : 'If this phone number exists in our system, we’ve sent a reset link. Please check your inbox.');
        setErrorBox(1);
      }
      else
      {
        setErrorMessage(jsonData.message ? jsonData.message : 'Error, Please try again!');
        setErrorBox(2);
      }
      setLoader(false);
    })
  .catch((error) => {
    clearTimeout(timeoutId); // Clear the timeout if an error occurs
    setErrorMessage('Error, Please try again!');
    setErrorBox(2);
    setLoader(false);
    ////////console.log(error);
  });
} 
else if(semail && semail > 5){
setLoader(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
        controller.abort();
    }, 15000);

    

    const formData = new FormData();
    formData.append('reset_option', 2);
    formData.append('email', semail ? semail : '');



      const requestOptions = {
        method: 'POST',
        body: formData,
        signal: controller.signal // Associate the AbortController's signal with the fetch
      };




fetch(process.env.REACT_APP_API_URL+'/resetPasswordLink', requestOptions)
.then((response) => response.json())
  .then((jsonData) => {
    ////console.table(jsonData);
    clearTimeout(timeoutId); // Clear the timeout if an error occurs
    setErrorBox(0);
    if(jsonData.status !== 0)
    {
      setErrorMessage(jsonData.message ? jsonData.message : 'If this email exists in our system, we’ve sent a reset link. Please check your inbox.');
      setErrorBox(1);
    }
    else
    {
      setErrorMessage(jsonData.message ? jsonData.message : 'Error, Please try again!');
      setErrorBox(2);
    }
    setLoader(false);
  })
.catch((error) => {
  clearTimeout(timeoutId); // Clear the timeout if an error occurs
  setErrorMessage('Error, Please try again!');
  setErrorBox(2);
  setLoader(false);
  ////////console.log(error);
});
}
else {
  setErrorMessage('Error, Please try again!');
  setErrorBox(2);
}
  
}




  return (
    <>
        { loader ? <CustomLoader/> : null}
        {errBox == 1 ? <CustomMessageBox transition="down" display={()=>seterrBox(false)} type="success" horizontal="center" message={errorMessage} /> : errBox == 2 ? <CustomMessageBox transition="down" type="error" display={()=>seterrBox(false)} horizontal="center" message={errorMessage} /> : null }

        {
        showForgotPassword ? 
        <CustomModal onClick={()=>{setShowRec(false);setShowForgotPassword(false)}} heading="Forgot Password?"
        render={
        <>
        <h4>Choose Password Reset Option</h4>
    <CustomSelect
  rules={{
    required: 'Password Reset option is required',
      }}
      onChange={SetForgotPasswordOption}
      data={[
        {label:'SMS',value:1},
        {label:'Email',value:2}
      ]}
      placeholder="..."
      control={control} 
      name="forgot_password"/>

{
  showRec && showRec == 'sms' ? 
  <div style={{borderTop:'1px solid #D1D1D1'}}>
<CustomInput 
  rules={{
    required: 'Phone Number is required',
      }}
      placeholder="eg: 024XXXXXX"
      control={control} 
      name="phone"/>

<CustomButton endIcon={<SendIcon/>} onClick={()=>sendPasswordRecovery()} text="Submit"/>
</div>
: showRec && showRec == 'email' ?
<div style={{borderTop:'1px solid #D1D1D1'}}>
<CustomInput 
  rules={{
    required: 'Email is required',
      }}
      placeholder="eg: example@mail.com"
      control={control} 
      name="email"/>

<CustomButton endIcon={<SendIcon/>} onClick={()=>sendPasswordRecovery()} text="Submit"/>
</div> :
null
}

        </>}
        /> : null
    }

        {
        showFirstLogin ? 
        <CustomModal onClick={()=>setShowFirstLogin(false)} heading="Change Temporary Password"
        render={
        <>
    <CustomInput 
  rules={{
    required: 'Old Password is required',
      }}
      placeholder="Old Password"
      type="password"
      control={control} 
      name="old_password"/>

<CustomInput 
  rules={{
    required: 'New Password is required',
      }}
      placeholder="New Password"
      type="password"
      control={control} 
      name="new_password"/>

<CustomInput 
  rules={{
    required: 'Confirm New Password is required',
      }}
      placeholder="Confirm New Password"
      type="password"
      control={control} 
      name="conf_new_password"/>

<CustomButton endIcon={<KeyIcon/>} onClick={handleSubmit(updatePasswordFirstLogin)} text="Change Password"/>
        </>}
        /> : null
    }

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
      <CustomButton onClick={handleSubmit(fetchData)} text="Login"/>
      <div style={{display:'block',marginTop:'20px'}}><a onClick={()=>setShowForgotPassword(true)} style={{textAlign:'center',textDecoration:'underline',color:'blue',cursor:'pointer'}}>Forgot Password?</a></div>
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

export default Login