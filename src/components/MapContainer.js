import React, {Component} from 'react';
import {Link} from "react-router-dom";
import * as PropTypes from "prop-types";
import { connect } from 'react-redux'
import { logoutUser } from "../actions/authActions";


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

        return (

            <div>
                <p>Map container</p>

                {!isAuthenticated ?(
                    <div>
                    <Link to={'/login'} onClick={e => e.stopPropagation()}> <span>Login</span></Link>
                    <Link to={'/register'} onClick={e => e.stopPropagation()}> <span>Register</span></Link>
                    </div>
                        )
                    : <div>
                        <Link to={'#'} onClick={this.onLogoutClick}> <span>LogOut</span></Link>
                        <Link to={'/history/1'} onClick={e => e.stopPropagation()}> <span>History</span></Link>
                        <Link to={'/profile'} onClick={e => e.stopPropagation()}> <span>Profile</span></Link>


                    </div>}


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
export default   connect(mapStateToProps, { logoutUser})(MapContainer);
