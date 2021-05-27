require('dotenv').config();
const axios = require('axios');



const TOKEN = process.env.GITHUB_TOKEN;


export const queryParameter = {
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


export const getGitData = payload =>{
    axios.defaults.headers = {
        Authorization: `Bearer ${TOKEN}`
    }
    axios.post(`https://api.github.com/graphql`, payload)
    .then(res => {
        return res.data.data 
    })
    .catch(err => {
        throw err;
    });
}
