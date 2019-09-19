import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux'
import { compose, createStore } from 'redux'

import reducer from './reducers'
import Root from './components/Root.jsx'
import config from './config.js'


// const enhancer = compose(
//     persistState(['auth']),
// );

let store = createStore(reducer);

ReactDOM.render(<Provider store={store}><Root/></Provider>, document.getElementById('root'));
