import { getProfileByName } from "./api.js";
import { getProfile } from "./auth.js";

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

function createPostCard(post) {
	const article = document.createElement("article");

	article.className = "bg-white border rounded-md p-4 flex flex-col gap-4 cursor-pointer";

	article.addEventListener("click", () => {
		window.location.href = `post.html?id=${post.id}`;
	});

	const title = document.createElement("h2");
	title.className = "text-large font-bold";
	title.textContent = post.title;

	article.appendChild(title);

	if (post.media && post.media.url) {
		const imageWrapper = document.createElement("div");
		imageWrapper.className = "flex justify-center w-full";

		const image = document.createElement("img");
		image.src = post.media.url;
		image.alt = post.media.alt || post.title || "Post image";
		image.className = "max-w-md w-full max-h-72 object-cover rounded-md";

		imageWrapper.appendChild(image);
		article.appendChild(imageWrapper);
	}

	if (post.body) {
		const body = document.createElement("p");
		body.textContent = post.body;

		article.appendChild(body);
	}

	return article;
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
		stats.textContent = `${profile.posts.length} posts`;

		header.appendChild(stats);

		const postsTitle = document.createElement("h2");
		postsTitle.className = "text-large font-bold";
		postsTitle.textContent = "Posts";

		const postsList = document.createElement("section");
		postsList.className = "flex flex-col gap-4";

		if (!profile.posts.length) {
			postsList.textContent = "No posts yet.";
		}

		profile.posts.forEach((post) => {
			const postCard = createPostCard(post);
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
