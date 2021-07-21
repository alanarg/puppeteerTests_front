import React, {useState } from 'react';
import SearchAppBar from '../../components/Appbar/index';
import {Grid,Paper, Typography, TextareaAutosize, Button, Chip} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import api from '../../services/api';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogP from '../../components/dialogs/dia_print';
import DialogU from '../../components/dialogs/dia_urls';
import DialogL from '../../components/dialogs/dia_logs';


import './styles.css';


const useStyles = makeStyles(theme =>({
    root:{
        display:'flex',
        width:'100%',
        alignItems:'center',
        backgroundColor:'#e6ffff',
    },
    paper:{
        display:'flex',
        borderRadius:'10px',
        width:'90vw',
        height:'50vh',
        padding:'10px',
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(5),
        marginTop: theme.spacing(5),


    },
    paper2:{

    },
    list:{
        listStyleType: 'none',  

    },
    botao:{
        backgroundColor:'#00E0A6', 
        color:'#FFFFFF',
        marginTop:'10px'
    },
    container:{
        width:'100%'
    },
    textArea:{
        display:'flex',
        borderColor:'#00E0A6',
        background:'#363636',
        color:'white',
        borderRadius:'15px',
        overflow: 'hidden',
        width:'100%',
        height:'100px'

    },
    tree:{
    
        display:'flex',
        width:'100%'
          
    },
    treeItem:{
        width:'100%',
        wordWrap:'break-word'
    },
    dialog:{
       margin:'5px' 
    }

}));

const  Main = ()  =>{
    const classes = useStyles();
    const [enter, setEnter] = useState("");
    const [status, setStatus] = useState("");
    const [urls, setUrls] = useState(['']);
    const [logs, setLogs] = useState(['']);
    const [i, setI] = useState(0);
    const [print, setPrint] = useState('');
    const [boo, setBoo] = useState(false);
    const [resposta, setResposta] = useState(['']);
    let time = null


    //  let tgtv =0
    //Simples debounce para a inserção do obejto de entrada
    function handleChange(t){
        clearTimeout(time)
         time = setTimeout(()=>{
            try {
                //validando scopo JSON
               var obj = JSON.parse(t);
               var pretty = JSON.stringify(obj, undefined, 1);
               document.getElementById('myTextArea').value = pretty;
                setEnter(t);
                console.log(t);         

            } catch (error) {
                alert("Preencha corretamente os casos de teste");
            }
       
            }, 1000);
    }

    //Faz a requisição da API rodando puppeteer
    async function handleSubmit(){
        try{
            //variável para loading
            setBoo(true);
            //limpando resposta anterior
            setResposta(['']);
            await api.post('/gedcorp_publico',enter,{headers: {'Content-Type': 'application/json'}}).then(t=>{
                setBoo(false);
                //status da requisição geral
                setStatus(t.status);

                let re = Object.values(t.data.data)
                console.log(re);

                return setResposta(re);


            });

        }catch(error){

            setBoo(false);
            console.log(error);

        }


    }

    // Vai para os resultados do seguinte caso de teste descrito no JSON
    function handleCase(){
        console.log(i);

        if(i<resposta.length){
            console.log('ii');
            //Setta os logs e urls específicas dos casos
            setLogs(resposta[i].logs);
            setUrls(resposta[i].urls);
            setPrint(resposta[i].print);
        }

        return setI(i+1);

    }

    

    return (
        <> 

        <SearchAppBar/>
        <div className={classes.root}>
                    <Grid container direction="column" alignItems="baseline" justify="center" spacing={-1}>
                        <Grid item xs={12} spacing={1} >
                            <Paper className={classes.paper} elevation={20}>
                            <Grid container className={classes.container} alignItems="flex-right" spacing={2}>
                            
                                <Grid item xs={4}>
                                <Typography variant="h6" style={{color:"#00E0A6"}}>
                                    Casos de teste <i><b>REDESUAS</b></i>
                                </Typography>
                                <Typography style={{fontSize:"10px", color:"blue"}}>
                                    Descreva com um JSON os casos de testes
                                    corretamente pontuados
                                </Typography>
                                <TextareaAutosize 
                                    spellCheck={false}
                                    className={classes.textArea}
                                    rowsMax={14}
                                    id="myTextArea"
                                    aria-label="maximum height"
                                    placeholder="JSON de entradas"
                                    defaultValue=' [{   
                                            "nome":"PORTARIA",
                                            "tipo_documento":"ANEXO",
                                            "numero":"12",
                                            "data":"002/12/2010",
                                            "assunto":"aaaa",
                                            "resumo":"bbb",
                                            "texto_do_documento":"ccc"
                                        }]'
                                        onChange={e=> e.preventDefault(handleChange(e.target.value))}
                                />
                                <Button className={classes.botao} disabled={boo} onClick={handleSubmit}>
                                    Testar {boo?<CircularProgress style={{color:'white'}}/>:null}
                                </Button>
                                <Button style={{width:'50px', backgroundColor:'#c1c1c1', height:'25px', marginLeft:'50px'}}  onClick={handleCase}>
                                    next
                                </Button>

                                </Grid>

                                <Grid item xs={8}>
                                <Typography variant="h12" >
                                    functions: <Chip label="Pesquisar"></Chip>
                                </Typography>
                                <Typography variant="h6" >
                                    Resultados dos casos de teste 
                                </Typography>
                                <ul className={classes.list}>
                                    <li>
                                        <span>
                                            Status:{status}
                                        </span>
                                        
                                    </li>
                                   
                                </ul>
                                <div style={{display:'flex', marginTop:'10px'}}>

                                <DialogU urs={urls} />
                                <DialogL log={logs}/>
                                <DialogP  image={print}/>

                                </div>
                                
                                   
                                </Grid>
                                
                            </Grid>
                            
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper} elevation={20}>
                            <Grid container className={classes.container} alignItems="flex-right" spacing={2}>
                            
                            

                        </Grid>
                            </Paper>    
                        </Grid>

                    </Grid>
                    </div>
                    
      </>
    );
}


export default Main;