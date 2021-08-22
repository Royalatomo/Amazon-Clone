// Importing Pre-built Components
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Importing Css
import '../css/Header.css';

// Importing Custom Built Components
import { useStateValue } from './StateProvider';
import { auth } from '../firebase';


// Used to create unique ids
const { v4: uuidv4 } = require('uuid');


// Main Function
export default function Header() {

    const database_Link = "http://192.168.1.5:4444/findall"

    // eslint-disable-next-line
    const [{ basket, user }, dispatch] = useStateValue(); // Reads Data from basket(cart items) and user(email)
    console.log(basket)
    console.log("header")


    // Converts User Email to fit in Header
    function getUsername() {

        // Checks if user email is greater than 10 characters before @ sign then break it and join with "..."
        function usernameHelper() {
            if (user.email.split('@')[0].length > 10) {
                return String(user.email.split('@')[0].slice(0, 10)) + '...'
            } else {
                return String(user.email.split('@')[0])
            }
        }

        // Check If User Is Present else Return "Guest"
        return user ? usernameHelper() : 'Guest'
    }


    // Calls when Header Component Loads
    useEffect(() => {

        // This is Select Element Before Search Input Box
        let select = document.getElementsByClassName('search-input')[0].firstChild.firstChild;

        // On Change Check is value is changed if changed then Css style will also change
        select.addEventListener('change', () => {

            // Check If Value Is Default
            if (select.value !== 'default') {

                // Then Add Default Styling
                select.style.width = "150px";
                document.getElementsByClassName('search-input')[0].children[2].style.width = "32vw";

            } else {

                // Else Add New Styling
                select.style.width = "52px";
                document.getElementsByClassName('search-input')[0].children[2].style.width = "35vw";
            }
        });
    }, [])


    // If User is Authenticated Then SignOut
    function handelAuth() {
        if (user) {
            auth.signOut();
        }
    }

    function pushNewTagData(tags) {
        // Fetching Products data from database
        fetch(database_Link,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify({ "api": true, "tags": tags })
            }).then((response) => {
                return response.json();
            }).then(data => {
    
                dispatch({
                    type: "SET_PRODUCTS",
                    products: data
                })
    
            })
    }
    

    return (
        <>
            {/* Header Section */}
            <div className="header">

                {/* Header logo */}
                <Link style={{ textDecoration: 'none' }} key={uuidv4()} to={"/"}>
                    <div className="logo">
                        <img className='logo-img' src="/images/logo.png" alt="amazon-logo" />
                        <span className="img-country-text">.in</span>
                    </div>
                </Link>

                {/* Location Select Area */}
                <div className="location">
                    <span className="location-greeting">Hello</span>
                    <span>
                        <i className="fas fa-map-marker-alt"></i>
                        <span className="location-selected">Select your address</span>
                    </span>
                </div>

                {/* Search Input Box */}
                <div className="search-input">

                    {/* Dropdown Section */}
                    <span className="select">
                        <select>
                            <option value='default'>All Categories</option>
                            <option value="xxx">Deals</option>
                            <option value="xxx">Alexa Skills</option>
                            <option value="xxx">Amazon Devices</option>
                            <option value="xxx">Amazon Fashion</option>
                            <option value="xxx">Amazon Pantry</option>
                            <option value="xxx">Appliances</option>
                            <option value="xxx">Apps &amp; Games</option>
                            <option value="xxx">Baby</option>
                            <option value="xxx">Beauty</option>
                            <option value="xxx">Books</option>
                            <option value="xxx">Car &amp; Motorbike</option>
                            <option value="xxx">Clothing &amp; Accessories</option>
                            <option value="xxx">Collectibles</option>
                            <option value="xxx">Computers &amp; Accessories</option>
                            <option value="xxx">Electronics</option>
                            <option value="xxx">Furniture</option>
                            <option value="xxx">Garden &amp; Outdoors</option>
                            <option value="xxx">Gift Cards</option>
                            <option value="xxx">Grocery &amp; Gourmet Foods</option>
                            <option value="xxx">Health &amp; Personal Care</option>
                            <option value="xxx">Home &amp; Kitchen</option>
                            <option value="xxx">Industrial &amp; Scientific</option>
                            <option value="xxx">Jewellery</option>
                            <option value="xxx">Kindle Store</option>
                            <option value="xxx">Luggage &amp; Bags</option>
                            <option value="xxx">Luxury Beauty</option>
                            <option value="xxx">Movies &amp; TV Shows</option>
                            <option value="xxx">Music</option>
                            <option value="xxx">Musical Instruments</option>
                            <option value="xxx">Office Products</option>
                            <option value="xxx">Pet Supplies</option>
                            <option value="xxx">Prime Video</option>
                            <option value="xxx">Shoes &amp; Handbags</option>
                            <option value="xxx">Software</option>
                            <option value="xxx">Sports, Fitness &amp; Outdoors</option>
                            <option value="xxx">Subscribe &amp; Save</option>
                            <option value="xxx">Tools &amp; Home Improvement</option>
                            <option value="xxx">Toys &amp; Games</option>
                            <option value="xxx">Under ₹500</option>
                            <option value="xxx">Video Games</option>
                            <option value="xxx">Watches</option>
                        </select>
                    </span>

                    {/* Arrow Icon */}
                    <i className="fas fa-sort-down"></i>

                    {/* Input Box */}
                    <input id="search-product-box" type="text" />
                    <i onClick={ () => {pushNewTagData(document.getElementById('search-product-box').value)} } className="fas fa-search"></i>
                </div>

                {/* Sing up, orders, membership section */}
                <div className="header-nav">

                    {/* Sign Up Section */}
                    <Link style={{ textDecoration: 'none' }} key={uuidv4()} to={!user ? "/signin" : '/'}>
                        <div onClick={handelAuth} className="header-option">
                            <span className="header-option-line-one">{'Hello, ' + getUsername()}</span>
                            <span className="header-option-line-two">
                                {user ? 'Sign Out' : 'Sign In'}
                                <i className="fas fa-sort-down"></i>
                            </span>
                        </div>
                    </Link>

                    {/* Orders Section */}
                    <div className="header-option">
                        <span className="header-option-line-one">
                            Returns
                        </span>
                        <span className="header-option-line-two">
                            & Orders
                        </span>
                    </div>

                    {/* Membership Section */}
                    <div className="header-option">
                        <span className="header-option-line-one">
                            You are
                        </span>

                        <span className="header-option-line-two">
                            Prime
                        </span>
                    </div>
                </div>

                {/* Cart Section */}
                <Link style={{ textDecoration: 'none' }} key={uuidv4()} to={"/checkout"}>
                    <div className="cart-checkout">
                        <div className="cart-img"></div>
                        <div className="cart-name">cart</div>
                    </div>
                    <div className="checkout-items">{basket?.length}</div>
                </Link>

            </div>

            {/* Selecting Header Menu Option Section */}
            <div className="header-nav-section">

                {/* List of all collections */}
                <div className="table-data">
                    <p onClick={ () =>{ pushNewTagData("")} } ><i style={{ marginRight: '6px' }} className="fas fa-bars"></i> All</p>
                    <p>Best Sellers</p>
                    <p onClick={ () =>{ pushNewTagData("smartphone")} } >Mobiles</p>
                    <p onClick={ () =>{ pushNewTagData("headphone")} } >Headphone</p>
                    <p onClick={ () =>{ pushNewTagData("apple")} } >Apple</p>
                    <p onClick={ () =>{ pushNewTagData("electronic")} } >Electronics</p>
                    <p onClick={ () =>{ pushNewTagData("laptop")} } >Laptops</p>
                    <p onClick={ () =>{ pushNewTagData("monitor")} } >Monitor</p>
                    <p onClick={ () =>{ pushNewTagData("dress")} } >Dresses</p>
                    <p onClick={ () =>{ pushNewTagData("home,kitchen")} } >Home & Kitchen</p>
                    <p onClick={ () =>{ pushNewTagData("toy,game")} } >Toys & Games</p>
                    <p onClick={ () =>{ pushNewTagData("book")} } >Books</p>
                </div>

            </div>
        </>
    )


}



