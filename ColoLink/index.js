import React, {useState} from 'react';
import axios from 'axios';
import './index.css';

const ColoLink = ({ coloApiKey, userId, disabled=false, integration, style, buttonText }) => {
  const [isLoading, setIsLoading] = useState(false)  
  let text = "Link Account"
    if(integration === "twitter") {
      text = "Link Twitter Account"
    } else if(integration === 'quickbooks') {
      text = 'Link QuickBooks Account'
    } else if(integration === 'slack') {
      text = 'Link Slack Account'
    } else if(integration === 'google') {
      text = 'Link Google Account'
    }
    
    // buttonText overrides everything else
    if(buttonText !== undefined) {
      text = buttonText
    }
    
    function sendCollateOauthRequest(apiKey, userId, integration){
      setIsLoading(true)
      console.log(apiKey, userId, integration);
      // start oauth flow
      // TODO: replace url with API_URL env var
      axios.post('http://localhost:5000/oauth', {
        integration: integration,
        api_key: apiKey,
        user_id: userId,
      })
      .then((data) => {
        setIsLoading(false)
        console.log(data)
        console.log(data.data.authorize_url)
        window.open(data.data.authorize_url, '_blank')
      })
      .catch((err) => {
        alert(err)
      })
    }

    return (
      <button 
        className="CollateBtn" 
        style={style} 
        disabled={disabled || isLoading}
        onClick={() => {sendCollateOauthRequest(coloApiKey, userId, integration)}}>
        {isLoading ? 'Linking...' : text}
      </button>
    )
}

export default ColoLink;