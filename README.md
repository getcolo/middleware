# Colo.js

The purpose of this library is to provide a easy-to-use, universal OAuth abstraction to 3rd 
party identity providers. With Colo, you will be able to abstract away messy OAuth protocol 
logic when implementing integrations with 3rd party systems. The main use case right now is linking an existing user's account to a 3rd-party provider with the motivation of being able to
authorized requests.

## Installation

```bash
yarn add @colo
```

## Quickstart

In your API, create a route for generating the state value, which we will use
to relate the user back to.
```javascript
import { generateStateValue } from '@colo/middleware';


function genStateValueRouteHandler(req, res) {
    stateValue = generateStateValue(req.body.user_id);
    res.send(200)
}
```

In your React app, where you will ask the end-user to link their account with a 3rd party provider, include this:

```javascript
import ColoLink from '@colo/ColoLink';

<ColoLink
    integration={'your 3rd party provider e.g. slack'}
    genStateUrl={'https://your-state-url.com/generate-state'}
    redirectUrl={'https://your-callback-url.com/callback'}
    userId={'johnsmith@gmail.com'}
/>
```

In your callback url method (server-side), include this:

```javascript
import { getAccessToken } from '@colo/middleware';

// ...

function callbackUrl(req, res) {
    const access_token = getAccessToken(req, 'integration')
    // store access token in your db (encrypted appropriately of course, please)
}
```

## Supported Providers

Currently, Colo supports the following provider strategies:

1. Slack
2. Google