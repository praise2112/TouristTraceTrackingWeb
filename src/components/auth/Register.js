import React, {Component} from 'react';
import * as PropTypes from "prop-types";  // to map prop to prop-types
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux' // to use redux in a component
import { registerUser, loginUser } from "../../actions/authActions";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {withStyles} from "@material-ui/core";
import styles from '../..//styles/LoginStyles'
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {message} from "antd";
import axios from "axios";




class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // email: "",
            username:"",
            password: "",
            repeatPassword:"",
            errors:{},
            loading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentDidMount() {  // if user is already logged in redirect
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/');
            message.success("You can't signUp when logged in. Redirecting..")

        }
        ValidatorForm.addValidationRule('isPasswordMatch',(value)=> {
            if (value !== this.state.password) {
                return false;
            }
            return true;

        });
    }

    componentWillReceiveProps(nextProps, nextState) {      // take the new errors from nextProps if any and set that to errors in the state
        if(nextProps.errors  && !nextProps.auth.isAuthenticated){
            this.setState({errors: nextProps.errors}, ()=>{
                this.setState({loading:false});
                if(this.state.errors.message !== undefined)
                    message.error(this.state.errors.message);
            });
        }else{
            const newUser = {
                username: this.state.username,
                password: this.state.password
            };
            setTimeout(()=>this.props.loginUser(newUser, this.props.history), 500);
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

        const newUser = {
            username: this.state.username,
            password: this.state.password
        };
        this.setState({loading: true});
        this.props.registerUser(newUser, this.props.history);   //so we can redirect from action
        // we dont have to do http://5000 cus of the proxy value we included in our package.json


        console.log(`Handle submit`);
    }
    render() {
        const {classes} = this.props;
        const {email, username, password, repeatPassword, loading} = this.state;
        return (
            <section className={classes.container}>

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>

                    <ValidatorForm onSubmit={this.handleSubmit} ref={'form'} className={classes.form}>
                        {/*<TextValidator*/}
                            {/*className={classes.form}*/}
                            {/*value={email}*/}
                            {/*placeholder={"Email Address"}*/}
                            {/*name={"email"}*/}
                            {/*variant={"outlined"}*/}
                            {/*margin={"normal"}*/}
                            {/*onChange={this.handleChange}*/}
                            {/*id="email"*/}
                            {/*label={"Email*"}*/}
                            {/*autoComplete="email"*/}
                            {/*autoFocus*/}
                            {/*//the order of validators and error messages matter*/}
                            {/*validators={["required","isEmail"]}*/}
                            {/*errorMessages={[*/}
                                {/*"Enter an email",*/}
                                {/*"Must be an Email"]}*/}
                        {/*/>*/}
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
                            className={classes.form}
                            value={password}
                            placeholder={"Password"}
                            name={"password"}
                            variant={"outlined"}
                            margin={"normal"}
                            onChange={this.handleChange}
                            id="password"
                            label={"Password*"}
                            autoComplete="password"
                            autoFocus
                            validators={["required"]}
                            type={'password'}
                            errorMessages={[
                                "Please enter a password"]}
                        />
                        <TextValidator
                            className={classes.form}
                            value={repeatPassword}
                            placeholder={"Confirm Password"}
                            name={"repeatPassword"}
                            variant={"outlined"}
                            margin={"normal"}
                            onChange={this.handleChange}
                            id="repeatPassword"
                            label={"Confirm Password*"}
                            autoComplete="password"
                            type={'password'}
                            autoFocus
                            validators={["required", "isPasswordMatch"]}
                            errorMessages={[
                                "Please enter a password",
                                "Password doesn't match"]}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    {"Have an account? LogIn"}
                                </Link>
                            </Grid>

                        </Grid>
                    </ValidatorForm>
                </div>
                <Typography variant="body2" color="textSecondary" align="center">
                        {'Copyright © '}
                        <Link color="inherit" href="/">
                            Tourist Trace Tracking
                        </Link>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                </Typography>
            </Container>
            </section>
        );
    }
}

Register.propTypes ={
    loginUser: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

// if we want to get the auth state to our component we use
const mapStateToProps = (state) =>({
    auth: state.auth,  //the name auth in state.auth comes from our root reducer(index)
    errors: state.errors
});


export default connect(mapStateToProps, { registerUser, loginUser })(withStyles(styles, {withTheme: true})(withRouter(Register)))


