import { renderNavbar } from "../components/navbar.js";
import { loadProfilePage } from "../features/profilePage.js";

const profileContainer = document.querySelector("#profile-container");

renderNavbar();
loadProfilePage(profileContainer);
