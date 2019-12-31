import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as PropTypes from "prop-types";     // to map prop to prop-types
import {message } from 'antd';


const PrivateRoute = ({component: Component, auth, ...rest}) => (
    // if user is authenticated render that route else redirect to '/login
    <Route
        {...rest}
        render={props =>
            auth.isAuthenticated === true ?
                (
                    <Component {...props}/>
                ):(
                    <Redirect to={'/login'}/>
                )
        }
    />
);

PrivateRoute.propTypes ={
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) =>({
    auth: state.auth  //the name auth in state.auth comes from our root reducer(index)
});

export default connect(mapStateToProps)(PrivateRoute);