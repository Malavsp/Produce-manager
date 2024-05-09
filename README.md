[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/l4WXNqvu)

# Produce Manager For Supermarket
This is a Fruit and Vegetables managing system which works on **PLU Code** where you can get Information _(name, price and many more)_  about produce by typing the code ***,*** add new produce product ***,*** delete a produce  ***or***  get a whole list of produces. 

### PLU Code - [Price look-up code](https://en.wikipedia.org/wiki/Price_look-up_code)

A 4 digit code commonly called produce codes, or produce labels, are a system of numbers that uniquely identify bulk produce sold in grocery stores and supermarkets.


## Routes

### Root route
| endpoint | method | body | return | description |
|---|---|---|---|---|
|`/`|`GET`|***-***|`<h1>Welcome to the Homepage</h1>`| Root page welcoming the user|

### Error route
| endpoint | method | body | return | description |
|---|---|---|---|---|
|`/error`|`GET`|***-***|`throw Error`| Throws error with a message


### DataBase Init route
| endpoint | method | body | return | description |
|---|---|---|---|---|
|`/admin/init`|`GET`|***-***|`init()`| Initializes table in the database


### Produce routes
| endpoint | method | body | return | description |
|---|---|---|---|---|
|`/produces/all`|`GET`|***-*** |`[ 'allFruits' : {...}, {...} ] `|Get All Fruits |
|`/produces/id/:pluCode`|`GET`| ***-***| `{'produce' : {plu : 1234 , name : 'apple' , price : 6}}`|Get produce By PLU Code|
|`/produces/add`|`POST`| PLU , Name , Price |`{Fruit : {changes : 1 , lastInsertRowid: 1} , msg : "Added to Db"}`| Add New Fruit |
|`/produces/id/:pluCode`| `DELETE`| ***-***|`delFruit : {changes:1}`| Deletes a Fruit


<br/>

# Getting started
To get the Node server running locally:

- Clone this repo
- `npm install or npm i` to install all required dependencies
- `npm run dev` to start the local server
- `npm run test` to run the tests and testing environment

<br/>

# Code Overview

- ## Dependencies

  - **better-sqlite3 : `^9.5.0`** - A fastest and simplest database which is like a database captured in a DB file.
  - **dotenv  : `^16.4.5`** - It loads environment variables from a .env file into process.env.
  - **express : `^4.19.2 `** - The server for handling and routing HTTP requests
  - **nodemon : `^3.1.0`** -  A replacement wrapper for node automatically restarting the node application when file changes in the directory are detected.


- ## DevDependencies

    -  **jest : `^29.7.0`**  - This is a JavaScript testing framework designed to ensure correctness of any JavaScript codebase. 

    -  **supertest : `^6.3.4`** - Supertest is a Node. js library that allows developers and testers to test the APIs. It enables developers and testers to write automated tests for routes and endpoints.
