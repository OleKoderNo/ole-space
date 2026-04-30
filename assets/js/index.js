import { updateAuthUI } from "./authUI.js";
import { setupCreatePostForm } from "./createPostUI.js";
import { loadPublicFeed } from "./feed.js";

const feedContainer = document.querySelector("#feed");

updateAuthUI();
loadPublicFeed(feedContainer);
setupCreatePostForm(feedContainer);
