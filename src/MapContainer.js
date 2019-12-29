import React, {Component} from 'react';
import {Link} from "react-router-dom";


class MapContainer extends Component {
    render() {
        return (
            <div>
                <p>Map container</p>
                <Link to={'/login'} onClick={e => e.stopPropagation()}> <span>Login</span></Link>
                <Link to={'/register'} onClick={e => e.stopPropagation()}> <span>Register</span></Link>
                <Link to={'/history/1'} onClick={e => e.stopPropagation()}> <span>History</span></Link>


            </div>
        );
    }
}

export default MapContainer;
