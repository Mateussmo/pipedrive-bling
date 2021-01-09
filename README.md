# Pipedrive-Bling

## This is an API done in Express + Typescript. The objective of this project is to search for orders on the pipedrive and insert in the bling.

# How To Install

```bash
$ git clone <https://github.com/Mateussmo/pipedrive-bling.git>

# Install the dependencies
$ npm install

# Run the application in development mode
$ npm run dev

# Run the application in production mode
$ npm start

# The server will start on port 3000 - <http://localhost:3000>
```

## Setting the environment variables

Create an .env file

Inside it, add six environment variables

MONGO_DATABASE = URL to connect to mongodb

SECRET = A secret string, used to generate the token

EXPIRESIN = Token expiration time (Eg: 2 days)

PIPEDRIVE_TOKEN= The user token in Pipedrive

PIPEDRIVE_USER= The name of the user in Pipedrive

BLING_API_KEY=Your Api Key in Bling

### Users Management

#### Create a User

| Authenticated Route? | Method | Route Name | Request body                                   |
| -------------------- | ------ | ---------- | ---------------------------------------------- |
| No                   | POST   | /users     | { "username": "string", "password": "string" } |

#### Authenticate a User

| Authenticated Route? | Method | Route Name          | Request body                                   |
| -------------------- | ------ | ------------------- | ---------------------------------------------- |
| No                   | POST   | /users/authenticate | { "username": "string", "password": "string" } |

#### Update a User

| Authenticated Route? | Method | Route Name | Request body             |
| -------------------- | ------ | ---------- | ------------------------ |
| Yes                  | PATCH  | /users     | { "password": "string" } |

#### Delete a User

| Authenticated Route? | Method | Route Name     | Request body |
| -------------------- | ------ | -------------- | ------------ |
| Yes                  | DELETE | /users/:userId |              |

#### List All Users

| Authenticated Route? | Method | Route Name | Request body |
| -------------------- | ------ | ---------- | ------------ |
| No                   | GET    | /users     |              |

### Deals Management

#### Create a Deal

| Authenticated Route? | Method | Route Name | Request body |
| -------------------- | ------ | ---------- | ------------ |
| Yes                  | POST   | /deals     |              |

#### Find all Deals

| Authenticated Route? | Method | Route Name | Request body |
| -------------------- | ------ | ---------- | ------------ |
| Yes                  | POST   | /deals     |              |
