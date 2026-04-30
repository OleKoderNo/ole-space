import { renderNavbar } from "../components/navbar.js";
import { loadPostPage } from "../features/postPage.js";

const postContainer = document.querySelector("#post-container");

renderNavbar();
loadPostPage(postContainer);
