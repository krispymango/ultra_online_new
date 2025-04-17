import React,{useState} from 'react';
import {useForm,Controller} from 'react-hook-form';
import CustomDateInput from '../../components/CustomDateInput';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CustomTable from '../CustomTable';
import * as XLSX from 'xlsx'
import CustomEditableTable from '../CustomEditableTable';
import CustomButton from '../CustomButton';
import { FaArrowRight, FaChevronRight, FaCloudUploadAlt, FaFileExcel, FaFilePdf, FaFileUpload, FaInfoCircle, FaRegFilePdf, FaShare } from 'react-icons/fa';

import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';


import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    border: '2px solid #fff',
    boxShadow: 24,
    p: 4,
    maxHeight:'80%',
    overflowY:'scroll'
  };


function CustomExcelUpload({header,onClick,newRecord,downloadFile,InputField}) {
  const {control, handleSubmit, formState:{errors}, setValue } = useForm();

  const [open, setOpen] = useState(true);
      // on change states
  const [excelFile, setExcelFile]=useState(null);
  const [excelFilename, setExcelFilename] = useState('No file chosen');
  const [excelFileError, setExcelFileError]=useState(null);  
 
  // submit
  const [excelData, setExcelData]=useState(null);
  // it will contain array of objects

  // handle File
  const fileType=['application/vnd.ms-excel','application/xls','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
  const handleFile = (e)=>{
    let selectedFile = e.target.files[0];
    if(selectedFile){
      // ////////console.log(selectedFile.type);
      if(selectedFile&&fileType.includes(selectedFile.type)){
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload=(e)=>{
          setExcelFileError(null);
          setExcelFilename(selectedFile.name);
          setExcelFile(e.target.result);
        } 
      }
      else{
        setExcelFileError('Please select only excel file types');
        setExcelFile(null);
      }
    }
    else{
      ////////console.log('plz select your file');
    }
  }

  // submit function
  const handleSubmitExcel = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: 'buffer' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
  
      // Add a unique ID to each row
      const dataWithUniqueIds = data.map((row, index) => ({
        //id: `${index + 1}`,
        id: `${randomId()}`,
        ...row
         // You can customize the format of the ID
      }));
  
      ////////console.log(dataWithUniqueIds);
      setExcelData(dataWithUniqueIds);
    } else {
      setExcelData(null);
    }
  }


  const handleClose = () => {
    onClick(false);
  }

  return (
    <>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
<Box sx={style}>
<h2 style={{width:'99%',margin:'0px auto'}}>Batch Upload <Tooltip title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book" >
                <IconButton ><FaInfoCircle style={{fontSize:'14px',cursor:'pointer',color:'#696969'}} /></IconButton>
                </Tooltip></h2>
{/* upload file section */}
<div className='form'>
  <form  autoComplete="off"
  onSubmit={handleSubmitExcel}>
  <div >
  <div className='inputFieldTwoMini'>
  <div>
   <label><h4>2) Download Excel Template:</h4></label>
   <div style={{display:'grid',gridRowGap:'10px'}}>
    <div style={{width:'fit-content',marginBottom:'30px'}}>
      <div >
      {
      downloadFile
    }
      </div>
    </div>
   </div>
   {/* <CustomButton href="http://196.175.251.141:88/ultra/app/assets/templates/Schedule-template.xlsx" startIcon={<FaFileExcel/>} text="Excel Template" /> */}
   </div>
  </div>
  <div style={{width:'fit-content'}}>
<div>
<label ><h4 style={{margin:'0px'}}>3) Upload Excel file:</h4></label>

<div style={{borderRadius:5,marginTop:'10px'}}>
{
  InputField
}
      <div> 
    <label style={styles.selectFileButton} htmlFor="fileInput">
    <FaCloudUploadAlt/> <a style={{marginLeft:5,fontFamily:'Lato, sans-serif',fontSize:'14px'}} >  Choose file</a>
      </label>

      <span style={{backgroundColor:'#E8E8E8',padding:'10px 60px',display:'inline-block'}}>{excelFilename && excelFilename.length > 15 ? excelFilename.substring(0,12) + '...' : excelFilename}</span>
<input accept='application/vnd.ms-excel,application/xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' style={{display:'none'}} id="fileInput" type='file' className='form-control'
onChange={handleFile} required/>                
{excelFileError&&<div className='text-danger'
style={{marginTop:5+'px'}}><p style={{color:'red'}}>{excelFileError}</p></div>}
</div>
<button style={styles.subButton} type='submit' className='btn btn-success'>Preview <FaChevronRight/> </button>
    </div>
</div>
  </div>
  </div>
  </form>
</div>

<br></br>
<div style={{borderBottom:'1px solid #D1D1D1'}}></div>

{/* view file section */}
<h4>View Excel File:</h4>
<div className='viewer'>
  {excelData===null&&<>No file selected</>}
  {excelData!==null&&(
    <div className='table-responsive'>
        {/* <CustomTable 
    ModalType="messages"
    tableHeading={header} 
    tableRows={excelData}/> */}


<CustomEditableTable
tableHeading={header}
tableRows={excelData}
newRecord = {newRecord}
/>
    </div>
  )}       
</div>

</Box>
</Modal>
</>
  )
}


const styles = {
  selectFileButton: {
  backgroundColor: '#1976d2',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  textTransform:'uppercase',
  marginRight:10,
  fontFamily:'Lato, sans-serif'
  },
  subButton:{
  marginTop:'15px',
  backgroundColor: '#1976d2',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  textTransform:'uppercase',
  border:'none',
  fontFamily:'Lato, sans-serif'
  }
}

export default CustomExcelUpload