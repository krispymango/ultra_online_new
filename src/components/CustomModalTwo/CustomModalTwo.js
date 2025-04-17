import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FaInfoCircle } from 'react-icons/fa';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CustomButton from '../CustomButton';
import Skeleton from '@mui/material/Skeleton';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  border: '2px solid #fff',
  boxShadow: 24,
  p: 4
};

function CustomModalTwo({render,onClick,heading,data}) {
  
  const [open, setOpen] = useState(true);
  const [data, setData] = useState(true);
    const handleClose = () => {
      onClick(true);
      //setOpen(false);
    }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <h2> { heading ? heading : 'Details' } </h2>

            { data ?
            <>
            <div style={{maxHeight:'65vh',overflowY:'scroll'}}>
            {render}
            </div>
          </>
          :
          <>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gridRowGap:'30px',gridColumnGap:'10px',width:'90%',margin:'0px auto'}}>
           
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
          </div>
          
          <div style={{ margin:'0px auto',width:'80%',display:'grid',gridTemplateColumns:'repeat(2,1fr)',gridRowGap:'10px',gridColumnGap:'10px',marginTop:'20px',}}>
          <Skeleton height={90}/>
          <Skeleton height={90}/>
          </div>
          </>
            }
        </Box>
      </Modal>
    </div>
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
  },
  itemHeading:{
    fontSize:'14px',
    color:'#909497'
  }
}

export default CustomModalTwo