import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import foto from './sgig08.jfif';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import logo from '../login/logofree.jpg';
import Drawer from '../drawer/index';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
 
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  logo:{
    width:'10%',
    height:'7%',
    borderRadius:'15px'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

const SearchAppBar = () => {
    const classes = useStyles();
    
  return (
      <>
    <div className={classes.root}>
      <AppBar position="static" width="100%" style={{backgroundColor:'#00E0A6'}}>
        <Toolbar style={{ padding:'5px'}}>
        <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
          >
            <Drawer />
          </IconButton>
        <div align="start">
          <img src={foto} className={classes.logo}/>

          </div>
        
          {/* logo */}
          {/* <Paper style={{width:'300px', borderRadius:'10px', padding:'3px'}}>
           <img alt="logo" src={logo} width='200px'></img>
          </Paper> */}
          {/* <div className={classes.search}>
            

          </div> */}
          

        </Toolbar>
      </AppBar>
    </div>
    </>
  );
            
            
}
export default SearchAppBar;