
const Products = (state = {}, action) => {

  const defaultState = {
    data: [],
    isLoading: false
  }

  if (Object.keys(state).length==0){
    state = defaultState;
  }

  if (action.type == 'CLEAR_SELECTED_STORE' || action.type == 'LOGOUT'){
    return Object.assign({}, state, {
      data: []
    })
  }

  if (action.type == 'GET_STORE_PRODUCTS'){
    return Object.assign({}, state, {
      isLoading: true
    })
  }

  if (action.type == 'GET_STORE_PRODUCTS_RECEIVED'){
    return Object.assign({}, state, {
      isLoading: false,
      data: action.data
    })

  }

  if (action.type == 'GET_STORE_PRODUCTS_ERROR'){
    return Object.assign({}, state, {
      isLoading: false
    })
  }


  return state
}

export default Products
