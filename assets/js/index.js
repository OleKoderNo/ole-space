import { updateAuthUI } from "./authUI.js";
import { loadPublicFeed } from "./feed.js";
import { setupPostSearch } from "./search.js";

const feedContainer = document.querySelector("#feed");

updateAuthUI();
loadPublicFeed(feedContainer);
setupPostSearch(feedContainer);
