const express = require('express');
const bodyParser = require('body-parser');
const middleware = require('@getcolo/middleware');

require('dotenv').config()

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Function to handle the root path
app.get('/slack', async function(req, res) {
    const access_token = middleware.getAccessToken(req, { 
        integration: 'slack',
        client_id: process.env.SLACK_CLIENT_ID,
        client_secret: process.env.SLACK_CLIENT_SECRET,
        redirect_url: 'http://localhost:3000',
    })    

    // store accessToken in your db
    console.log('got slack user access token', access_token)

    res.send(access_token)    
});

app.get('/google', async function(req, res) {
    const access_token = middleware.getAccessToken(req, { 
        integration: 'google',
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_url: 'http://localhost:3000',
    })    

    // store accessToken in your db
    console.log('got google user access token', access_token)

    res.send(access_token)    
});

app.get('/facebook', async function(req, res) {
    const access_token = middleware.getAccessToken(req, {
        integration: 'facebook',
        client_id: process.env.FACEBOOK_CLIENT_ID,
        client_secret: process.env.FACEBOOK_CLIENT_SECRET,
        redirect_url: 'http://localhost:8080/facebook'
    })

    console.log('got facebook user access token', access_token)

    res.send(access_token)
})

app.get('/instagram', async function(req, res) {
    const access_token = middleware.getAccessToken(req, {
        integration: 'instagram',
        client_id: process.env.INSTAGRAM_CLIENT_ID,
        client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
        redirect_url: 'http://localhost:3000'
    })

    console.log('got instagram user access token', access_token)

    res.send(access_token)
})

app.listen(8080, function() {
    console.log('Example server is listening on port 8080')
});