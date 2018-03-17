import request from 'superagent'
const apiUrl = 'https://api-vanhack-event-sp.azurewebsites.net/api/v1/'


const dataService = store => dispatch => action => {
  /*
  Pass all actions through by default
  */
  dispatch(action)
  const getApi = getApiGenerator(dispatch)
  const postApi = postApiGenerator(dispatch)
  const signInApi = signInApiGeneration(dispatch)
  const signUpApi = signUpApiGeneration(dispatch)
  const putApi = putApiGenerator(dispatch)
  const deleteApi = deleteApiGenerator(dispatch)
  let path;

  switch (action.type) {
    case 'POST_SIGN_IN':
      path = 'Customer/auth'
      signInApi(path, action)
      break

    case 'POST_SIGN_UP':
      path = 'Customer'
      signUpApi(path, action)
      break

    case 'GET_STORE_PRODUCTS':
      path = 'Store/'+action.storeId+'/products'
      getApi(path, action)
      break

    case 'GET_ALL_STORES':
      path = 'Store'
      getApi(path, action)
      break


    default:
      break
    }

};


const getApiGenerator = dispatch => (route, action) => {
  route = apiUrl+route
  request
    .get(route)
    .set("Authorization", localStorage.authToken)
    .end((err, res) => {
      processRequest(err, res, dispatch, action)
    })
}


// Action.payload is a mandatory field
const postApiGenerator = dispatch => (route, action) => {
  route = apiUrl+route
  request
    .post(route)
    .send(action.payload)
    .set("Authorization", localStorage.authToken)
    .end((err, res) => {
      processRequest(err, res, dispatch, action)

    })
}



const putApiGenerator = dispatch => (route, action) => {
  route = apiUrl+route
  request
    .put(route)
    .send(action.payload)
    .set("Authorization", localStorage.authToken)
    .end((err, res) => {
      processRequest(err, res, dispatch, action)

    })
}

const deleteApiGenerator = dispatch => (route, action) => {
  route = apiUrl+route
  request
    .del(route)
    .set("Authorization", localStorage.authToken)
    .end((err, res) => {
      processRequest(err, res, dispatch, action)
    })
}

const signInApiGeneration = dispatch => (route, action) => {
  route = apiUrl+route
  request
    .post(route)
    .query(action.payload)
    .set("Authorization", localStorage.authToken)
    .end((err, res) => {
      processSignIn(err, res, dispatch, action)

    })
}

const signUpApiGeneration = dispatch => (route, action) => {
  route = apiUrl+route
  request
    .post(route)
    .send(action.payload)
    .set("Authorization", localStorage.authToken)
    .end((err, res) => {
      processSignIn(err, res, dispatch, action)

    })
}


const processSignIn = (err, res, dispatch, action) => {
  // dispatch error handler
  if (err) {
    dispatchRequestError(dispatch, action, err)
  }
  const data = {auth: res.text}
  if (data.auth){
    dispatchRequestSuccess(dispatch, action, data)
  } else {
    dispatchRequestError(dispatch, action, data.messages)
  }

}

const processRequest = (err, res, dispatch, action) => {
  // dispatch error handler
  if (err) {
    dispatchRequestError(dispatch, action, err)
  }
  // dispatch success handler if VALID==TRUE

  const data = JSON.parse(res.text)
  if (data){
    dispatchRequestSuccess(dispatch, action, data)
  } else {
    dispatchRequestError(dispatch, action, data.messages)
  }

}

// Success Handler
const dispatchRequestSuccess = (dispatch, action, data) => {
  dispatch({
    type: `${action.type}_RECEIVED`,
    data,
    action
  })
  if (action.successHandler){
    return action.successHandler()
  }
}

// Error Handler
const dispatchRequestError = (dispatch, action, errorMessages) => {
  dispatch({
    type: `${action.type}_ERROR`,
    errorMessages,
    action
  })
  if (action.errorHandler){
    return action.errorHandler(errorMessages)
  }
}


export default dataService
