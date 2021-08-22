# Amazon-Clone
This is the web application developed in react which uses mongodb for database. Note: You must install mongodb first before running this application. This is developed as similar as it can with amzon site.. And more importantly I am not super professional so you may face some features missing.. I haven't full cloned amazon but it is very similar to amzon site... Let me know what you think about it.. If you face any bug please report me I will love to see your reviews

* I have split my website in two faces: Admin Site(Used to do CRED operations in database) and the actual site which the user will see...

# ______________ Normal User Site ______________
![Alt text](https://user-images.githubusercontent.com/54973413/130322747-4d1039ec-dde8-4eeb-8764-abd17dcb297a.png "Amazon Site Look")

## Introduction To Header
![Alt text](https://user-images.githubusercontent.com/54973413/130324829-6d848251-52e3-4a53-b540-3034627b4fba.jpg "Amazon Site Look")


## How Products Are Displayed
![Alt text](https://user-images.githubusercontent.com/54973413/130324837-9dc63568-4eef-44de-a2bd-d494e9cc36b1.jpg "Amazon Site Look")
![Alt text](https://user-images.githubusercontent.com/54973413/130324838-d223863b-c484-4fb0-a7b5-b869b2bb5fd6.jpg "Amazon Site Look")

## Cart Functionality
![Alt text](https://user-images.githubusercontent.com/54973413/130324841-326a9110-0496-4f57-9b0f-d330ff2c08d6.jpg "Amazon Site Look")
![Alt text](https://user-images.githubusercontent.com/54973413/130324842-95bc091f-85ae-43d8-af0e-8950826bbbef.jpg "Amazon Site Look")

## Login Page
![Alt text](https://user-images.githubusercontent.com/54973413/130324843-f1a9d3b5-033e-44f9-8bf3-88eb4d8bdaba.jpg "Amazon Site Look")
![Alt text](https://user-images.githubusercontent.com/54973413/130324844-70c8d3a6-8839-4bc9-9bc1-57ab10505c38.jpg "Amazon Site Look")


## Some Minor Changes After Login
![Alt text](https://user-images.githubusercontent.com/54973413/130324845-d5c35de5-5362-4e45-b9e5-c5c49dcb6ac8.jpg "Amazon Site Look")
![Alt text](https://user-images.githubusercontent.com/54973413/130324847-9d343260-e44b-4d03-b350-cb22c128d2a6.jpg "Amazon Site Look")


## Searching Functionality
![Alt text](https://user-images.githubusercontent.com/54973413/130324848-c26aadb9-9883-478f-8c0f-5e7836676105.jpg "Amazon Site Look")
![Alt text](https://user-images.githubusercontent.com/54973413/130324850-33389c5b-bad3-4549-b8ab-e81799771719.jpg "Amazon Site Look")

#
#

# ______________ Admin Pannel Site ______________

![Alt text](https://user-images.githubusercontent.com/54973413/130326962-3a06929a-6da1-4de5-8221-d430943685a8.jpg "Amazon Site Look")
![Alt text](https://user-images.githubusercontent.com/54973413/130326963-153cf18a-76ab-4d6f-b182-35597b7c54e9.jpg "Amazon Site Look")
![Alt text](https://user-images.githubusercontent.com/54973413/130326965-4e2d420e-e5f8-42b3-9caf-bc5747041e0c.jpg "Amazon Site Look")
![Alt text](https://user-images.githubusercontent.com/54973413/130326969-6e3fb17d-6ba0-42fc-a2ff-f3fc6f74ca25.jpg "Amazon Site Look")
![Alt text](https://user-images.githubusercontent.com/54973413/130326971-2e4d28d0-8c88-4629-b86d-499261022558.jpg "Amazon Site Look")

## __ Using Admin Pannel Functions :---
![Alt text](https://user-images.githubusercontent.com/54973413/130326973-bb097f3d-3037-44d3-a15a-0e8dd3812ed1.jpg "Amazon Site Look")
![Alt text](https://user-images.githubusercontent.com/54973413/130326979-af6c54f0-a6c3-403d-8775-bfe0823e9fbf.jpg "Amazon Site Look")
![Alt text](https://user-images.githubusercontent.com/54973413/130326980-2e0e5c55-58d2-4a14-bc08-3cdf04b0f6dd.jpg "Amazon Site Look")
![Alt text](https://user-images.githubusercontent.com/54973413/130326982-9e2af4ae-c09d-430e-acae-f46f1da33278.jpg "Amazon Site Look")
![Alt text](https://user-images.githubusercontent.com/54973413/130326984-01a4b531-15e5-4bf7-83b0-625d95d08036.jpg "Amazon Site Look")


# _________ Installation ___________

Firebase ---

* Go to firebase and create a new project.
* Go TO src/firebase.js see the "firebaseConfig" variable type all the credentials and save

Install All Required Libraries (components)

* npm i (in main folder)
* npm i (in Databse folder)

Setting MongoDb (Do Only if you haven't installed mongodb in the same machine which you are using)

* Open src/App.js and src/components/Header.js... Set "serverIp" from localhost to IP address of the machine which has mongodb server running.

Setting .env file

* Create a file name ".env" in "Database" folder.
* Add Following Entries (Don't need to put it same you can add any string in the following variables it's just an example)
* KEY="97l33y8OUOj3PY837Ab1ZNvwDbDMxdweoYTaJi82lOLxGKoWOSdVRH2GnWihqrnMhQdsz5"
* SESSION_SECRET="yrB8M5vhcpdsF520xlC8bR0gw25R2t"

Description About .env variables

* KEY is used by /admin-will-register POST API for authentication.
* SESSION_SECRET used for authentication process (when logging in or registring a new admin user)


Run Files

* npm run bulit (main folder)
* npm start (main folder)
* node App.js (Database folder)

Servers Link

* http://localhost:3000 : Amazon User Viewing Site
* http://localhost:4444 : Admin Control Pannel


# ________ APIs Which Is Created By This Application _________

## Register For Admin Account API:-- (/admin-will-register)

* EndPoint: http://localhost:4444/admin-will-register
* Method: POST

Requires:--

* key = Must be same as KEY in .env file in "Database" folder
* username = Username For Your New Admin Account
* password = Password For Your New Admin Account


![Alt text](https://user-images.githubusercontent.com/54973413/130347337-f06d80cf-7d89-4bc9-a1fc-98ae5fa92d6d.jpg "Amazon Site Look")
![Alt text](https://user-images.githubusercontent.com/54973413/130347339-747cc0e8-1537-4390-a40d-aed6c00118a1.jpg "Amazon Site Look")


## Login To Admin Account API:-- (/login)

* EndPoint: http://localhost:4444/login
* Method: POST

Requires:--

* username = Username Of Your Admin Account
* password = Password Of Your Admin Account


![Alt text](https://user-images.githubusercontent.com/54973413/130347667-812d0d16-f0dd-4280-adda-fce03f79a8fe.jpg "Amazon Site Look")
![Alt text](https://user-images.githubusercontent.com/54973413/130347669-4c24d680-d6e9-456f-9630-b4426230b1b8.jpg "Amazon Site Look")


## Add New Product To Databse API:-- (/add)

* EndPoint: http://localhost:4444/add
* Method: POST
* You Must Be Logged In Before Using This API... (Register New User or Login To Existing User)

Requires:--

* id (optional): Type a id for product or leave blank it is generated automatically.
* title: Product Title Text
* img: Product Image Link
* price: Product Price
* rating: How Many Stars To Display Out Of 5
* tags: Tags For This Product


![Alt text](https://user-images.githubusercontent.com/54973413/130347897-360d0679-8323-4995-9f80-ce1b6d1afc0a.jpg "Amazon Site Look")
![Alt text](https://user-images.githubusercontent.com/54973413/130347899-fae76446-6ec4-41ee-a04d-85167dc2f450.jpg "Amazon Site Look")


## Find Product By Id:-- (/findone)

* EndPoint: http://localhost:4444/findone
* Method: POST

Requires:--

* api (optional) = If "true" then returns data in json format(No Login Required).. or if isn't specified then returns HTML page(Login Required)...
* productId = Product's Id


![Alt text](https://user-images.githubusercontent.com/54973413/130348356-6f86e32b-f3d4-4b06-b82f-8d6b433fb196.jpg "Amazon Site Look")
![Alt text](https://user-images.githubusercontent.com/54973413/130348361-46d3ad97-42ec-409a-9f97-b09735d38781.jpg "Amazon Site Look")
![Alt text](https://user-images.githubusercontent.com/54973413/130348363-113eea59-0c93-465c-93ad-827c835e9c5b.jpg "Amazon Site Look")


## Find All Product:-- (/findall)

* EndPoint: http://localhost:4444/findall
* Method: POST

Requires:--

* api (optional) = If "true" then returns data in json format(No Login Required).. or if isn't specified then returns HTML page(Login Required)...
* tags (optional) = If specified returns only that product which contains that tag ... If Not specified then returns all Products from database.. Make sure you type more than on tag like this: "tag1,tag2,tag3" not lik "tag1, tag2, tag3" no spaces allowed between tags..

example: tags = "laptop,smartphone"


## Delete Product:-- (/delete)

* EndPoint: http://localhost:4444/delete
* Method: POST
* You Must Be Logged In Before Using This API... (Register New User or Login To Existing User)

Requires:--

* productId = Product's Id

# Logout From Account:-- (/logout)

* EndPoint: http://localhost:4444/logout
* Method: POST
* You Must Be Logged In Before Using This API... (Register New User or Login To Existing User)

Requires:--

* Nothing Required To Logout
