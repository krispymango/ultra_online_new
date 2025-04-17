import React,{useState,useEffect} from 'react'
import {useForm,Controller} from 'react-hook-form';
import { FaFileExcel,FaSearch,FaTimes, FaFilePdf, FaInfoCircle, FaRegFilePdf, FaPrint } from 'react-icons/fa';
import SendIcon from '@mui/icons-material/Send';

import CustomLoader from '../../components/CustomLoader';
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButtonTwo';
import CustomUploadButton from '../../components/CustomUploadButton';
import CustomSelect from '../../components/CustomSelect';
import CustomDateInput from '../../components/CustomDateInput';
import CustomTable from '../../components/CustomTable';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';

function Transactions() {
  const {control, handleSubmit, formState:{errors}, setValue, getValues } = useForm();
  const [loader,setLoader] = useState(false);
  const [errBox,seterrBox] = useState(0);
  const [fullData,setFullData] = useState([]);
  const [schemeData,setSchemeData] = useState([]);
  const [transactionsData,setTransactionsData] = useState([]);
  const [errorMessage,setErrorMessage] = useState('');
  const [showPrint, setShowPrint] = useState(true);
  const [printData, setPrintData] = useState([]);

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

 const filterResults = (data) => {
  setLoader(true);
  try 
  {
    const userData = sessionStorage.getItem('loggedData');
    const userDataAccno = sessionStorage.getItem('loggedDataAccNo');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
        controller.abort();
    }, 15000);

    var sDinputDate = data.from_date.$y +'/' + data.from_date.$M + '/' + data.from_date.$D;
    var sDparts = sDinputDate.split('/');
    var sDdate = new Date(sDparts[0], sDparts[1], sDparts[2]);
    var sDformattedDate = sDdate.getFullYear() + '-' + (sDdate.getMonth() + 1).toString().padStart(2, '0') + '-' + sDdate.getDate().toString().padStart(2, '0');
    
    var aDinputDate = data.to_date.$y +'/' + data.to_date.$M + '/' + data.to_date.$D;
    var aDparts = aDinputDate.split('/');
    var aDdate = new Date(aDparts[0], aDparts[1], aDparts[2]);
    var aDformattedDate = aDdate.getFullYear() + '-' + (aDdate.getMonth() + 1).toString().padStart(2, '0') + '-' + aDdate.getDate().toString().padStart(2, '0');
    

    const formData = new FormData();
    formData.append('token', userData ? userData : '');
    formData.append('from_date', sDformattedDate ? sDformattedDate : '');
    formData.append('to_date', aDformattedDate ? aDformattedDate : '');
    formData.append('scheme', data.scheme ? data.scheme : '');

    const requestOptions = {
      method: 'POST',
      body: formData, // Send the FormData directly
      signal: controller.signal // Associate the AbortController's signal with the fetch
    };




fetch(process.env.REACT_APP_API_URL+'/transactions', requestOptions)
.then((response) => response.json())
  .then((jsonData) => {
      //////console.log(jsonData);
    
    clearTimeout(timeoutId); // Clear the timeout if an error occurs
    seterrBox(0);
    if(jsonData.status == 1)
    {
      const newArray = jsonData.data.map((item, index) => ({
       id:index+1,
        scheme: item.scheme,
        date: item.date,
        amount: item.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        description: item.description
      }));

      setTransactionsData(newArray);
      setShowPrint(false);
      setPrintData({acc:userDataAccno,scheme:data.scheme,from_date:sDformattedDate,to_date:aDformattedDate});
    }
    else
    {
      setErrorMessage('Request Timeout!');
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
 
 
   
 
     fetch(process.env.REACT_APP_API_URL+'/transactions', requestOptions)
     .then((response) => response.json())
       .then((jsonData) => {
        
    if(jsonData.status == 1)
      {
         var i = 1;
         const newArray = jsonData.data.map((item, index) => ({
          id:index+1,
           scheme: item.scheme,
           date: item.date,
           amount: item.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
           description: item.description
         }));

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


  useEffect(()=>{
    fetchData();
    fetchSchemeData();
  },[]);

  return (
    <div className='container' style={styles.container}>
    {/* {<CustomLoader/>} */}
    <h2></h2>

        <div style={{backgroundColor:'#fff',padding:'20px',paddingBottom:'10px'}}>

        <div style={{paddingBottom:'5px',marginBottom:'5px',}}>
        <div style={{display:'flex',flexWrap:'wrap',gap:'10px',justifyContent:'center',alignItems:'center'}}>
                <div style={{flexGrow:1,flexBasis:'400px'}}>
                <CustomSelect
                control={control}
                name="scheme"
                placeholder="Scheme"
                data={schemeData}
                />
                </div>
               <div style={{flexGrow:1,flexBasis:'60px'}}>
                  <CustomDateInput
                  placeholder="From Date"
                  control={control}
                  name="from_date"
                />
                </div>
                <div style={{flexGrow:1,flexBasis:'60px'}}>
                  <CustomDateInput
                  placeholder="To Date"
                  control={control}
                  name="to_date"
                />
                </div>
          </div>
                <div style={{display:'flex',flexWrap:'wrap',gap:'10px',borderBottom:'1px solid #D1D1D1',paddingBottom:'10px',marginBottom:'20px'}}>
                <div style={{flexGrow:1,flexBasis:'30px'}}>
                <CustomButton onClick={handleSubmit(filterResults)}  text="Search" endIcon={<FaSearch/>}/>
                </div>
                <div style={{flexGrow:1,flexBasis:'30px'}}>
                <CustomButton text="Clear"  
                onClick={()=>{
                  //setValue('scheme','');
                  setValue('from_date','');
                  setValue('to_date','');
                  fetchData()}}
                color="error" endIcon={<FaTimes/>}/>
                </div>
                <div style={{flexGrow:1,flexBasis:'30px'}}>
                <CustomButton disabled={showPrint} href={!showPrint && printData.scheme ? `http://41.210.32.16/bpt/app/assets/printables/statement_three?accountno=${printData.acc}&sid=${printData.scheme}&d_f=${printData.from_date}&d_t=${printData.to_date}` : null} color={"success"}  text="Print" endIcon={<FaPrint/> }/>
                </div>
          </div>
        </div>
 
    <CustomTable 
    ModalType="validate" 
    tableHeading={[
    {
      id: 'id',
      label: '#',
      minWidth:10,
      align: 'left'
    },
    {
      id: 'date',
      label: 'Date',
      minWidth:60,
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'scheme',
      label: 'Scheme',
      minWidth: 40,
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'description',
      label: 'Description',
      minWidth: 60,
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'amount',
      label: 'Amount',
      minWidth: 60,
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

export default Transactions