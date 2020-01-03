import React, {Component} from 'react';
import {Link} from "react-router-dom";
import * as PropTypes from "prop-types";
import { connect } from 'react-redux'
import { logoutUser } from "../actions/authActions";
import Navbar from './layout/Navbar';
import Icon from "@material-ui/core/Icon";
import styles from '../styles/LoginStyles';

// import '../styles/css/component.css'
// import '../styles/css/default.css';
import '../styles/hovicon.css';
import {loadCSS} from "fg-loadcss";

import {deepOrange, green, pink} from "@material-ui/core/colors";

import Avatar from "./auth/Login";
import {withStyles} from "@material-ui/core";
// import '../styles/js/component.js';
// import '../styles/js/modernizr.custom.js';


class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.onLogoutClick = this.onLogoutClick.bind(this);

    }
    onLogoutClick(e){
        e.preventDefault();
        // this.props.clearCurrentProfile();
        this.props.logoutUser();
    }
    componentDidMount() {   // if user is already logged in redirect
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/')
        }

    }
    render() {
        const {isAuthenticated, user} = this.props.auth;
        const {classes} = this.props;

        return (

            <div>
                <Navbar
                    isLoggedIn={isAuthenticated}
                    logOutUser={this.props.logoutUser}

                />



                <p>Map container</p>




            </div>
        );
    }
}
MapContainer.propTypes ={
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
};

// if we want to get the auth state to our component we use
const mapStateToProps = (state) =>({
    auth: state.auth,  //the name auth in state.auth comes from our root reducer(index)
});
export default   connect(mapStateToProps, { logoutUser})(withStyles(styles, {withTheme: true})(MapContainer));
