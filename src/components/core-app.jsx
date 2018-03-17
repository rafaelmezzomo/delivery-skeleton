import React from 'react';
import Products from './products.jsx';
import Cart from './cart.jsx';
import Stores from './stores.jsx';

const CoreApp = React.createClass({

  logout: function(){
    this.props.store.dispatch({
      type: 'LOGOUT'
    })
  },

  render: function() {
    const state = this.props.store.getState();
    const selectedStore = state.Stores.selectedStore

    return(
      <div className="main-app">

        <button onClick={this.logout}> Logout </button>


        { selectedStore ?
          <div>
            <h1>Store {selectedStore.name}</h1>
            <Products store={this.props.store} />
            <h1>Cart</h1>
            <Cart store={this.props.store} />
            </div>
          :
          <div>
            <h1>Select a store</h1>
            <Stores store={this.props.store} />
          </div>
        }
      </div>
    )
  }
});

export default CoreApp;
