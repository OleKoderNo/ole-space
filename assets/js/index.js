import { loadPublicFeed } from "./feed.js";
import { renderNavbar } from "./navbar.js";
import { setupPostSearch } from "./search.js";

const feedContainer = document.querySelector("#feed");

renderNavbar();
loadPublicFeed(feedContainer);
setupPostSearch(feedContainer);
