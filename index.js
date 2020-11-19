require('dotenv').config()
const express = require("express")
const fetch = require('node-fetch');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("src"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "index.html")
})

app.get("/fetch-gitdata", function(req, res){
  const options = {
    method: 'POST',
    headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`
      },
      body: JSON.stringify({
        query: `
          query {
              user(login: "Aliemeka") {
                  name
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
        })
  }
  fetch(`https://api.github.com/graphql`, options)
    .then(response => response.json())
    .then(data => res.json(data.data))
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log("Server is listening at port ", port)
})