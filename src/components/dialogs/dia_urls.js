import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import {makeStyles} from '@material-ui/core/styles';

import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './styles.css';



const useStyles = makeStyles(theme =>({
    di_text:{
        width:'100%',
        wordWrap:'break-word',
        margin:'10px',
        color:'#000000'
    }

}));
export default function ResponsiveDialog(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  // const urlsRequest = props.ursreq;
  const urlsResponse = props.ursres;


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div>   
      <Button variant="outlined" style={{color:'#00E0A6',  borderColor:'#00E0A6'}} onClick={handleClickOpen}>
        URLs Requisitadas
      </Button>
      </div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Requests"}</DialogTitle>
        
        <DialogContent >
          <h1>Requests</h1>
          <DialogContentText className={classes.di_text}>
            <ul>
                { urlsResponse?urlsResponse.map(r=>{
                     return <li><Typography><b>URL:</b>{r.url}<br></br><b>Status:</b>{r.status}</Typography></li>
                }):null}
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            fechar
          </Button>
          {/* <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}

