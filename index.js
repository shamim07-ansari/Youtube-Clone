import navbar from "./component/navbar.js";
import sidebar from "./component/sidebar.js";
import chips from "./component/chips.js";
// youtube contents load on load
//api key
let API_KEY = "AIzaSyAdOcrfIyKiYSMRoyZRQdyez6nF0GJ5U-U";
// let url = "https://www.googleapis.com/youtube/v3/videos?";
// let search_url = "https://www.googleapis.com/youtube/v3/search?";
let videoContainer = document.getElementById("contents");
let searchResultsContainer = document.getElementById("main");
let searchContainer = document.getElementById("searhcResults");
let navContainer = document.getElementById("navbar_container");
// render video on reload the page

// let reload = () => {
//   window.location.replace("index.html");
// };
// navbar insertion from navbar components
navContainer.innerHTML = navbar();
//add event listner
let logo = document.querySelector(".yt-logo");
logo.addEventListener("click", function () {
  window.location.replace("index.html");
});

let getVideos = async () => {
    let res = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&key=${API_KEY}&maxResults=50`
    );
    let data = await res.json();
    data.items.forEach((el) => {
        getChannelLogo(el);
    });
};

window.addEventListener("load", getVideos);
let loadVideos = async () => {
    let query = document.getElementById("search-term").value;
    let res = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?q=${query}&key=${API_KEY}&part=snippet&maxResults=50`
    );
    let { items } = await res.json();
    searchResults(items);
};

// loading video event listner
let search = document.querySelector("#search");
search.addEventListener("click", loadVideos);

let getChannelLogo = async (video_data) => {
    let res = await fetch(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${video_data.snippet.channelId}&key=${API_KEY}`
    );
    let data = await res.json();
    video_data.channelThumbnail = data.items[0].snippet.thumbnails.high.url;
    renderVideo(video_data);
};

let searchResults = (data) => {
    searchResultsContainer.innerHTML = searchContainer;
    searchContainer.innerHTML = "";
    data.forEach((el) => {
        async function getLogo(elem) {
        let res = await fetch(
            `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${elem.snippet.channelId}&key=${API_KEY}`
        );
        let data = await res.json();
        el.channelLogo = data.items[0].snippet.thumbnails.high.url;
        let resultItem = document.createElement("div");
        resultItem.setAttribute("class", "result-items");
        resultItem.addEventListener("click", function () {
            readyToStream(el);
        });
        resultItem.innerHTML = `
            <div class="thumbnail-container">
            <img
                class="search-thumbnail"
                src="${el.snippet.thumbnails.high.url}"
                alt=""
            />
            </div>
            <div class="search-contents">
            <div class="search-title" style="font-size: 18px">
                <p>${el.snippet.title}</p>
            </div>

            <div class="channel-container">
                <img
                class="channel-logo"
                src="${el.channelLogo}"
                alt=""
                />
                <div class="channel-title">
                <p class="channel-name">${el.snippet.channelTitle}</p>
                </div>
            </div>
            <p class="video-description">
                ${el.snippet.description}
            </p>
            </div>
        `;
        searchContainer.append(resultItem);
        }
        getLogo(el);
    });
};

let renderVideo = (data) => {
    let contentItem = document.createElement("div");
    contentItem.setAttribute("class", "content-item");
    contentItem.addEventListener("click", function () {
        readyToStream(data);
    });
    contentItem.innerHTML = `
            <img
            class="thumbnail"
            src="${data.snippet.thumbnails.high.url}"
            alt=""
        />
        <div class="item-details">
            <div class="channel-logo">
            <img
                class="channel-thumbnail"
                src="${data.channelThumbnail}"
                alt=""
            />
            </div>
            <div class="item-contents">
            <p class="title">
                ${data.snippet.title}
            </p>
            <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    `;
    videoContainer.append(contentItem);
};

// ready to stream the video

function readyToStream(data) {
    localStorage.setItem("youTubeStream", JSON.stringify(data));
    window.location.href = "streaming.html";
}
// insert side bar in to the home page
let sidebarContaier = document.getElementById("sidebar_container");
sidebarContaier.innerHTML = sidebar();
// insert chips to home page
let chipsContainer = document.getElementById("chips_container");
chipsContainer.innerHTML = chips();