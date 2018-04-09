import React from 'react';
import { Switch } from 'react-router-dom';
import { PublicRoute } from '../router/public-route';
import { PrivateRoute } from '../router/private-route';
import App from '../containers/app';
import Login from '../containers/login';

export default (
    <Switch>
        <PublicRoute exact path="/login" component={Login}/>
        <PrivateRoute path="/" component={App}/>
    </Switch>
);