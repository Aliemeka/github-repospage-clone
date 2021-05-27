import { queryParameter, getGitData, TOKEN } from './config'
import axios from 'axios';

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
const followersCount = document.getElementById("follower-count");
const followingCount = document.getElementById("following-count");
const starsCount = document.getElementById("stars-count");

const repoList = document.getElementById("repos") //Gets list of repositories

console.log(TOKEN)
const fetchData = payload => {
    axios.defaults.headers = {
        Authorization: `token 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`
    }
    axios.post(`https://api.github.com/graphql`, payload)
    .then(res => {
        const { data } = res.data;
        loadContainer.classList.add("d-none");
    
        console.log(data);
    
        // Update onwer information
        userData = data.user; //user data object
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
        
        // Get followers, following and starred repos count
        const { followers, following, starredRepositories } = userData;
    
        //update counts
        followersCount.innerText = followers.totalCount;
        followingCount.innerText = following.totalCount;
        starsCount.innerText = starredRepositories.totalCount;
    
        //Repository nodes object
        const { nodes } = userData.repositories;
        let repoDivs = "";
        nodes.forEach(node =>{
            const { name, url, updatedAt, description, stargazerCount, isPrivate} = node;
            const updateDate = new Date(updatedAt);
    
            //get time difference
            const diff = (Date.now() - updateDate) / (1000 * 3600 * 24);
            const diffSec = Math.round((Date.now() - updateDate) / (1000));
            const diffMin = Math.round((Date.now() - updateDate) / (1000 * 60));
            const diffHour = Math.round((Date.now() - updateDate) / (1000 * 3600));
            const dayDiff = Math.round(diff);
            let timeDiff;
            
            if(diffSec < 60){
                timeDiff = `${diffSec} ${ diffSec > 1 ? "seconds" : "second"} ago`;
            } else if (diffMin < 60){
                timeDiff = `${diffMin} ${ diffMin > 1 ? "minutes" : "minute"} ago`;
            } else if (diffHour < 24) {
                timeDiff = `${diffHour} ${ diffHour > 1 ? "hours" : "hour"} ago`;
            } else if (dayDiff < 30){
                timeDiff = `${dayDiff} ${ dayDiff > 1 ? "days" : "day"} ago`
            } else {
                const month = updateDate.toLocaleString("en-US", {month: "long"}) 
                const day = updateDate.toLocaleString("en-US", {day: "numeric"})
                timeDiff = `on ${month.substring(0, 3)} ${day}`
            }
    
            // Ensure private repos are not revealed
            if(!isPrivate){
                repoDivs+= (
                    `<li class="repo-item flex">
                        <div class="repo-info">
                            <h3 class="repo-name">
                                <a href=${url} class="text-link" rel="noreferrer noopener">${name}</a>
                            </h3>
                            <p class="repo-description">
                                ${description ? description : ""}
                            </p>
                            <ul class="flex no-style repo-details">
                                <li>Javascript</li>
                                <li class="flex">
                                <svg aria-label="star" role="img" viewBox="0 0 16 16" version="1.1" data-view-component="true" height="16" width="16" class="octicon octicon-star">
                                    <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                                </svg> ${"  "} ${stargazerCount}</li>
                                <li>Updated ${timeDiff}</li>
                            </ul>
                        </div>
                        <div class="repo-info-right flex">
                            <div class="text-right">
                                <button class="btn btn-light repo-button" type="button">
                                    <svg aria-label="star" role="img" viewBox="0 0 16 16" version="1.1" data-view-component="true" height="16" width="16" class="octicon octicon-star">
                                        <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                                    </svg><span class="mr-1">Star</span></button>
                            </div>
                        </div>
                    </li>
                `)
            }
        })
        repoList.innerHTML = repoDivs;
    })
    .catch(err => {
        loader.classList.add("d-none");
        errorMessage.classList.add("d-block");
        console.log(err);
    });
}

fetchData(queryParameter);