import React, {Component} from 'react';
import * as PropTypes from "prop-types";     // to map prop to prop-types

import { connect } from 'react-redux' // to use redux in a component
import { withStyles} from '@material-ui/core/styles';
import styles from '../styles/LoginStyles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {message } from 'antd';
import {loginAdmin} from "../actions/authActions";
import {getAllUsers} from "../actions/profileActions";
import isEmpty from "../validation/is-empty";
import classNames from "classnames";
import Moment from "./History";








class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            name: "",
            password: "",
            users:{},
            loggedIn: false,
            loading: false,
            errors: {},
            itemSelected: 1,
            data: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }
    componentDidMount() {  // if user is already logged in redirect
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/');
            message.success("User already logged in. Redirecting...")
        }
    }

    componentWillReceiveProps(nextProps, nextState) {      // take the new errors from nextProps if any and set that to errors in the state
        if(nextProps.auth.isAuthenticated){

            this.props.history.push('/');
        }
        if(nextProps.errors && !nextProps.auth.isAuthenticated){
            this.setState({errors: nextProps.errors}, ()=>{
                this.setState({loading:false});
                if(this.state.errors.message !== undefined)
                    message.error(this.state.errors.message);
            });

        }
        console.log(`Profile is:`);
        console.log(nextProps.profile.profiles);
        if(this.props.profile.profiles){
            this.setState({users: this.props.profile.profiles});
        }
    }
    handleChange(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }
    handleClick(index, type){
        let data;
        switch (type) {
            case "all_users": data = this.props.profile.profiles.data.map((user, index) => (
                <div key={index} >
                    Client id: {user.id} Name: {user.firstName + "  " + user.lastName}
                </div>
            ));
                this.setState({ data });
                return;
            case "delete_user": data = <div>Delete User is still in development</div>;
                this.setState({ data });
                return ;
            case "update_history": data = <div>Update a user history is still in development</div>;
                this.setState({ data });
                return;
            case "delete_history": data = <div>Delete a user history is still in development</div>;
                this.setState({ data });
                return;
            case "update_profile": data = <div>Delete a user profile is still in development</div>;
                this.setState({ data });
                return;
        }
        this.setState({ itemSelected: index })
    }
    handleSubmit(evt){
        evt.preventDefault();
        const userData = {
            username: this.state.username,
            name: this.state.name,
            password: this.state.password
        };
        console.log(`${this.state.username}${this.state.password}`);
        this.setState({loading: true});
        this.props.loginAdmin(userData, this.props.history);
        this.setState({loggedIn: true, loading: false});
        this.props.getAllUsers();
        // console.log(`users from admin`);
        // console.log(users);
        // this.setState(users);
        // message.success("Succesfully logged in user");

        console.log(`Handle submit`);

    }



    render() {
        const {classes} = this.props;
        const {username, name, password, loading, loggedIn, itemSelected, data} = this.state;
        // {loggedIn ? }
        {/*<div>You are now logged In</div> : */}
        const form =  (<section className={classes.container}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <ValidatorForm onSubmit={this.handleSubmit} ref={'form'} className={classes.form}>
                        <TextValidator
                            label={"Username*"}
                            value={username}
                            name={"username"}
                            onChange={this.handleChange}
                            fullWidth
                            placeholder={"Username"}
                            variant={"outlined"}
                            type={'text'}
                            margin={"normal"}
                            validators={["required"]}
                            errorMessages={["Enter a username"]}
                        />
                        <TextValidator
                            label={"Name*"}
                            value={name}
                            name={"name"}
                            onChange={this.handleChange}
                            fullWidth
                            placeholder={"Name"}
                            variant={"outlined"}
                            type={'text'}
                            margin={"normal"}
                            validators={["required"]}
                            errorMessages={["Enter a name"]}
                        />
                        <TextValidator
                            className={classes.form}
                            value={password}
                            placeholder={"Password"}
                            name={"password"}
                            variant={"outlined"}
                            margin={"normal"}
                            onChange={this.handleChange}
                            type={'password'}
                            fullwidth
                            id="password"
                            label={"Password*"}
                            autoComplete="password"
                            autoFocus
                            validators={["required"]}
                            errorMessages={[
                                "Please enter a password"]}
                        />


                        <br/>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={loading}
                        >
                            LogIn
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
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
        </section>);
        const dashboard =(
            <div style={{ width: '100vw', height:'100vh', maxWidth: "100vh", overflow: "hidden"}} className={classes.container}>
                <p>Admin Page</p>
                    <section style={{ width: '30%',  height:'100vh',display: "inline-block"}}>
                        <p onClick={() => this.handleClick(1,"all_users")}
                           className={classNames(classes.hist, {
                            [classes.selected]: 1 === itemSelected
                        })}>View all Users</p>
                        <p onClick={() => this.handleClick(2, "delete_user")}
                           className={classNames(classes.hist, {
                               [classes.selected]: 2 === itemSelected
                           })}>
                            Delete a User</p>
                        <p onClick={() => this.handleClick(3, "update_history")}
                           className={classNames(classes.hist, {
                               [classes.selected]: 3 === itemSelected
                           })}>
                            Update a User History</p>
                        <p onClick={() => this.handleClick(4, "delete_history")}
                           className={classNames(classes.hist, {
                            [classes.selected]: 4 === itemSelected
                        })}>Delete a User History</p>
                        <p onClick={() => this.handleClick(5, "update_profile")}
                           className={classNames(classes.hist, {
                            [classes.selected]: 5 === itemSelected
                        })}>Update a User Profile</p>
                    </section>
                    <section style={{ width: '60%', height:'100vh', display: "inline-block", position:"absolute", marginTop: "-2em", color: "black"}}>
                        {/*<p>Stuff Here</p>*/}
                        {data}
                    </section>
            </div>
        );

            return (
            <>
             { loggedIn? dashboard:  form}
            </>
            // )}
        );
    }
}

Admin.propTypes ={
    loginAdmin: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,

};

// if we want to get the auth state to our component we use
const mapStateToProps = (state) =>({
    auth: state.auth,  //the name auth in state.auth comes from our root reducer(index)
    errors: state.errors,
    profile: state.profile

});

export default connect(mapStateToProps, { loginAdmin, getAllUsers })(withStyles(styles, {withTheme: true})(Admin));
