function navbar() {
    return `
              <nav id="header">
              <div class="logo-section">
              <div id="toggler">
                  <span class="material-symbols-outlined"> menu </span>
              </div>
              <div class="yt-logo">
                  <img src="images/youtube logo.svg" class="logo" alt="Yt Logo" />
              </div>
              </div>
              <div class="mid-section">
              <div class="search-section">
                  <input type="text" id="search-term" placeholder="Search" />
                  <button id="search">
                  <span class="material-symbols-outlined"> search </span>
                  </button>
              </div>
              <div class="mic">
                  <span class="material-symbols-outlined"> mic </span>
              </div>
              </div>
              <div class="profile-section">
              <div class="create-video">
                  <span class="material-symbols-outlined"> video_call </span>
              </div>
              <div class="bell">
                  <span class="material-symbols-outlined"> notifications </span>
              </div>
              <div class="profile">
                  <img src="images/profile.jpeg" alt="" />
              </div>
              </div>
          </nav>
      `;
}
  
  export default navbar;
  