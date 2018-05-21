import 'materialize-css/dist/css/materialize.min.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'


import App from './components/App';
import reducers from './reducers'
 

//When this gets some new state, the provider informs all children components
//that some new state is available and will update new components with new state
const store = createStore(reducers,{}, applyMiddleware(reduxThunk));

//Provider tag reads changes from redux store
ReactDOM.render(
    <Provider store={store}><App /></Provider>, 
    document.querySelector('#root')
);

