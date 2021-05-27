import axios from 'axios';
import env from '@snowpack/plugin-dotenv'

const { GITHUB_TOKEN } = env;
export const TOKEN = GITHUB_TOKEN;

export const queryParameter = {
    query: `
        query {
            user(login: "Aliemeka") {
                url
                login
                name
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
        Authorization: `token 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`
    }
    axios.post(`https://api.github.com/graphql`, payload)
    .then(res => {
        return res.data.data 
    })
    .catch(err => {
        throw err;
    });
}
