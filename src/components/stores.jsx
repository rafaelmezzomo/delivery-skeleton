import React from 'react';

const Stores = React.createClass({

  fetchStores: function(){
    this.props.store.dispatch({
      type: 'GET_ALL_STORES'
    })
  },

  selectStore: function(store){
    this.props.store.dispatch({
      type: 'SELECT_STORE',
      store: store
    })

    this.props.store.dispatch({
      type: 'GET_STORE_PRODUCTS',
      storeId: store.id
    })
  },

  // Return component template
  render: function () {
    const Stores = this.props.store.getState().Stores

    if(Stores.isLoading){return <p>Loading...</p>}

    return (
      <div>
        <button onClick={this.fetchStores}>load</button>
        <div>
          {Stores.data.map((store, index) =>{
          return(
            <li onClick={this.selectStore.bind(this,store)} key={index}>
              {store.name}
            </li>
          )})}
        </div>
      </div>
    )
  }

});

export default Stores;
