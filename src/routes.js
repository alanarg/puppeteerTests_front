import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

// import Argo from './login/index';
import Main from './GEDCORP/index';
import PesquisaMsAdmin from './PESQUISAMS/PesquisaMsAdmin';
import RedeSuas from './REDESUAS/index';


const Routes = ()=>(
    <BrowserRouter>
        <Switch>
        <Route exact path="/" component={Main}/>
        <Route  path="/GEDCORP" component={Main}/>
        <Route  path="/REDESUAS" component={RedeSuas}/>
        <Route  path="/PESQUISAMS_ADMIN" component={PesquisaMsAdmin}/>



            
        </Switch>
    </BrowserRouter>
);

export default Routes;