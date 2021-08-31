import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { Form, Input} from 'antd';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import './styles.css';
import api from '../../services/api';

export default function ResponsiveDialog(props) {
  const [open, setOpen] = React.useState(false);
  const otherImages = props.otherImages;


  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const onFinish = async (values) => {
    try {
      console.log(values.captcha);
      await api.post('/captcha',{"captcha":values.captcha},{headers: {'Content-Type': 'application/json'}});
    } catch (error) {
      console.log(error);
    }

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
        {/* <DialogTitle id="responsive-dialog-title">{"CAPTCHA"}</DialogTitle>
      <DialogContent >
      <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
        <Form.Item
         label="Captcha"
          name="captcha"
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
           Submit
        </Button>
        </Form.Item>
      </Form>


        <img src={`${process.env.REACT_APP_API_URL}/captcha.jpg`} width="100%"  alt="print"/>
         */}
       
      {/* </DialogContent> */}
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

