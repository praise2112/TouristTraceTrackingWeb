import React from 'react';
import logo from './logo.svg';
import {Route, Switch} from "react-router-dom";

import './styles/App.css';
import MapContainer from "./MapContainer";
import History from './History';
import Login from './Login';
import Register from './Register';

function App() {
  return (
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
                    <Login/>
                )}
            />
            <Route
                exact
                path={"/register"}
                render={routeProps =>(
                    <Register/>
                )}
            />
            <Route
                exact
                path={"/history/:id"}
                render={routeProps =>(
                    <History/>
                )}
            />
        </Switch>
    </div>
  );
}

export default App;
