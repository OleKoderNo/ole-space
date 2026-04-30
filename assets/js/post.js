import { getPostById } from "./api.js";

const postContainer = document.querySelector("#post-container");

function getPostIdFromUrl() {
	const params = new URLSearchParams(window.location.search);

	return params.get("id");
}

async function loadSinglePost() {
	const postId = getPostIdFromUrl();

	if (!postId) {
		postContainer.textContent = "No post id found.";
		return;
	}

	postContainer.textContent = "Loading post...";

	try {
		const post = await getPostById(postId);

		postContainer.innerHTML = "";

		const article = document.createElement("article");
		article.className =
			"bg-white border rounded-md p-4 flex flex-col gap-4 max-w-hero w-full mx-auto";

		const backLink = document.createElement("a");
		backLink.href = "index.html";
		backLink.textContent = "Back to feed";
		backLink.className = "text-dusty-blue";

		const authorLink = document.createElement("a");
		authorLink.href = `profile.html?name=${post.author.name}`;
		authorLink.textContent = `@${post.author.name}`;
		authorLink.className = "text-small text-dusty-blue";

		const title = document.createElement("h1");
		title.className = "text-2xl font-bold";
		title.textContent = post.title;

		article.appendChild(backLink);
		article.appendChild(authorLink);
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

		postContainer.appendChild(article);
	} catch (error) {
		postContainer.textContent = error.message;
	}
}

loadSinglePost();
