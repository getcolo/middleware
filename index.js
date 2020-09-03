const axios = require('axios').default;
const qs = require('qs');

const PROVIDER_TO_ACCESS_TOKEN_URL = {
    'slack': 'https://slack.com/api/oauth.v2.access',
    'google': 'https://oauth2.googleapis.com/token',
    'facebook': 'https://graph.facebook.com/v8.0/oauth/access_token'
}

exports.getAccessToken = ((httpReq, config) => {
    const code = httpReq.query.code
    let access_token = null

    switch(config.integration){
        case 'slack':
            accessToken = getSlackAccessToken(code, config.client_id, config.client_secret, config.redirect_url)
            break;
        case 'google':
            accessToken = getGoogleAccessToken(code, config.client_id, config.client_secret, config.redirect_url)
            break;  
        case 'facebook':
            accessToken = getFacebookAccessToken(code, config.client_id, config.client_secret, config.redirect_url)          
            break;
        default:
            console.log('no provider found')
            break;
    }

    return access_token 
})

exports.genAndStoreStateValue = (user_id) => {
    // TODO: write a method that generates and stores a state value mapped
    // to a userId
    console.log('genAndStoreStateValue');
}

const getSlackAccessToken = (code, client_id, client_secret, redirect_url) => {
    return axios.post(PROVIDER_TO_ACCESS_TOKEN_URL['slack'], qs.stringify({
        'code': code,
        'redirect_uri': redirect_url,
        'grant_type': 'authorization_code',
        'client_id': client_id,
        'client_secret': client_secret,
    }), headers={
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    })
    .then((response) => {
        return response.data
    })
    .catch((err) => {
        return err
    })
}

const getGoogleAccessToken = (code, client_id, client_secret, redirect_url) => {
    return axios.post(PROVIDER_TO_ACCESS_TOKEN_URL['google'], {
        'code': code,
        'redirect_uri': redirect_url,
        'grant_type': 'authorization_code',
        'client_id': client_id,
        'client_secret': client_secret,
    }, headers={
        'Accept': 'application/json'
    })
    .then((response) => {
        return response.data
    })
    .catch((err) => {
        return err
    })  
}

const getFacebookAccessToken = (code, client_id, client_secret, redirect_url) => {
    console.log(code, client_id, client_secret, redirect_url)

    return axios.get(`${PROVIDER_TO_ACCESS_TOKEN_URL['facebook']}?code=${code}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_url}`)
    .then((response) => {
        console.log(response.data)
        return response.data
    })
    .catch((err) => {
        console.log(err)
        return err
    })  
}