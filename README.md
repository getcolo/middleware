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


## ColoLink

ColoLink is the React button component that directs the end-user to the appropriate authorization URL. It has the following parameters:

- `integration` - the provider you're connecting with i.e. 'slack'
- `redirectUrl` - the callback url the end-user goes to after authorizing your app access. This endpoint will also be responsible for getting the user access token
- `generateStateValueUrl` - the url that generates and stores a unique state value for the end-user 
- `userId` - a unique id for the end-user (can be their email; doesn't have to be the pk in the database)


## middleware