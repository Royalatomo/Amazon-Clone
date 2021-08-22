
// Importing Pre-built Components
import React from 'react';

// Importing Css
import '../css/Checkout.css';

// Importing Custom Built Components
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal'

// Used to create unique ids
const { v4: uuidv4 } = require('uuid');


// Main Function
export default function () {

    // Reads and removes value from basket(shopping cart list), reads value from user (user email)
    const [{ basket, user }, dispatch] = useStateValue();

    // Removes Data from Basket
    function rmFromBasket(id) {
        dispatch({
            type: "RM_FROM_BASKET",
            id: id
        })
    }

    return (

        // Main Div
        <div className="checkout">

            {/* Left Side Of Checkout Page */}
            <div className="checkout-left-side">

                <h4> Shopping Cart (<span className="username">{user?.email}</span>)</h4>
                <div className='checkout-price-section'>
                    <p>Price</p>
                </div>

                <hr />

                {/* Add Basket Item To Checkout page List */}
                {basket.map((item) => {
                    return (
                        <>

                            {/* Main Item Div */}
                            <div className="cart-item">

                                {/* Item Image */}
                                <div className="cart-item-image">
                                    <img src={item.image} alt="" />
                                </div>

                                {/* Item Name, Rating, Remove Button, Price */}
                                <div className="cart-item-info">
                                    <div className="cart-item-title">
                                        <p>{item.title}</p>

                                        <div className="cart-item-rating">
                                            <p>{calculateStar(item.rating).map((star) => { return star })}</p>
                                        </div>

                                        <button onClick={() => { rmFromBasket(item.specific_id) }} className='remove-button'>Remove Product</button>
                                    </div>

                                    <div className="cart-item-price">
                                        <p><small>₹</small><strong>{item.price}</strong></p>
                                    </div>

                                </div>
                            </div>
                            <hr />
                        </>
                    )
                })}
            </div>

            {/* Rigth Side Of Checkout Page */}
            <div className="checkout-right-side">
                <Subtotal />
            </div>

        </div>
    )
}


// Converts Number To Star
function calculateStar(star) {

    // Stores Star and Empty-Star Icons
    let stars = []

    // Calculate Star and fill it in the "stars" list
    Array(star)
        .fill()
        .map(() => (

            // Filled Star Icon
            stars.push(<i key={uuidv4()} className="fas fa-star"></i>)
        ))

    // If all the 5 stars are not filled then fill Empth-Star to complete 5 star space
    Array(5 - stars.length)
        .fill()
        .map(() => (

            // Empty Star Icon
            stars.push(<i key={uuidv4()} className="far fa-star"></i>)
        ))

    return stars;
}

