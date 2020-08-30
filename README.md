# Colo.js

The purpose of this library is to provide a easy-to-use, universal OAuth abstraction to 3rd 
party identity providers. With Colo, you will be able to abstract away messy OAuth protocol 
logic when implementing integrations with 3rd party systems. The main use case right now is linking an existing user's account to a 3rd-party provider with the motivation of being able to
authorized requests.

## Installation



```bash
# For getting the middleware library
yarn add @getcolo/middleware
```

## Quickstart

In your callback url method (server-side), include this:

```javascript
const middleware = require('@getcolo/middleware');


app.get('/callback_handler', async function(req, res) {
    const accessToken = middleware.getAccessToken(req, { 
        provider: 'slack',
        // define your OAuth app client_id in an env var and reference it here
        clientId: process.env.SLACK_CLIENT_ID,
        // define your OAuth app client_secret in an env var and reference it here
        clientSecret: process.env.SLACK_CLIENT_SECRET,
        redirectUrl: 'http://localhost:3000',
    })
    
    console.log('got access token!', accessToken)

    // store accessToken in your db for later use

    res.send('hello world')    
});
```

## Supported Providers

Currently, Colo supports the following provider strategies:

- Slack

### In Development

- Google
- Jira
- GitHub
- Salesforce
- Facebook
- Instagram


## API Reference

### getAccessToken
