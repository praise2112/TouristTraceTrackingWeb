import { combineReducers } from "redux";
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';

export default combineReducers({
    auth: authReducer,       // to call is from our component we use this.props.auth
    errors: errorReducer,
    // profile: profileReducer
});