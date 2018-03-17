
const Cart = (state = {}, action) => {

  const defaultState = {
    orderItems: [],
    isLoading: false,
    date: undefined,
    customerId: undefined,
    deliveryAddress: undefined,
    contact: undefined,
    storeId: undefined,
    total: 0
  }


  if (Object.keys(state).length==0){
    state = defaultState;
  }

  if (action.type == 'ADD_PRODUCT_TO_CART'){
    let orderItems = [...state.orderItems, action.product]
    let total = 0;
    orderItems.map(function(o) { return total += o.price; });

    return Object.assign({}, state, {
      orderItems: orderItems,
      total: total
    })
  }

  if (action.type == 'PLACE_ORDER'){
    return Object.assign({}, state, {
      storeId: action.storeId,
      consumerId: action.consumerId,
      date: new Date()
    })
  }

  if (action.type == 'CLEAR_SELECTED_STORE' || action.type == 'LOGOUT'){
    return Object.assign({}, state, {
      orderItems: []
    })
  }

  if (action.type == 'HANDLE_CART_FORM'){
    let newState = {}
    newState[action.fieldName] = action.fieldValue;
    return Object.assign({}, state, newState)
  }



  return state
}

export default Cart
