import React,{useState,useEffect} from 'react'
import {useForm,Controller} from 'react-hook-form';
import SendIcon from '@mui/icons-material/Send';
import KeyIcon from '@mui/icons-material/Key';
import CustomLoader from '../../components/CustomLoader';
import CustomInput from '../../components/CustomInput';
import CustomCard from '../../components/CustomCard';
import CustomLineChart from '../../components/CustomLineChart';
import CustomMessageBox from '../../components/CustomMessageBox';
import CustomButton from '../../components/CustomButton';
import { FaFilePdf, FaInfoCircle, FaRegFilePdf } from 'react-icons/fa';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

import Pagination from '@mui/material/Pagination';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { Money } from '@mui/icons-material';
import WelcomeLogo from '../../assets/img/icons/business-partnership.svg'
import ContributionLogo from '../../assets/img/icons/cash-wallet.png';
import ClaimsLogo from '../../assets/img/icons/deposit-box.png';
import CurrentValueLogo from '../../assets/img/icons/financial-balance.png';
import ReturnsLogo from '../../assets/img/icons/pie-chart.png';
import Stack from '@mui/material/Stack';


function Dashboard({blogpost}) {
    const {control, handleSubmit, formState:{errors}, setValue } = useForm();
    const [loader,setLoader] = useState(false);
    const [errBox,seterrBox] = useState(0);
    const [errorMessage,setErrorMessage] = useState('');
    const [page, setPage] = useState(0);

    const [newsData,setNewsData] = useState([]);
    const [investmentData,setInvestmentData] = useState([]);
    const [profileData,setProfileData] = useState([]);
    const [recentData,setRecentData] = useState([]);
    const [transactionsData,setTransactionsData] = useState([]);


    

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

    const fetchRecentData = (data) => {
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
   
   
     
   
       fetch(process.env.REACT_APP_API_URL+'/recentRequestHistory', requestOptions)
       .then((response) => response.json())
         .then((jsonData) => {
           //////console.log(jsonData);
           setRecentData(jsonData);
           clearTimeout(timeoutId); // Clear the timeout if an error occurs
           setLoader(false);
         })
       .catch((error) => {
         clearTimeout(timeoutId); // Clear the timeout if an error occurs
         setLoader(false);
         ////////console.log(error);
       });
   }

    const fetchInvestmentData = (data) => {
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
     
     
       
     
         fetch(process.env.REACT_APP_API_URL+'/investmentSummary', requestOptions)
         .then((response) => response.json())
           .then((jsonData) => {
             setInvestmentData(jsonData.data);
             clearTimeout(timeoutId); // Clear the timeout if an error occurs
             setLoader(false);
           })
         .catch((error) => {
           clearTimeout(timeoutId); // Clear the timeout if an error occurs
           setLoader(false);
           ////////console.log(error);
         });
     }


     const fetchProfileData = () => {
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
     
     
       
     
         fetch(process.env.REACT_APP_API_URL+'/clientDetails', requestOptions)
         .then((response) => response.json())
           .then((jsonData) => {
            if(jsonData.status == 1){
             setProfileData(jsonData.data);
             sessionStorage.setItem('loggedDataAccNo', jsonData.data.accountno);
            }
             clearTimeout(timeoutId); // Clear the timeout if an error occurs
             setLoader(false);
           })
         .catch((error) => {
           clearTimeout(timeoutId); // Clear the timeout if an error occurs
           setLoader(false);
           ////////console.log(error);
         });
     }


     const fetchTansData = () => {
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
   
   
     
   
       fetch(process.env.REACT_APP_API_URL+'/transactions', requestOptions)
       .then((response) => response.json())
         .then((jsonData) => {
          
      if(jsonData.status == 1)
        {
          ////console.log(jsonData.data);
          
          //  var i = 1;
          //  const newArray = jsonData.data.map((item, index) => ({
          //    x: item.date,
          //    y: item.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          //  }));
          
          const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

          // Ensure jsonData.data exists before mapping
          if (jsonData?.data?.length) {
            const groupedData = {};
          
            jsonData.data.forEach(item => {
              const month = monthNames[new Date(item.date).getMonth()];
              const amount = parseFloat(item.amount.toFixed(2));
              const scheme = item.scheme;
          
              if (!groupedData[scheme]) {
                groupedData[scheme] = [];
              }
              
              groupedData[scheme].push({ x: month, y: amount });
            });
          
            setTransactionsData(groupedData); // Store in state
          } else {
            setTransactionsData({});
          }
          
          }
  
           clearTimeout(timeoutId); // Clear the timeout if an error occurs
           setLoader(false);
         })
       .catch((error) => {
         clearTimeout(timeoutId); // Clear the timeout if an error occurs
         setLoader(false);
         ////////console.log(error);
       });
   }


    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
      };

      const handleChange = (event, value) => {
        setPage(value > 0 ? value - 1 : value);
      };
      const options = { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" };
    useEffect(()=>{
    fetchData();
    fetchInvestmentData();
    fetchProfileData();
    fetchRecentData();
    fetchTansData();
    },[]);
    

  return (
    <div className='container' style={styles.container}>
    { loader ? <CustomLoader/> : null}
        {errBox == 1 ? <CustomMessageBox transition="down" display={()=>seterrBox(false)} type="success" horizontal="right" message={errorMessage} /> : errBox == 2 ? <CustomMessageBox transition="down" type="error" display={()=>seterrBox(false)} horizontal="right" message={errorMessage} /> : null }
        <div style={{padding:'20px',paddingBottom:'10px',display:'flex',alignItems:'center'}}>
            <h1> <span style={{color:'#A6ACAF'}}>{getGreeting()}, </span> </h1> <h1 style={{marginLeft:'5px'}}>{profileData.fullname || null } !</h1> 
        </div>

        <div style={{margin:'0px auto',width:'85%',marginBottom:'10px',paddingBottom:'40px',borderBottom:'1px solid #D1D1D1'}}>
        <h3>Transactions Summary for the year</h3>
        {
          transactionsData && Object.keys(transactionsData).length > 0 ?
          <CustomLineChart data={transactionsData}/> : 
          <>
        <Skeleton variant="rectangular" width={"100%"} height={200} />
            <Box sx={{ width:"100%" }}>
              <Skeleton width="80%" />
              <Skeleton width="100%" />
            </Box>
          </>
        }
        </div>

    <div style={{backgroundColor:'#fff',padding:'20px',paddingBottom:'0px'}}>
        <h3 style={{width:'100%',paddingBottom:'0px'}}>Investment Summary</h3>
        </div>
        

        <div style={{marginBottom:'20px'}}  >
        {
            Array.isArray(investmentData) && investmentData.length > 0 ?
                    <>
                    <div className='inputFieldThree'>
                        <span style={{width:'95%',margin:'0px auto',marginBottom:'20px'}}><span style={{color:'#A6ACAF',fontWeight:'bold',marginRight:'5px'}}>Scheme:</span> {investmentData[page].scheme}</span>
                    </div>
                    <div  className='inputFieldFour'>
                    <CustomCard
            title={investmentData[page].contributions.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            description={"Contributions"}
            render={
            <>
            <img style={{width:'25%'}} src={ContributionLogo}/>
            </>
            }
        />
        <CustomCard
            title={investmentData[page].current_value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            description={"Current Value"}
            render={
            <>
            <img style={{width:'25%'}} src={CurrentValueLogo}/>
            </>
            }
        />
        <CustomCard
            title={investmentData[page].claims.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            description={"Claims"}
            render={
            <>
            <img style={{width:'25%'}} src={ClaimsLogo}/>
            </>
            }
        />
        <CustomCard
            title={investmentData[page].returns.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            description={"Returns"}
            render={
            <>
            <img style={{width:'25%'}} src={ReturnsLogo}/>
            </>
            }
        />
        </div>
                    </>
             : <>
             <div className='inputFieldFour'>
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
        </div>
        </>
        }
        <Stack style={{display:'flex',alignItems:'center',backgroundColor:'#fff',paddingBottom:'10px'}} spacing={2}>
        <Pagination onChange={handleChange} variant="outlined" color="primary" count={Array.isArray(investmentData) && investmentData.length > 0 ? investmentData.length : 0} />
        </Stack>
        </div>

        {/* <div style={{marginBottom:'20px'}} className='inputFieldTwo'>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <img style={{width:'70%',display:'block',marginBottom:'-20px',marginTop:'20px'}} src={WelcomeLogo}/>
        </div>
        <div style={{display:'flex',alignItems:'center'}}>
        <div>
            <h2>{getGreeting()}, <span style={{ color: 'rgb(247, 168, 59)' }}>{profileData.fullname || ''}</span> !</h2>
            <h4>Stay informed and secure your future with our latest pension updates and features. Plan ahead, stay productive, and enjoy peace of mind!</h4>
        </div>
        </div>
        </div> */}

        <div style={{backgroundColor:'#fff',padding:'20px',paddingBottom:'10px'}}>
        <h3 style={{width:'100%',borderTop:'1px solid #D1D1D1',paddingTop:'20px'}}>Recent News & Articles</h3>
        </div>

        <div style={{marginBottom:'20px'}} className='inputFieldFour'>

        {
            Array.isArray(newsData) && newsData.length > 0 ?
            newsData.slice(0,4).map((val,index)=>{
                return(
                    <>
            <CustomCard
            key={index}
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
        <h3 style={{width:'100%',borderTop:'1px solid #D1D1D1',paddingTop:'20px'}}>Personal Details</h3>
        </div>

        <div style={{marginBottom:'20px'}}   className='inputFieldOne'>
        {
            profileData ?

            <>
        <div style={styles.profileStyle}>
        <span style={styles.profileHeading}>Fullname:</span> 
        <span>{profileData.fullname || '-'}</span>
        </div>

        <div style={styles.profileStyle}>
        <span style={styles.profileHeading}>Email:</span> 
        <span>{profileData.email || '-'}</span>
        </div>


        <div style={styles.profileStyle}>
        <span style={styles.profileHeading}>Contact:</span> 
        <span>{profileData.contact || '-'}</span> 
        </div>


        <div style={styles.profileStyle}>
        <span style={styles.profileHeading}>Address:</span> 
        <span>{profileData.address || '-'}</span> 
        </div>


        <div style={styles.profileStyle}>
        <span style={styles.profileHeading}>Occupation:</span> 
        <span>{profileData.occupation || '-'}</span>
        </div>


        <div style={styles.profileStyle}>
        <span style={styles.profileHeading}>Gender:</span> 
        <span>{profileData.gender || '-'}</span>
        </div>


        <div style={styles.profileStyle}>
        <span style={styles.profileHeading}>Date of Birth:</span> 
        <span>{profileData.dob || '-'}</span>
        </div>


        <div style={styles.profileStyle}>
        <span style={styles.profileHeading}>Nationality:</span> 
        <span>{profileData.nationality || '-'}</span>
        </div>
            </>
        
             : <>
             <div style={{width:'95%',margin:'0px auto'}}>
            <Box sx={{ width:"100%" }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
        </div>
        <div style={{width:'95%',margin:'0px auto'}}>
            <Box sx={{ width:"100%" }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
        </div>
        <div style={{width:'95%',margin:'0px auto'}}>
            <Box sx={{ width:"100%" }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
        </div>
        <div style={{width:'95%',paddingBottom:'20px',margin:'0px auto'}}>
            <Box sx={{ width:"100%" }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
        </div>
        </>
        }
        </div>

        
        {/* <div style={{backgroundColor:'#fff',padding:'20px',paddingBottom:'10px'}}>
        <h3 style={{width:'100%',borderBottom:'1px solid #D1D1D1',paddingBottom:'20px'}}>Recent Claims Requests</h3>
        </div>

        <div style={{marginBottom:'20px'}} className='inputFieldFour'>
        
        {  recentData ? 
          
          Array.isArray(recentData.data) && recentData.data.length > 0 ?
        recentData.data.map((val,index)=>{
          return(
            <>
            <CustomCard
            render={
            <>
            <span style={{marginTop:'5px',marginLeft:'5px',borderRadius:'5px',width:'fit-content',fontSize:'14px', display:'block',padding:'5px',
            border: val.status.toLowerCase() == 'pending' ? '1px solid orange' : val.status.toLowerCase() == 'approved' ? '1px solid green' : val.status.toLowerCase() == 'denied' ? '1px solid red' : 'none'
            ,color: val.status.toLowerCase() == 'pending' ? 'orange' : val.status.toLowerCase() == 'approved' ? 'green' : val.status.toLowerCase() == 'denied' ? 'red' : 'none'}}>&bull; {val.status}</span>
            <span style={{fontWeight:'bold',display:'block',padding:'5px'}}>{val.request_date}</span>
            <span style={{display:'block',padding:'5px'}}>{val.scheme}</span>
            <span style={{display:'block',padding:'5px'}}>{val.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </>
            }
        />
            </>
          )
        }) :  null
         :
          <>
        <div>
        <Skeleton variant="rectangular" width={240} height={118} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
        </div>
        <div>
        <Skeleton variant="rectangular" width={240} height={118} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
        </div>
        <div>
        <Skeleton variant="rectangular" width={240} height={118} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
        </div>
        <div>
        <Skeleton variant="rectangular" width={240} height={118} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
        </div>
        </>}
        </div> */}

        {/* <div style={{backgroundColor:'#fff',padding:'20px',paddingBottom:'10px'}}>
        <h3 style={{width:'100%',borderBottom:'1px solid #D1D1D1',paddingBottom:'20px'}}>Recent General Requests</h3>
        </div>

        <div style={{marginBottom:'20px'}} className='inputFieldFour'>

        {
          recentData ? 
          
          Array.isArray(recentData.dataTwo) && recentData.dataTwo.length > 0 ?
        recentData.dataTwo.map((val,index)=>{
          return(
            <>
            <CustomCard
            render={
            <>
            <span style={{marginTop:'5px',marginLeft:'5px',borderRadius:'5px',width:'fit-content',fontSize:'14px', display:'block',padding:'5px',
            border: val.status.toLowerCase() == 'pending' ? '1px solid orange' : val.status.toLowerCase() == 'approved' ? '1px solid green' : val.status.toLowerCase() == 'denied' ? '1px solid red' : 'none'
            ,color: val.status.toLowerCase() == 'pending' ? 'orange' : val.status.toLowerCase() == 'approved' ? 'green' : val.status.toLowerCase() == 'denied' ? 'red' : 'none'}}>&bull; {val.status}</span>
            <span style={{fontWeight:'bold',display:'block',padding:'5px'}}>{new Date(val.request_date).toLocaleDateString("en-GB", options).toUpperCase().replace(",", "")}</span>
            <span style={{display:'block',padding:'5px'}}>{val.request_category.toUpperCase()}</span>
            <span style={{display:'block',padding:'5px'}}>{val.request.slice(0,30).toLowerCase()+'...'}</span>
            </>
            }
        />
            </>
          )
        }) :  null
         :
          <>
        <div>
        <Skeleton variant="rectangular" width={240} height={118} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
        </div>
        <div>
        <Skeleton variant="rectangular" width={240} height={118} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
        </div>
        <div>
        <Skeleton variant="rectangular" width={240} height={118} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
        </div>
        <div>
        <Skeleton variant="rectangular" width={240} height={118} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
        </div>
        </>
        }
        </div> */}



    </div>
  )
}

const styles = {
    container:{
        width:'95%',
        margin:'0px auto',
        marginBottom:'40px'
    },
    profileStyle:{
        marginBottom:'20px',
        fontSize:'18px'
    },
    profileHeading:{
        fontWeight:'bolder',
        fontSize:'13px',
        display:'block',
        color:'#A6ACAF'
    }
}

export default Dashboard