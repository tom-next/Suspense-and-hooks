import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App1, App2} from './Suspense/index';
import * as serviceWorker from './serviceWorker';

ReactDOM.render( 
    <div>
        <App1 />
        <p>-------------</p>
        <App2 />
  </div>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
