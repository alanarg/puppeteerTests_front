import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button} from 'antd';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import logo from './sgig08.jfif';




const useStyles = makeStyles(theme => ({
  // eslint-disable-next-line
  root: {
    flexGrow:1,


  },
  image: {
   alignContent:'center'
  },
  paper: {

    display: 'fixed',
    width:'100%',
    alignItems: 'center',
    
    marginRight: theme.spacing(4),



  },
  paper2:{
    width:'100%',
    maxWidth:'300px',
    justifyContent:'center',
    flex:4,
    alignContent:'center',
    padding: theme.spacing(6),
    borderRadius:'10px',
    backgroundColor:"#00E0A6",

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    display:'flex',
  },
  form: {
   width:'100%',
   alignItems: 'center',
    justifyContent:' center',
    justifyItems:'center',
    alignContent:'center',
   
    marginLeft: theme.spacing(4),

  },
  submit: {
    width:'100%',
    background:'#00E0A6',
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const history = useHistory();

  const onFinish = (values) => {
    console.log(values)
    localStorage.setItem("usuario",values.username);
    localStorage.setItem("senha",values.password);
    
    history.push("/");

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
      <>
      <Paper className={classes.paper2} elevation={20} >
    <Grid container direction="row"  justify="center" alignItems="center" component="main"  spacing={8}>
      <Grid item xs >
            {/* eslint-disable-next-line */}
          <Paper elevation={0,5} style={{marginLeft:'6px', padding:'8px', borderRadius:'5px', width:'200px'}} >
          <img alt='logo' width="190px" src={logo} ></img>

          </Paper>
            </Grid>
            {/* eslint-disable-next-line */}     
      <Paper elevation={0,5} style={{ borderRadius:'15px', backgroundColor:'#e6fff2'}} >
      <Grid item xs direction="column" className={classes.paper}>
        <div  className={classes.form}> 

        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
        </div>
      </Grid>
      </Paper>
    
    </Grid>
    </Paper>
    </>
  );
}