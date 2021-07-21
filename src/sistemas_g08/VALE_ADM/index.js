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

const ValeAdm = ()  =>{
    const classes = useStyles();
    const [enter, setEnter] = useState({});
    const [status, setStatus] = useState("");
    const [logs, setLogs] = useState(['']);
    const [i, setI] = useState(0);
    const [err, setErr] = useState('');
    const [print, setPrint] = useState('');
    const [otherImages, setOtherImages] = useState(['']);
    const [urlsreq, setUrlsreq] = useState(['']);
    const [urlsres, setUrlsres] = useState(['']);
    const [boo, setBoo] = useState(false);
    const [validado,setValidado] = useState(true);
    const [resposta, setResposta] = useState(['']);
    const [editing, setEditing] = useState(false);
    const [regras, setRegras] = useState(['']);

    let time = null;
  



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

            await api.post('/vale_adm',{"login":{"user":localStorage.getItem("usuario"),"senha":localStorage.getItem("senha"), "sistema":"591", "grupo":"1157"}, "entradas":JSON.parse(enter)}, {headers: {'Content-Type': 'application/json'}}).then(t=>{
                
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
            setOtherImages(resposta[i].otherImages);
        }
        return setI(i+1);

    }
     // Carrega as regras do sistema
     async function handleChip(system){
        console.log(system);
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
                                    Casos de teste <i><b>VALE UNIVERSIDADE ADM</b></i>
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
                                        "novoProcesso":{	
                                            "chave":false,
                                            "descricao":"Processo Seletivo Automatizado",
                                            "anoReferencia":"02021",
                                            "semestre":"1: PrimeiroSemestre",
                                            "modalidade":"PVU",
                                            "rendaIndividual":"100000",
                                        "rendaFamiliar":"200000",
                                            "situacao":"0: Aberto",
                                            "dataInicioInscricao":"010/06/2021",
                                            "horaInicioInscricao":"00500",
                                            "dataFimInscricao":"011/06/2021",
                                            "horaFimInscricao":"01500",
                                            "dataInicioEntrevista":"012/06/2021",
                                            "horaInicioEntrevista":"01500",
                                            "dataFimEntrevista":"013/06/2021",
                                            "horaFimEntrevista":"01500",
                                    
                                        
                                        "processoDocumento":[
                                                {
                                                    "chave":true,
                                                    "tipo":"DECRETO N. 13.071/2010"
                                                },
                                                {
                                                    "chave":true,
                                                    "tipo":"LEI Nº 3.783 DE 16 DE NOVEMBRO DE 2009"
                                                },
                                                {
                                                    "chave":true,
                                                    "tipo":"RESOLUÇÃO SEDHAST 197/2019"
                                                },
                                                {
                                                    "chave":false,
                                                    "tipo":"RESOLUÇÃO SEDHAST N. 209/2020"
                                                },
                                                {
                                                    "chave":true,
                                                    "tipo":"DECRETO N. 13.071/2010 com alterações da LEI N. 15.363/2020"
                                                },
                                                {
                                                    "chave":true,
                                                    "tipo":"RESOLUÇÃO SEDHAST Nº 212, DE 2 DE MARÇO DE 2020"
                                                },
                                                {
                                                    "chave":true,
                                                    "tipo":"DECRETO N. 13.071/2010 com alterações da DECRETO N. 15.527/2020"
                                                }
                                    
                                            ]
                                        },
                                        "gerenciarInscricoes":{
                                        "chave":false,
                                        "casos":[
                                            {
                                                "nome":"",
                                                "cpf":"",
                                                "sexo":"",
                                                "situacao":"Atuante",
                                                "instituicaoMatriz":"",
                                                "instituicaoEnsino":"",
                                                "municipioInstituicao":"",
                                                "estagio":"",
                                                "baixarCartaDeEncaminhamento":false,
                                                "termoCompromisso":false,
                                                "termoAditivo":false,
                                                "gerenciar":true
                                            }
                                        ]},
                                        "entrevista":{
                                        "chave":false,
                                        "casos":[
                                            {
                                                "nome":"",
                                                "cpf":"",
                                                "documentacao":"null",
                                                "municipio":"",
                                                "modalidade":"1: PVU",
                                                "numeroProtocolo":"",
                                                "anoReferencia":"",
                                                "numeroProcesso":"56",
                                                "situacao":"0: Habilitado",
                                                "modalidadeProcesso":"1: PVU",
                                                "realizarEntrevista":
                                                    {
                                                        "motivo":"Motivo tal",
                                                        "relatorio":"Relatorio tal",
                                                        "rendaIndiviDurante":"",
                                                        "rendaFamiliDurante":"",
                                                        "novaSituacao":"2: HabilitadoAposEntrevista",
                                                        "motivoInabilitacao":"Possui reprovação por falta",
                                                        "salvar":true,
                                                        "finalizarEntrevista":true,
                                                        "downloadFichaInscricao":false
                                                    }
                                            }
                                        ]},
                                        "ofertaDeVagas":{
                                        "chave":false,
                                        "casos":[
                                            {
                                                "numeroProcesso":"",
                                                "tipoFiltro":"",
                                                "municipio":"",
                                                "instituicaoEnsino":"",
                                                "quantidadeVagas":"",
                                                "salvar":false,
                                                "limparVagas":false,
                                                "exportarPorMunicipio":false,
                                                "exportarPorIE":false,
                                                "finalizarOfertaVagas":false
                                            }
                                        ]
                                    
                                        },
                                        "novoOrgaoEstagio":{
                                            "chave":false,
                                            "casos":[
                                                {   
                                                    "tipo":"2: OrganizacaoNaoGovernamental",
                                                    "categoria":"2: Privada",
                                                    "esfera":"2: Municipal",
                                                    "tipoOrgao": "Orgao estagio teste",
                                                    "cnpj":"",
                                                    "cep":"",
                                                    "numero":""

                                                }
                                            ]
                                        },
                                        "pesquisaOrgao":{
                                            "chave":false,
                                            "casos":[
                                                {
                                                    "tipo":"",
                                                    "categoria":"",
                                                    "esfera":"",
                                                    "cnpj":""
                                                }
                                            ]
                                        },
                                        "pesquisaOrgaoEstagio":{
                                            "chave":false,
                                            "casos":[
                                                {
                                                    "tipo":"",
                                                    "categoria":"",
                                                    "esfera":"",
                                                    "cnpj":"",  
                                                    "vincularRH":
                                                        {
                                                            "chave":false,
                                                            "nome":"",
                                                            "hisotricoLocalEstagio":true,
                                                            "totaisLocalEstagio":true                                              
                                                        }
                                                    
                                                }
                                            ]

                                        },
                                        "recursoHumano":{
                                            "chave":false,
                                            "casos":[
                                                {
                                                    "nome":"",
                                                    "cpf":"",
                                                    "inativar":false,
                                                    "editar":{
                                                        "chave":false,
                                                        "email":"",
                                                        "rg":"",
                                                        "orgaoEmissor":"",
                                                        "uf":"",
                                                        "dataEmissao":"",
                                                        "celular":"",
                                                        "dataNascimento":""
                                                    },
                                                    "visualizar":false
                                                        
                                                    
                                                }
                                            ]
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
                                    Funcionalidades: <Chip label="Login" className={classes.chip} onClick={ () => handleChip('login') }/>
                                    
                                                                        
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
                                    <DialogP otherImages={otherImages} image={print}/>   
                                  </Grid>
                                  <Grid>
                                      {err?<Typography variant="h6">{err}</Typography>:null}
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


export default ValeAdm;