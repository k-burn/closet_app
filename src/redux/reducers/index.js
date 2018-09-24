import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import weatherData from './weatherReducer';

const store = combineReducers({
  user,
  login,
  weatherData,
});

export default store;
