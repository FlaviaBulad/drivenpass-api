<p align="center">
  <img  src="https://i.imgur.com/2IAcDT4.gif" width=40%>
</p>
<h1 align="center">
  DrivenPass
</h1>
<p align="center">
   <img src="https://img.shields.io/badge/author-Flávia Bulad-4dae71?style=flat-square"/>
</p>

<div align="center">

  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <a href="#" target="blank"><img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="prisma" /></a>
  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->

  <h3>Deploy</h3>
<a href="https://server-drivenpass.herokuapp.com/"><img src='https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white' /></a>
</div>

# 📋 Description

DrivenPass is a mobile app that manages users sensitive data like credentials, credit card information, wifi data and other confidential information.

## Features

- Create an account and login;
- Create, fetch and delete data selecting by type;
- All sensitive data is encrypted.

# 🚀 Routes

# 💁 Authentication Routes

## Route<span style="color:yellow"> **POST** </span>/register

Create new users.

```json
{
  "email": "user_email", //string
  "password": "user_password" //string
}
```
### Business rules:

- Password must be at least 10 characters long, otherwise the request will end with status code 401 (Unauthorized).
#
## Route <span style="color:yellow"> **POST** </span>/

Login a registered user.

```json
{
  "email": "user_email", //string
  "password": "user_password" //string
}
```
### Business rules:

- Username and password must match.
- Non-existent e-mail returns status 404 (Not found).
- Incorrect e-mail returns status 409 (Conflict).
- Incorrect password returns 401 (Unauthorized).

### Successful requests return the JWT token needed for authentication on <span style="color:crimson"> **ALL** </span> routes described below.
#
### <span style="color:red">All the following routes are authenticated with a JWT token in 'Authorization' format. </span>

# 💳 Card Routes

## Route <span style="color:yellow"> **POST** </span>/cards

Register credit card data.
```json
{
  "title": "register_name", //string
  "cardHolderName": "card_holder_name", //string
  "number": "card_number", //string
  "securityCode": "cards_secutiry_code", //string
  "expirationDate": "expiration_date", //string
  "password": "card_password", //string
  "isVirtual": "if_the_card_is_virtual", //boolean
  "type": "card_type" //'credit', 'debit' or 'hybrid'
}
```
### Business rules:

- Card number and security code accept only numbers, although they are strings, and must be 16 and 3 characters long, respectively.

- The title is unique to the user in question.

- Repeating the title triggers a status code of 409 (Conflict).

- The correct request will bring a status code of 201 (Created) and the card will be added to the database.
#
## Route <span style="color:green"> **GET** </span>/cards

Fetches all credit card data.
```json
[
  {
    "id": 1,
    "title": "card1",
    "cardHolderName": "Tester T Test",
    "number": "1234567890123456",
    "securityCode": "123",
    "expirationDate": "09/23",
    "password": "1234",
    "type": "credit",
    "isVirtual": false,
    "userId": 1
  },
  {
    "id": 2,
    "title": "card2",
    "cardHolderName": "Tester T Test",
    "number": "5678124567890123",
    "securityCode": "778",
    "expirationDate": "08/24",
    "password": "1245456",
    "type": "hybrid",
    "isVirtual": true,
    "userId": 1
  }
]
```
Note: Sensitive data appears decrypted only at request, it's encrypted in the database.
#
## Route <span style="color:green"> **GET** </span>/cards/:id

Fetches data from a specific card through the route by it's id. 
```json
{
  "id": 1,
  "title": "card1",
  "cardHolderName": "Tester T Test",
  "number": "1234567890123456",
  "securityCode": "123",
  "expirationDate": "09/23",
  "password": "1234",
  "type": "credit",
  "isVirtual": false,
  "userId": 1
}
```
#
## Route <span style="color:red"> **DELETE** </span>/cards/:id

Deletes a specific card by it's id.
#
# 💻 Credential Routes
## Route <span style="color:yellow"> **POST** </span>/credentials

Register website usernames and passwords.

```json
{
  "title": "register_name", //string
  "url": "website_url", //string
  "username": "login_username", //string
  "password": "login_password" //string
}
```
### Business rules:

- Title must be unique for each user.

#
## Route <span style="color:green"> **GET** </span>/credentials/:id

Fetches all credential data.

```json
[
  {
    "id": 1,
    "title": "my credential",
    "url": "https://www.driven.com.br/",
    "username": "testuser",
    "password": "123456",
    "userId": 1
  },
  {
    "id": 2,
    "title": "my second credential",
    "url": "https://www.twitter.com./",
    "username": "testuser2",
    "password": "slighsodg",
    "userId": 1
  }
]
```
Note: Sensitive data appears decrypted only at request, it's encrypted in the database.

#
## Route <span style="color:green"> **GET** </span>/credentials/:id

Fetches data from a specific credential by id.

```json
{
  "id": 1,
  "title": "my credential",
  "url": "https://www.driven.com.br/",
  "username": "testuser",
  "password": "123456",
  "userId": 1
}
```
#
## Route <span style="color:red"> **DELETE** </span>/credentials/:id

Deletes a specific credential by id.
#
# 🗒️ Safe Notes Routes

## Route <span style="color:yellow"> **POST** </span>/safeNotes

Register notes.

```json
{
  "title": "register_and_note_title", //string
  "note": "your_text" //string
}
```
### Business rules:

- Title must have a maximum of 50 characters, and the note 1000.

## Route <span style="color:green"> **GET** </span>/safeNotes

Fetches all notes.

```json
[
  {
    "id": 1,
    "title": "my safe note",
    "note": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "userId": 1
  },
  {
    "id": 2,
    "title": "another safe note",
    "note": "Nulla porttitor, neque a ultricies viverra, sem velit commodo orci, non lacinia magna quam sit amet massa.",
    "userId": 1
  }
]
```
Note: Sensitive data appears decrypted only at request, it's encrypted in the database.

## Route <span style="color:green"> **GET** </span>/safeNotes/:id

This route fetches a specific note by id.

A successful request will bring a response like the one below:

```json
{
  "id": 1,
  "title": "my safe note",
  "note": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "userId": 1
}
```

## Route <span style="color:red"> **DELETE** </span>/safeNotes/:id

Deletes a specific note by id.
#
# 🌐 Wifi Routes
## Route <span style="color:yellow"> **POST** </span>/wifi

This route register wifi data.

The request body should be in the following format:

```json
{
  "title": "register_name", //string
  "networdName": "network_name", //string
  "password": "network_password" //string
}
```

## Route <span style="color:green"> **GET** </span>/wifi

Fetches all wifi registered.
```json
[
  {
    "id": 1,
    "title": "home",
    "networkName": "myNetwork",
    "password": "admin",
    "userId": 1
  },
  {
    "id": 2,
    "title": "work",
    "networkName": "work_NETWORK",
    "password": "1234",
    "userId": 1
  }
]
```
Note: Sensitive data appears decrypted only at request, it's encrypted in the database.
#
## Route <span style="color:green"> **GET** </span>/wifi/:id

Fetches a specific wifi register by id.
```json
{
  "id": 1,
  "title": "home",
  "networkName": "myNETWORK",
  "password": "admin",
  "userId": 1
}
```
#
## Route <span style="color:red"> **DELETE** </span>/wifi/:id

Deletes a specific wifi register by id.
#
# 🏁 Running the App

Clone the project

```bash
  git clone https://github.com/FlaviaBulad/drivenpass-api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```
#

## 📖 Lessons Learned

In this project I learned a lot about how to work with Prisma queries and migrations.
I also learned about Typescript interfaces and types and how to implement JWT authentication service.
#
## 👏 Acknowledgements

- [Awesome Badges](https://github.com/Envoy-VC/awesome-badges)

- <p> <a href="https://www.flaticon.com/free-animated-icons/password" title="password animated icons">Password animated icons created by Freepik - Flaticon</a> </p>
#

