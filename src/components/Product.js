
// Importing Pre-built Components
import React from 'react'

// Importing Css
import '../css/Product.css'

// Importing Custom Built Components
import { useStateValue } from './StateProvider';

// Used to create unique ids
const { v4: uuidv4 } = require('uuid');


// Main Function
function Product(props) {

    // Stores Sliced Product Title
    let displayText = props.text;

    // Slice Product Title if larger
    if (props.text.length > 80){
        displayText = `${props.text.slice(0, 90)} ....`;
    }

    // eslint-disable-next-line
    const [{ basket }, dispatch] = useStateValue(); // Adds value to basket

    // Add Product To Basket
    function pushData(){
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id: props.id,
                title: displayText,
                image: props.img,
                price: props.price,
                rating: props.star,
                specific_id: uuidv4()
            }
        })
    }

    return (

        // Main Section
        <div className="product">

            {/* Product Header conatiner */}
            <div className="product-info">
                <p className="title">{props.text}</p>
                <p className="price"><small>₹</small><strong>{props.price}</strong></p>
                <p className="review">{calculateStar(props.star)}</p>
            </div>

            {/* Product Img and button container */}
            <div className="product-body">
                <img src={props.img} alt="" />
                <button onClick={pushData} className='add-button'>Add to basket</button>
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


export default Product
