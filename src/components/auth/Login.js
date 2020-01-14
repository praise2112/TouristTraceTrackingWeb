import React, {Component} from 'react';
import * as PropTypes from "prop-types";     // to map prop to prop-types

import { connect } from 'react-redux' // to use redux in a component
import { loginUser } from "../../actions/authActions";
import { withStyles} from '@material-ui/core/styles';
import styles from '../../styles/LoginStyles';
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
import isEmpty from "../../validation/is-empty";








class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username:"",
            password: "",
            loading: false,
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

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
    }
    handleChange(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    handleSubmit(evt){
        evt.preventDefault();
        const userData = {
            username: this.state.username,
            password: this.state.password
        };
        console.log(`${this.state.username}${this.state.password}`);
        this.setState({loading: true});
        this.props.loginUser(userData, this.props.history);
        // message.success("Succesfully logged in user");

        console.log(`Handle submit`);

    }



    render() {
        const {classes} = this.props;
        const {email, username, password, loading} = this.state;

        return (
            <section className={classes.container}>


            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                       Login
                    </Typography>
                    <ValidatorForm onSubmit={this.handleSubmit} ref={'form'} className={classes.form} >
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
                            placeholder={"Password"}
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
                            control={<Checkbox value="remember" color="primary" />}
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
            </section>
        );
    }
}

Login.propTypes ={
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

// if we want to get the auth state to our component we use
const mapStateToProps = (state) =>({
    auth: state.auth,  //the name auth in state.auth comes from our root reducer(index)
    errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(withStyles(styles, {withTheme: true})(Login));
