import { combineReducers } from 'redux';
import SignUp from './sign-up';
import SignIn from './sign-in';
import Products from './products';
import Cart from './cart';
import Stores from './stores';

const AppStore = combineReducers({
  SignUp,
  SignIn,
  Products,
  Cart,
  Stores
});

export default AppStore
