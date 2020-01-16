import axios from 'axios';

import {GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE, CLEAR_ERRORS, GET_PROFILES} from "./types";
import {message} from 'antd';

// Get current profile
export const getCurrentProfile = (id) =>async dispatch => {
    // dispatch(setProfileLoading());  // set loading to true
    const url = `http://34.87.80.154:443/api/users/${id}`;
    console.log(`id is ${id}`);
    console.log(url);
    console.log(`Token from profile actions is:`);
    console.log();
    axios.defaults.headers.common['Authorization'] = "Bearer "+axios.defaults.headers.common['Authorization'];
   await axios.get(url)
        .then(res =>{
            console.log(`res is:`);
            console.log(res);
            console.log(res.data.data);
            dispatch({
                type: GET_PROFILE,
                payload: res.data.data
            });

            message.success("Got current profile")
        })
        .catch(err => {
            dispatch({
                type: GET_PROFILE,
                payload: {}
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
export const updateProfile = (profileData, id, history) =>  async dispatch => {
    // dispatch(clearErrors());

    // dispatch(setProfileLoading());  // set loading to true
    const url = "http://34.87.80.154:443";
    axios.defaults.headers.common['Authorization'] = "Bearer "+axios.defaults.headers.common['Authorization'];
    console.log(axios.defaults.headers.common['Authorization']);

    await axios.put(`${url}/api/users/${id}`, profileData)
        .then(res => {
            console.log(`res is:`);
            console.log(res);
            getCurrentProfile(id);
            history.push('/');
            dispatch(clearErrors());

            message.success("Profile Updated Successfully")
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: GET_PROFILE,
                payload: {}
            });
            // dispatch({
            //     type: GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
            //     // payload: {}//sets payload to errors coming from server
            //     payload: err.response.data //sets payload to errors coming from server
            // });
        });
    axios.defaults.headers.common['Authorization'] =  axios.defaults.headers.common['Authorization'].slice(7);

};


export const getAllUsers = () => async (dispatch) => {
    const url = "http://34.87.80.154:443/api/users";
    await axios.get(url)
        .then(res => {
            console.log("res is:"+ res);
            console.log( res);
            message.success("Got all users");
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            });
            // return res.data
            // history.push('/')

        })
        .catch(err => {
                console.log(`err is :${err}`);
                console.log(err);
                console.log(err.data);
                console.log(err.response);
                dispatch({
                    type: GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                    payload: err.response.data //sets payload to errors coming from server
                });
                return null;
            }
        );
};


// Profile loading
// export const setProfileLoading = () =>{
//   return{
//       type: PROFILE_LOADING
//   }
// };

// Clear Profile
// export const clearCurrentProfile = () =>{
//   return{
//       type: CLEAR_CURRENT_PROFILE
//   }
// };
// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};
