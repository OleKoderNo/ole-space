import { followProfile, getProfileByName, unfollowProfile } from "./api.js";
import { getProfile, isLoggedIn } from "./auth.js";
import { createPostCard } from "./postCard.js";

const profileContainer = document.querySelector("#profile-container");

function getProfileNameFromUrl() {
	const params = new URLSearchParams(window.location.search);
	const name = params.get("name");

	if (name) {
		return name;
	}

	const loggedInProfile = getProfile();

	if (!loggedInProfile) {
		return null;
	}

	return loggedInProfile.name;
}

function isOwnProfile(profile) {
	const loggedInProfile = getProfile();

	if (!loggedInProfile) {
		return false;
	}

	return loggedInProfile.name === profile.name;
}

function isFollowingProfile(profile) {
	const loggedInProfile = getProfile();

	if (!loggedInProfile || !profile.followers) {
		return false;
	}

	return profile.followers.some((follower) => {
		return follower.name === loggedInProfile.name;
	});
}

function createProfileImage(profile) {
	if (!profile.avatar || !profile.avatar.url) {
		return null;
	}

	const image = document.createElement("img");

	image.src = profile.avatar.url;
	image.alt = profile.avatar.alt || `${profile.name} avatar`;
	image.className = "w-10 h-10 rounded-full object-cover";

	return image;
}

async function loadProfilePage() {
	const name = getProfileNameFromUrl();

	if (!name) {
		profileContainer.textContent = "No profile selected.";
		return;
	}

	profileContainer.textContent = "Loading profile...";

	try {
		const profile = await getProfileByName(name);

		profileContainer.innerHTML = "";

		const section = document.createElement("section");
		section.className = "flex flex-col gap-6";

		const backLink = document.createElement("a");
		backLink.href = "index.html";
		backLink.textContent = "Back to feed";
		backLink.className = "text-dusty-blue";

		const header = document.createElement("header");
		header.className = "bg-white border rounded-md p-4 flex flex-col gap-4";

		const topRow = document.createElement("div");
		topRow.className = "flex items-center gap-4";

		const avatar = createProfileImage(profile);

		if (avatar) {
			topRow.appendChild(avatar);
		}

		const username = document.createElement("h1");
		username.className = "text-2xl font-bold";
		username.textContent = `@${profile.name}`;

		topRow.appendChild(username);
		header.appendChild(topRow);

		if (profile.bio) {
			const bio = document.createElement("p");
			bio.textContent = profile.bio;

			header.appendChild(bio);
		}

		const stats = document.createElement("p");
		stats.className = "text-small";
		stats.textContent = `${profile.posts.length} posts · ${profile._count.followers} followers · ${profile._count.following} following`;

		header.appendChild(stats);

		if (isLoggedIn() && !isOwnProfile(profile)) {
			const followButton = document.createElement("button");
			followButton.type = "button";

			if (isFollowingProfile(profile)) {
				followButton.textContent = "Unfollow";
			} else {
				followButton.textContent = "Follow";
			}

			followButton.addEventListener("click", async () => {
				try {
					if (isFollowingProfile(profile)) {
						await unfollowProfile(profile.name);
					} else {
						await followProfile(profile.name);
					}

					await loadProfilePage();
				} catch (error) {
					profileContainer.textContent = error.message;
				}
			});

			header.appendChild(followButton);
		}

		const postsTitle = document.createElement("h2");
		postsTitle.className = "text-large font-bold";
		postsTitle.textContent = "Posts";

		const postsList = document.createElement("section");
		postsList.className = "flex flex-col gap-4";

		if (!profile.posts.length) {
			postsList.textContent = "No posts yet.";
		}

		profile.posts.forEach((post) => {
			const postCard = createPostCard(post, false);

			postsList.appendChild(postCard);
		});

		section.appendChild(backLink);
		section.appendChild(header);
		section.appendChild(postsTitle);
		section.appendChild(postsList);

		profileContainer.appendChild(section);
	} catch (error) {
		profileContainer.textContent = error.message;
	}
}

loadProfilePage();
