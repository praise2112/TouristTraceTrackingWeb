import React, {Component} from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import styles from "../styles/HistoryStyles";
import * as PropTypes from "prop-types";
import {getUserHistory, updateHistory} from "../actions/historyActions";
import {message} from "antd";
import Moment from 'moment';
import clsx from 'clsx';


import {Link, withRouter} from "react-router-dom";
import isEmpty from "../validation/is-empty";
import GoogleMapReact from 'google-map-react';
import classNames from "classnames";
import MapMarker from "./MapMarker";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Icon from "@material-ui/core/Icon";
import Fab from "@material-ui/core/Fab";
import MenuItem from "./layout/Navbar";

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            hist: [],
            zoom: 18,
            currentLocation:{
                lat: 21.0278,
                lng: 105.8342,
                arrival_at: null,
                leave_at: null
            },
            histSelected: null
        };
        // this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentDidMount() {  // if user is already logged in redirect
        const user_id = this.props.auth.user.result.id;
        this.props.getUserHistory(user_id);

    }

    componentWillReceiveProps(nextProps, nextState) {      // take the new errors from nextProps if any and set that to errors in the state
        if(nextProps.errors  && nextProps.auth.isAuthenticated){
            this.setState({errors: nextProps.errors}, ()=>{
                this.setState({loading:false});
                if(this.state.errors.message !== undefined)
                    message.error(this.state.errors.message);
            });
        }
        if(nextProps.hist){
            this.setState({hist: nextProps.hist});
        }

        // console.log(nextProps.hist.hist.data[0]);
        // if(this.props.profile){
        //     this.setState({
        //         firstName: nextProps.profile.profile.firstName,
        //         lastName: nextProps.profile.profile.lastName,
        //
        //     })
        // }
    }
    handleClick(hist, index){
        let pos = {
            lat: hist.latitude,
            lng: hist.longitude,
            arrival_at: Moment(hist.arrival_at).format('YYYY-MM-DD HH:mm:ss'),
            // leave_at: Moment(hist.leave_at).format('YYYY-MM-DD HH:mm:ss'),
        };
        this.setState({currentLocation: pos, histSelected: index })
    }

    // handleSubmit(evt){
    //     evt.preventDefault();
    //
    //     let newHist = [
    //         {
    //             latitude: "123.23",
    //             longitude: "623.32",
    //             arrival_at: "2019-12-17 00:04:50",
    //             leave_at: "2019-12-17 00:08:50"
    //         }
    //     ];
    //     const user_id = this.props.auth.user.result.id;
    //
    //     this.props.updateHistory(newHist,user_id,this.props.history);
    //
    //     console.log(`Handle submit`);
    // }

    render() {
        const {hist, currentLocation, zoom, histSelected} = this.state;
        const {classes} = this.props;
        let history=null;
        if(!isEmpty(hist.hist)) {
            history = hist.hist.map((hist, index) => (
                <div key={index} onClick={() => this.handleClick(hist, index)} className={classNames(classes.hist, {
                    [classes.selected]: index === histSelected
                })}>
                    Latitude: {hist.latitude}° Longitude: {hist.longitude}°
                </div>
            ));
        }else{
            history = <div className={ classes.hist}>
                Looks like there is nothing here!
            </div>
        }

        return (
            <div style={{ width: '100%', maxWidth: "100%", overflow: "hidden"}} className={classes.container}>
                <section className={ classes.historyStyle} style={{display: "inline-block", overflow: "scroll"}}>
                    <p  className={classes.yourHistory}>Your History</p>
                    {history}
                    {/*<button onClick={this.handleSubmit} >Add history</button>*/}
                </section>

                <section  className={ classes.mapStyle} style={{display: "inline-block"}}>
                    {currentLocation.arrival_at !== null && currentLocation.arrival_at !== undefined && currentLocation.arrival_at !== "Invalid date" ? (
                        <div style={{marginBottom: "0.2em", color: "white", textAlign: "center", fontSize: "1.5em"}}>You arrived at {currentLocation.arrival_at}</div>
                        ) : null}
                <GoogleMapReact
                    className={classes.mapStyle}
                    bootstrapURLKeys={{
                        key: process.env.REACT_APP_GOOGLE_KEY,
                        libraries: ['places', 'directions']
                    }}
                    center={{ lat: currentLocation.lat, lng: currentLocation.lng }}
                    defaultZoom={zoom}
                    // defaultCenter={{ lat: currentLocation.lat, lng: currentLocation.lng }}
                    yesIWantToUseGoogleMapApiInternals={true} // "maps" is the mapApi. Bad naming but that's their library.
                >
                            <MapMarker
                                       lat={currentLocation.lat}
                                       lng={currentLocation.lng}
                                       col={"rgb(245, 0, 87)"}/>

                </GoogleMapReact>
            </section>

            </div>
        );
    }
}


History.propTypes ={
    auth: PropTypes.object.isRequired,

    errors: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    // hist: PropTypes.array.isRequired,
    getUserHistory: PropTypes.func.isRequired,
    updateHistory: PropTypes.func.isRequired,
    // updateProfile: PropTypes.func.isRequired


};

// if we want to get the auth state to our component we use
const mapStateToProps = (state) =>({
    auth: state.auth,  //the name auth in state.auth comes from our root reducer(index)
    errors: state.errors,
    profile: state.profile,
    hist: state.hist
});

export default connect(mapStateToProps, {getUserHistory, updateHistory})(withStyles(styles, {withTheme: true})(withRouter(History)));
