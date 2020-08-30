# middleware

The purpose of this library is to provide a easy-to-use, universal OAuth abstraction to 3rd 
party identity providers. With Colo, you will be able to abstract away messy OAuth protocol 
logic when implementing integrations with 3rd party systems. The main use case right now is linking an existing user's account to a 3rd-party provider with the motivation of being able to
authorized requests.

## Installation

```bash
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

There is also a complementary React library package, [@getcolo/colo-link](https://github.com/) that helps retrieve the appropriate authorization URL for the end-user to be directed to.

For more information on using this library, check out the example directory in this repository. 

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

#### Inputs

- `httpReq` - an express HTTP request object that is passed in as a parameter to the route method.

- `config` - an object containing the following structure:
```javascript
{ 
    integration: String,
    client_id: String,
    client_secret: String,
    redirect_url: String,
}
```

#### Output

```javascript
{
    access_token: '',
    custom_data: {
        // provider specific metadata returned in the 
        // response
    },
}
```

An example of a `customData` object is the below slack provider's `customData` object:
```javascript
{
    ok: true,
    app_id: 'A018WDKCCTH',
    authed_user: { id: 'U0194DS14MC' },
    scope: 'calls:read,calls:write',
    token_type: 'bot',
    access_token: 'xoxb-1317404487779-1329856079905-H7cRXH9V7XPZSrULCYrRb2oY',
    bot_user_id: 'U019PR62BSM',
    team: { id: 'T019BBWEBNX', name: 'colo-dev' },
    enterprise: null
}
```

## Questions

Email [shreyas@getcolo.dev](mailto:shreyas@getcolo.dev) with any questions, , contribution ideas, concerns or feedback about the repository. 