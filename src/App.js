import React from 'react';
import logo from './logo.svg';
import {BrowserRouter,Route, Switch} from "react-router-dom";
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken'
import {setCurrentUser} from "./actions/authActions";
import {logoutUser} from "./actions/authActions";
// import {clearCurrentProfile} from "./actions/profileActions";

import { Provider } from 'react-redux';
import store from './store';

import './styles/App.css';

import MapContainer from "./components/MapContainer";
import History from './components/History';
import Profile from './components/Profile';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/antd/dist/antd.css';
import PrivateRoute from "./components/common/PrivateRoute";

// Check for token
if(localStorage.jwtToken){
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode token and get user info and expiration
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime){
        // Logout user
        store.dispatch(logoutUser());
        //TODO: Clear current Profile
        // store.dispatch(clearCurrentProfile());
        // Redirect to login
        window.location.href = '/login'
    }
}

function App() {
  return (
      <Provider store={ store }>
          <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={routeProps => (
                            <MapContainer {...routeProps}/>
                        )}
                    />
                    <Route
                        exact
                        path="/login"
                        render={routeProps =>(
                            <Login {...routeProps}/>
                        )}
                    />
                    <Route
                        exact
                        path={"/register"}
                        render={routeProps =>(
                            <Register {...routeProps}/>
                        )}
                    />
                    <PrivateRoute
                        exact
                        path={"/history/:id"}
                        component={History}
                    />
                    <PrivateRoute
                        exact
                        path={'/profile'}
                        component={Profile}
                    />
                </Switch>
            </div>
          </BrowserRouter>
      </Provider>
  );
}

export default App;
