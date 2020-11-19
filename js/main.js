
let userData = "";

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
    // console.log(data.data);
    userData = data.data.user;
    console.log(userData)
})
.catch(error =>{
    console.log(error);
})



const fullNameElm = document.getElementById("full-name"); //Gets element for the full name 
const usernameElm = document.getElementById("username"); //Gets element for the last name
const bioElm = document.getElementById("bio"); //Gets element for the bio
const profileImg = document.querySelector(".avatar-img"); //Gets elements for avatar image
const locationElm = document.getElementById("location"); //Gets element for location



fullNameElm.innerText = userData.name;



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