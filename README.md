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
| Yes                  | GET    | /deals     |              |




### CI/CD

It was configured the application's ci/cd, for that it was used the Google Cloud Build: https://cloud.google.com/cloud-build

![image](https://user-images.githubusercontent.com/26530039/104127931-93a65d80-5343-11eb-9535-e5f78bc67bda.png)

And to deploy the application it was used Watchtower: https://github.com/containrrr/watchtower

![image](https://user-images.githubusercontent.com/26530039/104127980-cc463700-5343-11eb-8074-70169d2bf455.png)

And to management the images it was used google compute engine: https://cloud.google.com/compute

Feel free to do a PR and see the change automatically.
