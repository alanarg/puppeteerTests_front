import React,{useState, useEffect} from 'react';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import {Button,CircularProgress, Grid, Slider} from '@material-ui/core';
import {makeStyles, withStyles } from '@material-ui/core/styles';


  
const ExpansionPanel = withStyles({
    root: {
      border: '3px solid #00acba',
      borderRadius:'15px',
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: 'auto',
      },
    },
    expanded: {},
  })(MuiExpansionPanel);
  
  const ExpansionPanelSummary = withStyles({
    root: {
      backgroundColor: 'rgba(0, 0, 0, .03)',
      borderBottom: '1px solid rgba(0, 0, 0, .125)',
      marginBottom: -1,
      minHeight: 56,
      '&$expanded': {
        minHeight: 56,
      },
    },
    content: {
      '&$expanded': {
        margin: '12px 0',
      },
    },
    expanded: {},
  })(MuiExpansionPanelSummary);
  
  
  
  const ExpansionPanelDetails = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiExpansionPanelDetails);  


  const Tabela = ()=>{



    return(
        <>
    <ExpansionPanel square expanded >
           <ExpansionPanelSummary aria-controls="panel1d-content" >
             <div align="left">
             </div>
             <div align="center">
             </div>
             <div align="right" >
             </div>
           </ExpansionPanelSummary>
           <ExpansionPanelDetails>
              <Grid container flexDirection="row">
              <Grid item xs={12} sm={6} >
                        <ul style={{listStyle:'none'}}>
                                <li>
                                  <p>
                                    <b>Parcelas:</b>
                                  </p>
                                </li>
                                <li>
                                    <b>Descrição:</b>

                                </li>
                                <li>
                                    <b>Localidade:</b>
                                    <br></br>
                                    <br></br>
                                </li>                                       
                         </ul>
                     </Grid>
                     <Grid item xs>

                     </Grid>
                     <Grid item xs>

                     </Grid> 
                     <Grid item xs>
                     </Grid>                 

              </Grid>
           </ExpansionPanelDetails>
         </ExpansionPanel>
         <ExpansionPanel square expanded={false} >
         <ExpansionPanelSummary aria-controls="panel1d-content" >
           <div align="left">
           </div>
           <div align="center">
           </div>
           <div align="right" >
           </div>
         </ExpansionPanelSummary>
         <ExpansionPanelDetails>
            <Grid container flexDirection="row">
            <Grid item xs={12} sm={6} >
                      <ul style={{listStyle:'none'}}>
                              <li>
                                <p>
                                  <b>Parcelas:</b>
                                </p>
                              </li>
                              <li>
                                  <b>Descrição:</b>

                              </li>
                              <li>
                                  <b>Localidade:</b>
                                  <br></br>
                                  <br></br>
                              </li>                                       
                       </ul>
                   </Grid>
                   <Grid item xs>

                   </Grid>
                   <Grid item xs>

                   </Grid> 
                   <Grid item xs>
                   </Grid>                 

            </Grid>
         </ExpansionPanelDetails>
       </ExpansionPanel>
       <ExpansionPanel square expanded={false} >
       <ExpansionPanelSummary aria-controls="panel1d-content" >
         <div align="left">
         </div>
         <div align="center">
         </div>
         <div align="right" >
         </div>
       </ExpansionPanelSummary>
       <ExpansionPanelDetails>
          <Grid container flexDirection="row">
          <Grid item xs={12} sm={6} >
                    <ul style={{listStyle:'none'}}>
                            <li>
                              <p>
                                <b>Parcelas:</b>
                              </p>
                            </li>
                            <li>
                                <b>Descrição:</b>

                            </li>
                            <li>
                                <b>Localidade:</b>
                                <br></br>
                                <br></br>
                            </li>                                       
                     </ul>
                 </Grid>
                 <Grid item xs>

                 </Grid>
                 <Grid item xs>

                 </Grid> 
                 <Grid item xs>
                 </Grid>                 

          </Grid>
       </ExpansionPanelDetails>
     </ExpansionPanel>
     </>
    );      
}

export default Tabela;