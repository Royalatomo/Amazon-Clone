
// Importing Pre-built Components
import React from 'react';

// Importing Css
import '../css/Subtotal.css';

// Importing Custom Built Components
import { useStateValue } from './StateProvider';


// Main Function
function Subtotal() {

    // eslint-disable-next-line
    const [{ basket }, dispatch] = useStateValue(); // Reads value from basket(shopping cart list)

    // Calculate Total Cost of all products in the list
    function totalCost(){
        let totalCost = 0;
        for(let i of basket){
            totalCost += i.price
        }
        return totalCost
    }
    
    return (
        <>
            {/* Amazon Secure Banner Image */}
            <div className="amz-secure-banner">
                <img className="amz-secure-banner" src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png" alt="" />
            </div>

            {/* Subtotal */}
            <div className="subtotal">

                {/* Item Number */}
                <span className="subtotal-text">Subtotal ({basket?.length} items): </span>
                {/* Total Item Cost */}
                <span className='subtotal-price'><small>₹</small><strong>{totalCost()}</strong></span>

                {/* Gift Checkbox */}
                <div className="gif-check">
                    <input type="checkbox" />
                    <span>This Order Contains Gift</span>
                </div>

                {/* Checkout Button */}
                <div className="checkout-button">
                    <button className="make-checkout">Proceed To Checkout</button>
                </div>
            </div>

        </>

    )
}

export default Subtotal
