import React, {useState } from 'react';
import SearchAppBar from '../../components/Appbar/index';
import {Chip,Grid,Paper, Typography, TextareaAutosize, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import api from '../../services/api';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogP from '../../components/dialogs/dia_print';
import DialogU from '../../components/dialogs/dia_urls';
import DialogL from '../../components/dialogs/dia_logs';
import RegraTable from '../../components/Regras/index';


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
        borderRadius:'5px',
        overflow: 'visible',
        width:'90%',
        height:'2000px'

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

const ValeAcademico = ()  =>{
    const classes = useStyles();
    const [enter, setEnter] = useState("");
    const [status, setStatus] = useState("");
    const [logs, setLogs] = useState(['']);
    const [i, setI] = useState(0);
    const [err, setErr] = useState('');
    const [print, setPrint] = useState('');
    const [urlsreq, setUrlsreq] = useState(['']);
    const [urlsres, setUrlsres] = useState(['']);
    const [boo, setBoo] = useState(false);
    const [validado,setValidado] = useState(true);
    const [resposta, setResposta] = useState(['']);
    const [editing, setEditing] = useState(false);
    const [regras, setRegras] = useState(['']);
    let time = null


    //  let tgtv =0
    //Simples debounce para a inserção do obejto de entrada
    function handleChange(t){
        setValidado(true);
        try {
                 //validando scopo JSON
                 var obj = JSON.parse(t);
                 var pretty = JSON.stringify(obj, undefined, 1);
                 document.getElementById('myTextArea').value = pretty;    
        } catch (error) {
                 setValidado(false);
                    
        }

        //Altera variavel para dizer q esta editando
        setEditing(true);

        clearTimeout(time);
         time = setTimeout(()=>{
             try {
                setEnter(t);

                console.log(t);
                //Não está mais editando     
                setEditing(false);


             } catch (error) {
                 setValidado(false);
             }
        

            }, 5000);
    }

    //Faz a requisição da API rodando puppeteer
    async function handleSubmit(){
        console.log(enter);
        // try{
            //variável para loading
            setBoo(true);
            //limpando resposta anterior
            setResposta(['']);
            await api.post('/vale_academico',enter,{headers: {'Content-Type': 'application/json'}}).then(t=>{
                setBoo(false);
                //status da requisição geral
                setStatus(t.status);

                let re = Object.values(t.data.data)
                console.log(re);

                return setResposta(re);


            }).catch(c => {
            setErr(c.toString());
            setBoo(false);
            setResposta(c.data);
            console.log(c.toString());
        });


    }

    // Vai para os resultados do seguinte caso de teste descrito no JSON
    function handleCase(){
        console.log(i);

        if(i<resposta.length){
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
        
      try{
          //variável para loading
          setBoo(true);
 
          await api.get( `/regra/valeuniversidade/${system}` ,{headers: {'Content-Type': 'application/json'}}).then(t=>{
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
                            <Grid container className={classes.container} direction="flex-grow" alignItems="baseline" >
                            
                                <Grid item xs={4}>
                                <Typography variant="h6" style={{color:"#00E0A6"}} >
                                    Casos de teste <i><b>VALE UNIVERSIDADE ACADEMICO</b></i>
                                </Typography>
                                {validado?null:<Typography style={{fontSize:"10px", color:"red"}}>
                                    Descreva com um JSON os casos de testes
                                    corretamente pontuados
                                </Typography>}
                                {/* aidcionando "editing" */}
                                {editing?<Typography style={{fontSize:"10px", color:"green"}}>
                                    editando...
                                </Typography>:<Typography style={{fontSize:"10px", color:"blue"}}>
                                    pronto!
                                </Typography>}
                                <TextareaAutosize 
                                    spellCheck={false}
                                    className={classes.textArea}
                                    rowsMax={25}
                                    id="myTextArea"
                                    aria-label="maximum height"
                                    placeholder="JSON de entradas"
                                    defaultValue='{
                                        "ambiente":"hom",
                                        "login":{
                                            "cpf":"018125532005",
                                            "senha":"lube1234"
                                        },
                                        "precadastro":{
                                            "chave":true,
                                            "casos":[
                                            {
                                                "nome_completo":"Naruto Uzumaki",
                                                "cpf":"018125532005",
                                                "email":"naruto@gmail.com",
                                                "confirma_email":"naruto@gmail.com",
                                                "senha":"lube1234",
                                                "confirma_senha":"lube1234",
                                                "indigena":"n"
                                            }
                                        ]
                                        },
                                        "dadosAcademico":{
                                            "chave":false,
                                            "caso":{
                                            "nomeSocial":"Alan",
                                            "sexo":"Masculino",
                                            "dataNascimento":"027/04/2001",
                                            "nacionalidade":"Brasileira",
                                            "estadoCivil":"Solteiro",
                                            "nis":"84333382057",
                                            "rg":"2300144",
                                            "orgaoEmissor":"SEJUSP",
                                            "uf":"MMS",
                                            "dataEmissaoRG":"015/04/2010",
                                            "carteiraTrabalho":"2222222222222",
                                            "telefoneResidencial":"06733541712",
                                            "celular":"067992180103",
                                            "necessidadeEspecial":"Sim",
                                            "ensinoMedio":"1: Publica",
                                            "nomeEscola":"Rui BARBOSA",
                                            "semMae":"Sim",
                                            "racacor":"Parda",
                                            "resideFamilia":"Sim",
                                            "ano":"10",
                                            "mes":"4",
                                            "cep":"079092141",
                                            "numero":"710",
                                            "complemento":"Casa Verde",
                                            "referencia":"Esquina"
                                            }
                                                    
                                        },
                                        
                                        "dadosFamilia":{
                                            "chave":false,

                                            "casos":[{
                                            "nomeCompleto":"Erick Gomes Silva",
                                            "grauParentesco":"Filho(a)",
                                            "cpf":"076144947094",
                                            "rendaMensal":"0200000",
                                            "escolaridade":"Ensino Fundamental",
                                            "estadoCivil":"Solteiro(a)",
                                            "dataNascimento":"024/04/2001"
                                            
                                        }]
                                        },
                                        "ensinoSuperior":{
                                            "chave":false,
                                        
                                            "caso":{
                                                "instituicaoEnsino":"Universidade Federal de MS - UFMS Campo Grande",
                                                "curso":"Sistemas da Informação",
                                                "estaMatriculado":"Sim",
                                                "semestreAnoInscricao":"1",
                                                "semestreAnoAtual":"2",
                                                "ingressoCurso":"002/02/2019",
                                                "terminoCurso":"009/10/2022",
                                                "periodoEstagio":"Tarde",
                                                "possuiSuperior":"Não",
                                                "possuiDP":"Não"
                                            }
                                        },
                                        "dadosSociais":{
                                        "chave":false,
                                        "caso":{
                                            "rendaIndividual":"90000",
                                            "rendaFamiliar":"100000",
                                            "rendaTotal":"190000",
                                            "familiaBeneficio":"Não",
                                            "valeTransporte":"Sim",
                                            "beneficios":[
                                                {
                                                    "chave":true
                                                },{
                                                    "chave":true
                                                },
                                                {
                                                    "chave":false
                                                },
                                                {
                                                    "chave":false
                                                },
                                                {
                                                    "chave":true
                                                }
                                    
                                            ],
                                            "outroBeneficio":"Outro Benefício"
                                        }
                                        }
                                        
                                        
                                        
                                    }'
                                        onChange={e=> e.preventDefault(handleChange(e.target.value))}
                                />
                                 <div style={{display:'flex'}}>

                                 <Button className={classes.botao} disabled={boo} onClick={handleSubmit}>
                                    Testar 
                                {boo?<CircularProgress style={{color:'white', display:'fixed'}} />:null}

                                </Button>
                                {status?<Button className={classes.botao}  onClick={handleCase}>
                                    Visualizar caso =>{i}/{resposta.length}
                                </Button>:null}
                                
                                </div>
                               
                                </Grid>

                                <Grid item xs={8}>

                                        <div>
                                <Typography variant="h12" >
                                    Funcionalidades: <Chip label="Login" className={classes.chip} onClick={ () => handleChip('Login') }/>
                                    <Chip label="Fixa_Academica" className={classes.chip} onClick={ () => handleChip('Fixa_Academica') }/>
                                    
                                                                        
                                </Typography>
                                </div>
                                <div>

                                <Typography variant="h6" >
                                    Resultados dos casos de teste 
                                </Typography>
                                        </div>
                                
                                <ul className={classes.list}>
                                    <li>
                                        <span>
                                            Status:{status}
                                        </span>
                                        
                                    </li>
                                   
                                </ul>
                                
                                <div>
                                    
                                </div>
                                <Grid
                                  container
                                  direction="column"
                                  justify="center"
                                  alignItems="flex-start"
                                >
                                    <Grid item>
                                        <DialogU ursreq={urlsreq} ursres={urlsres} />
                                    </Grid>
                                        <DialogL log={logs}/>
                                  </Grid>
                                  <Grid item>
                                    <DialogP  image={print}/>   
                                  </Grid>
                                  <Grid>
                                      {err?<Typography variant="h6">{err}</Typography>:null}
                                  </Grid>
                                  <Grid item>
                                       
                                       <RegraTable rules={regras} sistema='valeuniversidade'/>      
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


export default ValeAcademico;