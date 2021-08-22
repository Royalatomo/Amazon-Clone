
// Importing Pre-built Components
import React from 'react';

// Importing Css
import '../css/Home.css'

// Importing Custom Built Components
import Product from './Product'
import { useStateValue } from './StateProvider';

// Used to create unique ids
const { v4: uuidv4 } = require('uuid');


// Main Function
export default function () {

    // Stores Value How Much Columns needed to show data (home-product-row)
    let col_needed_to_display_data = 0;

    // Stores List Of data .. in list stores how much data to show in one row
    let new_group_of_products = []

    // Display how many Products in one line
    let showProductInLine = 2;

    // eslint-disable-next-line
    const [{ product }, dispatch] = useStateValue(); // Adds value to basket


    // Makes Data For "new_group_of_products" from "product" value
    function helper(){
        new_group_of_products = []
        let index = 0;
        for (let i = 0; i < col_needed_to_display_data; i++) {
            let list = []
            for (let x = 0; x <= showProductInLine-1; x++) {
                list.push(product[index]);
                index++;
            }
            new_group_of_products.push(list)
        }
    }


    // Check if Product Data Recieved
    if (product !== "") {

        // If Products Are Divisible by "showProductInLine"
        if (product.length % showProductInLine === 0) {

            // Store Full Products in one column
            col_needed_to_display_data = product.length / showProductInLine
            helper();

        }else if (product.length % showProductInLine === 1) {

            // Store Full Products in one column + store only one product in last column
            col_needed_to_display_data = ((product.length - 1) / showProductInLine) + 1
            helper();
        }

        // Increment that much you want in line.. eg: for 3
        // product.length % showProductInLine === 2
        // displayData = ((product.length - 2) / showProductInLine) + 1
    }

    return (

        // Main Section
        <div className="home">

            {/* Background Image Section */}
            <div className="home-bg-img-banner">
                <img src="https://images-eu.ssl-images-amazon.com/images/G/31/AmazonVideo/2021/X-site/Events/prime_day/Hostel-daze-2/1500x600_EN_JPN-2._CB644074809_.jpg" alt='' />
            </div>

            {/* Product Displaying Row */}
            {new_group_of_products !== [] ? new_group_of_products.map((y) => {

                return (<div key={uuidv4()} className="home-product-row">

                    {y !== "" ? y.map(x => {

                        return String(x)!=="undefined"? (<Product id={x.id} key={uuidv4()} star={x.rating} price={x.price} text={x.title} img={x.img} />):''

                    }) : ""}
                </div>)
            }) : ""}
            
        </div>
    )
}
