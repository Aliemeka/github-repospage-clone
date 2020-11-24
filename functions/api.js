require('dotenv').config();
const axios = require('axios');

exports.handler = async function(event, context){

  const TOKEN = process.env.GITHUB_TOKEN;

  
  const queryParameter = {
    query: `
      query {
          user(login: "Aliemeka") {
               url
              login
              bio
              avatarUrl
              location
              email
              twitterUsername
              repositories(first: 20, orderBy: {field: UPDATED_AT, direction: DESC}) {
                  nodes {
                      name
                      url
                      updatedAt
                      description
                      stargazerCount
                      isPrivate
                  }
              }
              followers(first: 20) {
                  totalCount
              }
              following(first: 20) {
                  totalCount
              }
              starredRepositories {
                  totalCount
              }
          }
      }`
  };

  const send = body =>{
      return {
        statusCode: 200,
        body: JSON.stringify(body)
      }
  };

  const getGitData = payload =>{
    axios.defaults.headers = {
        Authorization: `Bearer ${TOKEN}`
    }
    axios.post(`https://api.github.com/graphql`, payload)
    .then(res => send(res.data.data))
    .catch(err => send(err));
  }

  if(event.httpMethod === 'GET'){
      getGitData(queryParameter);
  }
}
