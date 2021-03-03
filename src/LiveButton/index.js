import React,{useState} from 'react';
import {Checkbox,FormControlLabel} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    button: {
      backgroundColor:'#00E0A6', 
        color:'white',
        margin:'10px'
    }
});

const LiveButton = () =>{
  const [checked,setChecked] = useState(false);

  function handleChange(){
    setChecked(!checked);
  }
    return(
    <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={handleChange}
            name="checkedB"
            style={{color:'#00E0A6'}}
          />
        }
        label="Visualizar teste no navegador"
      />
    );
}


export default LiveButton;