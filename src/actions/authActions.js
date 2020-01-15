// file name can be anything

import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import {message} from 'antd';

// Register User
export const registerUser = (userData, history)=> async (dispatch) =>{
    // we dont have to do http://5000 cus of the proxy value we included in our package.json
    // http://ec2-52-221-183-90.ap-southeast-1.compute.amazonaws.com:443/
    const url = "http://34.87.80.154:443/api/users";
    console.log(url);
    await axios.post(url, userData)
        .then(res => {
            // history.push('/login');
           dispatch(loginUser(userData, history));
            message.success("Signed up successfully")
        })     // redirect to login
        .catch(err => {
            console.log('Error'+err);

            dispatch({
                    type: GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                    // payload: {}//sets payload to errors coming from server
                    payload: err.response.data //sets payload to errors coming from server
                });
            }
        );

};

// Login - Get user token
export const loginUser = (userData, history) => async (dispatch) => {
    const url = "http://34.87.80.154:443/api/users/login";
    console.log(`logging in user `);
    await axios.post(url, userData)
        .then(res => {
            console.log("res is:"+ res);
            console.log( res);
            //Save to localStorage
            const { token } = res.data;
            // Set token t  o localStorage
            localStorage.setItem('jwtToken', token);
            // Set token to Auth header. Apply Authorization token to header to every request
            setAuthToken(token);
            console.log(`Token from auth actions is:`);
            console.log(token);
            // the token includes user info but it is encoded
            // to decode we use jwt-decode
            //Decode token to get user data
            const decoded = jwt_decode(token);
            // const decoded = res.data.user;
            console.log(`decoded:`);
            console.log(decoded);
            // Set current user
            dispatch(setCurrentUser(decoded));
            message.success("Login Successful");

            history.push('/')

        })
        .catch(err => {
                console.log(`err is :${err}`);
                console.log(err);
                console.log(err.data);
                console.log(err.response);
                dispatch({
                    type: GET_ERRORS,  //this call test dispatch. to dispsatch to our reducer
                    payload: err.response.data //sets payload to errors coming from server
                })
            }
        );
};

// login admin
export const loginAdmin = (userData, history) => async (dispatch) => {
    const url = "http://34.87.80.154:443/api/users/admin";
    console.log(`logging in admin `);
    await axios.post(url, userData)
        .then(res => {
            console.log("res is:"+ res);
            console.log( res);
            message.success("Login Successful");

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
                })
            }
        );
};


// Set logged  in user
export const setCurrentUser = (decoded) => {
  return {
      type: SET_CURRENT_USER,
      payload: decoded
  }
};

// Log user out
export const logoutUser = () => dispatch =>{
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}))
};
