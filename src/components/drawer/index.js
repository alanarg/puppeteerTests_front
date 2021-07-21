import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import {Link} from 'react-router-dom';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/ViewList';

const useStyles = makeStyles({
  list: {
    width: 250,
    backgroundColor:'#e6fff2',

  },
  fullList: {
    width: 'auto',
  },
  large: {
    width: "80px",
    height: "80px",
    margin:"20px",
  },
  texto:{
    color:'black',
    fontSize:'20px',
    fontFamily:'Potta One '
  }
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
    
          <ListItem button >
            <Link to="/GEDCORP"> <ListItemText className={classes.texto} >GEDCORP</ListItemText></Link>
          </ListItem>
          
          <ListItem button >
            <Link to="/REDESUAS"> <ListItemText className={classes.texto}  >REDESUAS</ListItemText></Link>
          </ListItem>
          
          <ListItem button >
            <Link to="/PESQUISAMS_ADMIN"><ListItemText className={classes.texto} >PESQUISAMS</ListItemText></Link>
          </ListItem>

          <ListItem button >
            
            <Link to="/VALEUNIVERSIDADE_ACADEMICO"><ListItemText className={classes.texto}>VALEUNIVERSIDADE ACADEMICO</ListItemText></Link>

          </ListItem>
          <ListItem button >
            
            <Link to="/VALEUNIVERSIDADE_ADM"><ListItemText className={classes.texto}>VALEUNIVERSIDADE ADM</ListItemText></Link>

          </ListItem>
        
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer('left', true)}><AccountCircle/></Button>
      
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
     
    </div>
  );
}
