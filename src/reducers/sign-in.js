
const SignIn = (state = {}, action) => {

  const defaultState = {
    email: '',
    password: '',
  }

  if (Object.keys(state).length==0){
    state = defaultState;
  }

  if (action.type == 'HANDLE_SIGN_IN_FORM'){
    let newState = {}
    newState[action.fieldName] = action.fieldValue;
    return Object.assign({}, state, newState)
  }


  if (action.type == 'POST_SIGN_IN_RECEIVED'){
    localStorage.authToken = action.data.auth
    return defaultState
  }

  if (action.type == 'LOGOUT'){
    localStorage.clear()
    return defaultState
  }

  return state
}

export default SignIn
