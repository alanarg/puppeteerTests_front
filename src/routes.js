import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

// import Argo from './login/index';
import Main from './sistemas_g08/GEDCORP/index';
import PesquisaMsAdmin from './sistemas_g08/PESQUISAMS/PesquisaMsAdmin';
import RedeSuas from './sistemas_g08/REDESUAS/index';
import ValeAcademico from './sistemas_g08/VALE_ACADEMICO/index';
import ValeAdm from './sistemas_g08/VALE_ADM/index';
import Login from './components/login/index';

const isLoggedIn = () => {
     if(localStorage.getItem('senha')!== null){
        return true;
    }
};
const SecuredRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
              isLoggedIn() === true ? (
            <Component {...props} />
              ) : (
                <Redirect
                to={{
                  pathname: "/login",
                  
                }}
              />
              )
        }
    />
);
const Routes = ()=>(
    <BrowserRouter>
        <Switch>

            <Route exact path="/login" component={Login}/>
            <SecuredRoute exact path="/" component={Main}/>
            <SecuredRoute exact path="/GEDCORP" component={Main}/>
            <SecuredRoute exact path="/REDESUAS" component={RedeSuas}/>
            <SecuredRoute exact path="/PESQUISAMS_ADMIN" component={PesquisaMsAdmin}/>
            <SecuredRoute exact path="/VALEUNIVERSIDADE_ACADEMICO" component={ValeAcademico}/>            
            <SecuredRoute exact path="/VALEUNIVERSIDADE_ADM" component={ValeAdm}/>            


        </Switch>
    </BrowserRouter>
);

export default Routes;