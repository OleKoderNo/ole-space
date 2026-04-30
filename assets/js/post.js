import { renderNavbar } from "./navbar.js";
import { loadPostPage } from "./postPage.js";

const postContainer = document.querySelector("#post-container");

renderNavbar();
loadPostPage(postContainer);
