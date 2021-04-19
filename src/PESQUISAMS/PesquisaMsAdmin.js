import React, {useState } from 'react';
import SearchAppBar from '../Appbar/index';
import {Chip,Grid,Paper, Typography, TextareaAutosize, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import api from '../services/api';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogP from '../dialogs/dia_print';
import DialogU from '../dialogs/dia_urls';
import DialogL from '../dialogs/dia_logs';


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

const PesquisaMsAdmin = ()  =>{
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
            await api.post('/pesquisams_admin_login',enter,{headers: {'Content-Type': 'application/json'}}).then(t=>{
                setBoo(false);
                //status da requisição geral
                setStatus(t.status);

                let re = Object.values(t.data.data)
                console.log(re);

                return setResposta(re);


            }).catch(c => console.log(c));

        // }catch(error){
        //     setErr(error.toString());
        //     setBoo(false);
        //     setResposta(error.data);
        //     console.log(error.toString());

        // }


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
        console.log(system);
      try{
          //variável para loading
          setBoo(true);
 
          await api.get( `/regra/pesquisams/${system}` ,{headers: {'Content-Type': 'application/json'}}).then(t=>{
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
                                    Casos de teste <i><b>PESQUISA MS ADMIN</b></i>
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
                                        "ambiente": "hom.adm.pesquisa.ms.gov.br",
                                        "login": {
                                         "nome": "",
                                         "dominio": "FAZENDA.MS",
                                         "senha": "",
                                         "perfil": "(DSGI) - Administrador Geral - Desenvolvimento"
                                        },
                                        "categoriaPesquisar": [
                                         {
                                          "descricao": "a"
                                         },
                                         {
                                          "descricao": "b"
                                         }
                                        ],
                                        "pesquisar": [
                                         {
                                          "categoria": "TECNOLOGIA DA INFORMAÇÃO",
                                          "titulo": "Pesquisa sobre Tecnologia",
                                          "descricao": "",
                                          "datainicio": "015/07/2020",
                                          "datafim": "15/07/2020"
                                         },
                                         {
                                          "categoria": "",
                                          "titulo": "Pesquisa sobre Tecnologia",
                                          "descricao": "",
                                          "datainicio": "",
                                          "datafim": ""
                                         }
                                        ],
                                        "cadastrarPesquisa": [
                                         {
                                          "categoria": "TECNOLOGIA DA INFORMAÇÃO",
                                          "titulo": "Puppeteer teste",
                                          "descricao": "Puppeteer teste",
                                          "datainicio": "019/02/2021",
                                          "datafim": "028/02/2021",
                                          "nomeresponsavel": "Alan Arguelho",
                                          "emailresponsavel": "aarguelho@gmail.com",
                                          "telefone": "9999999009",
                                          "autenticacao": "false"
                                         }
                                        ],
                                        "cadastrarCategoria": [
                                         {
                                          "descricao": "banner_teste"
                                         }
                                        ],
                                        "cadastrarBanner": [
                                         {
                                          "nome": "ativo",
                                          "ativo": "ativo",
                                          "principal": "sim"
                                         }
                                        ],
                                        "editarPesquisa": [
                                         {
                                          "id": "120",
                                          "categoria": "SAÚDE",
                                          "titulo": "Puppe",
                                          "objetivo": "Puppeteer teste",
                                          "datainicio": "19/02/20210",
                                          "datafim": "28/02/20210",
                                          "nomeresponsavel": "Alan Arguelho",
                                          "emailresponsavel": "aarguelho@gmail.com",
                                          "telefone": "9999999009",
                                          "autenticacao": "false",
                                          "comsecao": "true"
                                         }
                                        ],
                                        "criarSecao": [
                                         {
                                          "id": "120",
                                          "descricao": "null",
                                          "ordem": "2"
                                         }
                                        ],
                                        "criarPergunta": [],
                                        "criarPerguntaComSecao": [
                                         {
                                          "pergunta": {
                                           "id": "125",
                                           "descricao": "teste com sec",
                                           "tipoPergunta": "Intensidade",
                                           "ordem": "10",
                                           "obrigatorio": "true"
                                          },
                                          "alternativas": {
                                           "descricao": "Alternativa Teste com seção",
                                           "ordem": "2"
                                          }
                                         }
                                        ]
                                       }'
                                        onChange={e=> e.preventDefault(handleChange(e.target.value))}
                                />
                                 <div style={{display:'flex'}}>

                                 {status?null:<Button className={classes.botao} disabled={boo} onClick={handleSubmit}>
                                    Testar 
                                {boo?<CircularProgress style={{color:'white', display:'fixed'}} />:null}

                                </Button>}
                                {status?<Button className={classes.botao}  onClick={handleCase}>
                                    Visualizar caso =>{i}/{resposta.length}
                                </Button>:null}
                                
                                </div>
                                {status?<a href="/PESQUISAMS_ADMIN" style={{color:'blue', fontSize:'10px', width:'100px'}} >
                                    Testar novamente ...
                                </a>:null}
                                </Grid>

                                <Grid item xs={8}>

                                        <div>
                                <Typography variant="h12" >
                                    Funcionalidades: <Chip label="Login" className={classes.chip} onClick={ () => handleChip('login') }/>
                                    <Chip label="Pequisar_Categoria" className={classes.chip} onClick={ () => handleChip('Pequisar_Categoria') }/>
                                    <Chip label="Cadastrar_Categoria" className={classes.chip} onClick={ () => handleChip('Cadastrar_Categoria') }/>
                                    <Chip label="Pesquisar_Pesquisa" className={classes.chip} onClick={ () => handleChip('Pesquisar_Pesquisa') }/>
                                    <Chip label="Cadastrar_Pesquisa" className={classes.chip} onClick={ () => handleChip('Cadastrar_Pesquisa') }/>
                                    <Chip label="Cadastrar_Banner" className={classes.chip} onClick={ () => handleChip('Cadastrar_Banner') }/>
                                    <Chip label="Editar_Pesquisa" className={classes.chip} onClick={ () => handleChip('Editar_Pesquisa') }/>
                                    <Chip label="Pesquisar_Pesquisa" className={classes.chip} onClick={ () => handleChip('Pesquisar_Pesquisa') }/>
                                    <Chip label="Criar_Secao" className={classes.chip} onClick={ () => handleChip('Criar_Secao') }/>
                                    <Chip label="Criar_Pergunta" className={classes.chip} onClick={ () => handleChip('Criar_Pergunta') }/>
                                    <Chip label="Criar_Pergunta_Com_Secao" className={classes.chip} onClick={ () => handleChip('Criar_Pergunta_Com_Secao') }/>
                                                                        
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


export default PesquisaMsAdmin;