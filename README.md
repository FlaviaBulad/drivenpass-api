# projeto19-drivenpass

A Typescript designed mobile app to manage and store confidential information

<p align="center">
  <img  src="https://i.imgur.com/2IAcDT4.gif" width=50%>
</p>
<h1 align="center">
  DrivenPass
</h1>

<div align="center">

  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->

  <h3>Deploy</h3>
<a href="https://server-drivenpass.herokuapp.com/"><img src='https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white' /></a>
</div>

<br/>

# Description

DrivenPass is an API for a mobile app that manages users sensitive data like credentials, credit card information, wifi data and other confidential information.

</br>

## Features

- Create an account and login
- Create, find and delete information selecting by type
- All sensitive data is encrypted

</br>

## API Reference

</br>

# Authentication Routes

## Route<span style="color:yellow"> **POST** </span>/register

This route is <span style="color:red"> **NOT** </span> authenticated. Your function is to create new users.

The Requisition Body must be in the following format:

```json
{
  "email": "user_email", //string
  "password": "user_password" //string
}
```

### Business rules:

- The password must be at least 10 characters long, otherwise the request will end with status error 401 (Unauthorized)

## Route <span style="color:yellow"> **POST** </span>/

This route is <span style="color:red"> **NOT** </span> authenticated. Your function is to login users.

The Requisition Body must be in the following format:

```json
{
  "email": "user_email", //string
  "password": "user_password" //string
}
```

### Business rules:

- Username and password must match.
- Non-existent e-mail returns 404.
- Incorrect e-mail returns status 409.
- Incorrect password returns 401.

### Successful requests return the JWT token needed for authentication on <span style="color:crimson"> **ALL** </span> routes described below.

#

# All the following routes are authenticated with a JWT token in 'Authorization' format.

# Card Routes

## Route <span style="color:yellow"> **POST** </span>/cards

This route has the function of adding card-related information.

The Body of the request must be made in the following format:

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

- Repeating the title triggers a status response of 409.

- The correct request will bring a status response of 201 and the card will be added to the database.

## Route <span style="color:green"> **GET** </span>/cards

This route has no information in the body. The intention is to get all the information from all the cards of the user who is the holder of the token in question.

A successful request will bring a response like the one below:

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

Note: Sensitive data appears decrypted only at request. It does not appear that way in the database.

## Route <span style="color:green"> **GET** </span>/cards/:id

This route passes as information the id of a specific card through the route. The intention is to get the information about this card from the user who owns the token in question.

A successful request will bring a response like the one below:

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

## Route <span style="color:red"> **DELETE** </span>/cards/:id

This route passes as information the id of a specific card through the route. The intent is to delete the information from a data.

A successful request will return a status confirmation and the register will be deleted from database.

# Credential Routes

## Route <span style="color:yellow"> **POST** </span>/credentials

The function of this route is to register website usernames and passwords.

The Body of the request should be in the following format:

```json
{
  "title": "register_name", //string
  "url": "website_url", //string
  "username": "login_username", //string
  "password": "login_password" //string
}
```

### Business rules:

- The titles must be unique for each user.

## Route <span style="color:green"> **GET** </span>/credentials/:id

This route has no information in the body. It is intended to fetch all credential information from the user holding the token in question.

A successful request will bring a response like the one below:

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

Note: Sensitive data appears decrypted only at request. It does not appear that way in the database.

## Route <span style="color:green"> **GET** </span>/credentials/:id

This route passes as information the id of a specific credential through the route. The intention is to get the credential information from the user that owns the token in question.

A successful request will bring a response like the one below:

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

## Route <span style="color:red"> **DELETE** </span>/credentials/:id

This route passes as information the id of a specific credential through the route. The intent is to delete the information from a data.

A successful request will return a status confirmation and the register will be deleted from database.

# Safe Notes Routes

## Route <span style="color:yellow"> **POST** </span>/safeNotes

The function of this route is to perform the addition of annotations.

The Body of the request should be in the following format:

```json
{
  "title": "register_and_note_title", //string
  "note": "your_text" //string
}
```

### Business rules:

- The title must have a maximum of 50 characters, and the note 1000.

- The correct request will bring a status 201 response and the note will be added to the database.

## Route <span style="color:green"> **GET** </span>/safeNotes

This route has no information in the body. The intention is to get all the information from all the notes of the user holding the token in question.

A successful request will bring a response like the one below:

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

Note: Sensitive data appears decrypted only at request. It does not appear that way in the database.

## Route <span style="color:green"> **GET** </span>/safeNotes/:id

This route passes as information the id of a specific token through the route. The intention is to get the information about this note from the token holder user in question.

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

This route passes as information the id of a specific note through the route. The intent is to delete the information from a piece of data.

A successful request will return a status confirmation and the register will be deleted from database.

# Wifi Routes

## Route <span style="color:yellow"> **POST** </span>/wifi

This route has the function of adding wifi network information.

The Body of the request should be in the following format:

```json
{
  "title": "register_name", //string
  "networdName": "network_name", //string
  "password": "network_password" //string
}
```

## Route <span style="color:green"> **GET** </span>/wifi

This route has no information in the body. The intention is to get all information from all wifi networks of the token holder user in question.

A successful request will bring a response like the one below:

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

Note: Sensitive data appears decrypted only at request. It does not appear that way in the database.

## Route <span style="color:green"> **GET** </span>/wifi/:id

This route passes as information the id of a specific wifi through the route. The intention is to get the information of this wifi from the token holder user in question.

A successful request will bring a response like the one below:

```json
{
  "id": 1,
  "title": "home",
  "networkName": "myNETWORK",
  "password": "admin",
  "userId": 1
}
```

## Route <span style="color:red"> **DELETE** </span>/wifi/:id

This route passes as information the id of a specific wifi through the route. The intention is to delete the information from a datum.

A successful request will return a status confirmation and the register will be deleted from database.

# Run Locally

Clone the project

```bash
  git clone https://github.com/FlaviaBulad/projeto19-drivenpass-back
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

</br>

## Lessons Learned

In this project I learned a lot about how to work with Prisma queries and migrations.
I also learned about Typescript interfaces and types and how to use JWT authentication service.

</br>

## Acknowledgements

- [Awesome Badges](https://github.com/Envoy-VC/awesome-badges)

- <p> <a href="https://www.flaticon.com/free-animated-icons/password" title="password animated icons">Password animated icons created by Freepik - Flaticon</a></p>

</br>

## Authors

- Flávia Bulad is a student at Driven Education and is putting effort into it to become a FullStack Web Developer.
  <br/>

#
