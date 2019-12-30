// file name can be anything
import { SET_CURRENT_USER } from '../actions/types'

import isEmpty from '../validation/is-empty';

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:  // to set current user in state
            return{
                ...state,
                isAuthenticated: !isEmpty(action.payload),   // if isEmpty is true we are not authenticated and vice versa
                user: action.payload
            };
        default:
            return state;
    }
}