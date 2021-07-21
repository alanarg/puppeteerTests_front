import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import {makeStyles} from '@material-ui/core/styles';

import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import './styles.css';



const useStyles = makeStyles(theme =>({
    di_text:{
        width:'100%',
        wordWrap:'break-word'
    }

}));
export default function ResponsiveDialog(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const logs = props.log;
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    console.log(logs);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div>
      <Button variant="outlined" style={{display:'flex',color:'#00E0A6', borderColor:'#00E0A6'}} onClick={handleClickOpen}>
        Console Content
      </Button>
      </div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Console Content"}</DialogTitle>
        <DialogContent >
          <DialogContentText className={classes.di_text}>
          <ul>
                {logs?logs.map(r=>{
                     return <li><Typography>{r}</Typography></li>;
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

