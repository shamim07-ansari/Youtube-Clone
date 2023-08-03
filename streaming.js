import navbar from "./component/navbar.js";
// importing navbar to the home page
let navContainer = document.getElementById("navbar_container");
navContainer.innerHTML = navbar();

let logo = document.querySelector(".yt-logo");
logo.addEventListener("click", function () {
    window.location.href = "index.html";
});

let streamData = JSON.parse(localStorage.getItem("youTubeStream"));

let streamContainer = document.getElementById("video_frame");
window.addEventListener("load", loadVideo);
let API_KEY = "AIzaSyAdOcrfIyKiYSMRoyZRQdyez6nF0GJ5U-U";

let relatedVideo = async (el) => {
    let url;
    if (el.id.videoId) {
        url = `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${el.id.videoId}&type=video&key=${API_KEY}&maxResults=50`;
        console.log(url);
    } else if (el.id) {
        url = `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${el.id}&type=video&key=${API_KEY}&maxResults=50`;
        console.log(url);
    }
    let res = await fetch(url);
    let data = await res.json();
    let { items } = data;
    loadRelatedVideo(items);
    console.log(items);
    };
    loadVideo(streamData);
    relatedVideo(streamData);
    function loadVideo(data) {
    // streamContainer.innerHTML = "";
    let iframe = document.createElement("iframe");
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.allow = "fullscreen";
    if (data.id.videoId) {
        iframe.src = `https://www.youtube.com/embed/${data.id.videoId}`;
    } else if (data.id) {
        iframe.src = `https://www.youtube.com/embed/${data.id}`;
    }
    //   iframe.src = `https://www.youtube.com/embed/${data.id}`;
    let title = document.createElement("p");
    title.setAttribute("class", "video_title");
    title.textContent = data.snippet.title;
    streamContainer.append(iframe, title);
}

let relatedContainer = document.getElementById("related_bar");
function loadRelatedVideo(data) {
  // relatedContainer.innerHTML = "";
    data.forEach((el) => {
        let relatedItem = document.createElement("div");
        relatedItem.setAttribute("id", "related_item");
        relatedItem.addEventListener("click", function () {
        getReadyToStream(el);
        });
        relatedItem.innerHTML = `
            <div class="related_thumbnail">
            <img
                src="${el.snippet.thumbnails.high.url}"
                alt=""
            />
            </div>
            <div class="related_detail">
            <p class="related_title">
                ${el.snippet.title}
            </p>
            <p class="related_channel">${el.snippet.channelTitle}</p>
            </div> 
        `;
        relatedContainer.append(relatedItem);
    });
}

// let getReadyToPlay = document.getElementById("related_item");
function getReadyToStream(el) {
    streamContainer.innerHTML = "";
    localStorage.setItem("youTubeStream", JSON.stringify(el));
    loadVideo(el);
}