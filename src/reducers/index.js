import { combineReducers } from "redux";
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import historyReducer from './historyReducer';

export default combineReducers({
    auth: authReducer,       // to call is from our component we use this.props.auth
    errors: errorReducer,
    profile: profileReducer,
    hist: historyReducer
});