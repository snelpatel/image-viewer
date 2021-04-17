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


/**
 * Login Page
 */
class Login extends Component {

    constructor() {
        super();
        this.state = {
            usernameHelperTextDisplay: 'display-none',
            passwordHelperTextDisplay: 'display-none',
            incorrectCredentialHelperTextDisplay: 'display-none'
        }
    }

    render() {
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
                                <Input id='username' name='username' type='text' />
                                <FormHelperText className={this.state.usernameHelperTextDisplay}><span
                                    className='form-helper-text-red-color'>required</span></FormHelperText>
                            </FormControl>
                        <br/>
                        <br/>
                            <FormControl required className='login-form-control'>
                                <InputLabel htmlFor='password'>Password</InputLabel>
                                <Input id='password' name='password' type='password'/>
                                <FormHelperText className={this.state.passwordHelperTextDisplay}><span
                                    className='form-helper-text-red-color'>required</span></FormHelperText>
                            </FormControl>
                        <br/>
                        <br/>
                            <FormHelperText className={this.state.incorrectCredentialHelperTextDisplay}><span
                                className='form-helper-text-red-color'>Incorrect username and/or password</span></FormHelperText>
                        <br/>
                            <FormControl>
                                <Button variant='contained' color='primary'>Login</Button>
                            </FormControl>
                    </CardContent>
                </Card>
            </div>
        </div>;
    }

}

export default Login;   