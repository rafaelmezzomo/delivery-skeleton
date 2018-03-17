import React from 'react';

const SignIn = React.createClass({

  // Update component state
  handleChange: function (field, e) {
    this.props.store.dispatch({
      'type': 'HANDLE_SIGN_IN_FORM',
      'fieldName': field,
      'fieldValue': e.target.value
    })
  },


  // Handle login logic
  signIn: function (event) {
    let SignIn = this.props.store.getState().SignIn
    this.props.store.dispatch({
      type: "POST_SIGN_IN",
      payload: SignIn,
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
        <div className="signin__form__container">
            <input onChange={this.handleChange.bind(this, 'email')} type='email' placeholder='Email'/>
            <input onChange={this.handleChange.bind(this, 'password')}  type="password" placeholder='Password'/>
            <button onClick={this.signIn}> SignIn </button>
        </div>
      </div>
    )
  }

});

export default SignIn;
