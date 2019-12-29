import React, {Component} from 'react';
import { withStyles} from '@material-ui/core/styles';
import styles from './styles/LoginStyles';
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






class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
        this.handleChange = this.handleChange.bind(this);

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
        console.log(`Handle submit`);
        this.setState({email: "", password:""});

    }

    render() {
        const {classes} = this.props;
        const {email, password} = this.state;

        return (
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
                            <TextValidator
                                className={classes.form}
                                value={email}
                                placeholder={"Email Address"}
                                name={"email"}
                                variant={"outlined"}
                                margin={"normal"}
                                onChange={this.handleChange}
                                fullwidth
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
        );
    }
}

// export default Login
export default withStyles(styles, {withTheme: true})(Login)