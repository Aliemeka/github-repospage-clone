
let userData = "";

const loadContainer = document.getElementById("loader-area");
const loader = document.getElementById("loader");
const errorMessage = document.getElementById("error-message")

const fullNameElm = document.getElementById("full-name"); //Gets element for the full name 
const usernameElm = document.getElementById("username"); //Gets element for the last name
const bioElm = document.getElementById("bio"); //Gets element for the bio
const profileImg = document.querySelectorAll(".avatar-img"); //Gets elements for avatar image
const locationElm = document.getElementById("location"); //Gets element for location
const emailElm = document.getElementById("email"); //Gets element for email
const twitterElm = document.getElementById("twitter-account"); //Gets element for email

fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: { 
            "Content-Type": "application/json",
            "Authorization": 'Bearer a929a12daf2e1a881d2ebd52d900bdd70f9cdf17'
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
                        repositories(last: 20) {
                            nodes {
                                name
                                url
                                updatedAt
                                description
                                stargazerCount
                            }
                        }
                    }
                }`
        })
    })
    .then(res => res.json())
    .then(data => {
        loadContainer.classList.add("d-none");
        userData = data.data.user;
        console.log(userData)
        fullNameElm.innerText = userData.name;
        usernameElm.innerText = userData.login;
        bioElm.innerText = userData.bio;
        profileImg.forEach(imageElm =>{
            imageElm.src = userData.avatarUrl;
        })
        locationElm.innerText = userData.location;
        emailElm.innerText = userData.email;
        emailElm.href = `mailto:${userData.email}`;
        twitterElm.innerText = userData.twitterUsername;
        twitterElm.href = `https://twitter.com/${userData.twitterUsername}`;
    })
    .catch(error =>{
        loader.classList.add("d-none");
        errorMessage.classList.add("d-block");
        console.error(error);
    })

    



// a929a12daf2e1a881d2ebd52d900bdd70f9cdf17

// document.body.addEventListener('load', ()=>{
//     fetch('https://api.github.com/graphql', {
//         method: 'POST',
//         headers: { "Content-Type": "application/json"},
//         body: JSON.stringify({
//             query: `{
//                 query {
//                     user(login: "Aliemeka") {
//                         name
//                         url
//                         login
//                         bio
//                         avatarUrl
//                         location
//                         email
//                         twitterUsername
//                         repositories(last: 20) {
//                             nodes {
//                                 name
//                                 url
//                                 updatedAt
//                                 description
//                                 stargazerCount
//                             }
//                         }
//                     }
//                 } 
//             }`
//         })
//     })
//     .then(res => res.json())
//     .then(data => {
//         console.log(data)
//     })
//     .catch(error =>{
//         console.log(error)
//     })
// })

/*
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
       repositories(last: 20) {
         nodes {
          name
          url
          updatedAt
          description
          stargazerCount
         }
       }
     }
  }
*/