const axios = require('axios').default;
const qs = require('qs');

const PROVIDER_TO_ACCESS_TOKEN_URL = {
    'slack': 'https://slack.com/api/oauth.v2.access',
}

exports.getAccessToken = ((httpReq, config) => {
    // get authorization code from httpReq
    // call access token url for provider with code, client_secret, etc
    // get access token and return this
    console.log(httpReq.query.code, config)

    const code = httpReq.query.code
    let accessToken = null

    switch(config.integration){
        case 'slack':
            accessToken = getSlackAccessToken(code, config.clientId, config.clientSecret, config.redirectUrl)
            break;
        default:
            console.log('no provider found')
            break;
    }

    console.log(config.integration, config.clientSecret)
    return accessToken
})

exports.genAndStoreStateValue = () => {
    console.log('genAndStoreStateValue');
}

const getSlackAccessToken = (code, clientId, clientSecret, redirectUrl) => {
    console.log('getSlackAccessToken', code, clientId, clientSecret, redirectUrl)
    const encodedClientIdAndSecret = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

    return axios.post(PROVIDER_TO_ACCESS_TOKEN_URL['slack'], qs.stringify({
        'code': code,
        'redirect_uri': redirectUrl,
        'grant_type': 'authorization_code',
        'client_id': clientId,
        'client_secret': clientSecret,
    }), headers={
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    })
    .then((response) => {
        console.log(response.data)
        return response.data
    })
    .catch((err) => {
        console.log(err)
        return err
    })
}