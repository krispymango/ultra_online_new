import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import { FaRobot } from 'react-icons/fa';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


import SendIcon from '@mui/icons-material/Send';


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CustomInput from '../CustomInput';


import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';


import {useForm,Controller} from 'react-hook-form';
import CustomButtonTwo from '../CustomButton';
import { useItemHighlighted } from '@mui/x-charts';



const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

function BasicCard() {
  const {control, handleSubmit, formState:{errors}, setValue } = useForm();
  const [convo,setConvo] = React.useState([]);

  const sampleData = ["hello","bye","Tell me about Shield Pension Trust?","How do I join Shield Pension Trust?","What happens to my pension if I leave the company?","How is my pension invested?","Can I transfer my pension from another scheme to the Shield Pension Trust?"];

  const fetchData = (data) => {
    // setLoader(true);
     
 
         const controller = new AbortController();
         const timeoutId = setTimeout(() => {
             controller.abort();
         }, 15000);
 

 
         //const encryptedUserData = sessionStorage.getItem('loggedData');

 
         const formData = new FormData();
         //formData.append('token', encryptedUserData);
         formData.append('message', data.text);
 
 
 
           const requestOptions = {
             method: 'POST',
             body: formData,
             signal: controller.signal // Associate the AbortController's signal with the fetch
           };
 
 
   
 
     fetch(process.env.REACT_APP_CHATBOT_URL, requestOptions)
     .then((response) => response.json())
       .then((jsonData) => {

        ////console.log(jsonData);
        
        
        if (jsonData.status != 0) 
        {
          setConvo([...convo,{id: convo.length+1, name:'user', message:data.text},{id: convo.length+1, name:'chatbot', message:jsonData.response}]);
        }
        //setConvo([...convo,{id: convo.length+1, name:'user', message:data.text}]);
        
        ////console.table(jsonData.data);

         
         clearTimeout(timeoutId); // Clear the timeout if an error occurs
        //  setLoader(false);
       })
     .catch((error) => {
       clearTimeout(timeoutId); // Clear the timeout if an error occurs
      //  setLoader(false);
       ////////console.log(error);
     });
 }

 const handleClick = (data) => {
    // setLoader(true);
     
 
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
        controller.abort();
    }, 15000);



    //const encryptedUserData = sessionStorage.getItem('loggedData');


    const formData = new FormData();
    //formData.append('token', encryptedUserData);
    formData.append('message', data);



      const requestOptions = {
        method: 'POST',
        body: formData,
        signal: controller.signal // Associate the AbortController's signal with the fetch
      };




fetch(process.env.REACT_APP_CHATBOT_URL, requestOptions)
.then((response) => response.json())
  .then((jsonData) => {

   ////console.log(jsonData);
   
   
   if (jsonData.status != 0) 
   {
     setConvo([...convo,{id: convo.length+1, name:'user', message:data.text},{id: convo.length+1, name:'chatbot', message:jsonData.response}]);
   }
   //setConvo([...convo,{id: convo.length+1, name:'user', message:data.text}]);
   
   ////console.table(jsonData.data);

    
    clearTimeout(timeoutId); // Clear the timeout if an error occurs
   //  setLoader(false);
  })
.catch((error) => {
  clearTimeout(timeoutId); // Clear the timeout if an error occurs
 //  setLoader(false);
  ////////console.log(error);
});
};

  return (
    <Card sx={{ minWidth: 350,maxWidth:360 }}>

    <div style={{borderBottom:'1px solid #D1D1D1'}}>
    <ListItemButton>
      <ListItemAvatar>
        <Avatar alt="Profile Picture" src={''} />
      </ListItemAvatar>
      <ListItemText primary={'Chatbot'} secondary={''} />
    </ListItemButton>
    </div>

      <CardContent>
      <div style={{height:'25vh',overflowY:'scroll'}}>
      {
        Array.isArray(convo) && convo.length > 0 ? 
        convo.map((val,index)=>{
          return(
        <div key={index}>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          {val.name}
        </Typography>
        <Typography gutterBottom style={{borderBottom:'1px solid #E8E8E8'}} variant="body2">
          {val.message}
        </Typography>
        </div>
          )
        })
        : null
      }
      </div>

      <div style={{borderTop:'1px solid #D1D1D1',paddingTop:'10px'}}>

      <div>
    <Stack className="no-scrollbar" style={{overflowX:'scroll'}} direction="row" spacing={1}>      
    {
        Array.isArray(sampleData) && sampleData.length > 0 ? 
        sampleData.map((val,index)=>{
          return(
      <>
      <Chip key={index} label={val} variant="outlined" onClick={()=>handleClick(val)} />
      </>)
        }) : null 
      } 
    </Stack>
        </div>
        <div style={{marginTop:'0px',gap:'10px',alignItems:'center',paddingTop:'5px',display:'flex'}}>
        <div style={{flex:8}}>
        <CustomInput 
  rules={{
    minLength: { value: 2, message: 'Text should be minimum 1 characters' }
      }}
      placeholder=""
      control={control} 
      name="text"/>
        </div>
        <div>
            <CustomButtonTwo onClick={handleSubmit(fetchData)} endIcon={<SendIcon/> } />
        </div>
        </div>
      </div>
      </CardContent>
    </Card>
  );
}




export default function CustomFloatingButtonn({icon,chatbot,style,heading,color}) {
    const [showChat,setShowChat] = React.useState(false);
  return (
    <>
    <div style={{position:'absolute',right:'40px',bottom:'10px',zIndex:600}}>
    {
        showChat && chatbot ? <BasicCard/> : null
    }
    <Box style={{display:'flex',justifyContent:'flex-end'}} sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab style={style} onClick={()=>{showChat ? setShowChat(false) : setShowChat(true)}} color={color} variant="extended">
        {icon}
        <span style={{marginLeft:'10px'}}>{heading}</span>
      </Fab>
    </Box>
    </div>
    </>
  );
}
