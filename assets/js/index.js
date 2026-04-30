import { updateAuthUI } from "./authUI.js";
import { setupCreatePostForm } from "./createPostUI.js";
import { loadPublicFeed } from "./feed.js";
import { setupPostSearch } from "./search.js";

const feedContainer = document.querySelector("#feed");

updateAuthUI();
loadPublicFeed(feedContainer);
setupCreatePostForm(feedContainer);
setupPostSearch(feedContainer);
