import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import configureStore from './store';
import Root from './components/root';
import registerServiceWorker from './registerServiceWorker';

const browserHistory = createHistory();
const store = configureStore({}, browserHistory);

ReactDOM.render(
    <Root store={store} history={browserHistory} />,
    document.getElementById('root')
);

registerServiceWorker();