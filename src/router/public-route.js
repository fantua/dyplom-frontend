import React from 'react';
import User from '../api/user';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        !User.isLoggedIn() ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/',
                state: { from: props.location }
            }}/>
        )
    )}/>
);
