import { renderNavbar } from "./navbar.js";
import { loadProfilePage } from "./profilePage.js";

const profileContainer = document.querySelector("#profile-container");

renderNavbar();
loadProfilePage(profileContainer);
