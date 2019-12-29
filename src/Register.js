import React, {Component} from 'react';
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
import styles from './styles/LoginStyles'
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";




class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            repeatPassword:""
        };
        this.handleChange = this.handleChange.bind(this);

    }
    componentDidMount() {
        ValidatorForm.addValidationRule('isPasswordMatch',(value)=> {
            if (value !== this.state.password) {
                return false;
            }
            return true;

        });

    }
    handleChange(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    handleSubmit(evt){
        evt.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        this.setState({email: "", password:"", repeatPassword:""});

        console.log(`Handle submit`);
    }
    render() {
        const {classes} = this.props;
        const {email, password, repeatPassword} = this.state;
        return (
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
                        <TextValidator
                            className={classes.form}
                            value={email}
                            placeholder={"Email Address"}
                            name={"email"}
                            variant={"outlined"}
                            margin={"normal"}
                            onChange={this.handleChange}
                            id="email"
                            label={"Email*"}
                            autoComplete="email"
                            autoFocus
                            //the order of validators and error messages matter
                            validators={["required","isEmail"]}
                            errorMessages={[
                                "Enter an email",
                                "Must be an Email"]}
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


export default withStyles(styles, {withTheme: true})(Register);


