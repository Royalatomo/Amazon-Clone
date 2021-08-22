
// Importing Pre-built Components
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebase'

// Importing Css
import '../css/Login.css'

// Importing Custom Built Components
import { useStateValue } from './StateProvider';


// Main Function
export default function () {

    // Redirect To Another Link
    const history = useHistory();

    // eslint-disable-next-line
    const [{ user }, dispatch] = useStateValue(); // user is authenticated
    const [username, setUsername] = useState(''); // stores user typed username
    const [password, setPassword] = useState(''); // stores user typed password

    // If User Is Already Authenticated
    if (user) {

        // redirect to Home Page
        history.push('/')
    }

    // When User Submit the form
    function onSubmit(event) {
        event.preventDefault();
    }

    // Login Function
    function signup() {
        if (username && password) {
            auth.signInWithEmailAndPassword(username, password).then((auth) => {
                history.push('/')
            }).catch((error) => alert(error.message))
        }
    }

    // Create new account Function
    function register() {
        if (username && password) {
            auth.createUserWithEmailAndPassword(username, password).then((auth) => {
                // SuccessFully Created User
                if (auth) {
                    history.push('/')
                }
            }).catch(error => alert(error.message))
        }
    }

    return (

        // Main Div
        <div className="login-body">

            {/* Amazon Logo */}
            <Link style={{ textDecoration: "none", color: 'black' }} to="/">
                <div className="logo-img">
                    <div className="amz-logo"></div>
                    <p className="logo-text">.in</p>
                </div>
            </Link>

            {/* Login Form */}
            <div className="login-form">

                <div className="form-heading">Sign-In</div>
                <div className="input-field">

                    <form onSubmit={(e) => { onSubmit(e) }}>

                        <p className="input-text">Email Address</p>
                        <input required onChange={(e) => { setUsername(e.target.value) }} type="text" placeholder="Email Address" />

                        <p className="input-text">Password</p>
                        <input required onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="Password" />


                        <button onClick={signup} className='continue-button' type="submit">Continue</button>
                        <button onClick={register} className='new-account-button' type="submit">Create your Amazon account</button>
                    </form>
                </div>

                {/* Term And Conditions */}
                <div className="term-condition">By continuing, you agree to Amazon's <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=200545940">Conditions of Use</a> and <a target="_blank" rel="noopener noreferrer" href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=200534380">Privacy Notice</a>.</div>
            </div>

            {/* Create New Account */}
            <div className="new-account">
                <hr className='hr1' />
                <p className="text">New to Amazon?</p>
                <hr className='hr2' />
            </div>
        </div>
    )
}