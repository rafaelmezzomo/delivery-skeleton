import React from 'react';

const Products = React.createClass({

  fetchProducts: function(){
    const selectedStore = this.props.store.getState().Stores.selectedStore

    if (selectedStore){
      this.props.store.dispatch({
        type: 'GET_STORE_PRODUCTS',
        storeId: selectedStore.id
      })
    }
  },

  addToCart: function(product){
    this.props.store.dispatch({
      type: 'ADD_PRODUCT_TO_CART',
      product: product
    })
  },

  clearStore: function(){
    this.props.store.dispatch({
      type: 'CLEAR_SELECTED_STORE'
    })
  },

  // Return component template
  render: function () {
    const Products = this.props.store.getState().Products

    if (Products.isLoading){return <div>Loading...</div>}

    return (
      <div>
        <button onClick={this.fetchProducts}>fetch products</button>
        <button onClick={this.clearStore}>return</button>
        <div>
          {Products.data.map((product, index) =>{
          return(
            <li key={index}>
              {product.name}: <small>{product.price}</small>
              <a onClick={this.addToCart.bind(this,product)}> add </a>
            </li>
          )})}
        </div>
      </div>
    )
  }

});

export default Products;
