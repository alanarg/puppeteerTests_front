import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import logo from './logofree.jpg';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
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

  return (
      <>
      <Paper className={classes.paper2} elevation={20} >
    <Grid container direction="row"  justify="center" alignItems="center" component="main"  spacing={8}>
      <CssBaseline />
      <Grid item xs >
          <Paper elevation={0,5} style={{marginLeft:'6px', padding:'8px', borderRadius:'5px', width:'200px'}} >
          <img alt='logo' width="190px" src={logo} ></img>

          </Paper>
           
            </Grid>
      <Paper elevation={0,5} style={{ borderRadius:'15px', backgroundColor:'#e6fff2'}} >
      <Grid item xs direction="column" className={classes.paper}>
        <div  className={classes.form} >
          <Avatar className={classes.avatar}>
            A
          </Avatar>
        
          <form  noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              size="small"
              required
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <br></br>
            <TextField
              variant="outlined"
              margin="normal"
              required
              color='#00E0A6'
              size="small"
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              style={{display:'flex'}}
            />
            <Button
              type="submit"
              variant="contained"
              style={{backgroundColor:'#00E0A6', width:'78%'}}
            >
              ENTRAR
            </Button>
          
            <Grid container direction="column">
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueci minha senha
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Não é cadastrado? Cadastre-se"}
                </Link>
              </Grid>
              
            </Grid>
           

            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
      </Paper>
    
    </Grid>
    </Paper>
    </>
  );
}