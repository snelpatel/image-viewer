import React, { Component } from 'react';
import Login from '../screens/login/Login';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

class Controller extends Component {

    constructor() {
        super();
        this.state = {

        }

    }

    render() {
        return (
            <div>
                <Router>
                    <Route exact path='/' render={(props) => <Login {...props}  baseUrl={this.baseUrl} />} />
                </Router>
            </div>
        );
    }
}

export default Controller;