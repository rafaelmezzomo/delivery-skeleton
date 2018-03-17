import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import AppStore from './reducers/app.js'
import dataService from './services/data-service'
import SignUp from './components/sign-Up.jsx';
import CoreApp from './components/core-app.jsx';


// Initialization of STORE
const store = createStore(AppStore,{}, applyMiddleware(dataService));

// Main app component
var App = React.createClass({
    render: function () {
      let state = store.getState();
      console.log(state)
      //TODO: use jwt decryptor
      if(localStorage.authToken) {
        return(
          <CoreApp store={store} />
        );
      }else{
        return(
          <SignUp store={store}/>
        );
      }
    }
});

// Render complete app everytime store changes
const renderAll = () => {
  render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
  );
}

// Render an instance of App into div id #app
store.subscribe(renderAll)
store.dispatch({type: 'INITIALIZE_APP'})

