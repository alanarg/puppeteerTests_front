import React, {useState} from 'react';
import SearchAppBar from '../Appbar/index';
import {Grid,Paper, Typography, TextareaAutosize, Button, Chip} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import api from '../services/api';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogP from '../dialogs/dia_print';
import DialogU from '../dialogs/dia_urls';
import DialogL from '../dialogs/dia_logs';
import RegraTable from '../Regras/index';


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
        margin:'10px'
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
        overflow: 'visible',
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
    },
    chip:{
        scrollMarginBottom:'2em',
        backgroundColor:'#00E0A6'
    }

}));

const  Main = ()  =>{
    const classes = useStyles();
    const [enter, setEnter] = useState("");
    const [status, setStatus] = useState("");
    const [urlsreq, setUrlsreq] = useState(['']);
    const [urlsres, setUrlsres] = useState(['']);
    const [logs, setLogs] = useState(['']);
    const [i, setI] = useState(0);
    // const [pesqChip, setpesqChip] = useState(['']);
    const [editing, setEditing] = useState(false);
    const [print, setPrint] = useState('');
    const [regras, setRegras] = useState([]);
    const [validado,setValidado] = useState(true);
    const [boo, setBoo] = useState(false);
    const [resposta, setResposta] = useState(['']);
    // const [ruleaux, setRuleaux] = useState(false)
    let time = null



    
    //  let tgtv =0
    //Simples debounce para a inserção do obejto de entrada
    function handleChange(t){
        setValidado(true);
        setEditing(true);

        try {
            //validando scopo JSON
            var obj = JSON.parse(t);
            var pretty = JSON.stringify(obj, undefined, 1);
            document.getElementById('myTextArea').value = pretty;            
        } catch (error) {

            setValidado(false);
            
        }


        clearTimeout(time)
         time = setTimeout(()=>{
            try {
                
               setEnter(t);
               setEditing(false);
                // console.log(t);         

            } catch (error) {
                setValidado(false);
            }
       
            }, 2000);
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
            setUrlsreq(resposta[i].urlsRequest);
            setUrlsres(resposta[i].urlsResponse);

            setPrint(resposta[i].print);
        }

        return setI(i+1);

    }
    
    // Carrega as regras do sistema
    async function handleChip(system){
          console.log(system);
        try{
            //variável para loading
            setBoo(true);
   
            await api.get( `/regra/gedcorp/${system}` ,{headers: {'Content-Type': 'application/json'}}).then(t=>{
                setBoo(false);
                setRegras(t);
            });
            return console.log(regras);


        }catch(error){

            setBoo(false);
            console.log(error);

        }

    }
    return (
        <> 

        <SearchAppBar/>
        <div className={classes.root}>
                    <Grid container direction="column" alignItems="baseline" justify="center" spacing={-1}>
                        <Grid item xs={12} spacing={1} >
                            <Paper className={classes.paper} elevation={20}>
                            <Grid container className={classes.container} alignItems="baseline" direction="flex-grow" spacing={2}>
                            
                                <Grid item xs={4}>
                                <Typography variant="h6" style={{color:"#00E0A6"}}>
                                    Casos de teste <i><b>GEDCORP PUBLICO</b></i>
                                </Typography>
                                {validado?null:<Typography style={{fontSize:"10px", color:"red"}}>
                                    Descreva com um JSON os casos de testes
                                    corretamente pontuados
                                </Typography>}
                                {editing?<Typography style={{fontSize:"10px", color:"green"}}>
                                    editando...
                                </Typography>:<Typography style={{fontSize:"10px", color:"blue"}}>
                                    pronto!
                                </Typography>}
                                <TextareaAutosize 
                                    spellCheck={false}
                                    className={classes.textArea}
                                    rowsMax={14}
                                    id="myTextArea"
                                    aria-label="maximum height"
                                    placeholder="JSON de entradas"
                                    defaultValue=' 
                                    {
                                    "ambiente":"hom.gedcorp.ms.gov.br",
                                    "visualizarTeste":false,
                                    "casos":[
                                        {
                                            "nome": "PORTARIA",
                                            "tipo_documento": "",
                                            "numero": "",
                                            "data": "",
                                            "assunto": "",
                                            "resumo": "",
                                            "texto_do_documento": ""
                                           }     
                                        ]
                                    }'
                                        onChange={e=> e.preventDefault(handleChange(e.target.value))}
                                />
                                    <div style={{display:'flex'}}>

                                {status?null:<Button className={classes.botao} disabled={boo} onClick={()=>handleSubmit}>
                                    Testar 
                                {boo?<CircularProgress style={{color:'white', display:'fixed'}} />:null}

                                </Button>}
                               
                                {status?<Button className={classes.botao}  onClick={()=>handleCase()}>
                                    Visualizar caso =>{i}/{resposta.length}
                                </Button>:null}
                                {status?<a href="/" style={{color:'blue', fontSize:'10px', width:'100px'}} >
                                    Testar novamente ...
                                </a>:null}
                                </div>
                                </Grid>

                                {/* CHIPS PARAMAPEAR REGRAS  */}
                                <Grid item xs={8}>
                                <Typography variant="h12" >
                                    Funcionalidades: <Chip label="pesquisa" className={classes.chip} onClick={ () => handleChip('pesquisa') }/>
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
                                <Grid
                                  container
                                  direction="column"
                                  justify="center"
                                  alignItems="flex-start"
                                >
                                    <Grid item>
                                        <DialogU ursreq={urlsreq} ursres={urlsres} />
                                    </Grid>
                                    <Grid item></Grid>
                                        <DialogL log={logs}/>
                                    </Grid>
                                    <Grid item>
                                        <DialogP  image={print}/>      
                                    </Grid>
                                    <Grid item>
                                       
                                        <RegraTable rules={regras} sistema='gedcorp'/>      
                                    </Grid>                        
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