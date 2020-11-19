
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

fetch('/fetch-gitdata')
    .then(res => res.json())
    .then(data => {
        //remove the loader
        loadContainer.classList.add("d-none");

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
                                <li class="flex">${stargazerCount}</li>
                                <li>Updated ${timeDiff}</li>
                            </ul>
                        </div>
                        <div class="repo-info-right flex">
                            <button class="btn btn-light repo-button" type="button">Star</span></button>
                        </div>
                    </li>
                `)
            }
        })
        repoList.innerHTML = repoDivs;
    })
    .catch(error =>{
        loader.classList.add("d-none");
        errorMessage.classList.add("d-block");
        console.error(error);
    })

