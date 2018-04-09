import React from 'react';
import {Provider} from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import routes from '../router/routes';
import '../styles/index.css';

const Root = ({store, history}) => {

    return (
        <Provider store={store}>
            <ConnectedRouter history={history} children={routes} />
        </Provider>
    );

};

export default Root;