
// Importing Pre-built Components
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Importing Custom Built Components
import Header from './components/Header';
import Home from './components/Home';
import Checkout from './components/Checkout'

// Importing Css
import './index.css';
import Login from './components/Login';
import { auth } from './firebase';
import { useStateValue } from './components/StateProvider';

// Used to create unique ids
const { v4: uuidv4 } = require('uuid');


// Main Function
export default function App() {

    const database_Link = "http://192.168.1.5:4444/findall"
    
    // eslint-disable-next-line
    const [{}, dispatch] = useStateValue(); // will store user name if user logged in
    
     // gets product data from database and passes it to "Home" Component
     // eslint-disable-next-line
    const [storeProducts, setStoreProducts] = useState('');

    // Calling APIs and Checking if user is Authenticated
    useEffect(() => {

        // Fetching Products data from database
        fetch(database_Link,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({ "api": true })
        }).then((response) => {
            return response.json();
        }).then(data => {

            dispatch({
                type: "SET_PRODUCTS",
                products: data
            })
            
        })

        // Checking If User Is Authenticated
        auth.onAuthStateChanged(authUser => {

            if (authUser){

                dispatch({
                    type: 'SET_USER',
                    user: authUser
                })
            }else{

                dispatch({
                    type: 'SET_USER',
                    user: null
                })
            }
        })
    }, [dispatch])

    return (
        <Router>

                <Switch>
                    <Route key={uuidv4()} path='/checkout' exact={true}>
                        <Header/>
                        <Checkout />
                    </Route>

                    <Route key={uuidv4()} path='/signin' exact={true}>
                        <Login/>
                    </Route>

                    <Route key={uuidv4()} path='/' exact={true}>
                        <Header />
                        <Home data={storeProducts}/>
                    </Route>
                </Switch>

        </Router>
    )
}
