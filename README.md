# ContactList

## About

**This project represents a solution to the project proposed by my uni teacher.**

This app works similarly to a smartphone contact list app.
An user can create an account which then uses to login into the app, then the user can create/read/update/delete contacts.
The app is developed on a client-server architecture

## Steps to run the APP

1. Install NodeJS and NPM, you must also have MongoDB installed
2. Run npm install to install the dependencies
3. At root level create a .env file which must contain the following variables:

- PORT= _port you want the app to listen on_
- MONGODB_URI= \_link to database server*
- SECRET= _secret for jwt_

e.g

- PORT=9999
- MONGODB_URI=mongodb://localhost:27017/ContactList
- SECRET=secret

4. Run npm run build
5. Run npm start
6. Commands to start the app:

- npm run watch - runs the app using nodemon
- npm run start - which runs _node index_
