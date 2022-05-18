// V.0.0.0
// >yarn init
// >yarn add express
// >yarn add nodemon

// in package.json add
  // "engines": {
  //   "node": "14.17.6",
  //   "npm": "6.14.15"
  // },
  // "scripts": {
  //   "start": "node index.js",
  //   "dev": "nodemon index.js"
  // },

// >yarn run dev
// >yarn add passport passport-google-oauth20

// after creating app in heroku
// >heroku login
// >git remote add heroku https://git.heroku.com/emailsendy.git
// >git push heroku main

// V.0.0.1
// google auth in index.js

// v.0.0.2
// creating seperate file for passport and routes

// v.0.0.3
// adding prod key

// v.0.0.4
// https://emailsendy.herokuapp.com/auth/google/callback

// v.0.0.5
// >yarn add mongoose
// create a database in mongodb website copy URI string and paste in keys.js 
// >yarn add cookie-session

// creating user model in mongo
// creating cookie session

// adding mongo prod key and deploying in heroku

// v.0.0.6
// >npx create-react-app client
// >yarn add concurrently

// change package.json file
// add setupProxy.js file in client

// install latest version
// >yarn add http-proxy-middleware@2.0.6 - in client

// v.0.0.7
// setting empty reducer
// in client
// >yarn add redux react-redux react-router-dom redux-thunk axios @reduxjs/toolkit
// >yarn add materialize-css

// v.0.0.8
// setting up header
// nav bar
// reducer

// v.0.0.9
// deploying in heroku - not working

// v.0.1.0
// >yarn build - in client
// deploying in heroku - not working

// v.0.1.1
// adding in package.json
// "heroku-postbuild": "YARN_PRODUCTION=false yarn --cwd client install && yarn --cwd client build"
// deploying in heroku - working

// v.0.1.2
// stripe implementation
// get stripe keys 
// signin to stripe.com
// get keys from APIs section

// in client
// >yarn add @stripe/react-stripe-js @stripe/stripe-js 

// in server
// >yarn add stripe
// >yarn add body-parser //for json

// deployed in heroku - success

// v.0.1.3
// create Survey model
// >yarn add sendgrid
// >yarn add @sendgrid/mail

// >yarn add lodash path-parser

// use ngrok
// ngrok authtoken YOUR_AUTHTOKEN
// >ngrok config add-authtoken 28dQroCDb8YGxbvDoe1SUpDMNJS_3bMnwuCWN1ZYkqq2V2Mct

// ngrok http 5000

// in sendgrid under settings -> mail setteings -> event webhook
// in HTTP POST URL

// https://acb5-2409-4072-81e-eb23-2583-4f19-c538-a669.in.ngrok.io/api/surveys/webhooks

// in browser console
// >const survey = { title: "my test title", subject: "my test subject", recipients: "ajdivya30@gmail.com", body: "heres the test body of the email" };
// >survey
// axios.post("/api/surveys", survey);

// server side survey done

