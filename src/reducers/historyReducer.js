import { GET_HISTORY, SET_HISTORY, CLEAR_ERRORS} from "../actions/types";


const initialState = {
    hist: null,
    // profiles: null,
    // loading: false,
};

export default function (state = initialState, action ) {
    switch (action.type) {
        case GET_HISTORY:
            return {
                ...state,
                hist: action.payload,
            };
        default:
            return state;
    }
}
