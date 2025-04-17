import React,{useState,useEffect} from 'react'
import {useForm,Controller} from 'react-hook-form';
import { FaFileExcel,FaSearch,FaTimes, FaFilePdf, FaInfoCircle, FaRegFilePdf, FaPrint } from 'react-icons/fa';
import SendIcon from '@mui/icons-material/Send';

import CustomLoader from '../../components/CustomLoader';
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton';
import CustomUploadButton from '../../components/CustomUploadButton';
import CustomSelect from '../../components/CustomSelect';
import CustomDateInput from '../../components/CustomDateInput';
import CustomTable from '../../components/CustomTable';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

function Notifications() {
    const {control, handleSubmit, formState:{errors}, setValue, getValues } = useForm();
    const [loader,setLoader] = useState(false);
    const [errBox,seterrBox] = useState(0);
    const [fullData,setFullData] = useState([]);
    const [schemeData,setSchemeData] = useState([]);
    const [transactionsData,setTransactionsData] = useState([]);
    const [errorMessage,setErrorMessage] = useState('');

    const fetchData = (data) => {
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
          
          //console.table(jsonData.data);
           const newArray = jsonData.data.map((item, index) => ({
            id:index+1,
            actions:item.id,
            status: item.status,
             title: item.title.slice(0,18)+'...',
             date: item.date ? item.date.split("T")[0] : '',
             description: `${item.description.slice(0,40)+'...'}`
           }));
  
           setTransactionsData(newArray);
  
           
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
    {/* {<CustomLoader/>} */}
    <h2></h2>

        <div style={{backgroundColor:'#fff',padding:'20px',paddingBottom:'10px'}}>
 
    <CustomTable 
    ModalType="notification" 
    extraData={()=>fetchData()}
    tableHeading={[
    {
      id: 'id',
      label: '#',
      minWidth:10,
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'date',
      label: 'Date',
      minWidth:20,
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'title',
      label: 'Title',
      minWidth: 30,
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 10,
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'description',
      label: 'Description',
      minWidth: 140,
      align: 'left'
    },
    {
      id: 'actions',
      label: 'Action',
      minWidth: 40,
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),
    }]} 
    
    tableRows={transactionsData}/>
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

export default Notifications