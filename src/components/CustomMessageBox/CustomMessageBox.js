import React,{useState} from 'react'
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import Grow from '@mui/material/Grow';


//error , warning, success, info

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

function GrowTransition(props) {
  return <Grow {...props} />;
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function CustomMessageBox({message,type,vertical,horizontal,transition,display}) {
  const [open, setOpen] = useState(true);


  const handleClose = () => {
    //setOpen(false);
    display(false);
  };


  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: vertical ? vertical : 'top', horizontal: horizontal ? horizontal : 'left' }}
        TransitionComponent={transition == 'left' ? TransitionLeft : transition == 'right' ? TransitionRight : transition == 'up' ? TransitionUp : transition == 'down' ? TransitionDown : GrowTransition}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>{message}</Alert>
        </Snackbar>
    </>
  )
}

export default CustomMessageBox