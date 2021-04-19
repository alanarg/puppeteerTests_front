import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextArea from '@material-ui/core/TextareaAutosize';
import { Button } from '@material-ui/core';
import api from '../services/api';
import FromRegra from './formRegra';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  add:{
      color:'green'
  },
  del:{
    color:'red'
  },
  edit:{
    color:'blue '
  },
  textarea:{
    width:'100%'
  }
});



export default function ListRules(props) {
  const classes = useStyles();
  let regras = props.rules.data;
  let sistema = props.sistema;
  let time = null
  const [enter, setEnter] = useState('');
  const [aux, setAux] = useState(false);
  
  
  
  async function handleDel(id){
    try {
  
      //Excluindo elemento da tela primeiro para depois executar 
      //a request de delete
      let regra = document.getElementById(id);
      regra.style.display = 'none';
  
      await api.delete(`/regra/${id}`,{headers: {'Content-Type': 'application/json'}}).then(t=>{
        return t;
      });
      
    } catch (error) {
      return error;
    }
  }
  
  function handleChange(t,id){
    clearTimeout(time)
    time = setTimeout(()=>{     
          setEnter(t);
          console.log(t);
          let index = regras.find(e => e._id === id);
          index.descricao = t;
          // regras[index].descricao = t;
   }, 2000);
  }
  
  async function Edit(id) {
   try {
   
      setAux(!aux);
      console.log(enter);
       await api.put(`/regra/${id}`,{descricao:enter},{headers: {'Content-Type': 'application/json'}}).then(t=>{
          return t;
       });

   } catch (error) {
      return error;
   }
   
  }

  
  return (
    <div className={classes.root}>
        <Accordion>
        <AccordionSummary
          expandIcon={<Button  className={classes.add}>Add</Button>}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={<ExpandMoreIcon/>}
            label='Adicionar nova regra ao sistema tal'
          />
        </AccordionSummary>
        <AccordionDetails>
          <FromRegra system={sistema}/>
        </AccordionDetails>
      </Accordion>
    {regras?regras.map(r => 
      <Accordion id={r._id}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
        >
        <Button className={classes.del} onClick={()=>handleDel(r._id)}>Del</Button>

          <FormControlLabel
            aria-label="Acknowledge"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={<Button ></Button>}
            label={` ${r.titulo} criado em ${r.createdAt}`}
          />

        </AccordionSummary>
        <Button className={classes.edit} onClick={()=> setAux(!aux)}>EDIT</Button>  

        <AccordionDetails>
          {aux?null:<Typography color="textSecondary">
            {r.descricao}
          </Typography>}
          {/* colcoando campo para edição quando clicado em EDIT */}
          {aux?<><TextArea className={classes.textarea} onChange={e=> e.preventDefault(handleChange(e.target.value,r._id))} defaultValue={r.descricao}/><Button className={classes.edit} onClick={()=> Edit(r._id)}>OK!</Button></>:null}
        </AccordionDetails>
      </Accordion>
    ):null}
     
    </div>
  );
}
