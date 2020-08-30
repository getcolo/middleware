const express = require('express');
const bodyParser = require('body-parser');
const middleware = require('@getcolo/middleware');

require('dotenv').config()

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Function to handle the root path
app.get('/', async function(req, res) {
    const access_token = middleware.getAccessToken(req, { 
        integration: 'slack',
        client_id: process.env.SLACK_CLIENT_ID,
        client_secret: process.env.SLACK_CLIENT_SECRET,
        redirect_url: 'http://localhost:3000',
    })

    // store accessToken in your db
    console.log('got access token', access_token)

    res.send('hello world')    
});

app.listen(8080, function() {
    console.log('Example server is listening on port 8080')
});