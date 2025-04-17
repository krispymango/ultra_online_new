import React,{useEffect, useState} from 'react';
import {useForm,Controller} from 'react-hook-form';
import dayjs from 'dayjs';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import CustomModal from '../CustomModal';
import { FaChair, FaCheck, FaEdit, FaEye,FaInfoCircle, FaMinus, FaTimes, FaPrint, FaTrashAlt, FaCopy, FaBook  } from 'react-icons/fa';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from '../CustomButton';

import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { v4 as uuidv4 } from 'uuid';
import CustomInput from '../CustomInput';
import CustomDateInput from '../CustomDateInput';
import CustomUploadButton from '../CustomUploadButton';
import { Approval } from '@mui/icons-material';
import CustomLoader from '../CustomLoader';
import CustomMessageBox from '../CustomMessageBox';
import CustomSelect from '../CustomSelect';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '70%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};



function CustomTable({tableHeading,tableRows,ModalType,role,modalColumns,tableHeight,leftTotalSpaces,showTotal,extraData,returnValue=[]}) {
  const {control, handleSubmit, formState:{errors},setValue} = useForm();
 const [page, setPage] = useState(0);
 const [rowsPerPage, setRowsPerPage] = useState(10);
 const [showModal, setShowModal] = useState(false);
 const [modalData,setModalData] = useState([]);    
 const [loader,setLoader] = useState(false);
 const [insType,setInsType] = useState('');  
 const [insId,setInsId] = useState();
 const [inssId,setInssId] = useState();
 const [idData,setIdData] = useState();
 const [errBox,seterrBox] = useState(0);
 const [errorMessage,setErrorMessage] = useState('');
 const [ffCategory,setFFCategory] = useState([]);   
 const [ffProduct,setFFProduct] = useState([]);   
 const [fetchedCompanyData,setfetchedCompanyData] = useState([]);
 const [fetchedDepartmentData,setfetchedDepartmentData] = useState([]);

  
  function createData(name, code, population, size) {
    return { name, code, population, size};
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const checkUserLogged = () => {
    try 
    {

    } catch (error) {
      setLoader(false);
      seterrBox(false);
    }
}

  const setErrorBox = (numData) => 
  {
    seterrBox(numData);
    setTimeout(() => {
      seterrBox(0);
  }, 5000);
  }


  const readNotification = (value) => 
    {
      ////console.log(value);
      
         setLoader(true);
       
   
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
          extraData(true);
           setModalData(jsonData.data[0]);
           setShowModal(true);
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

    
  return (
    <>
        { loader ? <CustomLoader/> : null}
        {errBox == 1 ? <CustomMessageBox transition="down" display={()=>seterrBox(false)} type="success" horizontal="right" message={errorMessage} /> : errBox == 2 ? <CustomMessageBox transition="down" type="error" display={()=>seterrBox(false)} horizontal="right" message={errorMessage} /> : null }
       
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
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: tableHeight ? tableHeight : 440, height : tableHeight ? tableHeight : 400}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow >
              {tableHeading.map((column) => {
                // if (column.id === 'scheme') {
                //   return (
                //   <TableCell 
                //   key={column.id}
                //   align={column.align}
                //   style={{ minWidth: column.minWidth,textTransform:'capitalize' }}
                // >
                //   {column.label}
                    
                //   <Tooltip title="Approval Status" >
                //     <IconButton style={{marginLeft:'0px'}}><FaInfoCircle style={{fontSize:'14px',cursor:'pointer',color:'#696969'}} /></IconButton>
                //   </Tooltip>
                // </TableCell>
                //   );
                // }


                return (
                <TableCell 
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth,textTransform:'capitalize'}}
                >
                  {column.label}
                </TableCell>
                );
})}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(tableRows) && tableRows.length > 0 ? tableRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {tableHeading.map((column) => {
                      const value = row[column.id];
                      if (column.id === 'actions') {
                        if (ModalType === 'modify')
                        {
                          return (
                            <TableCell key={column.id} style={{display:'flex',gap:'10px'}} align="left">
                              <Button disableElevation startIcon={<FaEdit/>} size="small"  variant="contained">Edit</Button>
                              <Button disableElevation color='error' startIcon={<FaTrashAlt/>} size="small" variant="contained">Delete</Button>
                            </TableCell>
                          );
                        }
                        else if (ModalType === 'subject')
                        {
                          return (
                            <TableCell key={column.id} style={{display:'flex',gap:'10px'}} align="left">
                              <Button disableElevation startIcon={<FaEdit/>} size="small"  variant="contained">Edit</Button>
                              <Button disableElevation color='error' startIcon={<FaTrashAlt/>} size="small" variant="contained">Delete</Button>
                            </TableCell>
                          );
                        }
                        else if(ModalType === 'edit')
                        {
                          return (
                            <TableCell key={column.id} style={{display:'flex',gap:'10px'}} align="left">
                              <Button disableElevation startIcon={<FaEdit/>} size="small" variant="contained">Edit</Button>
                            </TableCell>
                          );
                        }
                        else if(ModalType === 'notification')
                        {
                          return (
                            <TableCell key={column.id} align="left">
                              <Button disableElevation startIcon={<FaBook/>} onClick={()=>readNotification(row.actions)} size="small" variant="contained">Read</Button>
                            </TableCell>
                          );
                        }
                        else if(ModalType === 'delete')
                        {
                          return (
                            <TableCell key={column.id} style={{display:'flex',gap:'10px'}} align="left">
                              <Button disableElevation color='error' startIcon={<FaTrashAlt/>} size="small"  variant="contained">Delete</Button>
                            </TableCell>
                          );
                        }
                        else if(ModalType === 'print')
                        {
                          return (
                            <TableCell key={column.id} style={{display:'flex',gap:'10px'}} align="left">
                              <Button disableElevation color='success' startIcon={<FaPrint/>} size="small"  variant="contained">Print</Button>
                            </TableCell>
                          );
                        }
                        else
                        {
                          return (
                            <TableCell key={column.id} align="left">
                              <Button disableElevation startIcon={<FaEye/>} size="small"  variant="contained">View</Button>
                            </TableCell>
                          );
                        }
                      }

                      if (column.id === 'status') {
                        //#CACFD2
                        return (
                          <TableCell key={column.id} align="left">
                            <div style={{textAlign:'center',
                            color:value == 1 ? '#CACFD2' :  value == 0 ? '#239B56' : value == 2 ? '#A93226' : 'white',
                            padding:'5px',
                            borderRadius:'20px',
                            fontSize:'12px',
                            border:value == 1 ? '1px solid #CACFD2' :  value == 0 ? '1px solid #239B56' : value == 2 ? '1px solid #A93226' : ''}}>
                            {value == 1 ? 'read' :  value == 0 ? 'unread' : 'N/A'}
                            </div>
                          </TableCell>
                        );
                      }

                      if (column.id === 'todo_status') {
                        return (
                          <TableCell key={column.id} align="left">
                            <div style={{textAlign:'center',color:'white',padding:'5px',borderRadius:'20px',background:value == 1 ? '#CACFD2' :  value == 0 ? '#A93226' : value == 2 ? '#A93226' : ''}}>
                            {value == 1 ? 'Active' :  value == 0 ? 'Closed' : 'N/A'}
                            </div>
                          </TableCell>
                        );
                      }


                      if(column.id === 'token')
                        {
                          return (
                            <TableCell key={column.id} style={{display:'flex',gap:'10px'}} align="left">
                       
                            </TableCell>
                          );
                        }

                      if (column.id === 'role') {
                        return (
                        <TableCell key={column.id} align="left">
                        {value == 1 ? 'Super Admin' :  value == 0 ? 'User' : value == 2 ? 'Admin' : 'N/A'}
                        </TableCell>
                        );
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  
                );
              }) : 
              <>{Array.from({ length: 10 }).map((_, rowIndex) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                  {tableHeading.map((val, index) => (
                    <TableCell key={val.id} align="left">
                      <Skeleton width="80%" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
                </>
            }
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer sx={{ marginTop:2}}>
        <Table>
        <TableBody>
      {showTotal ?
          <>

          <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell>Grand Total : </TableCell>
          <TableCell align="right">{showTotal ? showTotal.gta : ''}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={4}></TableCell>
          <TableCell colSpan={1}>Total Market Price : </TableCell>
          <TableCell align="right">{showTotal ? showTotal.gmp : ''}</TableCell>
        </TableRow>


        <TableRow>
          <TableCell colSpan={4}></TableCell>
          <TableCell colSpan={1}>Total Cost Price : </TableCell>
          <TableCell align="right">{showTotal ? showTotal.gcp : ''}</TableCell>
        </TableRow>


        <TableRow>
          <TableCell colSpan={4}></TableCell>
          <TableCell colSpan={1}>Total Profit : </TableCell>
          <TableCell align="right">{showTotal ? showTotal.gp : ''}</TableCell>
        </TableRow>
        </>
          : null}
          </TableBody>
        </Table>
        </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={tableRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
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

export default CustomTable