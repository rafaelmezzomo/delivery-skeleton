import React from 'react';
import SignIn from './sign-in.jsx';

const SignUp = React.createClass({

  handleChange: function (field, e) {
    this.props.store.dispatch({
      'type': 'HANDLE_SIGN_UP_FORM',
      'fieldName': field,
      'fieldValue': e.target.value
    })
  },

  signUp: function (event) {
    let SignUp = this.props.store.getState().SignUp
    this.props.store.dispatch({
      type: "POST_SIGN_UP",
      payload: SignUp,
      successHandler: this.fetchStores
    })
  },

  fetchStores: function(){
    this.props.store.dispatch({
      type: 'GET_ALL_STORES'
    })
  },



  // Return component template
  render: function () {
    return (


      <div className='signin__container'>
        <h1> SIGN IN </h1>
        <SignIn store={this.props.store} />

        <h1> SIGN UP </h1>
        <div className="signin__form__container">
            <input onChange={this.handleChange.bind(this, 'name')}  type="text" placeholder='Name'/>
            <input onChange={this.handleChange.bind(this, 'address')}  type="text" placeholder='Address'/>
            <input onChange={this.handleChange.bind(this, 'email')} type='email' placeholder='Email'/>
            <input onChange={this.handleChange.bind(this, 'password')}  type="password" placeholder='Password'/>
            <button onClick={this.signUp}> SignUp </button>
        </div>
      </div>
    )
  }

});

export default SignUp;
