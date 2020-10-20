// selectors
const form = document.querySelector("#search");
const profileImg = document.querySelector(".profile-image");
const username = document.querySelector(".username");
const followers_count = document.querySelector("#followers");
const repository_count = document.querySelector("#repositories_data");
const following_count = document.querySelector("#following");
const error_overlay = document.querySelector(".overlay");

// event listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearFields();
  const uname = form.elements.uname.value;
  form.elements.uname.value = null;
  form.elements.uname.focus();
  apiCall(uname);
});
// functions

const renderOutput = ({ name, followers, following, repositories }) => {
  username.innerText = name;
  repository_count.innerText = `${repositories} Public Repositories`;
  followers_count.innerText = `${followers} Followers`;
  following_count.innerText = `${following} Following`;
  removeSkeleton();
};

const removeSkeleton = () => {
  profileImg.classList.remove("loading");
  username.classList.remove("loading");
  followers_count.parentElement.classList.remove("loading");
  repository_count.parentElement.classList.remove("loading");
  following_count.parentElement.classList.remove("loading");
};

const createImage = (src) => {
  const img = new Image();
  img.classList.add("img");
  img.src = src;
  img.alt = "Hello";
  profileImg.appendChild(img);
};

const apiCall = (uname) => {
  const API = `https://api.github.com/users/${uname}`;
  fetch(API)
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        throw Error();
      }
      createImage(data.avatar_url);
      renderOutput({
        name: data.login,
        followers: data.followers,
        following: data.following,
        repositories: data.public_repos,
      });
      error_overlay.style.visibility = "hidden";
    })
    .catch((e) => {
      enableOverlay();
    });
};

const enableOverlay = () => {
  const src = "https://i.ibb.co/N3cmDhB/Img.png";
  createImage(src);
  error_overlay.style.visibility = "visible";
};

const clearFields = () => {
  profileImg.innerHTML = null;
  username.innerHTML = null;
  followers_count.innerHTML = null;
  following_count.innerHTML = null;
  repository_count.innerHTML = null;
  addSkeleton();
};

const addSkeleton = () => {
  profileImg.classList.add("loading");
  username.classList.add("loading");
  followers_count.parentElement.classList.add("loading");
  repository_count.parentElement.classList.add("loading");
  following_count.parentElement.classList.add("loading");
};
