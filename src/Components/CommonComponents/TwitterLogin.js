import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TWITTER_URL = 'https://twitter.com';
const TWITTER_API_URL = 'https://api.twitter.com';
const API_KEY = 'temp_1e3ff3305b5731c708747955ffa37a2b';

const TwitterLogin = ({
  client_id = "RmM1ZlNnTV9IYmxpN3NBWW9vQXg6MTpjaQ", // Replace with your Twitter app's client ID
  client_secret = "g3lGajOVCKbMg1bTDUJ25brFQ5uC1E49HODnhS2s17XTcvnk2_", // Replace with your Twitter app's client secret
  redirect_uri = "https://localhost:3000/", // Replace with your redirect URI
  className = '',
  children,
  fields = 'created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld,email', // Include email if you want to fetch it
  state = 'state',
  scope = 'users.read%20tweet.read',
  onLoginStart,
  onReject,
  onResolve,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate

  const handleLogin = async () => {
    onLoginStart && onLoginStart();
    setIsLoading(true);
    const oauthUrl = `${TWITTER_URL}/i/oauth2/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}&code_challenge=challenge&code_challenge_method=plain`;
    window.location.href = oauthUrl; // Redirect user to Twitter authorization
  };

  const handleCode = async () => {
      console.log("hlo")
      const code = new URLSearchParams(window.location.search).get('code');
      if (code) {
        setIsLoading(true);
        try {
          const tokenUrl = `${TWITTER_URL}/oauth2/token`;
          const authHeader = btoa(`${client_id}:${client_secret}`);
          const data = await fetch(tokenUrl, {
            method: 'POST',
            body: new URLSearchParams({
              grant_type: 'authorization_code',
              client_id,
              client_secret,
              redirect_uri,
              code,
              code_verifier: 'challenge',
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Basic ${authHeader}`,
            },
          });
          const tokenResponse = await data.json();
           console.log(tokenResponse,"tokenResponse")

          if (tokenResponse.access_token) {
            const profileUrl = `${TWITTER_API_URL}/2/users/me?user.fields=${fields}`;
            const profileResponse = await fetch(profileUrl, {
              headers: {
                Authorization: `Bearer ${tokenResponse.access_token}`,
              },
            });
            const userData = await profileResponse.json();
          console.log(userData,"userData")
            // Delay logging user data after redirect
            setTimeout(() => {
              console.log('User Data:', userData);

              // Assuming 'id' and 'email' are fields returned by Twitter API
              onResolve({
                provider: 'twitter',
                data: {
                  id: userData.data.id,
                  email: userData.data.email, // Make sure this field is included in 'fields'
                  // Add other fields as needed
                },
              });
            }, 2000); // Adjust the delay time as needed
          }
          else {
            onReject(new Error('Failed to get access token'));
          }
        } catch (error) {
          onReject(error);
        } finally {
          setIsLoading(false);
        }
      }
    };
 
  useEffect(() => {
    console.log("hlo outside")
    

    window.addEventListener('popstate', handleCode);
    return () => window.removeEventListener('popstate', handleCode);
  }, []);

  // new code   
  const bearerToken="1805189551884771328-Bfjo0lLwO8NPqWMdWujGmbAwG9XdTm"
const accessTokenSecret="pEI20yFBxYTWw4LQpLCpKlqOL77rI9kToQngBcU2qEiJ6"

  const fetchUserInfo = async () => {
    if (!bearerToken) {
      console.error('Bearer token is not set in environment variables.');
      return;
    }

    setIsLoading(true);
    try {
      const profileUrl = 'https://api.twitter.com/2/users/me?user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld,email';
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const response = await fetch(proxyUrl + profileUrl, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.detail}`);
      }

      const userData = await response.json();
      console.log('User Data:', userData);
     
    } catch (error) {
      console.error('Error fetching user info:', error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className={className} onClick={handleLogin}>
      <button disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Login'}
      </button>
      {children}
    </div>
  );
};

export default TwitterLogin;
