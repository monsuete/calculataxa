import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import Calcular from '../views/home/Calcular'
import Cadastro from '../views/user/Cadastro'


export default props => 
    <Switch>
        <Route exact path='/' component={Calcular} />
        <Route path='/users' component={Cadastro} />
        <Redirect from='*' to='/' />
    </Switch>