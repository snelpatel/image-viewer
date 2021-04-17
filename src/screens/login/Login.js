import React, {Component} from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    Typography
} from '@material-ui/core';

//import header.
import Header from "../../common/header/Header";

//import styles for login page
import './Login.css'

const userDetails = {
    username: 'snehal',
    password: 'patel',
    accessToken: 'IGQVJXeldXejl5bFVnRVJSRHN1b21JQ2RvLUZA0ZAXlzbUVySXRLNWlrX04zS1gwbnU1Uy13WGVET3FvRlFzSUZAoSFlYS0JSVTZAYVEtiOFVJTFJVV1k4OXRQcXlIQUR3c0JwWFk1Vk5BWEt5QnVkR0I0M1RmVFZA2Ujk3cTFv'
};

/**
 * Login Page
 */
class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            usernameHelperTextDisplay: 'display-none',
            passwordHelperTextDisplay: 'display-none',
            incorrectCredentialHelperTextDisplay: 'display-none',
            loginSuccess: false
        }
    }

    render() {
        if (this.state.loginSuccess === true) {
            //return <Redirect to={{pathname: '/home', state: {loginSuccess: true}}}/>
            this.props.history.push('/home/');
        }
        return <div>
            <div><Header/></div>
            <div className='login-card-flex-container'>
                <Card className='login-card'>
                    <CardContent>
                        <FormControl className='login-form-control'>
                            <Typography variant="h5">
                                <Box fontWeight='fontWeightBold'>
                                    LOGIN
                                </Box>
                            </Typography>
                        </FormControl>
                        <br/>
                        <br/>
                            <FormControl required className='login-form-control'>
                                <InputLabel htmlFor='username'>Username</InputLabel>
                                <Input id='username' name='username' type='text' onChange={this.onUsernameFieldChange}/>
                                <FormHelperText className={this.state.usernameHelperTextDisplay}><span
                                    className='form-helper-text-red-color'>required</span></FormHelperText>
                            </FormControl>
                        <br/>
                        <br/>
                            <FormControl required className='login-form-control'>
                                <InputLabel htmlFor='password'>Password</InputLabel>
                                <Input id='password' name='password' type='password'
                                       onChange={this.onPasswordFieldChange}/>
                                <FormHelperText className={this.state.passwordHelperTextDisplay}><span
                                    className='form-helper-text-red-color'>required</span></FormHelperText>
                            </FormControl>
                        <br/>
                        <br/>
                            <FormHelperText className={this.state.incorrectCredentialHelperTextDisplay}><span
                                className='form-helper-text-red-color'>Incorrect username and/or password</span></FormHelperText>
                        <br/>
                            <FormControl>
                                <Button variant='contained' color='primary' onClick={this.onLogin}>Login</Button>
                            </FormControl>
                    </CardContent>
                </Card>
            </div>
        </div>;
    }

    onUsernameFieldChange = (e) => {
        if (e.target.value === '') {
            this.setState({
                username: e.target.value,
                usernameHelperTextDisplay: 'display-block',
                incorrectCredentialHelperTextDisplay: 'display-none'
            });
        } else {
            this.setState({username: e.target.value, usernameHelperTextDisplay: 'display-none'})
        }
    }

    onPasswordFieldChange = (e) => {
        if (e.target.value === '') {
            this.setState({
                password: e.target.value,
                passwordHelperTextDisplay: 'display-block',
                incorrectCredentialHelperTextDisplay: 'display-none'
            });
        } else {
            this.setState({password: e.target.value, passwordHelperTextDisplay: 'display-none'})
        }
    }

    onLogin = () => {
        if (this.state.username === '') {
            this.setState({usernameHelperTextDisplay: 'display-block'});
        }
        if (this.state.password === '') {
            this.setState({passwordHelperTextDisplay: 'display-block'});
        }

        if (this.state.incorrectCredentialHelperTextDisplay === 'display-block') {
            this.setState({incorrectCredentialHelperTextDisplay: 'display-none'});
        }

        if (this.state.username !== '' && this.state.password !== '') {
            if (this.state.username === userDetails.username && this.state.password === userDetails.password) {
                this.setState({incorrectCredentialHelperTextDisplay: 'display-none', loginSuccess: true});
                sessionStorage.setItem("access-token", userDetails.accessToken);
            } else {
                this.setState({incorrectCredentialHelperTextDisplay: 'display-block'});
            }
        }
    }

}

export default Login;   