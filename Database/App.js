
// Importing Libraries
const express = require('express'); // node js extention
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const app = express();

// Used to create unique ids
const { v4: uuidv4 } = require('uuid');


// Allowing Access to Cross  Origins
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', "*");
    next();
});


// Initializing and configuring Libraries
require('dotenv').config();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Initializing Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));


// Initializing Passport
app.use(passport.initialize());
app.use(passport.session());


// Initializing Mongoose
mongoose.connect("mongodb://localhost:27017/amzData", { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useCreateIndex', true)


// Creating Mongoose Schema for Authentication
const userSchema = new mongoose.Schema({
    email: String,
    password: String
})


// Creating Mongoose Schema for Products
const productSchema = new mongoose.Schema({
    _id: String,
    title: String,
    img: String,
    price: Number,
    rating: Number,
    tags: String
});


// Initializing Passport Local Mongoose
userSchema.plugin(passportLocalMongoose);


// Creating Mongo DB Collections
const User = new mongoose.model("Authentication", userSchema) // Authentication Collection
const Products = mongoose.model('Product', productSchema); // Product Collecton


// Initializing Passport
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


// Creating Functions:---

// Save Data To DB
function saveData(id, title, img, price, rating, tags) {
    // Creating Objects
    const product = new Products({
        _id: id,
        title: title,
        img: img,
        price: price,
        rating: rating,
        tags: tags
    });

    // saving the values to the collection.
    Products.insertMany([product]);
}

// Delete Data From DB
function deleteById(id) {
    Products.findByIdAndDelete(id, (err, product) => {
        if (err) {
            console.log(err)
        }
    })
}


// Display Text In Admin Pannel
let addItemText = ''; // Add New Item Text
let findByIdText = ''; // Find By Id Text
let findAllText = ''; // Find All Text
let deleteItemText = ''; // Delete Item Text



// ------------: All Get Routes :------------


// Admin Get Route
app.get('/admin', (req, res) => {

    // If User if Authenticated
    if (req.isAuthenticated()) {

        // Render Admin Page
        res.render('admin-pannel', { addItemText: addItemText, findByIdText: findByIdText, findAllText: findAllText, deleteItemText: deleteItemText })
    } else {

        // Else Redirect To Login
        res.redirect("/login")
    }
})


// Login Get Route
app.get('/login', (req, res) => {

    // If User if Authenticated
    if (req.isAuthenticated()) {

        // Redirect To Admin Page
        res.redirect('/admin')
    } else {

        // Else Redirect To Login Page
        res.render("login")
    }
})



// ------------: All Post Routes :------------


// Register New Admin Post Route
app.post("/admin-will-register", (req, res) => {

    // Check If Api-Key Is Correct
    if (req.body.key === process.env.KEY) {

        // Register User
        User.register({ username: req.body.username }, req.body.password, (err, user) => {
            if (err) {

                // If Error Occures
                res.send(err)
            } else {

                // Authenticate and create user's authenticated Cookie
                passport.authenticate("local")(req, res, () => {

                    // If Cookie is created successfully
                    res.send('Account Created Successfully')
                })
            }
        })
    }else{
        res.send('API KEY Doesn\'t Match')
    }
})


// Login Post Route
app.post('/login', (req, res) => {

    // Create User Schema for login
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })

    // Try Logging The User In
    req.login(user, (err) => {
        if (err) {

            // If Error
            console.log(err)
        } else {

            // Authenticate and create user's authenticated Cookie
            passport.authenticate("local")(req, res, () => {

                // If Cookie is created successfully
                res.redirect('/admin')
            })
        }
    })

})


// Add New Item To DB Post Route
app.post('/add', (req, res) => {

    // If User Is Authenticated
    if (req.isAuthenticated()) {

        if (req.body.reset){
            addItemText = '';
            res.redirect('/admin');
        }else{
            addItemText = 'Add New: Command Executed';

            let id = req.body.id
            if (req.body.id === ""){
                id = uuidv4()
            }
            saveData(id, req.body.title, req.body.img, req.body.price, req.body.rating, req.body.tags);
            res.redirect('/admin');
        }


    } else {
        res.send("You are not Authorized")
    }
})


// Find By Id Post Route
app.post('/findone', (req, res) => {

    // If User asked for data from api
    if (req.body.api) {

        // Find Product By Id
        Products.findById(req.body.productId, (err, products) => {
            if (err) {

                // If Error
                console.log(err);
            } else {

                // If Product Found
                res.send(products)
            }
        });

    } else {

        // If User Wants to clear his screen
        if (req.body.reset) {

            findByIdText = ''
            res.redirect('/admin')
        } else {

            // If User Wants Data
            Products.findById(req.body.productId, (err, products) => {
                if (err) {
                    console.log(err);
                } else {
                    findByIdText = products
                    res.redirect('/admin/#findone-item-form')

                }
            });

        }
    }

})


// Find All Item Post Route
app.post('/findall', (req, res) => {

    // If User asked data through API
    if (req.body.api) {

        // If there is No Tag Given For Data Filteration
        if (!req.body.tags) {

            // Find All Products from DB
            Products.find((err, products) => {
                if (err) {

                    // If Error
                    console.log(err);
                } else {

                    // After All Product taken from DB
                    res.send(products);
                }
            })

        } else {
            // If Tags Given For Filtration

            // Stores List Of Products Which are matched with tags
            let returnDataList = []

            // Tags Given For Filtration By User
            let tags = req.body.tags.split(',')

            // Stores is tag matched with product
            let gotProduct = false;


            // Get All Products From Database
            Products.find((err, products) => {
                if (err) {

                    // If Error
                    console.log(err)
                } else {

                    // Iterate through all Products in DB
                    products.map(product => {

                        // Tags Contained By This Product
                        let productTag = product.tags.split(',');

                        // Sets: tag matched with this product to false
                        gotProduct = false;

                        // Iterate through all Tags of this Product
                        productTag.map(tag => {

                            // If This Product isn't already matched
                            if (!gotProduct) {

                                // Iterate through all Tags Given By User For Filtration
                                tags.map(requireTag => {

                                    // If Product Tag Matched with User Given Tag
                                    if (String(requireTag).toLocaleLowerCase() == String(tag).toLocaleLowerCase()) {

                                        // Add this product to list which will be returned
                                        returnDataList.push(product);

                                        // Sets: tag matched with this product to true
                                        gotProduct = true;
                                    }
                                })
                            }
                        })
                    })
                    res.send(returnDataList);
                }
            })
        }

    } else {

        if (req.body.reset) {

            findAllText = ''
            res.redirect('/admin')
        } else {

            if (req.body.tags) {
                // If Tags Given For Filtration

                // Stores List Of Products Which are matched with tags
                let returnDataList = []

                // Tags Given For Filtration By User
                let tags = req.body.tags.split(',')

                // Stores is tag matched with product
                let gotProduct = false;


                // Get All Products From Database
                Products.find((err, products) => {
                    if (err) {

                        // If Error
                        console.log(err)
                    } else {

                        // Iterate through all Products in DB
                        products.map(product => {

                            // Tags Contained By This Product
                            let productTag = product.tags.split(',');

                            // Sets: tag matched with this product to false
                            gotProduct = false;

                            // Iterate through all Tags of this Product
                            productTag.map(tag => {

                                // If This Product isn't already matched
                                if (!gotProduct) {

                                    // Iterate through all Tags Given By User For Filtration
                                    tags.map(requireTag => {

                                        // If Product Tag Matched with User Given Tag
                                        if (String(requireTag).toLocaleLowerCase() == String(tag).toLocaleLowerCase()) {

                                            // Add this product to list which will be returned
                                            returnDataList.push(product);

                                            // Sets: tag matched with this product to true
                                            gotProduct = true;
                                        }
                                    })
                                }
                            })
                        })

                        findAllText = returnDataList
                        res.redirect('/admin/#findall-item-form')

                    }
                })

            } else {

                // Find All Products And Show them to user
                Products.find((err, products) => {
                    if (err) {
                        console.log(err);
                    } else {
                        findAllText = products
                        res.redirect('/admin/#findall-item-form')
                    }
                })
            }
        }
    }

})


// Delete Item By Id Post Route
app.post('/delete', (req, res) => {

    // If User is authenticated
    if (req.isAuthenticated()) {
        
        if (req.body.reset){
            deleteItemText = ''
            res.redirect('/admin')
        }else{
            deleteItemText = 'Delete Item: Command Executed'
            deleteById(req.body.productId)
            res.redirect('/admin/#delete-item-form')
        }

    } else {
        res.send("You are not Authorized")
    }
})


// Log user out from his account
app.post('/logout', (req, res) => {
    req.logout();
    res.redirect('/login')
})



// Express server ----
app.listen('4444', () => { console.log("Started Server On Port: 4444"); });