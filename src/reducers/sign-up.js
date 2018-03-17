const SignUp = (state = {}, action) => {

  const defaultState = {
    name: '',
    email: '',
    password: '',
    address: ''
  }

  if (Object.keys(state).length==0){
    state = defaultState;
  }

  if (action.type == 'HANDLE_SIGN_UP_FORM'){
    let newState = {}
    newState[action.fieldName] = action.fieldValue;
    return Object.assign({}, state, newState)
  }


  if (action.type == 'POST_SIGN_UP_RECEIVED'){
    localStorage.authToken = action.data.auth
    return defaultState
  }


  return state
}

export default SignUp
