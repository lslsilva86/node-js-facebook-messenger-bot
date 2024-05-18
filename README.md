# Facebook Messenger Bot

## Introduction

An application that connects with a Facebook page and processes the incoming messages from that Facebook page.

![](https://github.com/lslsilva86/node-js-facebook-messenger-bot/blob/322680ae81f12bf53b75701033eea96382f1cabf/screens/0_intro.png)

## Get Started

- change .env file values
- npm i
- npm start
- Set the webhook callback URL in the Facebook App Dashboard: eg: https://respondio.ap.ngrok.io/webhook

## Technologies used:

- node.js
- express.js
- MySQL
- sequelize
- ngrok
- sendgrid
- facebook apps

## Folder Structure:

- --- src: Contains the main application code<br>
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--- routes - Maps URLs to corresponding controller actions.<br>
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--- models - Defines data structures and database schemas.<br>
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--- services - Contains business logic and core functionality.<br>
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--- controllers - Handles HTTP requests and sends responses.<br>
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--- app.ts - Initializes the server, middleware, and routes.<br>
- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--- config.ts - Manages configuration settings and environment variables.<br>
- --- .env.sample: Template for environment variables.<br>
- --- .gitignore: Specifies files to be ignored by Git.<br>
- --- .tsconfig.json: TypeScript configuration file.<br>
- --- package.json: Lists project dependencies and scripts.<br>

## Code Quality and Programming Skills

TypeScript and Node.js, used with clear modularization and use of environment variables.
Dependencies are managed via package.json.

## Problem Solving Techniques

Implements clear separation of concerns, with a dedicated src folder for the main logic and sub folders.
Uses configuration files to manage different environments and ensure consistency.

## Error Handling

Error handling through the use of try-catch blocks and proper logging mechanisms to handle runtime errors and exceptions gracefully.

## Unit Testing

Completed unit testing using Jest for controllers and services.

![](https://github.com/lslsilva86/node-js-facebook-messenger-bot/blob/70cf146230c74e6091aa27262a20e421b0ec2f44/screens/14_test-results.png)

## Challenges

Converting the large JSON data file to MySQL was done through an application I have created separately. https://github.com/lslsilva86/json-to-mysql <br>
Messanger into Facebook page, ngrok, sendgrid integrations were challenging.
