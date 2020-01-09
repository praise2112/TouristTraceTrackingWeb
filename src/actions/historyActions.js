import axios from 'axios';

import {GET_HISTORY, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE, CLEAR_ERRORS} from "./types";
import {message} from 'antd';

// Get current profile
export const getUserHistory = (id) =>async dispatch => {
    // dispatch(setProfileLoading());  // set loading to true
    const url = `http://34.87.80.154:443/api/users/${id}/history`;
    console.log(`id is ${id}`);
    console.log(url);
    console.log(`Token from profile actions is:`);
    console.log();
    axios.defaults.headers.common['Authorization'] = "Bearer "+axios.defaults.headers.common['Authorization'];
    await axios.get(url)
        .then(res =>{
            console.log(`res is:`);
            console.log(res);
            dispatch({
                type: GET_HISTORY,
                payload: res.data.data
            });
            dispatch(clearErrors());

            message.success("Got users history")
        })
        .catch(err => {
            dispatch({
                type: GET_HISTORY,
                payload: []
            });
            // dispatch({
            //     type: GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
            //     // payload: {}//sets payload to errors coming from server
            //     payload: err.response.data //sets payload to errors coming from server
            // });
        });
    axios.defaults.headers.common['Authorization'] =  axios.defaults.headers.common['Authorization'].slice(7);
};
// update profile
export const updateHistory = (locationData, id, history) => async dispatch => {
    // dispatch(setProfileLoading());  // set loading to true
    // const product_id_list = ['pid1234', 'pid1235']

    // const bodyFormData = new FormData();
    //
    // locationData.forEach((item) => {
    //     bodyFormData.append('locationData[]', item);
    // });
    // console.log(bodyFormData);

    const url = "http://34.87.80.154:443";
    axios.defaults.headers.common['Authorization'] = "Bearer "+axios.defaults.headers.common['Authorization'];

    await axios.post(`${url}/api/users/${id}/history`, locationData)
        .then(res => {
            console.log(`update res is:`);
            console.log(res);
            getUserHistory(id);
            history.push('/');
            dispatch(clearErrors());

            message.success("History Updated Successfully")
        })
        .catch(err => {
            console.log(`Update err is:`);
            console.log(err);
            dispatch({
                type: GET_HISTORY,
                payload: []
            });
        });
    axios.defaults.headers.common['Authorization'] =  axios.defaults.headers.common['Authorization'].slice(7);

};
// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};
