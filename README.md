# ychat

an app from [Dan McKeown](http://danmckeown.info) copyright 2017
...

Licensed under [ISC License](https://opensource.org/licenses/ISC)

## Table Of Contents
- [Features](#features)
- [QuickStart](#quickstart)
- [Requirements](#requirements)
- [Usage](#usage)
- [Installation](#installation)
- [Demo](#demo-app)

## features
This project provides the following features:
- Simplistic NodeJS account system using MongoDB with basic auth and PassportJS
- SocketIO-powered real time chat service for multiple users

## quickstart
1. `cd ychat`
2. `npm install`
3. `brew services start mongodb`
4. `npm run ychat`
5. visit the server at [http://localhost:3000](http://localhost:3000)

## requirements
- NodeJS
- NPM
- MongoDB

## installation
- Check [NodeJS](https://nodejs.org/en/) version: `node --version`
- Check [NPM](https://www.npmjs.com/) version: `npm --version`
- Check that MongoDB [is installed](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/): `brew upgrade mongodb`
- Clone the Git repo: `git clone <repo-url>`

## usage
- To start users should create an account at [/register](http://localhost:3000/register).
- Once an account is created, follow the link to the [home](http://localhost:3000) page and log in with the account.
- Once the chat page loads, the user can share chat messages with the room and receive messages from other users logged into the site
- ychat installations are one large chat room with all currently logged-in users able to send and receive messages to the whole ychat room

## demo-app
- A [live deployement](http://ychat.pacificio.com) of ychat is planned for summer 2017.
...
This project uses the [ExpressJS](https://expressjs.com/) server and the front-end was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and uses front-end based on code posted to [CodePen](https://codepen.io/pacificpelican/pen/WjwMjy).
