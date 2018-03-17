
const Stores = (state = {}, action) => {

  const defaultState = {
    data: [],
    selectedStore: undefined,
    isLoading: false,
    errorMessage: undefined
  }


  if (Object.keys(state).length==0){
    state = defaultState;
  }

  if (action.type == 'SELECT_STORE'){
    return Object.assign({}, state, {
      selectedStore: action.store
    })
  }

  if (action.type == 'CLEAR_SELECTED_STORE' || action.type == 'LOGOUT'){
    return Object.assign({}, state, {
      selectedStore: undefined
    })
  }

  if (action.type == 'GET_ALL_STORES'){
    return Object.assign({}, state, {
      isLoading: true
    })
  }

  if (action.type == 'GET_ALL_STORES_RECEIVED'){
    return Object.assign({}, state, {
      isLoading: false,
      data: action.data
    })
  }

  if (action.type == 'GET_ALL_STORES_ERROR'){
    return Object.assign({}, state, {
      isLoading: false,
      errorMessage: action.errorMessages
    })
  }


  return state
}

export default Stores
