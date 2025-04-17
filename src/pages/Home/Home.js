import React,{useState,useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import { FaBars, FaBatteryEmpty, FaBell, FaBox,  FaBuilding,  FaCamera, FaChartLine, FaCheckDouble, FaChevronDown, FaCog, FaComment, FaFile, FaFileAlt, FaFilePrescription, FaFlagUsa, FaHandHolding, FaHome, FaIdCard, FaInbox, FaInfo, FaList, FaListOl, FaMoneyBill, FaNewspaper, FaPaperclip, FaPowerOff, FaQuestion, FaRegBell, FaRobot, FaSignOutAlt, FaUpload, FaUser, FaUserPlus, FaUsers } from 'react-icons/fa';
import CustomDashboardContainer from '../../components/CustomDashboardContainer';
import CustomDashboardLeftPane from '../../components/CustomDashboardLeftPane';
import CustomDashboardRightPane from '../../components/CustomDashboardRightPane';
import CustomDashboardButton from '../../components/CustomDashboardButton';
import CustomModal from '../../components/CustomModal';
import CustomDashboardDropdownButton from '../../components/CustomDashboardDropdownButton';
import CustomDashboardHeader from '../../components/CustomDashboardHeader';
import CustomMessageBox from '../../components/CustomMessageBox';
//import Settings from '../../pages/Settings';
import Badge from '@mui/material/Badge';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import EmailIcon from '@mui/icons-material/Email';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

import Logo from '../../assets/img/icons/user.png';
import CustomListItem from '../../components/CustomListItem';
import CustomLoader from '../../components/CustomLoader';
import { Inventory } from '@mui/icons-material';
import Dashboard from '../Dashboard';
import Settings from '../Settings';
import Transactions from '../Transactions';
import Notifications from '../Notifications';
import General_Request from '../General_Request';
import News from '../News';
import NewsArticle from '../NewsArticle';
import Claim_Request from '../Claim_Request';
import CustomFloatingButton from '../../components/CustomFloatingButton';

import EngLogo from '../../assets/img/flags/Flag_of_England-512x307.png';
import SpnLogo from '../../assets/img/flags/Flag_of_Spain-512x341.png';
import FrnLogo from '../../assets/img/flags/Flag_of_France-512x341.png';


const NotificationBox = ({key,status,description,date,id,modalData,returnData}) => {
   ////console.log(status);
   
  const readNotification = (value) => 
    {
       
   
         const controller = new AbortController();
         const timeoutId = setTimeout(() => {
             controller.abort();
         }, 15000);
 

 
         const encryptedUserData = sessionStorage.getItem('loggedData');

 
         const formData = new FormData();
         formData.append('token', encryptedUserData);
         formData.append('id', value);
 
 
 
           const requestOptions = {
             method: 'POST',
             body: formData,
             signal: controller.signal // Associate the AbortController's signal with the fetch
           };
 
 
   
 
     fetch(process.env.REACT_APP_API_URL+'/specNotification', requestOptions)
     .then((response) => response.json())
       .then((jsonData) => {

        if (jsonData.status == 1) 
        {
           modalData(jsonData.data[0]);
           returnData(true);
        }
         
         clearTimeout(timeoutId); // Clear the timeout if an error occurs
       })
     .catch((error) => {
       clearTimeout(timeoutId); // Clear the timeout if an error occurs
       ////////console.log(error);
     });
    }


return (
  <div key={key} style={{width:'80%',position:'relative',borderRadius:'5px',padding:'10px',margin:'0px auto',marginBottom:'10px',backgroundColor:'#fff',
  border: status == 0 ? '1px solid #2ECC71' : status == 1 ? '1px solid #BDC3C7' : '1px solid #BDC3C7',
  boxShadow: status == 0 ? '0px 2px 5px rgba(46, 204, 113)' : status == 1 ? 'none' : 'none'}}>
  <span style={{color:status == 0 ? '#2ECC71' : status == 1 ? '#BDC3C7' : '#BDC3C7' ,position:'absolute',top:'5px',right:'10px'}}>&bull;</span>
  <span style={{display:'block',fontSize:'14px',paddingTop:'5px',paddingBottom:'10px'}} >{description}</span>
  <div  style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)'}}>
  <span style={{fontSize:'13px',color:'#A6ACAF'}}>{date}</span>
  <span onClick={()=>readNotification(id)} style={{fontSize:'13px',textAlign:'right',cursor:'pointer',fontWeight:'bold',color:status == 0 ? '#2ECC71' : status == 1 ? '#BDC3C7' : '#BDC3C7'}}>Show</span>
  </div>
  </div>
)
}



function Home({feedback}) {
    const [showPage,setShowPage] = useState('dashboard');
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElTwo, setAnchorElTwo] = useState(null);
    const [showLeftDash, setShowLeftDash] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalData,setModalData] = useState([]);    
    const [homeData,setHomeData] = useState([]);
    const [loader,setLoader] = useState(false);
    const [errBox,seterrBox] = useState(false);
    const [showNotification,setShowNotification] = useState(false);
    const [errorMessage,setErrorMessage] = useState('');
    const [blogpostId,setBlogpostId] = useState('');
    const [notificationsCount,setNotificationsCount] = useState(0);


    // Function to check screen width
    const checkScreenWidth = () => {
      if (window.innerWidth <= 925) {
        setIsMobile(true);
        setShowLeftDash(false);
      } else {
        setIsMobile(false);
      }
    };


  //   const checkUserLogged = () => {
  //     try 
  //     {
  //       const encryptedUserData = sessionStorage.getItem('loggedData');
  //       if (encryptedUserData !== null) 
  //         {
  //         setLoader(false);
  //       }
  //       else
  //       {
  //         setLoader(false);
  //         seterrBox(false);
  //       }
  //     } catch (error) {
  //       setLoader(false);
  //       seterrBox(false);
  //       feedback(true);
  //     }
  // }


  const removeLoggedData = () => {
    sessionStorage.removeItem('loggedData');
      feedback(true);
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


    useEffect(() => {
      //checkUserLogged();
      checkScreenWidth(); // Check initial screen width
      window.addEventListener('resize', checkScreenWidth); // Listen for resize events
  
      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('resize', checkScreenWidth);
      };
    }, []);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClickTwo = (event) => {
      setAnchorElTwo(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleCloseTwo = () => {
      setAnchorElTwo(null);
    };
  
    const open = Boolean(anchorEl);
    const openTwo = Boolean(anchorElTwo);
    const id = open ? 'simple-popover' : undefined;
    const idTwo = openTwo ? 'simple-popoverTwo' : undefined;
    
    function logoutUser(){
      removeLoggedData();
    }


const fetchNotificationData = () => {
  //setLoader(true);

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




  fetch(process.env.REACT_APP_API_URL+'/notifications', requestOptions)
  .then((response) => response.json())
    .then((jsonData) => {
      ////////////console.log(jsonData);

      const newArray = [];

       for (let index = 0; index < jsonData.data.length; index++) {
        if (jsonData.data[index].status == 0) 
        {
          newArray.push(jsonData.data[index]);
        }
       }

       setNotificationsCount(newArray.length);
       
      
      clearTimeout(timeoutId); // Clear the timeout if an error occurs
      setErrorBox(0);
      setLoader(false);
    })
  .catch((error) => {
    clearTimeout(timeoutId); // Clear the timeout if an error occurs
    setLoader(false);
    
  });
}

const setErrorBox = (numData) => 
  {
    seterrBox(numData);
    setTimeout(() => {
      seterrBox(0);
  }, 5000);
  }


  const [transactionsData,setTransactionsData] = useState([]);
    
  const fetchDataNotif = (data) => {
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
     
     
       
     
         fetch(process.env.REACT_APP_API_URL+'/notifications', requestOptions)
         .then((response) => response.json())
           .then((jsonData) => {
            
            ////console.table(jsonData.data);
             var i = 1;
             const newArray = jsonData.data.map((item, index) => ({
              id:item.id,
              status:item.status,
               title: item.title.slice(0,14)+'...',
               date: item.date ? item.date.split("T")[0] : '',
               description: `${item.description.slice(0,40)+'...'}`
             }));

             if (newArray.length > 8) 
             {
              setTransactionsData(newArray.slice(0,8));
             } 
             else {
              setTransactionsData(newArray);
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


     const readAllNotification = () => 
      {
         
     
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
   
   
     
   
       fetch(process.env.REACT_APP_API_URL+'/readAllNotifications', requestOptions)
       .then((response) => response.json())
         .then((jsonData) => {
  
          if (jsonData.status == 1) 
          {
            fetchDataNotif();
            fetchNotificationData();
          }
           
           clearTimeout(timeoutId); // Clear the timeout if an error occurs
         })
       .catch((error) => {
         clearTimeout(timeoutId); // Clear the timeout if an error occurs
         ////////console.log(error);
       });
      }

     function formatDate(dateString) {
      const givenDate = new Date(dateString);
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
  
      // Remove time part for accurate comparison
      today.setHours(0, 0, 0, 0);
      yesterday.setHours(0, 0, 0, 0);
      givenDate.setHours(0, 0, 0, 0);
  
      // Calculate the difference in days
      const timeDiff = today - givenDate;
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  
      if (daysDiff === 0) {
          return "Today";
      } else if (daysDiff === 1) {
          return "Yesterday";
      } else if (daysDiff < 8) {
          return `${daysDiff} days`;
      } else {
          return "Over 1 week";
      }
  }




  useEffect(()=>{
    fetchNotificationData();
    fetchProfileData();
    fetchDataNotif();
  },[]);

  return (
    <>
    { errBox ? <CustomMessageBox horizontal="right" transition="left" type="success" message={errorMessage}/> : null }
    {loader ? <CustomLoader/> : null}
    {showModal ? 
    <CustomModal 
    heading={modalData.title || 'N/A'}
    date={modalData.date ? modalData.date.split("T")[0] : ''}
    onClick={()=>setShowModal(false)} 
    render={
    <>
    { loader ? <CustomLoader/> : null}
    <div style={{overflowY:'scroll',gridRowGap:'15px',maxHeight:'55vh'}}>
           
      {modalData ?
      <>
<p style={{ width:'95%',whiteSpace: "pre-line",backgroundColor:'#F2F3F4',borderRadius:'10px',padding:'10px',margin:'10px auto' }}>{modalData.description || 'N/A'}</p>
      </>
         :
         <>
           <div>
<span style={styles.itemHeading}><Skeleton height={20}/></span> 
<span style={styles.item}><Skeleton height={30} /></span>
</div>
<div>
<span style={styles.itemHeading}><Skeleton height={20}/></span> 
<span style={styles.item}><Skeleton height={30} /></span>
</div>
<div>
<span style={styles.itemHeading}><Skeleton height={20}/></span> 
<span style={styles.item}><Skeleton height={30} /></span>
</div>

<div>
<span style={styles.itemHeading}><Skeleton height={20}/></span> 
<span style={styles.item}><Skeleton height={30} /></span>
</div>
<div>
<span style={styles.itemHeading}><Skeleton height={20}/></span> 
<span style={styles.item}><Skeleton height={30} /></span>
</div>
<div>
<span style={styles.itemHeading}><Skeleton height={20}/></span> 
<span style={styles.item}><Skeleton height={30} /></span>
</div> 

<div>
<span style={styles.itemHeading}><Skeleton height={20}/></span> 
<span style={styles.item}><Skeleton height={30} /></span>
</div>
<div>
<span style={styles.itemHeading}><Skeleton height={20}/></span> 
<span style={styles.item}><Skeleton height={30} /></span>
</div>

<div>
<span style={styles.itemHeading}><Skeleton height={20}/></span> 
<span style={styles.item}><Skeleton height={30} /></span>
</div> 
</>
           }
         
     </div>
    </>}/> : null}
    <CustomDashboardContainer render={
        <>
        <CustomDashboardLeftPane color="blue" onClick={()=>setShowLeftDash(false)} showDashSide={showLeftDash ? true : false} render={
        <>
        <div style={{width:'100%',display:'grid',marginBottom:'30px',marginTop:'30px'}}>
                <div style={{backgroundColor:'rgba(255,255,255,0.5)',margin:'0px auto',marginBottom:'20px',display:'flex',justifyContent: 'center',alignItems: 'center',borderRadius:'50%',width:'100px',height:'100px'}}>
                <img style={{width:'80%',margin:'0px auto',display:'block'}} src={Logo} />  
                </div>      
                <div style={{borderBottom:'1px solid rgba(255, 255, 255, 0.38)',width:'85%',margin:'0px auto'}}></div>
                <div style={{textAlign:'center',fontSize:'16px',color:'white',paddingTop:'10px',paddingTop:'20px',paddingBottom:'20px',fontWeight:'bold',width:'95%',margin:'0px auto'}}>{homeData.fullname && homeData.fullname.length > 18 ? homeData.fullname.slice(0,18) + '...' : homeData.fullname && homeData.fullname.length <= 18 ? homeData.fullname : '' }</div>
                <div style={{borderBottom:'1px solid rgba(255, 255, 255, 0.38)',width:'85%',margin:'0px auto'}}></div>
        </div>

          <CustomDashboardButton icon={<FaHome/> } clickedStyle={showPage == 'dashboard' ? true : false} onClicked={()=>{fetchNotificationData();setShowPage('dashboard'); isMobile ? setShowLeftDash(!showLeftDash): setShowLeftDash(showLeftDash)}} heading="Dashboard"/> 
          <CustomDashboardButton icon={<FaList/> } clickedStyle={showPage == 'transactions' ? true : false} onClicked={()=>{fetchNotificationData();setShowPage('transactions'); isMobile ? setShowLeftDash(!showLeftDash): setShowLeftDash(showLeftDash)}} heading="Transactions"/> 
          <CustomDashboardButton dropdown setDropown={true} icon={<FaFile/> } heading="Service Requests"
          render={
          <>
          <CustomDashboardDropdownButton clickedStyle={showPage == 'claims_request' ? true : false} text="Claim Request" onClicked={()=>{fetchNotificationData();setShowPage('claims_request'); isMobile ? setShowLeftDash(!showLeftDash): setShowLeftDash(showLeftDash)}} />
          <CustomDashboardDropdownButton clickedStyle={showPage == 'general_request' ? true : false} text="General Request" onClicked={()=>{fetchNotificationData();setShowPage('general_request'); isMobile ? setShowLeftDash(!showLeftDash): setShowLeftDash(showLeftDash)}} />
          </>
          }
          />
          <CustomDashboardButton clickedStyle={showPage == 'notifications' ? true : false} icon={<FaComment/> } onClicked={()=>{fetchNotificationData();setShowPage('notifications'); isMobile ? setShowLeftDash(!showLeftDash): setShowLeftDash(showLeftDash)}} heading="Notifications"/> 
          <CustomDashboardButton clickedStyle={showPage == 'news' ? true : false} icon={<FaNewspaper/> } onClicked={()=>{fetchNotificationData();setShowPage('news'); isMobile ? setShowLeftDash(!showLeftDash): setShowLeftDash(showLeftDash)}} heading="News & Articles"/> 
          
          <CustomDashboardButton logout clickedStyle={showPage == 'logout' ? true : false} icon={<FaPowerOff/>} onClicked={()=>{logoutUser()}} heading="Logout"/> 
         
        </>
        }/>
        <CustomDashboardRightPane render={
        <>
        <CustomDashboardHeader render={
        <div style={{width:'90%',margin:'0px auto',display:'flex'}}>
        <div style={{flex:7,display:'flex',position:'relative'}}>
            <span className='menuBarTwo' style={{display:'flex',justifyContent: 'center',alignItems: 'center'}}>
              <IconButton onClick={()=>setShowLeftDash(!showLeftDash)} ><FaBars color='black' className='mobileMenu' size={22}/></IconButton>
            </span>

        </div>
        <div style={{flex:3,position:'relative'}}>
        <span style={{display:'flex',float:'right',justifyContent: 'center',alignItems: 'center'}}>
        {/* <span style={{fontSize:'18px'}}>EN</span>
        <IconButton aria-describedby={id} onClick={handleClick} style={{marginRight:'20px'}}> <FaChevronDown style={{marginLeft:'0px',fontSize:'14px',cursor:'pointer',color:'#000'}} /></IconButton>
            <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <CustomListItem icon={<img style={{width:'20px',marginRight:'10px'}} src={EngLogo}/>} onClick={()=>setShowPage('settings')} message="English" />
        <CustomListItem icon={<img style={{width:'20px',marginRight:'10px'}} src={FrnLogo}/>} onClick={<></>} message="French" />
        <CustomListItem icon={<img style={{width:'20px',marginRight:'10px'}} src={SpnLogo}/>} onClick={<></>} message="Spanish" />
      </Popover> */}

        <IconButton style={{marginRight:'20px'}} onClick={()=>{showNotification ? setShowNotification(false) : setShowNotification(true)}} > <Badge badgeContent={notificationsCount} max={9} color="error"><FaRegBell/></Badge>  </IconButton>

        </span>
        </div>
        </div>
        }/>
        <div style={{display:'flex',height:'90vh'}}>
        <div style={{flex:7,height:'90vh',overflowY:'scroll'}}>
        {
            showPage == 'dashboard' ?
            <Dashboard blogpost={(vv)=>{
              ////console.log('ddd');
              setShowPage('blogpost');
              setBlogpostId(vv);
              }} /> :
            showPage == 'settings' ?
            <Settings/> :
            showPage == 'transactions' ?
            <Transactions/> :
            showPage == 'claims_request' ?
            <Claim_Request returnData={()=>{fetchDataNotif();fetchNotificationData();}} /> :
            showPage == 'general_request' ?
            <General_Request returnData={()=>{fetchDataNotif();fetchNotificationData();}}/> :
            showPage == 'notifications' ?
            <Notifications/> :
            showPage == 'news' ?
            <News blogpost={(vv)=>{
              ////console.log(vv);
              setShowPage('blogpost');
              setBlogpostId(vv);
              }} /> :
            showPage == 'blogpost' ?
            <NewsArticle blogpostId={blogpostId} /> :
            <Dashboard/>
        }
        </div>
        
        { showNotification ? 
        <div style={{flex:3}}>
        <div style={{backgroundColor:'#F5F6FA',position:'relative',width:'100%'}}>
        <div style={{width:'85%',position:'sticky',top:'0px',margin:'0px auto',paddingBottom:'0px',display:'grid',gridTemplateColumns:'repeat(2,1fr)'}}>
        <h4 style={{width:'100%',paddingBottom:'0px'}}>Notifications</h4>
        <div><h5 onClick={()=>readAllNotification()} style={{textAlign:'right',cursor:'pointer',fontWeight:'normal',color:'#2ECC71'}}>Mark all as read &bull;</h5></div>
        </div>
        <div style={{overflowY:'scroll',height:'82.5vh'}}>
         {
          Array.isArray(transactionsData) && transactionsData.length > 0 ?
          transactionsData.map((val,index)=>{
            return(
              <>
              <NotificationBox status={val.status} returnData={()=>fetchDataNotif()} modalData={(dd)=>{setModalData(dd);setShowModal(true);} } id={val.id} key={index} description={val.description} date={formatDate(val.date)}/>
              </>
            )
          })
           : 
        <>
        <div style={{width:'85%',margin:'0px auto'}}>
        <Skeleton variant="rectangular" width={"100%"} height={80} />
            <Box sx={{ width:"100%" }}>
              <Skeleton width="80%" />
              <Skeleton width="100%" />
            </Box>
        </div>
             <div style={{width:'85%',margin:'0px auto'}}>
        <Skeleton variant="rectangular" width={"100%"} height={80} />
            <Box sx={{ width:"100%" }}>
              <Skeleton width="80%" />
              <Skeleton width="100%" />
            </Box>
        </div>
        </>
         }
        </div>
        </div>
        </div> :
         null
         }
         <CustomFloatingButton color="primary" chatbot heading={'Chatbot'} icon={<FaRobot size={22}/>} />
        </div>
        </>
        }/>
        </>
    } />
        
    </>
  )
}

const styles = {
  item:{
    backgroundColor:'#fff',
    borderRadius:'3px',
    display:'block',
    fontWeight:'bold',
    fontSize:'18px',
    textTransform:'capitalize',
    paddingTop:'10px',
    paddingBottom:'10px',
    paddingLeft:'5px',
    paddingRight:'5px'
  },
  itemInput:{
    backgroundColor:'#fff',
    borderRadius:'3px',
    display:'block',
    fontWeight:'bold',
    fontSize:'18px',
    textTransform:'capitalize'
  },
  itemHeading:{
    fontSize:'14px',
    color:'#909497',
    textTransform:'capitalize'
  }
}


export default Home