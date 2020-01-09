import React, {Component} from 'react';
import {Link} from "react-router-dom";
import * as PropTypes from "prop-types";
import { connect } from 'react-redux'
import { logoutUser } from "../actions/authActions";
import Navbar from './layout/Navbar';
import Icon from "@material-ui/core/Icon";
import styles from '../styles/MapContainerStyles';
import GoogleMapReact from 'google-map-react';
import Moment from 'moment';

// import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

import { Button, Input, Divider, message } from 'antd';
import SwapHorizontalCircleOutlinedIcon from '@material-ui/icons/SwapHorizontalCircleOutlined';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import classNames from "classnames";




// import '../styles/css/component.css'
// import '../styles/css/default.css';
import '../styles/hovicon.css';
import {loadCSS} from "fg-loadcss";

import {deepOrange, green, pink} from "@material-ui/core/colors";

import Avatar from "./auth/Login";
import {withStyles} from "@material-ui/core";
// import Divider from "@material-ui/core/Divider";
import PlaceCard from "./PlaceCard";
import MapMarker from "./MapMarker";
import MapCard from "./MapCard";
import Fab from "@material-ui/core/Fab";
import {updateHistory} from "../actions/historyActions";
// import '../styles/js/component.js';
// import '../styles/js/modernizr.custom.js';
// const SG_COOR = { lat: 21.0278, lng: 105.8342 };


const AnyReactComponent = ({ text }) => <div style={{
    position: "absolute",
    top: "50%",
    left: "-100%",
    maxWidth: "50px",
    maxHeight: "60px",
    // overflow: "hidden",
    width: "18px",
    height: "18px",
    transform: "translate(100%, 50%)",
    border: "2px solid #fff"}}>{text}</div>;

class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            constraints: [{ name: '', time: 0 }],
            searchResults: [],
            mapsLoaded: false,
            markers: [],
            map: {},
            mapsApi: {},
            singaporeLatLng: {},
            autoCompleteService: {},
            placesService: {},
            geoCoderService: {},
            directionService: {},
            isSelectorOpenValue: false,
            showCard: false,
            selectorValue: "cafe",
            sliderValue: 30,
            searchValue: null,
            SG_COOR:{ lat: 21.0278, lng: 105.8342 },
            zoom: 18,
            currentLocation: {},
            placeLocation: {},
            arrival_time: "",
            leave_time: ""
        };
        this.onLogoutClick = this.onLogoutClick.bind(this);
        this.handleOption = this.handleOption.bind(this);
        this.handleMarkerClick = this.handleMarkerClick.bind(this);
        this.toggleMap = this.toggleMap.bind(this);
        this.saveLocation = this.saveLocation.bind(this);

    }
    onLogoutClick(e){
        e.preventDefault();
        // this.props.clearCurrentProfile();
        this.props.logoutUser();
    }

    saveLocation(){
        if(this.props.auth.isAuthenticated) {
            let newHist = [
                {
                    latitude: this.state.currentLocation.lat,
                    longitude: this.state.currentLocation.lng,
                    arrival_time: this.state.arrival_time,
                    leave_time: this.state.leave_time
                }
            ];
            const user_id = this.props.auth.user.result.id;
            console.log(`auth is`);
            console.log(this.props.auth.user);

            this.props.updateHistory(newHist, user_id, this.props.history);
            let time = new Date();
            let formatedTime = Moment(time.toDateString() +" "+ time.toTimeString()).format('YYYY-MM-DD HH:mm:ss');
            this.setState({arrival_time: formatedTime})
        }
    }
    componentDidMount() {   // if user is already logged in redirect
        // if(this.props.auth.isAuthenticated){
        //     this.props.history.push('/')
        // }
        console.log(navigator);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) =>{
                console.log("pos is:");
                console.log(position);
                let pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                let time = new Date();
                let formatedTime = Moment(time.toDateString() +" "+ time.toTimeString()).format('YYYY-MM-DD HH:mm:ss');
                this.setState({currentLocation: pos, placeLocation: pos, arrival_time: formatedTime });
                // add marker
                const prevMarkers = this.state.markers;
                const markers = Object.assign([], prevMarkers);
                markers.push({lat: pos.lat, lng: pos.lng, name:""});
                this.setState({ markers });
                setTimeout(this.handleSearch, 1000);


                console.log(this.state.arrival_time);
                console.log();
            })
        }
        // check is user has left current location
        let userLeft= ()=>{
            // runs every 60 sec and runs on init.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) =>{
                    let pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    // if position is not equal to the currentLocation
                    if(pos.lat !== this.state.currentLocation.lat || pos.lng !== this.state.currentLocation.lng){
                        console.log(`Location changed`);
                        console.log(pos);
                        let time = new Date();
                        let formatedTime = Moment(time.toDateString() +" "+ time.toTimeString()).format('YYYY-MM-DD HH:mm:ss');
                        this.setState({leave_time: formatedTime, currentLocation: pos }, ()=>{
                            this.saveLocation()
                        });

                    }else {
                        console.log(`Same location`);
                        console.log(pos);
                    }
                })
            }
        };

        // set Leave time onWindowClose
        window.addEventListener("beforeunload", (ev) =>
        {
            ev.preventDefault();

            // let pos;
            // if (navigator.geolocation) {
            //     navigator.geolocation.getCurrentPosition((position) => {
            //          pos = {
            //             lat: position.coords.latitude,
            //             lng: position.coords.longitude
            //         };
            //     })
            // }
            let time = new Date();
            let formatedTime = Moment(time.toDateString() +" "+ time.toTimeString()).format('YYYY-MM-DD HH:mm:ss');
            this.setState({leave_time: formatedTime}, ()=>{
                this.saveLocation()
            });
            return ev.returnValue = 'Are you sure you want to close?';
        });
        // run every 5 seconds
        setInterval(userLeft, 5*1000);
    }


    // get options from navbar
    handleOption = (selectorOpenValue, selectorValue, sliderValue, searchValue) => {
        if(selectorOpenValue!= null) this.setState({isSelectorOpenValue: selectorOpenValue});
        if(selectorValue!= null) this.setState({selectorValue: selectorValue});
        if(sliderValue!= null) this.setState({sliderValue:sliderValue});
        if(searchValue!= null) this.setState({searchValue: searchValue});
        console.log(selectorOpenValue + "selectorOpenvalue");
        console.log(selectorValue +"selector value");
        console.log(sliderValue +"slidervalue");
        console.log(searchValue + "searchvalue");
        setTimeout(this.handleSearch, 1000);


    };

    handleMarkerClick = (lat, lng)=>{
        console.log(`Marker clicked`);
        console.log(lat +""+ lng);
        this.setState({
            SG_COOR:{ lat: lat, lng:lng},
            zoom: 30
        })
    };
    // Update name for constraint with index === key
    updateConstraintName = ((event, key) => {
        event.preventDefault();
        const prevConstraints = this.state.constraints;
        const constraints = Object.assign([], prevConstraints);
        constraints[key].name = event.target.value;
        this.setState({ constraints });
    });

    // Updates distance (in KM) for constraint with index == key
    updateConstraintTime = ((key, value) => {
        const prevConstraints = this.state.constraints;
        const constraints = Object.assign([], prevConstraints);
        constraints[key].time = value;
        this.setState({ constraints });
    });

    // Adds a Marker to the GoogleMaps component
    addMarker = ((lat, lng, name) => {
        // change current map lat lng
        this.setState({placeLocation: {lat: lat, lng: lng}});

        const prevMarkers = this.state.markers;
        const markers = Object.assign([], prevMarkers);

        // If name already exists in marker list just replace lat & lng.
        let short_name = name.split(',', 2) ;
        let short_name_ = name.split(',', 2) + " "+ name.split(',')[name.split(',').length -1] ;
        console.log(short_name + "shortname");
        console.log(short_name_ + "shortname2");
        let newMarker = true;
        for (let i = 0; i < markers.length; i++) {
            if (markers[i].name === name) {
                newMarker = false;
                markers[i].lat = lat;
                markers[i].lng = lng;

                message.success(`Updated "${short_name_}" Marker`);
                break;
            }
        }
        // Name does not exist in marker list. Create new marker
        if (newMarker) {
            markers.push({ lat, lng, name: short_name_ });
            message.success(`Added new "${short_name_}" Marker`);
        }

        this.setState({ markers });
        this.handleSearch();
    });

    // Runs once when the Google Maps library is ready
    // Initializes all services that we need
    apiHasLoaded = ((map, mapsApi) => {

        console.log(`map`);
        console.log(map);
        console.log(mapsApi);
        this.setState({
            mapsLoaded: true,
            map,
            mapsApi,
            singaporeLatLng: new mapsApi.LatLng(this.state.SG_COOR.lat, this.state.SG_COOR.lng),
            autoCompleteService: new mapsApi.places.AutocompleteService(),
            placesService: new mapsApi.places.PlacesService(map),
            geoCoderService: new mapsApi.Geocoder(),
            directionService: new mapsApi.DirectionsService(),
        });
    });

    toggleMap = (()=>{
        if(this.state.searchResults.length>0)
            this.setState({showCard: !this.state.showCard})
    });

    // With the constraints, find some places serving ice-cream
    handleSearch = (() => {
        const { markers, constraints, sliderValue, placesService, directionService, mapsApi } = this.state;
        if (markers.length === 0) {
            message.warn('Add a constraint and try again!');
            return;
        }
        const filteredResults = [];
        const marker = markers[markers.length-1];
        // const timeLimit = constraints[0].time;
        const timeLimit = sliderValue;
        const markerLatLng = new mapsApi.LatLng(marker.lat, marker.lng);

        const placesRequest = { //https://developers.google.com/places/web-service/search#TextSearchRequests
            location: markerLatLng,
            // radius: '30000', // Cannot be used with rankBy. Pick your poison!
            // type: ['restaurant', 'cafe'], // List of types: https://developers.google.com/places/supported_types
            // query: 'ice cream',
            type: [this.state.selectorValue], // List of types: https://developers.google.com/places/supported_types
            query: this.state.selectorValue,
            rankBy: mapsApi.places.RankBy.DISTANCE, // Cannot be used with radius.
        };
        // First, search for ice cream shops.
        placesService.textSearch(placesRequest, ((response) => {
            console.log(`response is: `);
            console.log(response);
            // Only look at the nearest top 5.
            const responseLimit = Math.min(10, response.length);
            for (let i = 0; i < responseLimit; i++) {
                const iceCreamPlace = response[i];
                const { rating, name } = iceCreamPlace;
                const address = iceCreamPlace.formatted_address; // e.g 80 mandai Lake Rd,
                const priceLevel = iceCreamPlace.price_level; // 1, 2, 3...
                let photoUrl = '';
                let openNow = false;
                if (iceCreamPlace.opening_hours) {
                    openNow = iceCreamPlace.opening_hours.open_now; // e.g true/false
                }
                if (iceCreamPlace.photos && iceCreamPlace.photos.length > 0) {
                    photoUrl = iceCreamPlace.photos[0].getUrl();
                }

                // Second, For each iceCreamPlace, check if it is within acceptable travelling distance
                const directionRequest = {
                    origin: markerLatLng,
                    destination: address, // Address of ice cream place
                    travelMode: 'DRIVING',
                }
                directionService.route(directionRequest, ((result, status) => {
                    if (status !== 'OK') { return }
                    const travellingRoute = result.routes[0].legs[0]; // { duration: { text: 1mins, value: 600 } }
                    const travellingTimeInMinutes = travellingRoute.duration.value / 60;
                    if (travellingTimeInMinutes < timeLimit) {
                        // todo: if timelimit is not given default it to 10min
                        const distanceText = travellingRoute.distance.text; // 6.4km
                        const timeText = travellingRoute.duration.text; // 11 mins
                        filteredResults.push({
                            name,
                            rating,
                            address,
                            openNow,
                            priceLevel,
                            photoUrl,
                            distanceText,
                            timeText,
                        });
                    }
                    // Finally, Add results to state
                    this.setState({ searchResults: filteredResults });

                }));
            }
        }));
    });

        render() {
        const {isAuthenticated, user} = this.props.auth;
        const {classes} = this.props;
        const { constraints, mapsLoaded, singaporeLatLng, markers, searchResults, name, isSelectorOpenValue, showCard, currentLocation, placeLocation } = this.state;
        const { autoCompleteService, geoCoderService, SG_COOR, zoom, selectorValue } = this.state; // Google Maps Services
            console.log(isSelectorOpenValue);

            return (
                // maxHeight: "100vh",height: '100vh'
                <div style={{ width: '100%', maxWidth: "100%",     overflow: "hidden"}}>
                {mapsLoaded?
                    <Navbar
                    isLoggedIn={isAuthenticated}
                    logOutUser={this.props.logoutUser}
                    onSelectOption={this.handleOption} // function to pass selected option to mapContainer state
                    autoCompleteService={autoCompleteService}
                    geoCoderService={geoCoderService}
                    singaporeLatLng={singaporeLatLng}
                    markerName={name}
                    addMarker={this.addMarker}
                    />
                    : null
                }




                {/* Maps Section */}
                    {/*<section  className={ classNames( classes.mapStyle, {*/}
                    <section  className={ classNames( classes.mapStyle, {
                        [classes.isSelectorOpenStyle]: isSelectorOpenValue,
                        [classes.showCard]: showCard
                        })}
                    >
                    {/*<div style={{ height: '100vh', width: '100%', maxWidth: "100%", maxHeight: "100vh" }}>*/}
                    {/*<div >*/}
                        {/*<section >*/}


                        <GoogleMapReact
                            className={classes.mapStyle}
                            bootstrapURLKeys={{
                                key: process.env.REACT_APP_GOOGLE_KEY,
                                libraries: ['places', 'directions']
                            }}
                            center={{ lat: placeLocation.lat, lng: placeLocation.lng }}
                            defaultZoom={zoom}
                            // defaultCenter={{ lat: currentLocation.lat, lng: currentLocation.lng }}
                            yesIWantToUseGoogleMapApiInternals={true}
                            onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)} // "maps" is the mapApi. Bad naming but that's their library.
                        >
                             {/*Pin markers on the Map*/}
                            {currentLocation.lat !== undefined ? (
                                <MapMarker key={"khg"}
                                           handleMarkerClick={this.handleMarkerClick}
                                           lat={currentLocation.lat}
                                           lng={currentLocation.lng} />
                            ):null}

                            {markers.map((marker, key) => {
                                const { name, lat, lng } = marker;
                                return (
                                    <MapMarker key={key}
                                               name={name}
                                               handleMarkerClick={this.handleMarkerClick}
                                               lat={lat}
                                               lng={lng} />

                                );
                            })}
                        </GoogleMapReact>
                        </section>
                     {/*</div>*/}
                    {/*</section>*/}

                {/* Results section */}
                {searchResults.length>0  && showCard ?
                    <>
                        {/*<Divider />*/}
                        <section className="col-12 ml-5">
                            <div className="d-flex flex-column justify-content-center">
                                <h1 className="mb-4 fw-md">{selectorValue}</h1>
                                <div className="d-flex flex-wrap">
                                    {/*<PlaceCard info={result} key={key} />*/}

                                    {searchResults.map((result, key) => (
                                        <MapCard info={result} key={key}/>

                                    ))}
                                </div>

                            </div>
                        </section>
                    </>
                    : null}


                        {/*<SwapHorizontalCircleOutlinedIcon/>*/}
                        {showCard ? (
                            <Fab color="secondary"  style={{fontSize: "1em", position: "fixed", top: "90%", marginLeft:"0.5em"}} >
                              <Icon className="fas fa-angle-double-left" onClick={this.toggleMap} />
                            </Fab>
                        ):(
                            <Fab color="secondary"  style={{fontSize: "1em", position: "absolute", top: "87%", marginLeft:"0.5em"}} >
                                <Icon className="fas fa-angle-double-right" onClick={this.toggleMap} />
                            </Fab>
                        )}
            </div>
        );
    }
}
MapContainer.propTypes ={
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    updateHistory: PropTypes.func.isRequired

};

// if we want to get the auth state to our component we use
const mapStateToProps = (state) =>({
    auth: state.auth,  //the name auth in state.auth comes from our root reducer(index)
});
export default   connect(mapStateToProps, { logoutUser, updateHistory})(withStyles(styles, {withTheme: true})(MapContainer));
