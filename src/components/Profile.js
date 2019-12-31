import React, {Component} from 'react';
import * as PropTypes from "prop-types";  // to map prop to prop-types
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux' // to use redux in a component
import { registerUser, loginUser } from "../actions/authActions";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Moment from 'moment';
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {withStyles} from "@material-ui/core";
import styles from '../styles/LoginStyles'
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {message} from "antd";
import axios from "axios";
import {getCurrentProfile, updateProfile} from "../actions/profileActions";




class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName:"",
            birthday: "",
            city:"",
            country: "",
            nationality: "",
            email:"",
            phone:"",
            errors:{},
            loading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentDidMount() {  // if user is already logged in redirect
        const user_id = this.props.auth.user.result.id;
        this.props.getCurrentProfile(user_id);

        console.log(`state is:`);
        console.log(this.state);
    }

    componentWillReceiveProps(nextProps, nextState) {      // take the new errors from nextProps if any and set that to errors in the state
        if(nextProps.errors  && nextProps.auth.isAuthenticated){
            this.setState({errors: nextProps.errors}, ()=>{
                this.setState({loading:false});
                if(this.state.errors.message !== undefined)
                    message.error(this.state.errors.message);
            });
        }
        console.log(`Profile is:`);
        console.log(nextProps.profile);
        if(this.props.profile){
            this.setState({
                firstName: nextProps.profile.profile.firstName,
                lastName: nextProps.profile.profile.lastName,
                birthday:  Moment(nextProps.profile.profile.birthday).format('YYYY-MM-DD'),
                city: nextProps.profile.profile.city,
                country: nextProps.profile.profile.country,
                nationality: nextProps.profile.profile.nationality,
                email: nextProps.profile.profile.email,
                phone: nextProps.profile.profile.phone
            })
        }
    }
    handleChange(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    handleSubmit(evt){
        evt.preventDefault();
        console.log(`Handling submit`);
        const new_profile ={
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            birthday: this.state.birthday,
            city: this.state.city,
            country: this.state.country,
            nationality: this.state.nationality,
            email: this.state.email,
            phone: this.state.phone
        };
        console.log(new_profile);
        const user_id = this.props.auth.user.result.id;
        console.log(user_id);
        this.setState({loading: true});
        this.props.updateProfile(new_profile, user_id, this.props.history);   //so we can redirect from action
        // we dont have to do http://5000 cus of the proxy value we included in our package.json


        console.log(`Handle submit`);
    }
    render() {
        const {classes} = this.props;
        const {firstName, lastName, birthday, city, country, nationality, phone, email, loading} = this.state;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Your Profile
                    </Typography>

                    <ValidatorForm onSubmit={this.handleSubmit} ref={'form'} className={classes.form}>

                        <TextValidator
                            label={"First Name"}
                            value={firstName}
                            name={"firstName"}
                            onChange={this.handleChange}
                            fullWidth
                            placeholder={"First Name"}
                            variant={"outlined"}
                            type={'text'}
                            margin={"normal"}
                            autoFocus
                        />
                        <TextValidator
                            label={"Last Name"}
                            value={lastName}
                            name={"lastName"}
                            onChange={this.handleChange}
                            fullWidth
                            placeholder={"Last Name"}
                            variant={"outlined"}
                            type={'text'}
                            margin={"normal"}
                            autoFocus
                        />

                        <TextValidator
                            label={"Birthday"}
                            value={birthday}
                            name={"birthday"}
                            onChange={this.handleChange}
                            fullWidth
                            // placeholder={"Birthday"}
                            variant={"outlined"}
                            type={'date'}
                            margin={"normal"}
                            InputLabelProps={{ shrink: true }}
                            autoFocus
                        />
                        <TextValidator
                            label={"City"}
                            value={city}
                            name={"city"}
                            className={classes.halfWidth_x}
                            onChange={this.handleChange}
                            placeholder={"City"}
                            variant={"outlined"}
                            type={'text'}
                            margin={"normal"}
                            autoFocus
                        />
                        <TextValidator
                            className={classes.halfWidth_x2}
                            label={"Country"}
                            value={country}
                            name={"country"}
                            onChange={this.handleChange}
                            placeholder={"Country"}
                            variant={"outlined"}
                            type={'text'}
                            margin={"normal"}
                            autoFocus
                        />
                        <TextValidator
                            label={"Nationality"}
                            value={nationality}
                            name={"nationality"}
                            fullWidth
                            onChange={this.handleChange}
                            placeholder={"Nationality"}
                            variant={"outlined"}
                            type={'text'}
                            margin={"normal"}
                            autoFocus
                        />
                        <TextValidator
                        value={email}
                        placeholder={"Email Address"}
                        name={"email"}
                        variant={"outlined"}
                        margin={"normal"}
                        onChange={this.handleChange}
                        label={"Email"}
                        autoComplete="email"
                        autoFocus
                        fullWidth
                        validators={["isEmail"]}
                        errorMessages={["Must be an Email"]}
                        />
                        <TextValidator
                            label={"Phone"}
                            value={phone}
                            name={"phone"}
                            fullWidth
                            onChange={this.handleChange}
                            placeholder={"Phone Number"}
                            variant={"outlined"}
                            type={'Number'}
                            margin={"normal"}
                            autoFocus
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            className={classes.submit}
                        >
                            Update Profile
                        </Button>

                    </ValidatorForm>
                </div>
                <Typography variant="body2" color="textSecondary" align="center">
                    {'Copyright © '}
                    <Link color="inherit" href="https://material-ui.com/">
                        Tourist Trace Tracking
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Container>
        );
    }
}

Profile.propTypes ={
    auth: PropTypes.object.isRequired,

    errors: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    // updateProfile: PropTypes.func.isRequired


};

// if we want to get the auth state to our component we use
const mapStateToProps = (state) =>({
    auth: state.auth,  //the name auth in state.auth comes from our root reducer(index)
    errors: state.errors,
    profile: state.profile
});

//
export default connect(mapStateToProps, {getCurrentProfile, updateProfile})(withStyles(styles, {withTheme: true})(withRouter(Profile)))


