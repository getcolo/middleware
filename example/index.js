const express = require('express');
const bodyParser = require('body-parser');
const middleware = require('@getcolo/middleware');

require('dotenv').config()

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Function to handle the root path
app.get('/', async function(req, res) {
    const accessToken = middleware.getAccessToken(req, { 
        integration: 'slack',
        clientId: process.env.SLACK_CLIENT_ID,
        clientSecret: process.env.SLACK_CLIENT_SECRET,
        redirectUrl: 'http://localhost:3000',
    })

    // store accessToken in your db
    console.log('got access token', accessToken)

    res.send('hello world')    
});

app.listen(8080, function() {
    console.log('Example server is listening on port 8080')
});