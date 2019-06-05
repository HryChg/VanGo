// Reference: https://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example#user-service-js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ... rest}) => {
    <Route {... rest} render={props => (
        localStorage.getItem('user')?
            <Component {... props} /> :
            <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
    )} />
}