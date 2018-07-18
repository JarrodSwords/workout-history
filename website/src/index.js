import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { TraineeDashboard } from 'components/TraineeDashboard';
import { configureStore } from 'store/store';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={configureStore()}>
        <TraineeDashboard personId={1} />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
