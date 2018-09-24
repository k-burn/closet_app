import { combineReducers } from 'redux';
import { USER_ACTIONS } from '../actions/userActions';

const weatherData = (state = {}, action)=>{
    if (action.type === 'GET_WEATHER'){
        return  action.payload;
    }
    return state;
}

export default weatherData;