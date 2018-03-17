import React from 'react';

const Cart = React.createClass({

  placeOrder: function(){
    const state = this.props.store.getState()

    this.props.store.dispatch({
      'type': "PLACE_ORDER",
      'storeId': state.Stores.selectedStore.id,
      'customerId': 1
    })
    // TODO: find how to retrieve cosutmerID from API
  },

  handleChange: function (field, e) {
    this.props.store.dispatch({
      'type': 'HANDLE_CART_FORM',
      'fieldName': field,
      'fieldValue': e.target.value
    })
  },

  // Return component template
  render: function () {
    const Cart = this.props.store.getState().Cart

    return (
      <div>
        <ul>
          {Cart.orderItems.map((item, index) =>{
          return(
            <li key={index}>
              {item.name}: <small>{item.price}</small>
            </li>
          )})}
        </ul>

        <div>
          <b>Total: {Cart.total}</b><br/>
          <b>Send To:</b><br/>
          <input onChange={this.handleChange.bind(this, 'deliveryAddress')} type='text' placeholder='deliveryAddress'/>
          <input onChange={this.handleChange.bind(this, 'contact')} type='text' placeholder='Phone Number'/>

          <hr/>
          <button onClick={this.placeOrder.bind(this,Cart)}>Place Order</button>
        </div>
      </div>
    )
  }

});

export default Cart;
