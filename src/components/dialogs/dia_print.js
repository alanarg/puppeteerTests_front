import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import './styles.css';


export default function ResponsiveDialog(props) {
  const [open, setOpen] = React.useState(false);
  const otherImages = props.otherImages;


  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <div>
      <div>
      <Button variant="outlined" style={{color:'#00E0A6', borderColor:'#00E0A6'}} onClick={handleClickOpen}>
        Print 
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
          <img src={props.image} width="100%"  alt="print"/>
          {otherImages?otherImages.map((image)=>{
            return (<img src={image} width="100%"  alt="print"/>);

          }):null}
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

